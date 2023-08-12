/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { PerformanceEvents, StringUtils, PromptValue, Constants, AuthError, UrlString, ProtocolUtils } from '@azure/msal-common';
import { StandardInteractionClient } from './StandardInteractionClient.mjs';
import { BrowserAuthError } from '../error/BrowserAuthError.mjs';
import { InteractionType } from '../utils/BrowserConstants.mjs';
import { SilentHandler } from '../interaction_handler/SilentHandler.mjs';
import { NativeMessageHandler } from '../broker/nativeBroker/NativeMessageHandler.mjs';
import { NativeInteractionClient } from './NativeInteractionClient.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentIframeClient extends StandardInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, apiId, performanceClient, nativeStorageImpl, nativeMessageHandler, correlationId) {
        super(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId);
        this.apiId = apiId;
        this.nativeStorage = nativeStorageImpl;
    }
    /**
     * Acquires a token silently by opening a hidden iframe to the /authorize endpoint with prompt=none or prompt=no_session
     * @param request
     */
    async acquireToken(request) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentIframeClientAcquireToken, request.correlationId);
        this.logger.verbose("acquireTokenByIframe called");
        const acquireTokenMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.SilentIframeClientAcquireToken, request.correlationId);
        // Check that we have some SSO data
        if (StringUtils.isEmpty(request.loginHint) &&
            StringUtils.isEmpty(request.sid) &&
            (!request.account || StringUtils.isEmpty(request.account.username))) {
            this.logger.warning("No user hint provided. The authorization server may need more information to complete this request.");
        }
        // Check that prompt is set to none or no_session, throw error if it is set to anything else.
        if (request.prompt &&
            request.prompt !== PromptValue.NONE &&
            request.prompt !== PromptValue.NO_SESSION) {
            acquireTokenMeasurement.end({
                success: false,
            });
            throw BrowserAuthError.createSilentPromptValueError(request.prompt);
        }
        // Create silent request
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationRequest, request.correlationId);
        const silentRequest = await this.initializeAuthorizationRequest({
            ...request,
            prompt: request.prompt || PromptValue.NONE,
        }, InteractionType.Silent);
        this.browserStorage.updateCacheEntries(silentRequest.state, silentRequest.nonce, silentRequest.authority, silentRequest.loginHint || Constants.EMPTY_STRING, silentRequest.account || null);
        const serverTelemetryManager = this.initializeServerTelemetryManager(this.apiId);
        try {
            // Initialize the client
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, request.correlationId);
            const authClient = await this.createAuthCodeClient(serverTelemetryManager, silentRequest.authority, silentRequest.azureCloudOptions);
            this.logger.verbose("Auth code client created");
            this.performanceClient.setPreQueueTime(PerformanceEvents.SilentIframeClientTokenHelper, request.correlationId);
            return await this.silentTokenHelper(authClient, silentRequest).then((result) => {
                acquireTokenMeasurement.end({
                    success: true,
                    fromCache: false,
                    requestId: result.requestId,
                });
                return result;
            });
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.browserStorage.cleanRequestByState(silentRequest.state);
            acquireTokenMeasurement.end({
                errorCode: (e instanceof AuthError && e.errorCode) || undefined,
                subErrorCode: (e instanceof AuthError && e.subError) || undefined,
                success: false,
            });
            throw e;
        }
    }
    /**
     * Currently Unsupported
     */
    logout() {
        // Synchronous so we must reject
        return Promise.reject(BrowserAuthError.createSilentLogoutUnsupportedError());
    }
    /**
     * Helper which acquires an authorization code silently using a hidden iframe from given url
     * using the scopes requested as part of the id, and exchanges the code for a set of OAuth tokens.
     * @param navigateUrl
     * @param userRequestScopes
     */
    async silentTokenHelper(authClient, silentRequest) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentIframeClientTokenHelper, silentRequest.correlationId);
        // Create auth code request and generate PKCE params
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationCodeRequest, silentRequest.correlationId);
        const authCodeRequest = await this.initializeAuthorizationCodeRequest(silentRequest);
        // Create authorize request url
        this.performanceClient.setPreQueueTime(PerformanceEvents.GetAuthCodeUrl, silentRequest.correlationId);
        const navigateUrl = await authClient.getAuthCodeUrl({
            ...silentRequest,
            nativeBroker: NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeMessageHandler, silentRequest.authenticationScheme),
        });
        // Create silent handler
        const silentHandler = new SilentHandler(authClient, this.browserStorage, authCodeRequest, this.logger, this.config.system, this.performanceClient);
        // Get the frame handle for the silent request
        this.performanceClient.setPreQueueTime(PerformanceEvents.SilentHandlerInitiateAuthRequest, silentRequest.correlationId);
        const msalFrame = await silentHandler.initiateAuthRequest(navigateUrl);
        // Monitor the window for the hash. Return the string value and close the popup when the hash is received. Default timeout is 60 seconds.
        this.performanceClient.setPreQueueTime(PerformanceEvents.SilentHandlerMonitorIframeForHash, silentRequest.correlationId);
        const hash = await silentHandler.monitorIframeForHash(msalFrame, this.config.system.iframeHashTimeout);
        // Deserialize hash fragment response parameters.
        const serverParams = UrlString.getDeserializedHash(hash);
        const state = this.validateAndExtractStateFromHash(serverParams, InteractionType.Silent, authCodeRequest.correlationId);
        if (serverParams.accountId) {
            this.logger.verbose("Account id found in hash, calling WAM for token");
            if (!this.nativeMessageHandler) {
                throw BrowserAuthError.createNativeConnectionNotEstablishedError();
            }
            const nativeInteractionClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.apiId, this.performanceClient, this.nativeMessageHandler, serverParams.accountId, this.browserStorage, this.correlationId);
            const { userRequestState } = ProtocolUtils.parseRequestState(this.browserCrypto, state);
            return nativeInteractionClient
                .acquireToken({
                ...silentRequest,
                state: userRequestState,
                prompt: silentRequest.prompt || PromptValue.NONE,
            })
                .finally(() => {
                this.browserStorage.cleanRequestByState(state);
            });
        }
        // Handle response from hash string
        this.performanceClient.setPreQueueTime(PerformanceEvents.HandleCodeResponseFromHash, silentRequest.correlationId);
        return silentHandler.handleCodeResponseFromHash(hash, state, authClient.authority, this.networkClient);
    }
}

export { SilentIframeClient };
//# sourceMappingURL=SilentIframeClient.mjs.map
