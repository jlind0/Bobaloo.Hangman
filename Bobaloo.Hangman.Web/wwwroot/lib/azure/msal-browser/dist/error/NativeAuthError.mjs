/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
import { AuthError, InteractionRequiredAuthError } from '@azure/msal-common';
import { BrowserAuthError } from './BrowserAuthError.mjs';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const INVALID_METHOD_ERROR = -2147186943;
const NativeStatusCode = {
    USER_INTERACTION_REQUIRED: "USER_INTERACTION_REQUIRED",
    USER_CANCEL: "USER_CANCEL",
    NO_NETWORK: "NO_NETWORK",
    TRANSIENT_ERROR: "TRANSIENT_ERROR",
    PERSISTENT_ERROR: "PERSISTENT_ERROR",
    DISABLED: "DISABLED",
    ACCOUNT_UNAVAILABLE: "ACCOUNT_UNAVAILABLE",
};
const NativeAuthErrorMessage = {
    extensionError: {
        code: "ContentError",
    },
    userSwitch: {
        code: "user_switch",
        desc: "User attempted to switch accounts in the native broker, which is not allowed. All new accounts must sign-in through the standard web flow first, please try again.",
    },
    tokensNotFoundInCache: {
        code: "tokens_not_found_in_internal_memory_cache",
        desc: "Tokens not cached in MSAL JS internal memory, please make the WAM request",
    },
};
class NativeAuthError extends AuthError {
    constructor(errorCode, description, ext) {
        super(errorCode, description);
        Object.setPrototypeOf(this, NativeAuthError.prototype);
        this.name = "NativeAuthError";
        this.ext = ext;
    }
    /**
     * These errors should result in a fallback to the 'standard' browser based auth flow.
     */
    isFatal() {
        if (this.ext &&
            this.ext.status &&
            (this.ext.status === NativeStatusCode.PERSISTENT_ERROR ||
                this.ext.status === NativeStatusCode.DISABLED)) {
            return true;
        }
        if (this.ext &&
            this.ext.error &&
            this.ext.error === INVALID_METHOD_ERROR) {
            return true;
        }
        switch (this.errorCode) {
            case NativeAuthErrorMessage.extensionError.code:
                return true;
            default:
                return false;
        }
    }
    /**
     * Create the appropriate error object based on the WAM status code.
     * @param code
     * @param description
     * @param ext
     * @returns
     */
    static createError(code, description, ext) {
        if (ext && ext.status) {
            switch (ext.status) {
                case NativeStatusCode.ACCOUNT_UNAVAILABLE:
                    return InteractionRequiredAuthError.createNativeAccountUnavailableError();
                case NativeStatusCode.USER_INTERACTION_REQUIRED:
                    return new InteractionRequiredAuthError(code, description);
                case NativeStatusCode.USER_CANCEL:
                    return BrowserAuthError.createUserCancelledError();
                case NativeStatusCode.NO_NETWORK:
                    return BrowserAuthError.createNoNetworkConnectivityError();
            }
        }
        return new NativeAuthError(code, description, ext);
    }
    /**
     * Creates user switch error when the user chooses a different account in the native broker prompt
     * @returns
     */
    static createUserSwitchError() {
        return new NativeAuthError(NativeAuthErrorMessage.userSwitch.code, NativeAuthErrorMessage.userSwitch.desc);
    }
    /**
     * Creates a tokens not found error when the internal cache look up fails
     * @returns NativeAuthError: tokensNotFoundInCache
     */
    static createTokensNotFoundInCacheError() {
        return new NativeAuthError(NativeAuthErrorMessage.tokensNotFoundInCache.code, NativeAuthErrorMessage.tokensNotFoundInCache.desc);
    }
}

export { NativeAuthError, NativeAuthErrorMessage, NativeStatusCode };
//# sourceMappingURL=NativeAuthError.mjs.map
