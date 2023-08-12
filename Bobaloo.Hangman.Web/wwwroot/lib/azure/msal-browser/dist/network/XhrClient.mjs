/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { BrowserAuthError } from '../error/BrowserAuthError.mjs';
import { HTTP_REQUEST_TYPE } from '../utils/BrowserConstants.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This client implements the XMLHttpRequest class to send GET and POST requests.
 */
class XhrClient {
    /**
     * XhrClient for REST endpoints - Get request
     * @param url
     * @param headers
     * @param body
     */
    async sendGetRequestAsync(url, options) {
        return this.sendRequestAsync(url, HTTP_REQUEST_TYPE.GET, options);
    }
    /**
     * XhrClient for REST endpoints - Post request
     * @param url
     * @param headers
     * @param body
     */
    async sendPostRequestAsync(url, options) {
        return this.sendRequestAsync(url, HTTP_REQUEST_TYPE.POST, options);
    }
    /**
     * Helper for XhrClient requests.
     * @param url
     * @param method
     * @param options
     */
    sendRequestAsync(url, method, options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, /* async: */ true);
            this.setXhrHeaders(xhr, options);
            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    if (method === HTTP_REQUEST_TYPE.POST) {
                        reject(BrowserAuthError.createPostRequestFailedError(`Failed with status ${xhr.status}`, url));
                    }
                    else {
                        reject(BrowserAuthError.createGetRequestFailedError(`Failed with status ${xhr.status}`, url));
                    }
                }
                try {
                    const jsonResponse = JSON.parse(xhr.responseText);
                    const networkResponse = {
                        headers: this.getHeaderDict(xhr),
                        body: jsonResponse,
                        status: xhr.status,
                    };
                    resolve(networkResponse);
                }
                catch (e) {
                    reject(BrowserAuthError.createFailedToParseNetworkResponseError(url));
                }
            };
            xhr.onerror = () => {
                if (window.navigator.onLine) {
                    if (method === HTTP_REQUEST_TYPE.POST) {
                        reject(BrowserAuthError.createPostRequestFailedError(`Failed with status ${xhr.status}`, url));
                    }
                    else {
                        reject(BrowserAuthError.createGetRequestFailedError(`Failed with status ${xhr.status}`, url));
                    }
                }
                else {
                    reject(BrowserAuthError.createNoNetworkConnectivityError());
                }
            };
            if (method === HTTP_REQUEST_TYPE.POST && options && options.body) {
                xhr.send(options.body);
            }
            else if (method === HTTP_REQUEST_TYPE.GET) {
                xhr.send();
            }
            else {
                throw BrowserAuthError.createHttpMethodNotImplementedError(method);
            }
        });
    }
    /**
     * Helper to set XHR headers for request.
     * @param xhr
     * @param options
     */
    setXhrHeaders(xhr, options) {
        if (options && options.headers) {
            const headers = options.headers;
            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });
        }
    }
    /**
     * Gets a string map of the headers received in the response.
     *
     * Algorithm comes from https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
     * @param xhr
     */
    getHeaderDict(xhr) {
        const headerString = xhr.getAllResponseHeaders();
        const headerArr = headerString.trim().split(/[\r\n]+/);
        const headerDict = {};
        headerArr.forEach((value) => {
            const parts = value.split(": ");
            const headerName = parts.shift();
            const headerVal = parts.join(": ");
            if (headerName && headerVal) {
                headerDict[headerName] = headerVal;
            }
        });
        return headerDict;
    }
}

export { XhrClient };
//# sourceMappingURL=XhrClient.mjs.map
