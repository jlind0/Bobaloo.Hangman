/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { Constants } from '@azure/msal-common';
import { BrowserAuthError } from '../error/BrowserAuthError.mjs';
import { HTTP_REQUEST_TYPE } from '../utils/BrowserConstants.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements the Fetch API for GET and POST requests. See more here: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
class FetchClient {
    /**
     * Fetch Client for REST endpoints - Get request
     * @param url
     * @param headers
     * @param body
     */
    async sendGetRequestAsync(url, options) {
        let response;
        try {
            response = await fetch(url, {
                method: HTTP_REQUEST_TYPE.GET,
                headers: this.getFetchHeaders(options),
            });
        }
        catch (e) {
            if (window.navigator.onLine) {
                throw BrowserAuthError.createGetRequestFailedError(e, url);
            }
            else {
                throw BrowserAuthError.createNoNetworkConnectivityError();
            }
        }
        try {
            return {
                headers: this.getHeaderDict(response.headers),
                body: (await response.json()),
                status: response.status,
            };
        }
        catch (e) {
            throw BrowserAuthError.createFailedToParseNetworkResponseError(url);
        }
    }
    /**
     * Fetch Client for REST endpoints - Post request
     * @param url
     * @param headers
     * @param body
     */
    async sendPostRequestAsync(url, options) {
        const reqBody = (options && options.body) || Constants.EMPTY_STRING;
        let response;
        try {
            response = await fetch(url, {
                method: HTTP_REQUEST_TYPE.POST,
                headers: this.getFetchHeaders(options),
                body: reqBody,
            });
        }
        catch (e) {
            if (window.navigator.onLine) {
                throw BrowserAuthError.createPostRequestFailedError(e, url);
            }
            else {
                throw BrowserAuthError.createNoNetworkConnectivityError();
            }
        }
        try {
            return {
                headers: this.getHeaderDict(response.headers),
                body: (await response.json()),
                status: response.status,
            };
        }
        catch (e) {
            throw BrowserAuthError.createFailedToParseNetworkResponseError(url);
        }
    }
    /**
     * Get Fetch API Headers object from string map
     * @param inputHeaders
     */
    getFetchHeaders(options) {
        const headers = new Headers();
        if (!(options && options.headers)) {
            return headers;
        }
        const optionsHeaders = options.headers;
        Object.keys(optionsHeaders).forEach((key) => {
            headers.append(key, optionsHeaders[key]);
        });
        return headers;
    }
    getHeaderDict(headers) {
        const headerDict = {};
        headers.forEach((value, key) => {
            headerDict[key] = value;
        });
        return headerDict;
    }
}

export { FetchClient };
//# sourceMappingURL=FetchClient.mjs.map
