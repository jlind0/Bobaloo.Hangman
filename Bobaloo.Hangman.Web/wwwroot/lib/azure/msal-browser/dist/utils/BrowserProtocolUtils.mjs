/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { StringUtils, ProtocolUtils, ClientAuthError, UrlString } from '@azure/msal-common';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BrowserProtocolUtils {
    /**
     * Extracts the BrowserStateObject from the state string.
     * @param browserCrypto
     * @param state
     */
    static extractBrowserRequestState(browserCrypto, state) {
        if (StringUtils.isEmpty(state)) {
            return null;
        }
        try {
            const requestStateObj = ProtocolUtils.parseRequestState(browserCrypto, state);
            return requestStateObj.libraryState.meta;
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(state, e);
        }
    }
    /**
     * Parses properties of server response from url hash
     * @param locationHash Hash from url
     */
    static parseServerResponseFromHash(locationHash) {
        if (!locationHash) {
            return {};
        }
        const hashUrlString = new UrlString(locationHash);
        return UrlString.getDeserializedHash(hashUrlString.getHash());
    }
}

export { BrowserProtocolUtils };
//# sourceMappingURL=BrowserProtocolUtils.mjs.map