export declare const EventType: {
    readonly INITIALIZE_START: "msal:initializeStart";
    readonly INITIALIZE_END: "msal:initializeEnd";
    readonly ACCOUNT_ADDED: "msal:accountAdded";
    readonly ACCOUNT_REMOVED: "msal:accountRemoved";
    readonly LOGIN_START: "msal:loginStart";
    readonly LOGIN_SUCCESS: "msal:loginSuccess";
    readonly LOGIN_FAILURE: "msal:loginFailure";
    readonly ACQUIRE_TOKEN_START: "msal:acquireTokenStart";
    readonly ACQUIRE_TOKEN_SUCCESS: "msal:acquireTokenSuccess";
    readonly ACQUIRE_TOKEN_FAILURE: "msal:acquireTokenFailure";
    readonly ACQUIRE_TOKEN_NETWORK_START: "msal:acquireTokenFromNetworkStart";
    readonly SSO_SILENT_START: "msal:ssoSilentStart";
    readonly SSO_SILENT_SUCCESS: "msal:ssoSilentSuccess";
    readonly SSO_SILENT_FAILURE: "msal:ssoSilentFailure";
    readonly ACQUIRE_TOKEN_BY_CODE_START: "msal:acquireTokenByCodeStart";
    readonly ACQUIRE_TOKEN_BY_CODE_SUCCESS: "msal:acquireTokenByCodeSuccess";
    readonly ACQUIRE_TOKEN_BY_CODE_FAILURE: "msal:acquireTokenByCodeFailure";
    readonly HANDLE_REDIRECT_START: "msal:handleRedirectStart";
    readonly HANDLE_REDIRECT_END: "msal:handleRedirectEnd";
    readonly POPUP_OPENED: "msal:popupOpened";
    readonly LOGOUT_START: "msal:logoutStart";
    readonly LOGOUT_SUCCESS: "msal:logoutSuccess";
    readonly LOGOUT_FAILURE: "msal:logoutFailure";
    readonly LOGOUT_END: "msal:logoutEnd";
    readonly RESTORE_FROM_BFCACHE: "msal:restoreFromBFCache";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
//# sourceMappingURL=EventType.d.ts.map