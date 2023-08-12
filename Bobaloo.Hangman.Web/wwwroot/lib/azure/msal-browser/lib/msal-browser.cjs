/*! @azure/msal-browser v3.0.1 2023-08-11 */
'use strict';
'use strict';

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const Constants = {
    LIBRARY_NAME: "MSAL.JS",
    SKU: "msal.js.common",
    // Prefix for all library cache entries
    CACHE_PREFIX: "msal",
    // default authority
    DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
    DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
    DEFAULT_COMMON_TENANT: "common",
    // ADFS String
    ADFS: "adfs",
    DSTS: "dstsv2",
    // Default AAD Instance Discovery Endpoint
    AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
    // CIAM URL
    CIAM_AUTH_URL: ".ciamlogin.com",
    AAD_TENANT_DOMAIN_SUFFIX: ".onmicrosoft.com",
    // Resource delimiter - used for certain cache entries
    RESOURCE_DELIM: "|",
    // Placeholder for non-existent account ids/objects
    NO_ACCOUNT: "NO_ACCOUNT",
    // Claims
    CLAIMS: "claims",
    // Consumer UTID
    CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
    // Default scopes
    OPENID_SCOPE: "openid",
    PROFILE_SCOPE: "profile",
    OFFLINE_ACCESS_SCOPE: "offline_access",
    EMAIL_SCOPE: "email",
    // Default response type for authorization code flow
    CODE_RESPONSE_TYPE: "code",
    CODE_GRANT_TYPE: "authorization_code",
    RT_GRANT_TYPE: "refresh_token",
    FRAGMENT_RESPONSE_MODE: "fragment",
    S256_CODE_CHALLENGE_METHOD: "S256",
    URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
    AUTHORIZATION_PENDING: "authorization_pending",
    NOT_DEFINED: "not_defined",
    EMPTY_STRING: "",
    NOT_APPLICABLE: "N/A",
    FORWARD_SLASH: "/",
    IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
    IMDS_VERSION: "2020-06-01",
    IMDS_TIMEOUT: 2000,
    AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
    REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
    REGIONAL_AUTH_NON_MSI_QUERY_STRING: "allowestsrnonmsi=true",
    KNOWN_PUBLIC_CLOUDS: [
        "login.microsoftonline.com",
        "login.windows.net",
        "login.microsoft.com",
        "sts.windows.net",
    ],
    TOKEN_RESPONSE_TYPE: "token",
    ID_TOKEN_RESPONSE_TYPE: "id_token",
    SHR_NONCE_VALIDITY: 240,
    INVALID_INSTANCE: "invalid_instance",
};
const OIDC_DEFAULT_SCOPES = [
    Constants.OPENID_SCOPE,
    Constants.PROFILE_SCOPE,
    Constants.OFFLINE_ACCESS_SCOPE,
];
const OIDC_SCOPES = [...OIDC_DEFAULT_SCOPES, Constants.EMAIL_SCOPE];
/**
 * Request header names
 */
const HeaderNames = {
    CONTENT_TYPE: "Content-Type",
    RETRY_AFTER: "Retry-After",
    CCS_HEADER: "X-AnchorMailbox",
    WWWAuthenticate: "WWW-Authenticate",
    AuthenticationInfo: "Authentication-Info",
    X_MS_REQUEST_ID: "x-ms-request-id",
    X_MS_HTTP_VERSION: "x-ms-httpver",
};
/**
 * Persistent cache keys MSAL which stay while user is logged in.
 */
const PersistentCacheKeys = {
    ID_TOKEN: "idtoken",
    CLIENT_INFO: "client.info",
    ADAL_ID_TOKEN: "adal.idtoken",
    ERROR: "error",
    ERROR_DESC: "error.description",
    ACTIVE_ACCOUNT: "active-account",
    ACTIVE_ACCOUNT_FILTERS: "active-account-filters", // new cache entry for active_account for a more robust version for browser
};
/**
 * String constants related to AAD Authority
 */
const AADAuthorityConstants = {
    COMMON: "common",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
};
/**
 * Keys in the hashParams sent by AAD Server
 */
const AADServerParamKeys = {
    CLIENT_ID: "client_id",
    REDIRECT_URI: "redirect_uri",
    RESPONSE_TYPE: "response_type",
    RESPONSE_MODE: "response_mode",
    GRANT_TYPE: "grant_type",
    CLAIMS: "claims",
    SCOPE: "scope",
    ERROR: "error",
    ERROR_DESCRIPTION: "error_description",
    ACCESS_TOKEN: "access_token",
    ID_TOKEN: "id_token",
    REFRESH_TOKEN: "refresh_token",
    EXPIRES_IN: "expires_in",
    STATE: "state",
    NONCE: "nonce",
    PROMPT: "prompt",
    SESSION_STATE: "session_state",
    CLIENT_INFO: "client_info",
    CODE: "code",
    CODE_CHALLENGE: "code_challenge",
    CODE_CHALLENGE_METHOD: "code_challenge_method",
    CODE_VERIFIER: "code_verifier",
    CLIENT_REQUEST_ID: "client-request-id",
    X_CLIENT_SKU: "x-client-SKU",
    X_CLIENT_VER: "x-client-VER",
    X_CLIENT_OS: "x-client-OS",
    X_CLIENT_CPU: "x-client-CPU",
    X_CLIENT_CURR_TELEM: "x-client-current-telemetry",
    X_CLIENT_LAST_TELEM: "x-client-last-telemetry",
    X_MS_LIB_CAPABILITY: "x-ms-lib-capability",
    X_APP_NAME: "x-app-name",
    X_APP_VER: "x-app-ver",
    POST_LOGOUT_URI: "post_logout_redirect_uri",
    ID_TOKEN_HINT: "id_token_hint",
    DEVICE_CODE: "device_code",
    CLIENT_SECRET: "client_secret",
    CLIENT_ASSERTION: "client_assertion",
    CLIENT_ASSERTION_TYPE: "client_assertion_type",
    TOKEN_TYPE: "token_type",
    REQ_CNF: "req_cnf",
    OBO_ASSERTION: "assertion",
    REQUESTED_TOKEN_USE: "requested_token_use",
    ON_BEHALF_OF: "on_behalf_of",
    FOCI: "foci",
    CCS_HEADER: "X-AnchorMailbox",
    RETURN_SPA_CODE: "return_spa_code",
    NATIVE_BROKER: "nativebroker",
    LOGOUT_HINT: "logout_hint",
};
/**
 * Claims request keys
 */
const ClaimsRequestKeys = {
    ACCESS_TOKEN: "access_token",
    XMS_CC: "xms_cc",
};
/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 */
const PromptValue = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none",
    CREATE: "create",
    NO_SESSION: "no_session",
};
/**
 * SSO Types - generated to populate hints
 */
const SSOTypes = {
    ACCOUNT: "account",
    SID: "sid",
    LOGIN_HINT: "login_hint",
    ID_TOKEN: "id_token",
    DOMAIN_HINT: "domain_hint",
    ORGANIZATIONS: "organizations",
    CONSUMERS: "consumers",
    ACCOUNT_ID: "accountIdentifier",
    HOMEACCOUNT_ID: "homeAccountIdentifier",
};
/**
 * allowed values for codeVerifier
 */
const CodeChallengeMethodValues = {
    PLAIN: "plain",
    S256: "S256",
};
/**
 * allowed values for server response type
 */
const ServerResponseType = {
    QUERY: "query",
    FRAGMENT: "fragment",
};
/**
 * allowed values for response_mode
 */
const ResponseMode = {
    ...ServerResponseType,
    FORM_POST: "form_post",
};
/**
 * allowed grant_type
 */
const GrantType = {
    IMPLICIT_GRANT: "implicit",
    AUTHORIZATION_CODE_GRANT: "authorization_code",
    CLIENT_CREDENTIALS_GRANT: "client_credentials",
    RESOURCE_OWNER_PASSWORD_GRANT: "password",
    REFRESH_TOKEN_GRANT: "refresh_token",
    DEVICE_CODE_GRANT: "device_code",
    JWT_BEARER: "urn:ietf:params:oauth:grant-type:jwt-bearer",
};
/**
 * Account types in Cache
 */
const CacheAccountType = {
    MSSTS_ACCOUNT_TYPE: "MSSTS",
    ADFS_ACCOUNT_TYPE: "ADFS",
    MSAV1_ACCOUNT_TYPE: "MSA",
    GENERIC_ACCOUNT_TYPE: "Generic", // NTLM, Kerberos, FBA, Basic etc
};
/**
 * Separators used in cache
 */
const Separators = {
    CACHE_KEY_SEPARATOR: "-",
    CLIENT_INFO_SEPARATOR: ".",
};
/**
 * Credential Type stored in the cache
 */
const CredentialType = {
    ID_TOKEN: "IdToken",
    ACCESS_TOKEN: "AccessToken",
    ACCESS_TOKEN_WITH_AUTH_SCHEME: "AccessToken_With_AuthScheme",
    REFRESH_TOKEN: "RefreshToken",
};
/**
 * Combine all cache types
 */
const CacheType = {
    ADFS: 1001,
    MSA: 1002,
    MSSTS: 1003,
    GENERIC: 1004,
    ACCESS_TOKEN: 2001,
    REFRESH_TOKEN: 2002,
    ID_TOKEN: 2003,
    APP_METADATA: 3001,
    UNDEFINED: 9999,
};
/**
 * More Cache related constants
 */
const APP_METADATA = "appmetadata";
const CLIENT_INFO = "client_info";
const THE_FAMILY_ID = "1";
const AUTHORITY_METADATA_CONSTANTS = {
    CACHE_KEY: "authority-metadata",
    REFRESH_TIME_SECONDS: 3600 * 24, // 24 Hours
};
const AuthorityMetadataSource = {
    CONFIG: "config",
    CACHE: "cache",
    NETWORK: "network",
    HARDCODED_VALUES: "hardcoded_values",
};
const SERVER_TELEM_CONSTANTS = {
    SCHEMA_VERSION: 5,
    MAX_CUR_HEADER_BYTES: 80,
    MAX_LAST_HEADER_BYTES: 330,
    MAX_CACHED_ERRORS: 50,
    CACHE_KEY: "server-telemetry",
    CATEGORY_SEPARATOR: "|",
    VALUE_SEPARATOR: ",",
    OVERFLOW_TRUE: "1",
    OVERFLOW_FALSE: "0",
    UNKNOWN_ERROR: "unknown_error",
};
/**
 * Type of the authentication request
 */
const AuthenticationScheme = {
    BEARER: "Bearer",
    POP: "pop",
    SSH: "ssh-cert",
};
/**
 * Constants related to throttling
 */
const ThrottlingConstants = {
    // Default time to throttle RequestThumbprint in seconds
    DEFAULT_THROTTLE_TIME_SECONDS: 60,
    // Default maximum time to throttle in seconds, overrides what the server sends back
    DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
    // Prefix for storing throttling entries
    THROTTLING_PREFIX: "throttling",
    // Value assigned to the x-ms-lib-capability header to indicate to the server the library supports throttling
    X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429",
};
const Errors = {
    INVALID_GRANT_ERROR: "invalid_grant",
    CLIENT_MISMATCH_ERROR: "client_mismatch",
};
/**
 * Password grant parameters
 */
const PasswordGrantConstants = {
    username: "username",
    password: "password",
};
/**
 * Response codes
 */
const ResponseCodes = {
    httpSuccess: 200,
    httpBadRequest: 400,
};
/**
 * Region Discovery Sources
 */
const RegionDiscoverySources = {
    FAILED_AUTO_DETECTION: "1",
    INTERNAL_CACHE: "2",
    ENVIRONMENT_VARIABLE: "3",
    IMDS: "4",
};
/**
 * Region Discovery Outcomes
 */
const RegionDiscoveryOutcomes = {
    CONFIGURED_MATCHES_DETECTED: "1",
    CONFIGURED_NO_AUTO_DETECTION: "2",
    CONFIGURED_NOT_DETECTED: "3",
    AUTO_DETECTION_REQUESTED_SUCCESSFUL: "4",
    AUTO_DETECTION_REQUESTED_FAILED: "5",
};
const CacheOutcome = {
    NO_CACHE_HIT: "0",
    FORCE_REFRESH: "1",
    NO_CACHED_ACCESS_TOKEN: "2",
    CACHED_ACCESS_TOKEN_EXPIRED: "3",
    REFRESH_CACHED_ACCESS_TOKEN: "4",
};
const JsonTypes = {
    Jwt: "JWT",
    Jwk: "JWK",
    Pop: "pop",
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * AuthErrorMessage class containing string constants used by error codes and messages.
 */
const AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication.",
    },
    postRequestFailed: {
        code: "post_request_failed",
        desc: "Post request failed from the network, could be a 4xx/5xx or a network unavailability. Please check the exact error code for details.",
    },
};
/**
 * General error class thrown by the MSAL.js library.
 */
class AuthError extends Error {
    constructor(errorCode, errorMessage, suberror) {
        const errorString = errorMessage
            ? `${errorCode}: ${errorMessage}`
            : errorCode;
        super(errorString);
        Object.setPrototypeOf(this, AuthError.prototype);
        this.errorCode = errorCode || Constants.EMPTY_STRING;
        this.errorMessage = errorMessage || Constants.EMPTY_STRING;
        this.subError = suberror || Constants.EMPTY_STRING;
        this.name = "AuthError";
    }
    setCorrelationId(correlationId) {
        this.correlationId = correlationId;
    }
    /**
     * Creates an error that is thrown when something unexpected happens in the library.
     * @param errDesc
     */
    static createUnexpectedError(errDesc) {
        return new AuthError(AuthErrorMessage.unexpectedError.code, `${AuthErrorMessage.unexpectedError.desc}: ${errDesc}`);
    }
    /**
     * Creates an error for post request failures.
     * @param errDesc
     * @returns
     */
    static createPostRequestFailed(errDesc) {
        return new AuthError(AuthErrorMessage.postRequestFailed.code, `${AuthErrorMessage.postRequestFailed.desc}: ${errDesc}`);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const DEFAULT_CRYPTO_IMPLEMENTATION = {
    createNewGuid: () => {
        const notImplErr = "Crypto interface - createNewGuid() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Decode: () => {
        const notImplErr = "Crypto interface - base64Decode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    base64Encode: () => {
        const notImplErr = "Crypto interface - base64Encode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async generatePkceCodes() {
        const notImplErr = "Crypto interface - generatePkceCodes() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async getPublicKeyThumbprint() {
        const notImplErr = "Crypto interface - getPublicKeyThumbprint() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async removeTokenBindingKey() {
        const notImplErr = "Crypto interface - removeTokenBindingKey() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async clearKeystore() {
        const notImplErr = "Crypto interface - clearKeystore() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async signJwt() {
        const notImplErr = "Crypto interface - signJwt() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async hashString() {
        const notImplErr = "Crypto interface - hashString() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
const ClientAuthErrorMessage = {
    clientInfoDecodingError: {
        code: "client_info_decoding_error",
        desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause.",
    },
    clientInfoEmptyError: {
        code: "client_info_empty_error",
        desc: "The client info was empty. Please review the trace to determine the root cause.",
    },
    tokenParsingError: {
        code: "token_parsing_error",
        desc: "Token cannot be parsed. Please review stack trace to determine root cause.",
    },
    nullOrEmptyToken: {
        code: "null_or_empty_token",
        desc: "The token is null or empty. Please review the trace to determine the root cause.",
    },
    endpointResolutionError: {
        code: "endpoints_resolution_error",
        desc: "Error: could not resolve endpoints. Please check network and try again.",
    },
    networkError: {
        code: "network_error",
        desc: "Network request failed. Please check network trace to determine root cause.",
    },
    unableToGetOpenidConfigError: {
        code: "openid_config_error",
        desc: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints.",
    },
    hashNotDeserialized: {
        code: "hash_not_deserialized",
        desc: "The hash parameters could not be deserialized. Please review the trace to determine the root cause.",
    },
    blankGuidGenerated: {
        code: "blank_guid_generated",
        desc: "The guid generated was blank. Please review the trace to determine the root cause.",
    },
    invalidStateError: {
        code: "invalid_state",
        desc: "State was not the expected format. Please check the logs to determine whether the request was sent using ProtocolUtils.setRequestState().",
    },
    stateMismatchError: {
        code: "state_mismatch",
        desc: "State mismatch error. Please check your network. Continued requests may cause cache overflow.",
    },
    stateNotFoundError: {
        code: "state_not_found",
        desc: "State not found",
    },
    nonceMismatchError: {
        code: "nonce_mismatch",
        desc: "Nonce mismatch error. This may be caused by a race condition in concurrent requests.",
    },
    nonceNotFoundError: {
        code: "nonce_not_found",
        desc: "nonce not found",
    },
    authTimeNotFoundError: {
        code: "auth_time_not_found",
        desc: "Max Age was requested and the ID token is missing the auth_time variable." +
            " auth_time is an optional claim and is not enabled by default - it must be enabled." +
            " See https://aka.ms/msaljs/optional-claims for more information.",
    },
    maxAgeTranspiredError: {
        code: "max_age_transpired",
        desc: "Max Age is set to 0, or too much time has elapsed since the last end-user authentication.",
    },
    noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No tokens were found for the given scopes, and no authorization code was passed to acquireToken. You must retrieve an authorization code before making a call to acquireToken().",
    },
    multipleMatchingTokens: {
        code: "multiple_matching_tokens",
        desc: "The cache contains multiple tokens satisfying the requirements. " +
            "Call AcquireToken again providing more requirements such as authority or account.",
    },
    multipleMatchingAccounts: {
        code: "multiple_matching_accounts",
        desc: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account",
    },
    multipleMatchingAppMetadata: {
        code: "multiple_matching_appMetadata",
        desc: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata",
    },
    tokenRequestCannotBeMade: {
        code: "request_cannot_be_made",
        desc: "Token request cannot be made without authorization code or refresh token.",
    },
    appendEmptyScopeError: {
        code: "cannot_append_empty_scope",
        desc: "Cannot append null or empty scope to ScopeSet. Please check the stack trace for more info.",
    },
    removeEmptyScopeError: {
        code: "cannot_remove_empty_scope",
        desc: "Cannot remove null or empty scope from ScopeSet. Please check the stack trace for more info.",
    },
    appendScopeSetError: {
        code: "cannot_append_scopeset",
        desc: "Cannot append ScopeSet due to error.",
    },
    emptyInputScopeSetError: {
        code: "empty_input_scopeset",
        desc: "Empty input ScopeSet cannot be processed.",
    },
    DeviceCodePollingCancelled: {
        code: "device_code_polling_cancelled",
        desc: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true.",
    },
    DeviceCodeExpired: {
        code: "device_code_expired",
        desc: "Device code is expired.",
    },
    DeviceCodeUnknownError: {
        code: "device_code_unknown_error",
        desc: "Device code stopped polling for unknown reasons.",
    },
    NoAccountInSilentRequest: {
        code: "no_account_in_silent_request",
        desc: "Please pass an account object, silent flow is not supported without account information",
    },
    invalidCacheRecord: {
        code: "invalid_cache_record",
        desc: "Cache record object was null or undefined.",
    },
    invalidCacheEnvironment: {
        code: "invalid_cache_environment",
        desc: "Invalid environment when attempting to create cache entry",
    },
    noAccountFound: {
        code: "no_account_found",
        desc: "No account found in cache for given key.",
    },
    CachePluginError: {
        code: "no cache plugin set on CacheManager",
        desc: "ICachePlugin needs to be set before using readFromStorage or writeFromStorage",
    },
    noCryptoObj: {
        code: "no_crypto_object",
        desc: "No crypto object detected. This is required for the following operation: ",
    },
    invalidCacheType: {
        code: "invalid_cache_type",
        desc: "Invalid cache type",
    },
    unexpectedAccountType: {
        code: "unexpected_account_type",
        desc: "Unexpected account type.",
    },
    unexpectedCredentialType: {
        code: "unexpected_credential_type",
        desc: "Unexpected credential type.",
    },
    invalidAssertion: {
        code: "invalid_assertion",
        desc: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515",
    },
    invalidClientCredential: {
        code: "invalid_client_credential",
        desc: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential",
    },
    tokenRefreshRequired: {
        code: "token_refresh_required",
        desc: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired.",
    },
    userTimeoutReached: {
        code: "user_timeout_reached",
        desc: "User defined timeout for device code polling reached",
    },
    tokenClaimsRequired: {
        code: "token_claims_cnf_required_for_signedjwt",
        desc: "Cannot generate a POP jwt if the token_claims are not populated",
    },
    noAuthorizationCodeFromServer: {
        code: "authorization_code_missing_from_server_response",
        desc: "Server response does not contain an authorization code to proceed",
    },
    noAzureRegionDetected: {
        code: "no_azure_region_detected",
        desc: "No azure region was detected and no fallback was made available",
    },
    accessTokenEntityNullError: {
        code: "access_token_entity_null",
        desc: "Access token entity is null, please check logs and cache to ensure a valid access token is present.",
    },
    bindingKeyNotRemovedError: {
        code: "binding_key_not_removed",
        desc: "Could not remove the credential's binding key from storage.",
    },
    logoutNotSupported: {
        code: "end_session_endpoint_not_supported",
        desc: "Provided authority does not support logout.",
    },
    keyIdMissing: {
        code: "key_id_missing",
        desc: "A keyId value is missing from the requested bound token's cache record and is required to match the token to it's stored binding key.",
    },
    noNetworkConnectivity: {
        code: "no_network_connectivity",
        desc: "No network connectivity. Check your internet connection.",
    },
    userCanceledError: {
        code: "user_canceled",
        desc: "User canceled the flow.",
    },
    missingTenantIdError: {
        code: "missing_tenant_id_error",
        desc: "A tenant id - not common, organizations, or consumers - must be specified when using the client_credentials flow.",
    },
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class ClientAuthError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "ClientAuthError";
        Object.setPrototypeOf(this, ClientAuthError.prototype);
    }
    /**
     * Creates an error thrown when client info object doesn't decode correctly.
     * @param caughtError
     */
    static createClientInfoDecodingError(caughtError) {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoDecodingError.code, `${ClientAuthErrorMessage.clientInfoDecodingError.desc} Failed with error: ${caughtError}`);
    }
    /**
     * Creates an error thrown if the client info is empty.
     * @param rawClientInfo
     */
    static createClientInfoEmptyError() {
        return new ClientAuthError(ClientAuthErrorMessage.clientInfoEmptyError.code, `${ClientAuthErrorMessage.clientInfoEmptyError.desc}`);
    }
    /**
     * Creates an error thrown when the id token extraction errors out.
     * @param err
     */
    static createTokenParsingError(caughtExtractionError) {
        return new ClientAuthError(ClientAuthErrorMessage.tokenParsingError.code, `${ClientAuthErrorMessage.tokenParsingError.desc} Failed with error: ${caughtExtractionError}`);
    }
    /**
     * Creates an error thrown when the id token string is null or empty.
     * @param invalidRawTokenString
     */
    static createTokenNullOrEmptyError(invalidRawTokenString) {
        return new ClientAuthError(ClientAuthErrorMessage.nullOrEmptyToken.code, `${ClientAuthErrorMessage.nullOrEmptyToken.desc} Raw Token Value: ${invalidRawTokenString}`);
    }
    /**
     * Creates an error thrown when the endpoint discovery doesn't complete correctly.
     */
    static createEndpointDiscoveryIncompleteError(errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.endpointResolutionError.code, `${ClientAuthErrorMessage.endpointResolutionError.desc} Detail: ${errDetail}`);
    }
    /**
     * Creates an error thrown when the fetch client throws
     */
    static createNetworkError(endpoint, errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.networkError.code, `${ClientAuthErrorMessage.networkError.desc} | Fetch client threw: ${errDetail} | Attempted to reach: ${endpoint.split("?")[0]}`);
    }
    /**
     * Creates an error thrown when the openid-configuration endpoint cannot be reached or does not contain the required data
     */
    static createUnableToGetOpenidConfigError(errDetail) {
        return new ClientAuthError(ClientAuthErrorMessage.unableToGetOpenidConfigError.code, `${ClientAuthErrorMessage.unableToGetOpenidConfigError.desc} Attempted to retrieve endpoints from: ${errDetail}`);
    }
    /**
     * Creates an error thrown when the hash cannot be deserialized.
     * @param hashParamObj
     */
    static createHashNotDeserializedError(hashParamObj) {
        return new ClientAuthError(ClientAuthErrorMessage.hashNotDeserialized.code, `${ClientAuthErrorMessage.hashNotDeserialized.desc} Given Object: ${hashParamObj}`);
    }
    /**
     * Creates an error thrown when the state cannot be parsed.
     * @param invalidState
     */
    static createInvalidStateError(invalidState, errorString) {
        return new ClientAuthError(ClientAuthErrorMessage.invalidStateError.code, `${ClientAuthErrorMessage.invalidStateError.desc} Invalid State: ${invalidState}, Root Err: ${errorString}`);
    }
    /**
     * Creates an error thrown when two states do not match.
     */
    static createStateMismatchError() {
        return new ClientAuthError(ClientAuthErrorMessage.stateMismatchError.code, ClientAuthErrorMessage.stateMismatchError.desc);
    }
    /**
     * Creates an error thrown when the state is not present
     * @param missingState
     */
    static createStateNotFoundError(missingState) {
        return new ClientAuthError(ClientAuthErrorMessage.stateNotFoundError.code, `${ClientAuthErrorMessage.stateNotFoundError.desc}:  ${missingState}`);
    }
    /**
     * Creates an error thrown when the nonce does not match.
     */
    static createNonceMismatchError() {
        return new ClientAuthError(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc);
    }
    /**
     * Creates an error thrown when max_age was provided in the request, but auth_time is not in the token claims
     * @param missingNonce
     */
    static createAuthTimeNotFoundError() {
        return new ClientAuthError(ClientAuthErrorMessage.authTimeNotFoundError.code, ClientAuthErrorMessage.authTimeNotFoundError.desc);
    }
    /**
     * Creates an error thrown when too much time has elapsed since the last end-user authentication
     */
    static createMaxAgeTranspiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.maxAgeTranspiredError.code, ClientAuthErrorMessage.maxAgeTranspiredError.desc);
    }
    /**
     * Creates an error thrown when the mnonce is not present
     * @param missingNonce
     */
    static createNonceNotFoundError(missingNonce) {
        return new ClientAuthError(ClientAuthErrorMessage.nonceNotFoundError.code, `${ClientAuthErrorMessage.nonceNotFoundError.desc}:  ${missingNonce}`);
    }
    /**
     * Throws error when multiple tokens are in cache.
     */
    static createMultipleMatchingTokensInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingTokens.code, `${ClientAuthErrorMessage.multipleMatchingTokens.desc}.`);
    }
    /**
     * Throws error when multiple accounts are in cache for the given params
     */
    static createMultipleMatchingAccountsInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAccounts.code, ClientAuthErrorMessage.multipleMatchingAccounts.desc);
    }
    /**
     * Throws error when multiple appMetada are in cache for the given clientId.
     */
    static createMultipleMatchingAppMetadataInCacheError() {
        return new ClientAuthError(ClientAuthErrorMessage.multipleMatchingAppMetadata.code, ClientAuthErrorMessage.multipleMatchingAppMetadata.desc);
    }
    /**
     * Throws error when no auth code or refresh token is given to ServerTokenRequestParameters.
     */
    static createTokenRequestCannotBeMadeError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRequestCannotBeMade.code, ClientAuthErrorMessage.tokenRequestCannotBeMade.desc);
    }
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createAppendEmptyScopeToSetError(givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.appendEmptyScopeError.code, `${ClientAuthErrorMessage.appendEmptyScopeError.desc} Given Scope: ${givenScope}`);
    }
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createRemoveEmptyScopeFromSetError(givenScope) {
        return new ClientAuthError(ClientAuthErrorMessage.removeEmptyScopeError.code, `${ClientAuthErrorMessage.removeEmptyScopeError.desc} Given Scope: ${givenScope}`);
    }
    /**
     * Throws error when attempting to append null or empty ScopeSet.
     * @param appendError
     */
    static createAppendScopeSetError(appendError) {
        return new ClientAuthError(ClientAuthErrorMessage.appendScopeSetError.code, `${ClientAuthErrorMessage.appendScopeSetError.desc} Detail Error: ${appendError}`);
    }
    /**
     * Throws error if ScopeSet is null or undefined.
     * @param givenScopeSet
     */
    static createEmptyInputScopeSetError() {
        return new ClientAuthError(ClientAuthErrorMessage.emptyInputScopeSetError.code, `${ClientAuthErrorMessage.emptyInputScopeSetError.desc}`);
    }
    /**
     * Throws error if user sets CancellationToken.cancel = true during polling of token endpoint during device code flow
     */
    static createDeviceCodeCancelledError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodePollingCancelled.code, `${ClientAuthErrorMessage.DeviceCodePollingCancelled.desc}`);
    }
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeExpiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeExpired.code, `${ClientAuthErrorMessage.DeviceCodeExpired.desc}`);
    }
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeUnknownError() {
        return new ClientAuthError(ClientAuthErrorMessage.DeviceCodeUnknownError.code, `${ClientAuthErrorMessage.DeviceCodeUnknownError.desc}`);
    }
    /**
     * Throws error when silent requests are made without an account object
     */
    static createNoAccountInSilentRequestError() {
        return new ClientAuthError(ClientAuthErrorMessage.NoAccountInSilentRequest.code, `${ClientAuthErrorMessage.NoAccountInSilentRequest.desc}`);
    }
    /**
     * Throws error when cache record is null or undefined.
     */
    static createNullOrUndefinedCacheRecord() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheRecord.code, ClientAuthErrorMessage.invalidCacheRecord.desc);
    }
    /**
     * Throws error when provided environment is not part of the CloudDiscoveryMetadata object
     */
    static createInvalidCacheEnvironmentError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheEnvironment.code, ClientAuthErrorMessage.invalidCacheEnvironment.desc);
    }
    /**
     * Throws error when account is not found in cache.
     */
    static createNoAccountFoundError() {
        return new ClientAuthError(ClientAuthErrorMessage.noAccountFound.code, ClientAuthErrorMessage.noAccountFound.desc);
    }
    /**
     * Throws error if ICachePlugin not set on CacheManager.
     */
    static createCachePluginError() {
        return new ClientAuthError(ClientAuthErrorMessage.CachePluginError.code, `${ClientAuthErrorMessage.CachePluginError.desc}`);
    }
    /**
     * Throws error if crypto object not found.
     * @param operationName
     */
    static createNoCryptoObjectError(operationName) {
        return new ClientAuthError(ClientAuthErrorMessage.noCryptoObj.code, `${ClientAuthErrorMessage.noCryptoObj.desc}${operationName}`);
    }
    /**
     * Throws error if cache type is invalid.
     */
    static createInvalidCacheTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidCacheType.code, `${ClientAuthErrorMessage.invalidCacheType.desc}`);
    }
    /**
     * Throws error if unexpected account type.
     */
    static createUnexpectedAccountTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedAccountType.code, `${ClientAuthErrorMessage.unexpectedAccountType.desc}`);
    }
    /**
     * Throws error if unexpected credential type.
     */
    static createUnexpectedCredentialTypeError() {
        return new ClientAuthError(ClientAuthErrorMessage.unexpectedCredentialType.code, `${ClientAuthErrorMessage.unexpectedCredentialType.desc}`);
    }
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidAssertionError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidAssertion.code, `${ClientAuthErrorMessage.invalidAssertion.desc}`);
    }
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidCredentialError() {
        return new ClientAuthError(ClientAuthErrorMessage.invalidClientCredential.code, `${ClientAuthErrorMessage.invalidClientCredential.desc}`);
    }
    /**
     * Throws error if token cannot be retrieved from cache due to refresh being required.
     */
    static createRefreshRequiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenRefreshRequired.code, ClientAuthErrorMessage.tokenRefreshRequired.desc);
    }
    /**
     * Throws error if the user defined timeout is reached.
     */
    static createUserTimeoutReachedError() {
        return new ClientAuthError(ClientAuthErrorMessage.userTimeoutReached.code, ClientAuthErrorMessage.userTimeoutReached.desc);
    }
    /*
     * Throws error if token claims are not populated for a signed jwt generation
     */
    static createTokenClaimsRequiredError() {
        return new ClientAuthError(ClientAuthErrorMessage.tokenClaimsRequired.code, ClientAuthErrorMessage.tokenClaimsRequired.desc);
    }
    /**
     * Throws error when the authorization code is missing from the server response
     */
    static createNoAuthCodeInServerResponseError() {
        return new ClientAuthError(ClientAuthErrorMessage.noAuthorizationCodeFromServer.code, ClientAuthErrorMessage.noAuthorizationCodeFromServer.desc);
    }
    static createBindingKeyNotRemovedError() {
        return new ClientAuthError(ClientAuthErrorMessage.bindingKeyNotRemovedError.code, ClientAuthErrorMessage.bindingKeyNotRemovedError.desc);
    }
    /**
     * Thrown when logout is attempted for an authority that doesnt have an end_session_endpoint
     */
    static createLogoutNotSupportedError() {
        return new ClientAuthError(ClientAuthErrorMessage.logoutNotSupported.code, ClientAuthErrorMessage.logoutNotSupported.desc);
    }
    /**
     * Create an error when kid attribute is missing from a PoP token's cache record
     */
    static createKeyIdMissingError() {
        return new ClientAuthError(ClientAuthErrorMessage.keyIdMissing.code, ClientAuthErrorMessage.keyIdMissing.desc);
    }
    /**
     * Create an error when the client does not have network connectivity
     */
    static createNoNetworkConnectivityError() {
        return new ClientAuthError(ClientAuthErrorMessage.noNetworkConnectivity.code, ClientAuthErrorMessage.noNetworkConnectivity.desc);
    }
    /**
     * Create an error when the user cancels the flow
     */
    static createUserCanceledError() {
        return new ClientAuthError(ClientAuthErrorMessage.userCanceledError.code, ClientAuthErrorMessage.userCanceledError.desc);
    }
    /**
     * Creates an error for during acquireTokenByClientCredential when TenantId is set to "common" or "organizations"
     */
    static createMissingTenantIdError() {
        return new AuthError(ClientAuthErrorMessage.missingTenantIdError.code, ClientAuthErrorMessage.missingTenantIdError.desc);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * @hidden
 */
class StringUtils {
    /**
     * decode a JWT
     *
     * @param authToken
     */
    static decodeAuthToken(authToken) {
        if (StringUtils.isEmpty(authToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(authToken);
        }
        const tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        const matches = tokenPartsRegex.exec(authToken);
        if (!matches || matches.length < 4) {
            throw ClientAuthError.createTokenParsingError(`Given token is malformed: ${JSON.stringify(authToken)}`);
        }
        const crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3],
        };
        return crackedToken;
    }
    /**
     * Check if a string is empty.
     *
     * @param str
     */
    static isEmpty(str) {
        return typeof str === "undefined" || !str || 0 === str.length;
    }
    /**
     * Check if stringified object is empty
     * @param strObj
     */
    static isEmptyObj(strObj) {
        if (strObj && !StringUtils.isEmpty(strObj)) {
            try {
                const obj = JSON.parse(strObj);
                return Object.keys(obj).length === 0;
            }
            catch (e) { }
        }
        return true;
    }
    static startsWith(str, search) {
        return str.indexOf(search) === 0;
    }
    static endsWith(str, search) {
        return (str.length >= search.length &&
            str.lastIndexOf(search) === str.length - search.length);
    }
    /**
     * Parses string into an object.
     *
     * @param query
     */
    static queryStringToObject(query) {
        const obj = {};
        const params = query.split("&");
        const decode = (s) => decodeURIComponent(s.replace(/\+/g, " "));
        params.forEach((pair) => {
            if (pair.trim()) {
                const [key, value] = pair.split(/=(.+)/g, 2); // Split on the first occurence of the '=' character
                if (key && value) {
                    obj[decode(key)] = decode(value);
                }
            }
        });
        return obj;
    }
    /**
     * Trims entries in an array.
     *
     * @param arr
     */
    static trimArrayEntries(arr) {
        return arr.map((entry) => entry.trim());
    }
    /**
     * Removes empty strings from array
     * @param arr
     */
    static removeEmptyStringsFromArray(arr) {
        return arr.filter((entry) => {
            return !StringUtils.isEmpty(entry);
        });
    }
    /**
     * Attempts to parse a string into JSON
     * @param str
     */
    static jsonParseHelper(str) {
        try {
            return JSON.parse(str);
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Tests if a given string matches a given pattern, with support for wildcards and queries.
     * @param pattern Wildcard pattern to string match. Supports "*" for wildcards and "?" for queries
     * @param input String to match against
     */
    static matchPattern(pattern, input) {
        /**
         * Wildcard support: https://stackoverflow.com/a/3117248/4888559
         * Queries: replaces "?" in string with escaped "\?" for regex test
         */
        // eslint-disable-next-line security/detect-non-literal-regexp
        const regex = new RegExp(pattern
            .replace(/\\/g, "\\\\")
            .replace(/\*/g, "[^ ]*")
            .replace(/\?/g, "\\?"));
        return regex.test(input);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Log message level.
 */
exports.LogLevel = void 0;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    LogLevel[LogLevel["Trace"] = 4] = "Trace";
})(exports.LogLevel || (exports.LogLevel = {}));
/**
 * Class which facilitates logging of messages to a specific place.
 */
class Logger {
    constructor(loggerOptions, packageName, packageVersion) {
        // Current log level, defaults to info.
        this.level = exports.LogLevel.Info;
        const defaultLoggerCallback = () => {
            return;
        };
        const setLoggerOptions = loggerOptions || Logger.createDefaultLoggerOptions();
        this.localCallback =
            setLoggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = setLoggerOptions.piiLoggingEnabled || false;
        this.level =
            typeof setLoggerOptions.logLevel === "number"
                ? setLoggerOptions.logLevel
                : exports.LogLevel.Info;
        this.correlationId =
            setLoggerOptions.correlationId || Constants.EMPTY_STRING;
        this.packageName = packageName || Constants.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants.EMPTY_STRING;
    }
    static createDefaultLoggerOptions() {
        return {
            loggerCallback: () => {
                // allow users to not set loggerCallback
            },
            piiLoggingEnabled: false,
            logLevel: exports.LogLevel.Info,
        };
    }
    /**
     * Create new Logger with existing configurations.
     */
    clone(packageName, packageVersion, correlationId) {
        return new Logger({
            loggerCallback: this.localCallback,
            piiLoggingEnabled: this.piiLoggingEnabled,
            logLevel: this.level,
            correlationId: correlationId || this.correlationId,
        }, packageName, packageVersion);
    }
    /**
     * Log message with required options.
     */
    logMessage(logMessage, options) {
        if (options.logLevel > this.level ||
            (!this.piiLoggingEnabled && options.containsPii)) {
            return;
        }
        const timestamp = new Date().toUTCString();
        // Add correlationId to logs if set, correlationId provided on log messages take precedence
        let logHeader;
        if (!StringUtils.isEmpty(options.correlationId)) {
            logHeader = `[${timestamp}] : [${options.correlationId}]`;
        }
        else if (!StringUtils.isEmpty(this.correlationId)) {
            logHeader = `[${timestamp}] : [${this.correlationId}]`;
        }
        else {
            logHeader = `[${timestamp}]`;
        }
        const log = `${logHeader} : ${this.packageName}@${this.packageVersion} : ${exports.LogLevel[options.logLevel]} - ${logMessage}`;
        // debug(`msal:${LogLevel[options.logLevel]}${options.containsPii ? "-Pii": Constants.EMPTY_STRING}${options.context ? `:${options.context}` : Constants.EMPTY_STRING}`)(logMessage);
        this.executeCallback(options.logLevel, log, options.containsPii || false);
    }
    /**
     * Execute callback with message.
     */
    executeCallback(level, message, containsPii) {
        if (this.localCallback) {
            this.localCallback(level, message, containsPii);
        }
    }
    /**
     * Logs error messages.
     */
    error(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs error messages with PII.
     */
    errorPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Error,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages.
     */
    warning(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs warning messages with PII.
     */
    warningPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Warning,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages.
     */
    info(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs info messages with PII.
     */
    infoPii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Info,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages.
     */
    verbose(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs verbose messages with PII.
     */
    verbosePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Verbose,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages.
     */
    trace(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: false,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Logs trace messages with PII.
     */
    tracePii(message, correlationId) {
        this.logMessage(message, {
            logLevel: exports.LogLevel.Trace,
            containsPii: true,
            correlationId: correlationId || Constants.EMPTY_STRING,
        });
    }
    /**
     * Returns whether PII Logging is enabled or not.
     */
    isPiiLoggingEnabled() {
        return this.piiLoggingEnabled || false;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/* eslint-disable header/header */
const name$1 = "@azure/msal-common";
const version$1 = "14.0.1";

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const AzureCloudInstance = {
    // AzureCloudInstance is not specified.
    None: "none",
    // Microsoft Azure public cloud
    AzurePublic: "https://login.microsoftonline.com",
    // Microsoft PPE
    AzurePpe: "https://login.windows-ppe.net",
    // Microsoft Chinese national/regional cloud
    AzureChina: "https://login.chinacloudapi.cn",
    // Microsoft German national/regional cloud ("Black Forest")
    AzureGermany: "https://login.microsoftonline.de",
    // US Government cloud
    AzureUsGovernment: "https://login.microsoftonline.us",
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientConfigurationErrorMessage class containing string constants used by error codes and messages.
 */
const ClientConfigurationErrorMessage = {
    redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set.",
    },
    postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set.",
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object.",
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options",
    },
    urlParseError: {
        code: "url_parse_error",
        desc: "URL could not be parsed into appropriate segments.",
    },
    urlEmptyError: {
        code: "empty_url_error",
        desc: "URL was empty or null.",
    },
    emptyScopesError: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token.",
    },
    nonArrayScopesError: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array.",
    },
    clientIdSingleScopeError: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope.",
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent', 'create', 'none' and 'no_session'.  Please see here for valid configuration options: https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html#commonauthorizationurlrequest",
    },
    invalidClaimsRequest: {
        code: "invalid_claims",
        desc: "Given claims parameter must be a stringified JSON object.",
    },
    tokenRequestEmptyError: {
        code: "token_request_empty",
        desc: "Token request was empty and not found in cache.",
    },
    logoutRequestEmptyError: {
        code: "logout_request_empty",
        desc: "The logout request was null or undefined.",
    },
    invalidCodeChallengeMethod: {
        code: "invalid_code_challenge_method",
        desc: 'code_challenge_method passed is invalid. Valid values are "plain" and "S256".',
    },
    invalidCodeChallengeParams: {
        code: "pkce_params_missing",
        desc: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request",
    },
    invalidCloudDiscoveryMetadata: {
        code: "invalid_cloud_discovery_metadata",
        desc: "Invalid cloudDiscoveryMetadata provided. Must be a stringified JSON object containing tenant_discovery_endpoint and metadata fields",
    },
    invalidAuthorityMetadata: {
        code: "invalid_authority_metadata",
        desc: "Invalid authorityMetadata provided. Must by a stringified JSON object containing authorization_endpoint, token_endpoint, issuer fields.",
    },
    untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter.",
    },
    invalidAzureCloudInstance: {
        code: "invalid_azure_cloud_instance",
        desc: "Invalid AzureCloudInstance provided. Please refer MSAL JS docs: aks.ms/msaljs/azure_cloud_instance for valid values",
    },
    missingSshJwk: {
        code: "missing_ssh_jwk",
        desc: "Missing sshJwk in SSH certificate request. A stringified JSON Web Key is required when using the SSH authentication scheme.",
    },
    missingSshKid: {
        code: "missing_ssh_kid",
        desc: "Missing sshKid in SSH certificate request. A string that uniquely identifies the public SSH key is required when using the SSH authentication scheme.",
    },
    missingNonceAuthenticationHeader: {
        code: "missing_nonce_authentication_header",
        desc: "Unable to find an authentication header containing server nonce. Either the Authentication-Info or WWW-Authenticate headers must be present in order to obtain a server nonce.",
    },
    invalidAuthenticationHeader: {
        code: "invalid_authentication_header",
        desc: "Invalid authentication header provided",
    },
    cannotSetOIDCOptions: {
        code: "cannot_set_OIDCOptions",
        desc: "Cannot set OIDCOptions parameter. Please change the protocol mode to OIDC or use a non-Microsoft authority.",
    },
    cannotAllowNativeBroker: {
        code: "cannot_allow_native_broker",
        desc: "Cannot set allowNativeBroker parameter to true when not in AAD protocol mode.",
    },
    authorityMismatch: {
        code: "authority_mismatch",
        desc: "Authority mismatch error. Authority provided in login request or PublicClientApplication config does not match the environment of the provided account. Please use a matching account or make an interactive request to login to this authority.",
    },
};
/**
 * Error thrown when there is an error in configuration of the MSAL.js library.
 */
class ClientConfigurationError extends ClientAuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.redirectUriNotSet.code, ClientConfigurationErrorMessage.redirectUriNotSet.desc);
    }
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.postLogoutUriNotSet.code, ClientConfigurationErrorMessage.postLogoutUriNotSet.desc);
    }
    /**
     * Creates an error thrown when the claims request could not be successfully parsed
     */
    static createClaimsRequestParsingError(claimsRequestParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code, `${ClientConfigurationErrorMessage.claimsRequestParsingError.desc} Given value: ${claimsRequestParseError}`);
    }
    /**
     * Creates an error thrown if authority uri is given an insecure protocol.
     * @param urlString
     */
    static createInsecureAuthorityUriError(urlString) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityUriInsecure.code, `${ClientConfigurationErrorMessage.authorityUriInsecure.desc} Given URI: ${urlString}`);
    }
    /**
     * Creates an error thrown if URL string does not parse into separate segments.
     * @param urlString
     */
    static createUrlParseError(urlParseError) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlParseError.code, `${ClientConfigurationErrorMessage.urlParseError.desc} Given Error: ${urlParseError}`);
    }
    /**
     * Creates an error thrown if URL string is empty or null.
     * @param urlString
     */
    static createUrlEmptyError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.urlEmptyError.code, ClientConfigurationErrorMessage.urlEmptyError.desc);
    }
    /**
     * Error thrown when scopes are empty.
     * @param scopesValue
     */
    static createEmptyScopesArrayError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopesError.code, `${ClientConfigurationErrorMessage.emptyScopesError.desc}`);
    }
    /**
     * Error thrown when client id scope is not provided as single scope.
     * @param inputScopes
     */
    static createClientIdSingleScopeError(inputScopes) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.clientIdSingleScopeError.code, `${ClientConfigurationErrorMessage.clientIdSingleScopeError.desc} Given Scopes: ${inputScopes}`);
    }
    /**
     * Error thrown when prompt is not an allowed type.
     * @param promptValue
     */
    static createInvalidPromptError(promptValue) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code, `${ClientConfigurationErrorMessage.invalidPrompt.desc} Given value: ${promptValue}`);
    }
    /**
     * Creates error thrown when claims parameter is not a stringified JSON object
     */
    static createInvalidClaimsRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidClaimsRequest.code, ClientConfigurationErrorMessage.invalidClaimsRequest.desc);
    }
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyLogoutRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.logoutRequestEmptyError.code, ClientConfigurationErrorMessage.logoutRequestEmptyError.desc);
    }
    /**
     * Throws error when token request is empty and nothing cached in storage.
     */
    static createEmptyTokenRequestError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.tokenRequestEmptyError.code, ClientConfigurationErrorMessage.tokenRequestEmptyError.desc);
    }
    /**
     * Throws error when an invalid code_challenge_method is passed by the user
     */
    static createInvalidCodeChallengeMethodError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeMethod.code, ClientConfigurationErrorMessage.invalidCodeChallengeMethod.desc);
    }
    /**
     * Throws error when both params: code_challenge and code_challenge_method are not passed together
     */
    static createInvalidCodeChallengeParamsError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCodeChallengeParams.code, ClientConfigurationErrorMessage.invalidCodeChallengeParams.desc);
    }
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidCloudDiscoveryMetadataError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.code, ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.desc);
    }
    /**
     * Throws an error when the user passes invalid cloudDiscoveryMetadata
     */
    static createInvalidAuthorityMetadataError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityMetadata.code, ClientConfigurationErrorMessage.invalidAuthorityMetadata.desc);
    }
    /**
     * Throws error when provided authority is not a member of the trusted host list
     */
    static createUntrustedAuthorityError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code, ClientConfigurationErrorMessage.untrustedAuthority.desc);
    }
    /**
     * Throws error when the AzureCloudInstance is set to an invalid value
     */
    static createInvalidAzureCloudInstanceError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAzureCloudInstance.code, ClientConfigurationErrorMessage.invalidAzureCloudInstance.desc);
    }
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key is omitted from the request
     */
    static createMissingSshJwkError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingSshJwk.code, ClientConfigurationErrorMessage.missingSshJwk.desc);
    }
    /**
     * Throws an error when the authentication scheme is set to SSH but the SSH public key ID is omitted from the request
     */
    static createMissingSshKidError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingSshKid.code, ClientConfigurationErrorMessage.missingSshKid.desc);
    }
    /**
     * Throws error when provided headers don't contain a header that a server nonce can be extracted from
     */
    static createMissingNonceAuthenticationHeadersError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.missingNonceAuthenticationHeader.code, ClientConfigurationErrorMessage.missingNonceAuthenticationHeader.desc);
    }
    /**
     * Throws error when a provided header is invalid in any way
     */
    static createInvalidAuthenticationHeaderError(invalidHeaderName, details) {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthenticationHeader.code, `${ClientConfigurationErrorMessage.invalidAuthenticationHeader.desc}. Invalid header: ${invalidHeaderName}. Details: ${details}`);
    }
    /**
     * Throws error when provided non-default OIDCOptions when not in OIDC protocol mode
     */
    static createCannotSetOIDCOptionsError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.cannotSetOIDCOptions.code, ClientConfigurationErrorMessage.cannotSetOIDCOptions.desc);
    }
    /**
     * Throws error when allowNativeBroker is set to true when not in AAD protocol mode
     */
    static createCannotAllowNativeBrokerError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.cannotAllowNativeBroker.code, ClientConfigurationErrorMessage.cannotAllowNativeBroker.desc);
    }
    /**
     * Create an error when the authority provided in request does not match authority provided in account or MSAL.js configuration.
     */
    static createAuthorityMismatchError() {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.authorityMismatch.code, ClientConfigurationErrorMessage.authorityMismatch.desc);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The ScopeSet class creates a set of scopes. Scopes are case-insensitive, unique values, so the Set object in JS makes
 * the most sense to implement for this class. All scopes are trimmed and converted to lower case strings in intersection and union functions
 * to ensure uniqueness of strings.
 */
class ScopeSet {
    constructor(inputScopes) {
        // Filter empty string and null/undefined array items
        const scopeArr = inputScopes
            ? StringUtils.trimArrayEntries([...inputScopes])
            : [];
        const filteredInput = scopeArr
            ? StringUtils.removeEmptyStringsFromArray(scopeArr)
            : [];
        // Validate and filter scopes (validate function throws if validation fails)
        this.validateInputScopes(filteredInput);
        this.scopes = new Set(); // Iterator in constructor not supported by IE11
        filteredInput.forEach((scope) => this.scopes.add(scope));
    }
    /**
     * Factory method to create ScopeSet from space-delimited string
     * @param inputScopeString
     * @param appClientId
     * @param scopesRequired
     */
    static fromString(inputScopeString) {
        const scopeString = inputScopeString || Constants.EMPTY_STRING;
        const inputScopes = scopeString.split(" ");
        return new ScopeSet(inputScopes);
    }
    /**
     * Creates the set of scopes to search for in cache lookups
     * @param inputScopeString
     * @returns
     */
    static createSearchScopes(inputScopeString) {
        const scopeSet = new ScopeSet(inputScopeString);
        if (!scopeSet.containsOnlyOIDCScopes()) {
            scopeSet.removeOIDCScopes();
        }
        else {
            scopeSet.removeScope(Constants.OFFLINE_ACCESS_SCOPE);
        }
        return scopeSet;
    }
    /**
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} inputScopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     */
    validateInputScopes(inputScopes) {
        // Check if scopes are required but not given or is an empty array
        if (!inputScopes || inputScopes.length < 1) {
            throw ClientConfigurationError.createEmptyScopesArrayError();
        }
    }
    /**
     * Check if a given scope is present in this set of scopes.
     * @param scope
     */
    containsScope(scope) {
        const lowerCaseScopes = this.printScopesLowerCase().split(" ");
        const lowerCaseScopesSet = new ScopeSet(lowerCaseScopes);
        // compare lowercase scopes
        return !StringUtils.isEmpty(scope)
            ? lowerCaseScopesSet.scopes.has(scope.toLowerCase())
            : false;
    }
    /**
     * Check if a set of scopes is present in this set of scopes.
     * @param scopeSet
     */
    containsScopeSet(scopeSet) {
        if (!scopeSet || scopeSet.scopes.size <= 0) {
            return false;
        }
        return (this.scopes.size >= scopeSet.scopes.size &&
            scopeSet.asArray().every((scope) => this.containsScope(scope)));
    }
    /**
     * Check if set of scopes contains only the defaults
     */
    containsOnlyOIDCScopes() {
        let defaultScopeCount = 0;
        OIDC_SCOPES.forEach((defaultScope) => {
            if (this.containsScope(defaultScope)) {
                defaultScopeCount += 1;
            }
        });
        return this.scopes.size === defaultScopeCount;
    }
    /**
     * Appends single scope if passed
     * @param newScope
     */
    appendScope(newScope) {
        if (!StringUtils.isEmpty(newScope)) {
            this.scopes.add(newScope.trim());
        }
    }
    /**
     * Appends multiple scopes if passed
     * @param newScopes
     */
    appendScopes(newScopes) {
        try {
            newScopes.forEach((newScope) => this.appendScope(newScope));
        }
        catch (e) {
            throw ClientAuthError.createAppendScopeSetError(e);
        }
    }
    /**
     * Removes element from set of scopes.
     * @param scope
     */
    removeScope(scope) {
        if (StringUtils.isEmpty(scope)) {
            throw ClientAuthError.createRemoveEmptyScopeFromSetError(scope);
        }
        this.scopes.delete(scope.trim());
    }
    /**
     * Removes default scopes from set of scopes
     * Primarily used to prevent cache misses if the default scopes are not returned from the server
     */
    removeOIDCScopes() {
        OIDC_SCOPES.forEach((defaultScope) => {
            this.scopes.delete(defaultScope);
        });
    }
    /**
     * Combines an array of scopes with the current set of scopes.
     * @param otherScopes
     */
    unionScopeSets(otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        const unionScopes = new Set(); // Iterator in constructor not supported in IE11
        otherScopes.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        this.scopes.forEach((scope) => unionScopes.add(scope.toLowerCase()));
        return unionScopes;
    }
    /**
     * Check if scopes intersect between this set and another.
     * @param otherScopes
     */
    intersectingScopeSets(otherScopes) {
        if (!otherScopes) {
            throw ClientAuthError.createEmptyInputScopeSetError();
        }
        // Do not allow OIDC scopes to be the only intersecting scopes
        if (!otherScopes.containsOnlyOIDCScopes()) {
            otherScopes.removeOIDCScopes();
        }
        const unionScopes = this.unionScopeSets(otherScopes);
        const sizeOtherScopes = otherScopes.getScopeCount();
        const sizeThisScopes = this.getScopeCount();
        const sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < sizeThisScopes + sizeOtherScopes;
    }
    /**
     * Returns size of set of scopes.
     */
    getScopeCount() {
        return this.scopes.size;
    }
    /**
     * Returns the scopes as an array of string values
     */
    asArray() {
        const array = [];
        this.scopes.forEach((val) => array.push(val));
        return array;
    }
    /**
     * Prints scopes into a space-delimited string
     */
    printScopes() {
        if (this.scopes) {
            const scopeArr = this.asArray();
            return scopeArr.join(" ");
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Prints scopes into a space-delimited lower-case string (used for caching)
     */
    printScopesLowerCase() {
        return this.printScopes().toLowerCase();
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Function to build a client info object from server clientInfo string
 * @param rawClientInfo
 * @param crypto
 */
function buildClientInfo(rawClientInfo, crypto) {
    if (StringUtils.isEmpty(rawClientInfo)) {
        throw ClientAuthError.createClientInfoEmptyError();
    }
    try {
        const decodedClientInfo = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
    }
    catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e.message);
    }
}
/**
 * Function to build a client info object from cached homeAccountId string
 * @param homeAccountId
 */
function buildClientInfoFromHomeAccountId(homeAccountId) {
    if (StringUtils.isEmpty(homeAccountId)) {
        throw ClientAuthError.createClientInfoDecodingError("Home account ID was empty.");
    }
    const clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2
            ? Constants.EMPTY_STRING
            : clientInfoParts[1],
    };
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Authority types supported by MSAL.
 */
const AuthorityType = {
    Default: 0,
    Adfs: 1,
    Dsts: 2,
    Ciam: 3,
};

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Protocol modes supported by MSAL.
 */
const ProtocolMode = {
    AAD: "AAD",
    OIDC: "OIDC",
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Type that defines required and optional parameters for an Account field (based on universal cache schema implemented by all MSALs).
 *
 * Key : Value Schema
 *
 * Key: <home_account_id>-<environment>-<realm*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      localAccountId: Original tenant-specific accountID, usually used for legacy cases
 *      username: primary username that represents the user, usually corresponds to preferred_username in the v2 endpt
 *      authorityType: Accounts authority type as a string
 *      name: Full name for the account, including given name and family name,
 *      lastModificationTime: last time this entity was modified in the cache
 *      lastModificationApp:
 *      idTokenClaims: Object containing claims parsed from ID token
 *      nativeAccountId: Account identifier on the native device
 * }
 */
class AccountEntity {
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId() {
        const accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generate Account Cache Key as per the schema: <home_account_id>-<environment>-<realm*>
     */
    generateAccountKey() {
        return AccountEntity.generateAccountCacheKey({
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
        });
    }
    /**
     * Returns the AccountInfo interface for this account.
     */
    getAccountInfo() {
        return {
            homeAccountId: this.homeAccountId,
            environment: this.environment,
            tenantId: this.realm,
            username: this.username,
            localAccountId: this.localAccountId,
            name: this.name,
            idTokenClaims: this.idTokenClaims,
            nativeAccountId: this.nativeAccountId,
            authorityType: this.authorityType,
        };
    }
    /**
     * Generates account key from interface
     * @param accountInterface
     */
    static generateAccountCacheKey(accountInterface) {
        const accountKey = [
            accountInterface.homeAccountId,
            accountInterface.environment || Constants.EMPTY_STRING,
            accountInterface.tenantId || Constants.EMPTY_STRING,
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Build Account cache from IdToken, clientInfo and authority/policy. Associated with AAD.
     * @param accountDetails
     */
    static createAccount(accountDetails, authority) {
        const account = new AccountEntity();
        if (authority.authorityType === AuthorityType.Adfs) {
            account.authorityType = CacheAccountType.ADFS_ACCOUNT_TYPE;
        }
        else if (authority.protocolMode === ProtocolMode.AAD) {
            account.authorityType = CacheAccountType.MSSTS_ACCOUNT_TYPE;
        }
        else {
            account.authorityType = CacheAccountType.GENERIC_ACCOUNT_TYPE;
        }
        account.clientInfo = accountDetails.clientInfo;
        account.homeAccountId = accountDetails.homeAccountId;
        account.nativeAccountId = accountDetails.nativeAccountId;
        const env = accountDetails.environment ||
            (authority && authority.getPreferredCache());
        if (!env) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        account.environment = env;
        // non AAD scenarios can have empty realm
        account.realm =
            accountDetails.idTokenClaims.tid || Constants.EMPTY_STRING;
        account.idTokenClaims = accountDetails.idTokenClaims;
        // How do you account for MSA CID here?
        account.localAccountId =
            accountDetails.idTokenClaims.oid ||
                accountDetails.idTokenClaims.sub ||
                Constants.EMPTY_STRING;
        /*
         * In B2C scenarios the emails claim is used instead of preferred_username and it is an array.
         * In most cases it will contain a single email. This field should not be relied upon if a custom
         * policy is configured to return more than 1 email.
         */
        const preferredUsername = accountDetails.idTokenClaims.preferred_username ||
            accountDetails.idTokenClaims.upn;
        const email = accountDetails.idTokenClaims.emails
            ? accountDetails.idTokenClaims.emails[0]
            : null;
        account.username = preferredUsername || email || Constants.EMPTY_STRING;
        account.name = accountDetails.idTokenClaims.name;
        account.cloudGraphHostName = accountDetails.cloudGraphHostName;
        account.msGraphHost = accountDetails.msGraphHost;
        return account;
    }
    /**
     * Creates an AccountEntity object from AccountInfo
     * @param accountInfo
     * @param cloudGraphHostName
     * @param msGraphHost
     * @returns
     */
    static createFromAccountInfo(accountInfo, cloudGraphHostName, msGraphHost) {
        const account = new AccountEntity();
        account.authorityType =
            accountInfo.authorityType || CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = accountInfo.homeAccountId;
        account.localAccountId = accountInfo.localAccountId;
        account.nativeAccountId = accountInfo.nativeAccountId;
        account.realm = accountInfo.tenantId;
        account.environment = accountInfo.environment;
        account.username = accountInfo.username;
        account.name = accountInfo.name;
        account.idTokenClaims = accountInfo.idTokenClaims;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
    }
    /**
     * Generate HomeAccountId from server response
     * @param serverClientInfo
     * @param authType
     */
    static generateHomeAccountId(serverClientInfo, authType, logger, cryptoObj, idTokenClaims) {
        const accountId = idTokenClaims?.sub
            ? idTokenClaims.sub
            : Constants.EMPTY_STRING;
        // since ADFS does not have tid and does not set client_info
        if (authType === AuthorityType.Adfs ||
            authType === AuthorityType.Dsts) {
            return accountId;
        }
        // for cases where there is clientInfo
        if (serverClientInfo) {
            try {
                const clientInfo = buildClientInfo(serverClientInfo, cryptoObj);
                if (!StringUtils.isEmpty(clientInfo.uid) &&
                    !StringUtils.isEmpty(clientInfo.utid)) {
                    return `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`;
                }
            }
            catch (e) { }
        }
        // default to "sub" claim
        logger.verbose("No client info in response");
        return accountId;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccountEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("localAccountId") &&
            entity.hasOwnProperty("username") &&
            entity.hasOwnProperty("authorityType"));
    }
    /**
     * Helper function to determine whether 2 accountInfo objects represent the same account
     * @param accountA
     * @param accountB
     * @param compareClaims - If set to true idTokenClaims will also be compared to determine account equality
     */
    static accountInfoIsEqual(accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
            return false;
        }
        let claimsMatch = true; // default to true so as to not fail comparison below if compareClaims: false
        if (compareClaims) {
            const accountAClaims = (accountA.idTokenClaims ||
                {});
            const accountBClaims = (accountB.idTokenClaims ||
                {});
            // issued at timestamp and nonce are expected to change each time a new id token is acquired
            claimsMatch =
                accountAClaims.iat === accountBClaims.iat &&
                    accountAClaims.nonce === accountBClaims.nonce;
        }
        return (accountA.homeAccountId === accountB.homeAccountId &&
            accountA.localAccountId === accountB.localAccountId &&
            accountA.username === accountB.username &&
            accountA.tenantId === accountB.tenantId &&
            accountA.environment === accountB.environment &&
            accountA.nativeAccountId === accountB.nativeAccountId &&
            claimsMatch);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * JWT Token representation class. Parses token string and generates claims object.
 */
class AuthToken {
    constructor(rawToken, crypto) {
        if (StringUtils.isEmpty(rawToken)) {
            throw ClientAuthError.createTokenNullOrEmptyError(rawToken);
        }
        this.rawToken = rawToken;
        this.claims = AuthToken.extractTokenClaims(rawToken, crypto);
    }
    /**
     * Extract token by decoding the rawToken
     *
     * @param encodedToken
     */
    static extractTokenClaims(encodedToken, crypto) {
        const decodedToken = StringUtils.decodeAuthToken(encodedToken);
        // token will be decoded to get the username
        try {
            const base64TokenPayload = decodedToken.JWSPayload;
            // base64Decode() should throw an error if there is an issue
            const base64Decoded = crypto.base64Decode(base64TokenPayload);
            return JSON.parse(base64Decoded);
        }
        catch (err) {
            throw ClientAuthError.createTokenParsingError(err);
        }
    }
    /**
     * Determine if the token's max_age has transpired
     */
    static checkMaxAge(authTime, maxAge) {
        /*
         * per https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
         * To force an immediate re-authentication: If an app requires that a user re-authenticate prior to access,
         * provide a value of 0 for the max_age parameter and the AS will force a fresh login.
         */
        const fiveMinuteSkew = 300000; // five minutes in milliseconds
        if (maxAge === 0 || Date.now() - fiveMinuteSkew > authTime + maxAge) {
            throw ClientAuthError.createMaxAgeTranspiredError();
        }
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Interface class which implement cache storage functions used by MSAL to perform validity checks, and store tokens.
 */
class CacheManager {
    constructor(clientId, cryptoImpl, logger) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
        this.commonLogger = logger.clone(name$1, version$1);
    }
    /**
     * Returns all accounts in cache
     */
    getAllAccounts() {
        const allAccountKeys = this.getAccountKeys();
        if (allAccountKeys.length < 1) {
            return [];
        }
        const accountEntities = allAccountKeys.reduce((accounts, key) => {
            const entity = this.getAccount(key);
            if (!entity) {
                return accounts;
            }
            accounts.push(entity);
            return accounts;
        }, []);
        if (accountEntities.length < 1) {
            return [];
        }
        else {
            const allAccounts = accountEntities.map((accountEntity) => {
                return this.getAccountInfoFromEntity(accountEntity);
            });
            return allAccounts;
        }
    }
    /**
     * Gets accountInfo object based on provided filters
     */
    getAccountInfoFilteredBy(accountFilter) {
        const allAccounts = this.getAccountsFilteredBy(accountFilter);
        if (allAccounts.length > 0) {
            return this.getAccountInfoFromEntity(allAccounts[0]);
        }
        else {
            return null;
        }
    }
    getAccountInfoFromEntity(accountEntity) {
        const accountInfo = accountEntity.getAccountInfo();
        const idToken = this.getIdToken(accountInfo);
        if (idToken) {
            accountInfo.idToken = idToken.secret;
            accountInfo.idTokenClaims = new AuthToken(idToken.secret, this.cryptoImpl).claims;
        }
        return accountInfo;
    }
    /**
     * saves a cache record
     * @param cacheRecord
     */
    async saveCacheRecord(cacheRecord, storeInCache) {
        if (!cacheRecord) {
            throw ClientAuthError.createNullOrUndefinedCacheRecord();
        }
        if (!!cacheRecord.account) {
            this.setAccount(cacheRecord.account);
        }
        if (!!cacheRecord.idToken && storeInCache?.idToken !== false) {
            this.setIdTokenCredential(cacheRecord.idToken);
        }
        if (!!cacheRecord.accessToken && storeInCache?.accessToken !== false) {
            await this.saveAccessToken(cacheRecord.accessToken);
        }
        if (!!cacheRecord.refreshToken &&
            storeInCache?.refreshToken !== false) {
            this.setRefreshTokenCredential(cacheRecord.refreshToken);
        }
        if (!!cacheRecord.appMetadata) {
            this.setAppMetadata(cacheRecord.appMetadata);
        }
    }
    /**
     * saves access token credential
     * @param credential
     */
    async saveAccessToken(credential) {
        const accessTokenFilter = {
            clientId: credential.clientId,
            credentialType: credential.credentialType,
            environment: credential.environment,
            homeAccountId: credential.homeAccountId,
            realm: credential.realm,
            tokenType: credential.tokenType,
            requestedClaimsHash: credential.requestedClaimsHash,
        };
        const tokenKeys = this.getTokenKeys();
        const currentScopes = ScopeSet.fromString(credential.target);
        const removedAccessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, accessTokenFilter, false)) {
                return;
            }
            const tokenEntity = this.getAccessTokenCredential(key);
            if (tokenEntity &&
                this.credentialMatchesFilter(tokenEntity, accessTokenFilter)) {
                const tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
                if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
                    removedAccessTokens.push(this.removeAccessToken(key));
                }
            }
        });
        await Promise.all(removedAccessTokens);
        this.setAccessTokenCredential(credential);
    }
    /**
     * retrieve accounts matching all provided filters; if no filter is set, get all accounts
     * not checking for casing as keys are all generated in lower case, remember to convert to lower case if object properties are compared
     * @param homeAccountId
     * @param environment
     * @param realm
     */
    getAccountsFilteredBy(accountFilter) {
        const allAccountKeys = this.getAccountKeys();
        const matchingAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            if (!this.isAccountKey(cacheKey, accountFilter.homeAccountId, accountFilter.realm)) {
                // Don't parse value if the key doesn't match the account filters
                return;
            }
            const entity = this.getAccount(cacheKey);
            if (!entity) {
                return;
            }
            if (!!accountFilter.homeAccountId &&
                !this.matchHomeAccountId(entity, accountFilter.homeAccountId)) {
                return;
            }
            if (!!accountFilter.localAccountId &&
                !this.matchLocalAccountId(entity, accountFilter.localAccountId)) {
                return;
            }
            if (!!accountFilter.username &&
                !this.matchUsername(entity, accountFilter.username)) {
                return;
            }
            if (!!accountFilter.environment &&
                !this.matchEnvironment(entity, accountFilter.environment)) {
                return;
            }
            if (!!accountFilter.realm &&
                !this.matchRealm(entity, accountFilter.realm)) {
                return;
            }
            if (!!accountFilter.nativeAccountId &&
                !this.matchNativeAccountId(entity, accountFilter.nativeAccountId)) {
                return;
            }
            matchingAccounts.push(entity);
        });
        return matchingAccounts;
    }
    /**
     * Returns true if the given key matches our account key schema. Also matches homeAccountId and/or tenantId if provided
     * @param key
     * @param homeAccountId
     * @param tenantId
     * @returns
     */
    isAccountKey(key, homeAccountId, tenantId) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 3) {
            // Account cache keys contain 3 items separated by '-' (each item may also contain '-')
            return false;
        }
        if (homeAccountId &&
            !key.toLowerCase().includes(homeAccountId.toLowerCase())) {
            return false;
        }
        if (tenantId && !key.toLowerCase().includes(tenantId.toLowerCase())) {
            return false;
        }
        // Do not check environment as aliasing can cause false negatives
        return true;
    }
    /**
     * Returns true if the given key matches our credential key schema.
     * @param key
     */
    isCredentialKey(key) {
        if (key.split(Separators.CACHE_KEY_SEPARATOR).length < 6) {
            // Credential cache keys contain 6 items separated by '-' (each item may also contain '-')
            return false;
        }
        const lowerCaseKey = key.toLowerCase();
        // Credential keys must indicate what credential type they represent
        if (lowerCaseKey.indexOf(CredentialType.ID_TOKEN.toLowerCase()) ===
            -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN.toLowerCase()) ===
                -1 &&
            lowerCaseKey.indexOf(CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) === -1 &&
            lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) ===
                -1) {
            return false;
        }
        if (lowerCaseKey.indexOf(CredentialType.REFRESH_TOKEN.toLowerCase()) >
            -1) {
            // Refresh tokens must contain the client id or family id
            const clientIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${this.clientId}${Separators.CACHE_KEY_SEPARATOR}`;
            const familyIdValidation = `${CredentialType.REFRESH_TOKEN}${Separators.CACHE_KEY_SEPARATOR}${THE_FAMILY_ID}${Separators.CACHE_KEY_SEPARATOR}`;
            if (lowerCaseKey.indexOf(clientIdValidation.toLowerCase()) === -1 &&
                lowerCaseKey.indexOf(familyIdValidation.toLowerCase()) === -1) {
                return false;
            }
        }
        else if (lowerCaseKey.indexOf(this.clientId.toLowerCase()) === -1) {
            // Tokens must contain the clientId
            return false;
        }
        return true;
    }
    /**
     * Returns whether or not the given credential entity matches the filter
     * @param entity
     * @param filter
     * @returns
     */
    credentialMatchesFilter(entity, filter) {
        if (!!filter.clientId && !this.matchClientId(entity, filter.clientId)) {
            return false;
        }
        if (!!filter.userAssertionHash &&
            !this.matchUserAssertionHash(entity, filter.userAssertionHash)) {
            return false;
        }
        /*
         * homeAccountId can be undefined, and we want to filter out cached items that have a homeAccountId of ""
         * because we don't want a client_credential request to return a cached token that has a homeAccountId
         */
        if (typeof filter.homeAccountId === "string" &&
            !this.matchHomeAccountId(entity, filter.homeAccountId)) {
            return false;
        }
        if (!!filter.environment &&
            !this.matchEnvironment(entity, filter.environment)) {
            return false;
        }
        if (!!filter.realm && !this.matchRealm(entity, filter.realm)) {
            return false;
        }
        if (!!filter.credentialType &&
            !this.matchCredentialType(entity, filter.credentialType)) {
            return false;
        }
        if (!!filter.familyId && !this.matchFamilyId(entity, filter.familyId)) {
            return false;
        }
        /*
         * idTokens do not have "target", target specific refreshTokens do exist for some types of authentication
         * Resource specific refresh tokens case will be added when the support is deemed necessary
         */
        if (!!filter.target && !this.matchTarget(entity, filter.target)) {
            return false;
        }
        // If request OR cached entity has requested Claims Hash, check if they match
        if (filter.requestedClaimsHash || entity.requestedClaimsHash) {
            // Don't match if either is undefined or they are different
            if (entity.requestedClaimsHash !== filter.requestedClaimsHash) {
                return false;
            }
        }
        // Access Token with Auth Scheme specific matching
        if (entity.credentialType ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME) {
            if (!!filter.tokenType &&
                !this.matchTokenType(entity, filter.tokenType)) {
                return false;
            }
            // KeyId (sshKid) in request must match cached SSH certificate keyId because SSH cert is bound to a specific key
            if (filter.tokenType === AuthenticationScheme.SSH) {
                if (filter.keyId && !this.matchKeyId(entity, filter.keyId)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * retrieve appMetadata matching all provided filters; if no filter is set, get all appMetadata
     * @param filter
     */
    getAppMetadataFilteredBy(filter) {
        return this.getAppMetadataFilteredByInternal(filter.environment, filter.clientId);
    }
    /**
     * Support function to help match appMetadata
     * @param environment
     * @param clientId
     */
    getAppMetadataFilteredByInternal(environment, clientId) {
        const allCacheKeys = this.getKeys();
        const matchingAppMetadata = {};
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-appMetadata type cache entities
            if (!this.isAppMetadata(cacheKey)) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAppMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (!!environment && !this.matchEnvironment(entity, environment)) {
                return;
            }
            if (!!clientId && !this.matchClientId(entity, clientId)) {
                return;
            }
            matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
    }
    /**
     * retrieve authorityMetadata that contains a matching alias
     * @param filter
     */
    getAuthorityMetadataByAlias(host) {
        const allCacheKeys = this.getAuthorityMetadataKeys();
        let matchedEntity = null;
        allCacheKeys.forEach((cacheKey) => {
            // don't parse any non-authorityMetadata type cache entities
            if (!this.isAuthorityMetadata(cacheKey) ||
                cacheKey.indexOf(this.clientId) === -1) {
                return;
            }
            // Attempt retrieval
            const entity = this.getAuthorityMetadata(cacheKey);
            if (!entity) {
                return;
            }
            if (entity.aliases.indexOf(host) === -1) {
                return;
            }
            matchedEntity = entity;
        });
        return matchedEntity;
    }
    /**
     * Removes all accounts and related tokens from cache.
     */
    async removeAllAccounts() {
        const allAccountKeys = this.getAccountKeys();
        const removedAccounts = [];
        allAccountKeys.forEach((cacheKey) => {
            removedAccounts.push(this.removeAccount(cacheKey));
        });
        await Promise.all(removedAccounts);
    }
    /**
     * Removes the account and related tokens for a given account key
     * @param account
     */
    async removeAccount(accountKey) {
        const account = this.getAccount(accountKey);
        if (!account) {
            return;
        }
        await this.removeAccountContext(account);
        this.removeItem(accountKey);
    }
    /**
     * Removes credentials associated with the provided account
     * @param account
     */
    async removeAccountContext(account) {
        const allTokenKeys = this.getTokenKeys();
        const accountId = account.generateAccountId();
        const removedCredentials = [];
        allTokenKeys.idToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeIdToken(key);
            }
        });
        allTokenKeys.accessToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                removedCredentials.push(this.removeAccessToken(key));
            }
        });
        allTokenKeys.refreshToken.forEach((key) => {
            if (key.indexOf(accountId) === 0) {
                this.removeRefreshToken(key);
            }
        });
        await Promise.all(removedCredentials);
    }
    /**
     * returns a boolean if the given credential is removed
     * @param credential
     */
    async removeAccessToken(key) {
        const credential = this.getAccessTokenCredential(key);
        if (!credential) {
            return;
        }
        // Remove Token Binding Key from key store for PoP Tokens Credentials
        if (credential.credentialType.toLowerCase() ===
            CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) {
            if (credential.tokenType === AuthenticationScheme.POP) {
                const accessTokenWithAuthSchemeEntity = credential;
                const kid = accessTokenWithAuthSchemeEntity.keyId;
                if (kid) {
                    try {
                        await this.cryptoImpl.removeTokenBindingKey(kid);
                    }
                    catch (error) {
                        throw ClientAuthError.createBindingKeyNotRemovedError();
                    }
                }
            }
        }
        return this.removeItem(key);
    }
    /**
     * Removes all app metadata objects from cache.
     */
    removeAppMetadata() {
        const allCacheKeys = this.getKeys();
        allCacheKeys.forEach((cacheKey) => {
            if (this.isAppMetadata(cacheKey)) {
                this.removeItem(cacheKey);
            }
        });
        return true;
    }
    /**
     * Retrieve the cached credentials into a cacherecord
     * @param account
     * @param clientId
     * @param scopes
     * @param environment
     * @param authScheme
     */
    readCacheRecord(account, request, environment) {
        const tokenKeys = this.getTokenKeys();
        const cachedAccount = this.readAccountFromCache(account);
        const cachedIdToken = this.getIdToken(account, tokenKeys);
        const cachedAccessToken = this.getAccessToken(account, request, tokenKeys);
        const cachedRefreshToken = this.getRefreshToken(account, false, tokenKeys);
        const cachedAppMetadata = this.readAppMetadataFromCache(environment);
        if (cachedAccount && cachedIdToken) {
            cachedAccount.idTokenClaims = new AuthToken(cachedIdToken.secret, this.cryptoImpl).claims;
        }
        return {
            account: cachedAccount,
            idToken: cachedIdToken,
            accessToken: cachedAccessToken,
            refreshToken: cachedRefreshToken,
            appMetadata: cachedAppMetadata,
        };
    }
    /**
     * Retrieve AccountEntity from cache
     * @param account
     */
    readAccountFromCache(account) {
        const accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey);
    }
    /**
     * Retrieve IdTokenEntity from cache
     * @param clientId
     * @param account
     * @param inputRealm
     */
    getIdToken(account, tokenKeys) {
        this.commonLogger.trace("CacheManager - getIdToken called");
        const idTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.ID_TOKEN,
            clientId: this.clientId,
            realm: account.tenantId,
        };
        const idTokens = this.getIdTokensByFilter(idTokenFilter, tokenKeys);
        const numIdTokens = idTokens.length;
        if (numIdTokens < 1) {
            this.commonLogger.info("CacheManager:getIdToken - No token found");
            return null;
        }
        else if (numIdTokens > 1) {
            this.commonLogger.info("CacheManager:getIdToken - Multiple id tokens found, clearing them");
            idTokens.forEach((idToken) => {
                this.removeIdToken(idToken.generateCredentialKey());
            });
            return null;
        }
        this.commonLogger.info("CacheManager:getIdToken - Returning id token");
        return idTokens[0];
    }
    /**
     * Gets all idTokens matching the given filter
     * @param filter
     * @returns
     */
    getIdTokensByFilter(filter, tokenKeys) {
        const idTokenKeys = (tokenKeys && tokenKeys.idToken) || this.getTokenKeys().idToken;
        const idTokens = [];
        idTokenKeys.forEach((key) => {
            if (!this.idTokenKeyMatchesFilter(key, {
                clientId: this.clientId,
                ...filter,
            })) {
                return;
            }
            const idToken = this.getIdTokenCredential(key);
            if (idToken && this.credentialMatchesFilter(idToken, filter)) {
                idTokens.push(idToken);
            }
        });
        return idTokens;
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @returns
     */
    idTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Removes idToken from the cache
     * @param key
     */
    removeIdToken(key) {
        this.removeItem(key);
    }
    /**
     * Removes refresh token from the cache
     * @param key
     */
    removeRefreshToken(key) {
        this.removeItem(key);
    }
    /**
     * Retrieve AccessTokenEntity from cache
     * @param clientId
     * @param account
     * @param scopes
     * @param authScheme
     */
    getAccessToken(account, request, tokenKeys) {
        this.commonLogger.trace("CacheManager - getAccessToken called");
        const scopes = ScopeSet.createSearchScopes(request.scopes);
        const authScheme = request.authenticationScheme || AuthenticationScheme.BEARER;
        /*
         * Distinguish between Bearer and PoP/SSH token cache types
         * Cast to lowercase to handle "bearer" from ADFS
         */
        const credentialType = authScheme &&
            authScheme.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME
            : CredentialType.ACCESS_TOKEN;
        const accessTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: credentialType,
            clientId: this.clientId,
            realm: account.tenantId,
            target: scopes,
            tokenType: authScheme,
            keyId: request.sshKid,
            requestedClaimsHash: request.requestedClaimsHash,
        };
        const accessTokenKeys = (tokenKeys && tokenKeys.accessToken) ||
            this.getTokenKeys().accessToken;
        const accessTokens = [];
        accessTokenKeys.forEach((key) => {
            // Validate key
            if (this.accessTokenKeyMatchesFilter(key, accessTokenFilter, true)) {
                const accessToken = this.getAccessTokenCredential(key);
                // Validate value
                if (accessToken &&
                    this.credentialMatchesFilter(accessToken, accessTokenFilter)) {
                    accessTokens.push(accessToken);
                }
            }
        });
        const numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
            this.commonLogger.info("CacheManager:getAccessToken - No token found");
            return null;
        }
        else if (numAccessTokens > 1) {
            this.commonLogger.info("CacheManager:getAccessToken - Multiple access tokens found, clearing them");
            accessTokens.forEach((accessToken) => {
                this.removeAccessToken(accessToken.generateCredentialKey());
            });
            return null;
        }
        this.commonLogger.info("CacheManager:getAccessToken - Returning access token");
        return accessTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     * @param keyMustContainAllScopes
     * @returns
     */
    accessTokenKeyMatchesFilter(inputKey, filter, keyMustContainAllScopes) {
        const key = inputKey.toLowerCase();
        if (filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.realm && key.indexOf(filter.realm.toLowerCase()) === -1) {
            return false;
        }
        if (filter.requestedClaimsHash &&
            key.indexOf(filter.requestedClaimsHash.toLowerCase()) === -1) {
            return false;
        }
        if (filter.target) {
            const scopes = filter.target.asArray();
            for (let i = 0; i < scopes.length; i++) {
                if (keyMustContainAllScopes &&
                    !key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache lookup a missing scope would be a cache miss
                    return false;
                }
                else if (!keyMustContainAllScopes &&
                    key.includes(scopes[i].toLowerCase())) {
                    // When performing a cache write, any token with a subset of requested scopes should be replaced
                    return true;
                }
            }
        }
        return true;
    }
    /**
     * Gets all access tokens matching the filter
     * @param filter
     * @returns
     */
    getAccessTokensByFilter(filter) {
        const tokenKeys = this.getTokenKeys();
        const accessTokens = [];
        tokenKeys.accessToken.forEach((key) => {
            if (!this.accessTokenKeyMatchesFilter(key, filter, true)) {
                return;
            }
            const accessToken = this.getAccessTokenCredential(key);
            if (accessToken &&
                this.credentialMatchesFilter(accessToken, filter)) {
                accessTokens.push(accessToken);
            }
        });
        return accessTokens;
    }
    /**
     * Helper to retrieve the appropriate refresh token from cache
     * @param clientId
     * @param account
     * @param familyRT
     */
    getRefreshToken(account, familyRT, tokenKeys) {
        this.commonLogger.trace("CacheManager - getRefreshToken called");
        const id = familyRT ? THE_FAMILY_ID : undefined;
        const refreshTokenFilter = {
            homeAccountId: account.homeAccountId,
            environment: account.environment,
            credentialType: CredentialType.REFRESH_TOKEN,
            clientId: this.clientId,
            familyId: id,
        };
        const refreshTokenKeys = (tokenKeys && tokenKeys.refreshToken) ||
            this.getTokenKeys().refreshToken;
        const refreshTokens = [];
        refreshTokenKeys.forEach((key) => {
            // Validate key
            if (this.refreshTokenKeyMatchesFilter(key, refreshTokenFilter)) {
                const refreshToken = this.getRefreshTokenCredential(key);
                // Validate value
                if (refreshToken &&
                    this.credentialMatchesFilter(refreshToken, refreshTokenFilter)) {
                    refreshTokens.push(refreshToken);
                }
            }
        });
        const numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
            this.commonLogger.info("CacheManager:getRefreshToken - No refresh token found.");
            return null;
        }
        // address the else case after remove functions address environment aliases
        this.commonLogger.info("CacheManager:getRefreshToken - returning refresh token");
        return refreshTokens[0];
    }
    /**
     * Validate the cache key against filter before retrieving and parsing cache value
     * @param key
     * @param filter
     */
    refreshTokenKeyMatchesFilter(inputKey, filter) {
        const key = inputKey.toLowerCase();
        if (filter.familyId &&
            key.indexOf(filter.familyId.toLowerCase()) === -1) {
            return false;
        }
        // If familyId is used, clientId is not in the key
        if (!filter.familyId &&
            filter.clientId &&
            key.indexOf(filter.clientId.toLowerCase()) === -1) {
            return false;
        }
        if (filter.homeAccountId &&
            key.indexOf(filter.homeAccountId.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
    /**
     * Retrieve AppMetadataEntity from cache
     */
    readAppMetadataFromCache(environment) {
        const appMetadataFilter = {
            environment,
            clientId: this.clientId,
        };
        const appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        const appMetadataEntries = Object.keys(appMetadata).map((key) => appMetadata[key]);
        const numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
            return null;
        }
        else if (numAppMetadata > 1) {
            throw ClientAuthError.createMultipleMatchingAppMetadataInCacheError();
        }
        return appMetadataEntries[0];
    }
    /**
     * Return the family_id value associated  with FOCI
     * @param environment
     * @param clientId
     */
    isAppMetadataFOCI(environment) {
        const appMetadata = this.readAppMetadataFromCache(environment);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
    }
    /**
     * helper to match account ids
     * @param value
     * @param homeAccountId
     */
    matchHomeAccountId(entity, homeAccountId) {
        return !!(typeof entity.homeAccountId === "string" &&
            homeAccountId === entity.homeAccountId);
    }
    /**
     * helper to match account ids
     * @param entity
     * @param localAccountId
     * @returns
     */
    matchLocalAccountId(entity, localAccountId) {
        return !!(typeof entity.localAccountId === "string" &&
            localAccountId === entity.localAccountId);
    }
    /**
     * helper to match usernames
     * @param entity
     * @param username
     * @returns
     */
    matchUsername(entity, username) {
        return !!(typeof entity.username === "string" &&
            username.toLowerCase() === entity.username.toLowerCase());
    }
    /**
     * helper to match assertion
     * @param value
     * @param oboAssertion
     */
    matchUserAssertionHash(entity, userAssertionHash) {
        return !!(entity.userAssertionHash &&
            userAssertionHash === entity.userAssertionHash);
    }
    /**
     * helper to match environment
     * @param value
     * @param environment
     */
    matchEnvironment(entity, environment) {
        const cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata &&
            cloudMetadata.aliases.indexOf(entity.environment) > -1) {
            return true;
        }
        return false;
    }
    /**
     * helper to match credential type
     * @param entity
     * @param credentialType
     */
    matchCredentialType(entity, credentialType) {
        return (entity.credentialType &&
            credentialType.toLowerCase() === entity.credentialType.toLowerCase());
    }
    /**
     * helper to match client ids
     * @param entity
     * @param clientId
     */
    matchClientId(entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
    }
    /**
     * helper to match family ids
     * @param entity
     * @param familyId
     */
    matchFamilyId(entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
    }
    /**
     * helper to match realm
     * @param entity
     * @param realm
     */
    matchRealm(entity, realm) {
        return !!(entity.realm && realm === entity.realm);
    }
    /**
     * helper to match nativeAccountId
     * @param entity
     * @param nativeAccountId
     * @returns boolean indicating the match result
     */
    matchNativeAccountId(entity, nativeAccountId) {
        return !!(entity.nativeAccountId && nativeAccountId === entity.nativeAccountId);
    }
    /**
     * Returns true if the target scopes are a subset of the current entity's scopes, false otherwise.
     * @param entity
     * @param target
     */
    matchTarget(entity, target) {
        const isNotAccessTokenCredential = entity.credentialType !== CredentialType.ACCESS_TOKEN &&
            entity.credentialType !==
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
        if (isNotAccessTokenCredential || !entity.target) {
            return false;
        }
        const entityScopeSet = ScopeSet.fromString(entity.target);
        return entityScopeSet.containsScopeSet(target);
    }
    /**
     * Returns true if the credential's tokenType or Authentication Scheme matches the one in the request, false otherwise
     * @param entity
     * @param tokenType
     */
    matchTokenType(entity, tokenType) {
        return !!(entity.tokenType && entity.tokenType === tokenType);
    }
    /**
     * Returns true if the credential's keyId matches the one in the request, false otherwise
     * @param entity
     * @param tokenType
     */
    matchKeyId(entity, keyId) {
        return !!(entity.keyId && entity.keyId === keyId);
    }
    /**
     * returns if a given cache entity is of the type appmetadata
     * @param key
     */
    isAppMetadata(key) {
        return key.indexOf(APP_METADATA) !== -1;
    }
    /**
     * returns if a given cache entity is of the type authoritymetadata
     * @param key
     */
    isAuthorityMetadata(key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
    }
    /**
     * returns cache key used for cloud instance metadata
     */
    generateAuthorityMetadataCacheKey(authority) {
        return `${AUTHORITY_METADATA_CONSTANTS.CACHE_KEY}-${this.clientId}-${authority}`;
    }
    /**
     * Helper to convert serialized data to object
     * @param obj
     * @param json
     */
    static toObject(obj, json) {
        for (const propertyName in json) {
            obj[propertyName] = json[propertyName];
        }
        return obj;
    }
}
class DefaultStorageClass extends CacheManager {
    setAccount() {
        const notImplErr = "Storage interface - setAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccount() {
        const notImplErr = "Storage interface - getAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setIdTokenCredential() {
        const notImplErr = "Storage interface - setIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getIdTokenCredential() {
        const notImplErr = "Storage interface - getIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAccessTokenCredential() {
        const notImplErr = "Storage interface - setAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccessTokenCredential() {
        const notImplErr = "Storage interface - getAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setRefreshTokenCredential() {
        const notImplErr = "Storage interface - setRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getRefreshTokenCredential() {
        const notImplErr = "Storage interface - getRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAppMetadata() {
        const notImplErr = "Storage interface - setAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAppMetadata() {
        const notImplErr = "Storage interface - getAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setServerTelemetry() {
        const notImplErr = "Storage interface - setServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getServerTelemetry() {
        const notImplErr = "Storage interface - getServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setAuthorityMetadata() {
        const notImplErr = "Storage interface - setAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAuthorityMetadata() {
        const notImplErr = "Storage interface - getAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAuthorityMetadataKeys() {
        const notImplErr = "Storage interface - getAuthorityMetadataKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    setThrottlingCache() {
        const notImplErr = "Storage interface - setThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getThrottlingCache() {
        const notImplErr = "Storage interface - getThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    removeItem() {
        const notImplErr = "Storage interface - removeItem() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    containsKey() {
        const notImplErr = "Storage interface - containsKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getKeys() {
        const notImplErr = "Storage interface - getKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getAccountKeys() {
        const notImplErr = "Storage interface - getAccountKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    getTokenKeys() {
        const notImplErr = "Storage interface - getTokenKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    async clear() {
        const notImplErr = "Storage interface - clear() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
    updateCredentialCacheKey() {
        const notImplErr = "Storage interface - updateCredentialCacheKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Token renewal offset default in seconds
const DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
const DEFAULT_SYSTEM_OPTIONS = {
    tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
    preventCorsPreflight: false,
};
const DEFAULT_LOGGER_IMPLEMENTATION = {
    loggerCallback: () => {
        // allow users to not set loggerCallback
    },
    piiLoggingEnabled: false,
    logLevel: exports.LogLevel.Info,
    correlationId: Constants.EMPTY_STRING,
};
const DEFAULT_CACHE_OPTIONS = {
    claimsBasedCachingEnabled: false,
};
const DEFAULT_NETWORK_IMPLEMENTATION = {
    async sendGetRequestAsync() {
        const notImplErr = "Network interface - sendGetRequestAsync() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
    async sendPostRequestAsync() {
        const notImplErr = "Network interface - sendPostRequestAsync() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
    },
};
const DEFAULT_LIBRARY_INFO = {
    sku: Constants.SKU,
    version: version$1,
    cpu: Constants.EMPTY_STRING,
    os: Constants.EMPTY_STRING,
};
const DEFAULT_CLIENT_CREDENTIALS = {
    clientSecret: Constants.EMPTY_STRING,
    clientAssertion: undefined,
};
const DEFAULT_AZURE_CLOUD_OPTIONS = {
    azureCloudInstance: AzureCloudInstance.None,
    tenant: `${Constants.DEFAULT_COMMON_TENANT}`,
};
const DEFAULT_TELEMETRY_OPTIONS = {
    application: {
        appName: "",
        appVersion: "",
    },
};
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
function buildClientConfiguration({ authOptions: userAuthOptions, systemOptions: userSystemOptions, loggerOptions: userLoggerOption, cacheOptions: userCacheOptions, storageInterface: storageImplementation, networkInterface: networkImplementation, cryptoInterface: cryptoImplementation, clientCredentials: clientCredentials, libraryInfo: libraryInfo, telemetry: telemetry, serverTelemetryManager: serverTelemetryManager, persistencePlugin: persistencePlugin, serializableCache: serializableCache, }) {
    const loggerOptions = {
        ...DEFAULT_LOGGER_IMPLEMENTATION,
        ...userLoggerOption,
    };
    return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: { ...DEFAULT_SYSTEM_OPTIONS, ...userSystemOptions },
        loggerOptions: loggerOptions,
        cacheOptions: { ...DEFAULT_CACHE_OPTIONS, ...userCacheOptions },
        storageInterface: storageImplementation ||
            new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION, new Logger(loggerOptions)),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: { ...DEFAULT_LIBRARY_INFO, ...libraryInfo },
        telemetry: { ...DEFAULT_TELEMETRY_OPTIONS, ...telemetry },
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null,
    };
}
/**
 * Construct authoptions from the client and platform passed values
 * @param authOptions
 */
function buildAuthOptions(authOptions) {
    return {
        clientCapabilities: [],
        azureCloudOptions: DEFAULT_AZURE_CLOUD_OPTIONS,
        skipAuthorityMetadataCache: false,
        ...authOptions,
    };
}
/**
 * Returns true if config has protocolMode set to ProtocolMode.OIDC, false otherwise
 * @param ClientConfiguration
 */
function isOidcProtocolMode(config) {
    return (config.authOptions.authority.options.protocolMode === ProtocolMode.OIDC);
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
class ServerError extends AuthError {
    constructor(errorCode, errorMessage, subError) {
        super(errorCode, errorMessage, subError);
        this.name = "ServerError";
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ThrottlingUtils {
    /**
     * Prepares a RequestThumbprint to be stored as a key.
     * @param thumbprint
     */
    static generateThrottlingStorageKey(thumbprint) {
        return `${ThrottlingConstants.THROTTLING_PREFIX}.${JSON.stringify(thumbprint)}`;
    }
    /**
     * Performs necessary throttling checks before a network request.
     * @param cacheManager
     * @param thumbprint
     */
    static preProcess(cacheManager, thumbprint) {
        const key = ThrottlingUtils.generateThrottlingStorageKey(thumbprint);
        const value = cacheManager.getThrottlingCache(key);
        if (value) {
            if (value.throttleTime < Date.now()) {
                cacheManager.removeItem(key);
                return;
            }
            throw new ServerError(value.errorCodes?.join(" ") || Constants.EMPTY_STRING, value.errorMessage, value.subError);
        }
    }
    /**
     * Performs necessary throttling checks after a network request.
     * @param cacheManager
     * @param thumbprint
     * @param response
     */
    static postProcess(cacheManager, thumbprint, response) {
        if (ThrottlingUtils.checkResponseStatus(response) ||
            ThrottlingUtils.checkResponseForRetryAfter(response)) {
            const thumbprintValue = {
                throttleTime: ThrottlingUtils.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
                error: response.body.error,
                errorCodes: response.body.error_codes,
                errorMessage: response.body.error_description,
                subError: response.body.suberror,
            };
            cacheManager.setThrottlingCache(ThrottlingUtils.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
    }
    /**
     * Checks a NetworkResponse object's status codes against 429 or 5xx
     * @param response
     */
    static checkResponseStatus(response) {
        return (response.status === 429 ||
            (response.status >= 500 && response.status < 600));
    }
    /**
     * Checks a NetworkResponse object's RetryAfter header
     * @param response
     */
    static checkResponseForRetryAfter(response) {
        if (response.headers) {
            return (response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) &&
                (response.status < 200 || response.status >= 300));
        }
        return false;
    }
    /**
     * Calculates the Unix-time value for a throttle to expire given throttleTime in seconds.
     * @param throttleTime
     */
    static calculateThrottleTime(throttleTime) {
        const time = throttleTime <= 0 ? 0 : throttleTime;
        const currentSeconds = Date.now() / 1000;
        return Math.floor(Math.min(currentSeconds +
            (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds +
            ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1000);
    }
    static removeThrottle(cacheManager, clientId, request, homeAccountIdentifier) {
        const thumbprint = {
            clientId: clientId,
            authority: request.authority,
            scopes: request.scopes,
            homeAccountIdentifier: homeAccountIdentifier,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        const key = this.generateThrottlingStorageKey(thumbprint);
        cacheManager.removeItem(key);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class NetworkManager {
    constructor(networkClient, cacheManager) {
        this.networkClient = networkClient;
        this.cacheManager = cacheManager;
    }
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    async sendPostRequest(thumbprint, tokenEndpoint, options) {
        ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
        let response;
        try {
            response = await this.networkClient.sendPostRequestAsync(tokenEndpoint, options);
        }
        catch (e) {
            if (e instanceof AuthError) {
                throw e;
            }
            else {
                throw ClientAuthError.createNetworkError(tokenEndpoint, e);
            }
        }
        ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
        return response;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CcsCredentialType = {
    HOME_ACCOUNT_ID: "home_account_id",
    UPN: "UPN",
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Validates server consumable params from the "request" objects
 */
class RequestValidator {
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    static validateRedirectUri(redirectUri) {
        if (StringUtils.isEmpty(redirectUri)) {
            throw ClientConfigurationError.createRedirectUriEmptyError();
        }
    }
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    static validatePrompt(prompt) {
        const promptValues = [];
        for (const value in PromptValue) {
            promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
            throw ClientConfigurationError.createInvalidPromptError(prompt);
        }
    }
    static validateClaims(claims) {
        try {
            JSON.parse(claims);
        }
        catch (e) {
            throw ClientConfigurationError.createInvalidClaimsRequestError();
        }
    }
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    static validateCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        if (StringUtils.isEmpty(codeChallenge) ||
            StringUtils.isEmpty(codeChallengeMethod)) {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
        else {
            this.validateCodeChallengeMethod(codeChallengeMethod);
        }
    }
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    static validateCodeChallengeMethod(codeChallengeMethod) {
        if ([
            CodeChallengeMethodValues.PLAIN,
            CodeChallengeMethodValues.S256,
        ].indexOf(codeChallengeMethod) < 0) {
            throw ClientConfigurationError.createInvalidCodeChallengeMethodError();
        }
    }
    /**
     * Removes unnecessary, duplicate, and empty string query parameters from extraQueryParameters
     * @param request
     */
    static sanitizeEQParams(eQParams, queryParams) {
        if (!eQParams) {
            return {};
        }
        // Remove any query parameters already included in SSO params
        queryParams.forEach((value, key) => {
            if (eQParams[key]) {
                delete eQParams[key];
            }
        });
        // remove empty string parameters
        return Object.fromEntries(Object.entries(eQParams).filter((kv) => kv[1] !== ""));
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RequestParameterBuilder {
    constructor() {
        this.parameters = new Map();
    }
    /**
     * add response_type = code
     */
    addResponseTypeCode() {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(Constants.CODE_RESPONSE_TYPE));
    }
    /**
     * add response_type = token id_token
     */
    addResponseTypeForTokenAndIdToken() {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(`${Constants.TOKEN_RESPONSE_TYPE} ${Constants.ID_TOKEN_RESPONSE_TYPE}`));
    }
    /**
     * add response_mode. defaults to query.
     * @param responseMode
     */
    addResponseMode(responseMode) {
        this.parameters.set(AADServerParamKeys.RESPONSE_MODE, encodeURIComponent(responseMode ? responseMode : ResponseMode.QUERY));
    }
    /**
     * Add flag to indicate STS should attempt to use WAM if available
     */
    addNativeBroker() {
        this.parameters.set(AADServerParamKeys.NATIVE_BROKER, encodeURIComponent("1"));
    }
    /**
     * add scopes. set addOidcScopes to false to prevent default scopes in non-user scenarios
     * @param scopeSet
     * @param addOidcScopes
     */
    addScopes(scopes, addOidcScopes = true, defaultScopes = OIDC_DEFAULT_SCOPES) {
        // Always add openid to the scopes when adding OIDC scopes
        if (addOidcScopes &&
            !defaultScopes.includes("openid") &&
            !scopes.includes("openid")) {
            defaultScopes.push("openid");
        }
        const requestScopes = addOidcScopes
            ? [...(scopes || []), ...defaultScopes]
            : scopes || [];
        const scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(AADServerParamKeys.SCOPE, encodeURIComponent(scopeSet.printScopes()));
    }
    /**
     * add clientId
     * @param clientId
     */
    addClientId(clientId) {
        this.parameters.set(AADServerParamKeys.CLIENT_ID, encodeURIComponent(clientId));
    }
    /**
     * add redirect_uri
     * @param redirectUri
     */
    addRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.REDIRECT_URI, encodeURIComponent(redirectUri));
    }
    /**
     * add post logout redirectUri
     * @param redirectUri
     */
    addPostLogoutRedirectUri(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.POST_LOGOUT_URI, encodeURIComponent(redirectUri));
    }
    /**
     * add id_token_hint to logout request
     * @param idTokenHint
     */
    addIdTokenHint(idTokenHint) {
        this.parameters.set(AADServerParamKeys.ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
    }
    /**
     * add domain_hint
     * @param domainHint
     */
    addDomainHint(domainHint) {
        this.parameters.set(SSOTypes.DOMAIN_HINT, encodeURIComponent(domainHint));
    }
    /**
     * add login_hint
     * @param loginHint
     */
    addLoginHint(loginHint) {
        this.parameters.set(SSOTypes.LOGIN_HINT, encodeURIComponent(loginHint));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for login_hint
     * @param loginHint
     */
    addCcsUpn(loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`UPN:${loginHint}`));
    }
    /**
     * Adds the CCS (Cache Credential Service) query parameter for account object
     * @param loginHint
     */
    addCcsOid(clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent(`Oid:${clientInfo.uid}@${clientInfo.utid}`));
    }
    /**
     * add sid
     * @param sid
     */
    addSid(sid) {
        this.parameters.set(SSOTypes.SID, encodeURIComponent(sid));
    }
    /**
     * add claims
     * @param claims
     */
    addClaims(claims, clientCapabilities) {
        const mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(AADServerParamKeys.CLAIMS, encodeURIComponent(mergedClaims));
    }
    /**
     * add correlationId
     * @param correlationId
     */
    addCorrelationId(correlationId) {
        this.parameters.set(AADServerParamKeys.CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
    }
    /**
     * add library info query params
     * @param libraryInfo
     */
    addLibraryInfo(libraryInfo) {
        // Telemetry Info
        this.parameters.set(AADServerParamKeys.X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(AADServerParamKeys.X_CLIENT_VER, libraryInfo.version);
        if (libraryInfo.os) {
            this.parameters.set(AADServerParamKeys.X_CLIENT_OS, libraryInfo.os);
        }
        if (libraryInfo.cpu) {
            this.parameters.set(AADServerParamKeys.X_CLIENT_CPU, libraryInfo.cpu);
        }
    }
    /**
     * Add client telemetry parameters
     * @param appTelemetry
     */
    addApplicationTelemetry(appTelemetry) {
        if (appTelemetry?.appName) {
            this.parameters.set(AADServerParamKeys.X_APP_NAME, appTelemetry.appName);
        }
        if (appTelemetry?.appVersion) {
            this.parameters.set(AADServerParamKeys.X_APP_VER, appTelemetry.appVersion);
        }
    }
    /**
     * add prompt
     * @param prompt
     */
    addPrompt(prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set(`${AADServerParamKeys.PROMPT}`, encodeURIComponent(prompt));
    }
    /**
     * add state
     * @param state
     */
    addState(state) {
        if (!StringUtils.isEmpty(state)) {
            this.parameters.set(AADServerParamKeys.STATE, encodeURIComponent(state));
        }
    }
    /**
     * add nonce
     * @param nonce
     */
    addNonce(nonce) {
        this.parameters.set(AADServerParamKeys.NONCE, encodeURIComponent(nonce));
    }
    /**
     * add code_challenge and code_challenge_method
     * - throw if either of them are not passed
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    addCodeChallengeParams(codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE, encodeURIComponent(codeChallenge));
            this.parameters.set(AADServerParamKeys.CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        }
        else {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addAuthorizationCode(code) {
        this.parameters.set(AADServerParamKeys.CODE, encodeURIComponent(code));
    }
    /**
     * add the `authorization_code` passed by the user to exchange for a token
     * @param code
     */
    addDeviceCode(code) {
        this.parameters.set(AADServerParamKeys.DEVICE_CODE, encodeURIComponent(code));
    }
    /**
     * add the `refreshToken` passed by the user
     * @param refreshToken
     */
    addRefreshToken(refreshToken) {
        this.parameters.set(AADServerParamKeys.REFRESH_TOKEN, encodeURIComponent(refreshToken));
    }
    /**
     * add the `code_verifier` passed by the user to exchange for a token
     * @param codeVerifier
     */
    addCodeVerifier(codeVerifier) {
        this.parameters.set(AADServerParamKeys.CODE_VERIFIER, encodeURIComponent(codeVerifier));
    }
    /**
     * add client_secret
     * @param clientSecret
     */
    addClientSecret(clientSecret) {
        this.parameters.set(AADServerParamKeys.CLIENT_SECRET, encodeURIComponent(clientSecret));
    }
    /**
     * add clientAssertion for confidential client flows
     * @param clientAssertion
     */
    addClientAssertion(clientAssertion) {
        if (!StringUtils.isEmpty(clientAssertion)) {
            this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
        }
    }
    /**
     * add clientAssertionType for confidential client flows
     * @param clientAssertionType
     */
    addClientAssertionType(clientAssertionType) {
        if (!StringUtils.isEmpty(clientAssertionType)) {
            this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
        }
    }
    /**
     * add OBO assertion for confidential client flows
     * @param clientAssertion
     */
    addOboAssertion(oboAssertion) {
        this.parameters.set(AADServerParamKeys.OBO_ASSERTION, encodeURIComponent(oboAssertion));
    }
    /**
     * add grant type
     * @param grantType
     */
    addRequestTokenUse(tokenUse) {
        this.parameters.set(AADServerParamKeys.REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
    }
    /**
     * add grant type
     * @param grantType
     */
    addGrantType(grantType) {
        this.parameters.set(AADServerParamKeys.GRANT_TYPE, encodeURIComponent(grantType));
    }
    /**
     * add client info
     *
     */
    addClientInfo() {
        this.parameters.set(CLIENT_INFO, "1");
    }
    /**
     * add extraQueryParams
     * @param eQParams
     */
    addExtraQueryParameters(eQParams) {
        const sanitizedEQParams = RequestValidator.sanitizeEQParams(eQParams, this.parameters);
        Object.keys(sanitizedEQParams).forEach((key) => {
            this.parameters.set(key, eQParams[key]);
        });
    }
    addClientCapabilitiesToClaims(claims, clientCapabilities) {
        let mergedClaims;
        // Parse provided claims into JSON object or initialize empty object
        if (!claims) {
            mergedClaims = {};
        }
        else {
            try {
                mergedClaims = JSON.parse(claims);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidClaimsRequestError();
            }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
            if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
                // Add access_token key to claims object
                mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
            }
            // Add xms_cc claim with provided clientCapabilities to access_token key
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
                values: clientCapabilities,
            };
        }
        return JSON.stringify(mergedClaims);
    }
    /**
     * adds `username` for Password Grant flow
     * @param username
     */
    addUsername(username) {
        this.parameters.set(PasswordGrantConstants.username, encodeURIComponent(username));
    }
    /**
     * adds `password` for Password Grant flow
     * @param password
     */
    addPassword(password) {
        this.parameters.set(PasswordGrantConstants.password, encodeURIComponent(password));
    }
    /**
     * add pop_jwk to query params
     * @param cnfString
     */
    addPopToken(cnfString) {
        if (!StringUtils.isEmpty(cnfString)) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, AuthenticationScheme.POP);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(cnfString));
        }
    }
    /**
     * add SSH JWK and key ID to query params
     */
    addSshJwk(sshJwkString) {
        if (!StringUtils.isEmpty(sshJwkString)) {
            this.parameters.set(AADServerParamKeys.TOKEN_TYPE, AuthenticationScheme.SSH);
            this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(sshJwkString));
        }
    }
    /**
     * add server telemetry fields
     * @param serverTelemetryManager
     */
    addServerTelemetry(serverTelemetryManager) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(AADServerParamKeys.X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
    }
    /**
     * Adds parameter that indicates to the server that throttling is supported
     */
    addThrottling() {
        this.parameters.set(AADServerParamKeys.X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
    }
    /**
     * Adds logout_hint parameter for "silent" logout which prevent server account picker
     */
    addLogoutHint(logoutHint) {
        this.parameters.set(AADServerParamKeys.LOGOUT_HINT, encodeURIComponent(logoutHint));
    }
    /**
     * Utility to create a URL from the params map
     */
    createQueryString() {
        const queryParameterArray = new Array();
        this.parameters.forEach((value, key) => {
            queryParameterArray.push(`${key}=${value}`);
        });
        return queryParameterArray.join("&");
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base application class which will construct requests to send to and handle responses from the Microsoft STS using the authorization code flow.
 */
class BaseClient {
    constructor(configuration, performanceClient) {
        // Set the configuration
        this.config = buildClientConfiguration(configuration);
        // Initialize the logger
        this.logger = new Logger(this.config.loggerOptions, name$1, version$1);
        // Initialize crypto
        this.cryptoUtils = this.config.cryptoInterface;
        // Initialize storage interface
        this.cacheManager = this.config.storageInterface;
        // Set the network interface
        this.networkClient = this.config.networkInterface;
        // Set the NetworkManager
        this.networkManager = new NetworkManager(this.networkClient, this.cacheManager);
        // Set TelemetryManager
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        // set Authority
        this.authority = this.config.authOptions.authority;
        // set performance telemetry client
        this.performanceClient = performanceClient;
    }
    /**
     * Creates default headers for requests to token endpoint
     */
    createTokenRequestHeaders(ccsCred) {
        const headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        headers[HeaderNames.CCS_HEADER] = `Oid:${clientInfo.uid}@${clientInfo.utid}`;
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    headers[HeaderNames.CCS_HEADER] = `UPN: ${ccsCred.credential}`;
                    break;
            }
        }
        return headers;
    }
    /**
     * Http post to token endpoint
     * @param tokenEndpoint
     * @param queryString
     * @param headers
     * @param thumbprint
     */
    async executePostToTokenEndpoint(tokenEndpoint, queryString, headers, thumbprint) {
        const response = await this.networkManager.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers: headers });
        if (this.config.serverTelemetryManager &&
            response.status < 500 &&
            response.status !== 429) {
            // Telemetry data successfully logged by server, clear Telemetry cache
            this.config.serverTelemetryManager.clearTelemetryCache();
        }
        return response;
    }
    /**
     * Updates the authority object of the client. Endpoint discovery must be completed.
     * @param updatedAuthority
     */
    updateAuthority(updatedAuthority) {
        if (!updatedAuthority.discoveryComplete()) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Updated authority has not completed endpoint discovery.");
        }
        this.authority = updatedAuthority;
    }
    /**
     * Creates query string for the /token request
     * @param request
     */
    createTokenQueryParameters(request) {
        const parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base type for credentials to be stored in the cache: eg: ACCESS_TOKEN, ID_TOKEN etc
 *
 * Key:Value Schema:
 *
 * Key: <home_account_id*>-<environment>-<credential_type>-<client_id>-<realm*>-<target*>-<requestedClaims*>-<scheme*>
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      tokenType: Matches the authentication scheme for which the token was issued (i.e. Bearer or pop)
 *      requestedClaimsHash: Matches the SHA 256 hash of the claims object included in the token request
 *      userAssertionHash: Matches the SHA 256 hash of the obo_assertion for the OBO flow
 * }
 */
class CredentialEntity {
    /**
     * Generate Account Id key component as per the schema: <home_account_id>-<environment>
     */
    generateAccountId() {
        return CredentialEntity.generateAccountIdForCacheKey(this.homeAccountId, this.environment);
    }
    /**
     * Generate Credential Id key component as per the schema: <credential_type>-<client_id>-<realm>
     */
    generateCredentialId() {
        return CredentialEntity.generateCredentialIdForCacheKey(this.credentialType, this.clientId, this.realm, this.familyId);
    }
    /**
     * Generate target key component as per schema: <target>
     */
    generateTarget() {
        return CredentialEntity.generateTargetForCacheKey(this.target);
    }
    /**
     * generates credential key
     */
    generateCredentialKey() {
        return CredentialEntity.generateCredentialCacheKey(this.homeAccountId, this.environment, this.credentialType, this.clientId, this.realm, this.target, this.familyId, this.tokenType, this.requestedClaimsHash);
    }
    /**
     * returns the type of the cache (in this case credential)
     */
    generateType() {
        switch (this.credentialType) {
            case CredentialType.ID_TOKEN:
                return CacheType.ID_TOKEN;
            case CredentialType.ACCESS_TOKEN:
            case CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
                return CacheType.ACCESS_TOKEN;
            case CredentialType.REFRESH_TOKEN:
                return CacheType.REFRESH_TOKEN;
            default: {
                throw ClientAuthError.createUnexpectedCredentialTypeError();
            }
        }
    }
    /**
     * generates credential key
     * <home_account_id*>-\<environment>-<credential_type>-<client_id>-<realm\*>-<target\*>-<scheme\*>
     */
    static generateCredentialCacheKey(homeAccountId, environment, credentialType, clientId, realm, target, familyId, tokenType, requestedClaimsHash) {
        const credentialKey = [
            this.generateAccountIdForCacheKey(homeAccountId, environment),
            this.generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId),
            this.generateTargetForCacheKey(target),
            this.generateClaimsHashForCacheKey(requestedClaimsHash),
            this.generateSchemeForCacheKey(tokenType),
        ];
        return credentialKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * generates Account Id for keys
     * @param homeAccountId
     * @param environment
     */
    static generateAccountIdForCacheKey(homeAccountId, environment) {
        const accountId = [homeAccountId, environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generates Credential Id for keys
     * @param credentialType
     * @param realm
     * @param clientId
     * @param familyId
     */
    static generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId) {
        const clientOrFamilyId = credentialType === CredentialType.REFRESH_TOKEN
            ? familyId || clientId
            : clientId;
        const credentialId = [
            credentialType,
            clientOrFamilyId,
            realm || Constants.EMPTY_STRING,
        ];
        return credentialId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
    }
    /**
     * Generate target key component as per schema: <target>
     */
    static generateTargetForCacheKey(scopes) {
        return (scopes || Constants.EMPTY_STRING).toLowerCase();
    }
    /**
     * Generate requested claims key component as per schema: <requestedClaims>
     */
    static generateClaimsHashForCacheKey(requestedClaimsHash) {
        return (requestedClaimsHash || Constants.EMPTY_STRING).toLowerCase();
    }
    /**
     * Generate scheme key componenet as per schema: <scheme>
     */
    static generateSchemeForCacheKey(tokenType) {
        /*
         * PoP Tokens and SSH certs include scheme in cache key
         * Cast to lowercase to handle "bearer" from ADFS
         */
        return tokenType &&
            tokenType.toLowerCase() !==
                AuthenticationScheme.BEARER.toLowerCase()
            ? tokenType.toLowerCase()
            : Constants.EMPTY_STRING;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ID_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      realm: Full tenant or organizational identifier that the account belongs to
 * }
 */
class IdTokenEntity extends CredentialEntity {
    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createIdTokenEntity(homeAccountId, environment, idToken, clientId, tenantId) {
        const idTokenEntity = new IdTokenEntity();
        idTokenEntity.credentialType = CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;
        return idTokenEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isIdTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.ID_TOKEN);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class which exposes functions for managing date and time operations.
 */
class TimeUtils {
    /**
     * return the current time in Unix time (seconds).
     */
    static nowSeconds() {
        // Date.getTime() returns in milliseconds.
        return Math.round(new Date().getTime() / 1000.0);
    }
    /**
     * check if a token is expired based on given UTC time in seconds.
     * @param expiresOn
     */
    static isTokenExpired(expiresOn, offset) {
        // check for access token expiry
        const expirationSec = Number(expiresOn) || 0;
        const offsetCurrentTimeSec = TimeUtils.nowSeconds() + offset;
        // If current time + offset is greater than token expiration time, then token is expired.
        return offsetCurrentTimeSec > expirationSec;
    }
    /**
     * If the current time is earlier than the time that a token was cached at, we must discard the token
     * i.e. The system clock was turned back after acquiring the cached token
     * @param cachedAt
     * @param offset
     */
    static wasClockTurnedBack(cachedAt) {
        const cachedAtSec = Number(cachedAt);
        return cachedAtSec > TimeUtils.nowSeconds();
    }
    /**
     * Waits for t number of milliseconds
     * @param t number
     * @param value T
     */
    static delay(t, value) {
        return new Promise((resolve) => setTimeout(() => resolve(value), t));
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ACCESS_TOKEN Credential Type
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-accesstoken-clientId-contoso.com-user.read
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      cachedAt: Absolute device time when entry was created in the cache.
 *      expiresOn: Token expiry time, calculated based on current UTC time in seconds. Represented as a string.
 *      extendedExpiresOn: Additional extended expiry time until when token is valid in case of server-side outage. Represented as string in UTC seconds.
 *      keyId: used for POP and SSH tokenTypes
 *      tokenType: Type of the token issued. Usually "Bearer"
 * }
 */
class AccessTokenEntity extends CredentialEntity {
    /**
     * Create AccessTokenEntity
     * @param homeAccountId
     * @param environment
     * @param accessToken
     * @param clientId
     * @param tenantId
     * @param scopes
     * @param expiresOn
     * @param extExpiresOn
     */
    static createAccessTokenEntity(homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, cryptoUtils, refreshOn, tokenType, userAssertionHash, keyId, requestedClaims, requestedClaimsHash) {
        const atEntity = new AccessTokenEntity();
        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;
        const currentTime = TimeUtils.nowSeconds();
        atEntity.cachedAt = currentTime.toString();
        /*
         * Token expiry time.
         * This value should be  calculated based on the current UTC time measured locally and the value  expires_in Represented as a string in JSON.
         */
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();
        if (refreshOn) {
            atEntity.refreshOn = refreshOn.toString();
        }
        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;
        atEntity.userAssertionHash = userAssertionHash;
        atEntity.tokenType = StringUtils.isEmpty(tokenType)
            ? AuthenticationScheme.BEARER
            : tokenType;
        if (requestedClaims) {
            atEntity.requestedClaims = requestedClaims;
            atEntity.requestedClaimsHash = requestedClaimsHash;
        }
        /*
         * Create Access Token With Auth Scheme instead of regular access token
         * Cast to lower to handle "bearer" from ADFS
         */
        if (atEntity.tokenType?.toLowerCase() !==
            AuthenticationScheme.BEARER.toLowerCase()) {
            atEntity.credentialType =
                CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
            switch (atEntity.tokenType) {
                case AuthenticationScheme.POP:
                    // Make sure keyId is present and add it to credential
                    const tokenClaims = AuthToken.extractTokenClaims(accessToken, cryptoUtils);
                    if (!tokenClaims?.cnf?.kid) {
                        throw ClientAuthError.createTokenClaimsRequiredError();
                    }
                    atEntity.keyId = tokenClaims.cnf.kid;
                    break;
                case AuthenticationScheme.SSH:
                    atEntity.keyId = keyId;
            }
        }
        return atEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAccessTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity.hasOwnProperty("target") &&
            (entity["credentialType"] === CredentialType.ACCESS_TOKEN ||
                entity["credentialType"] ===
                    CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME));
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * REFRESH_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-refreshtoken-clientId--
 *
 * Value:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 * }
 */
class RefreshTokenEntity extends CredentialEntity {
    /**
     * Create RefreshTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    static createRefreshTokenEntity(homeAccountId, environment, refreshToken, clientId, familyId, userAssertionHash) {
        const rtEntity = new RefreshTokenEntity();
        rtEntity.clientId = clientId;
        rtEntity.credentialType = CredentialType.REFRESH_TOKEN;
        rtEntity.environment = environment;
        rtEntity.homeAccountId = homeAccountId;
        rtEntity.secret = refreshToken;
        rtEntity.userAssertionHash = userAssertionHash;
        if (familyId)
            rtEntity.familyId = familyId;
        return rtEntity;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isRefreshTokenEntity(entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.REFRESH_TOKEN);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * InteractionRequiredServerErrorMessage contains string constants used by error codes and messages returned by the server indicating interaction is required
 */
const InteractionRequiredServerErrorMessage = [
    "interaction_required",
    "consent_required",
    "login_required",
];
const InteractionRequiredAuthSubErrorMessage = [
    "message_only",
    "additional_action",
    "basic_action",
    "user_password_expired",
    "consent_required",
];
/**
 * Interaction required errors defined by the SDK
 */
const InteractionRequiredAuthErrorMessage = {
    noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No refresh token found in the cache. Please sign-in.",
    },
    native_account_unavailable: {
        code: "native_account_unavailable",
        desc: "The requested account is not available in the native broker. It may have been deleted or logged out. Please sign-in again using an interactive API.",
    },
};
/**
 * Error thrown when user interaction is required.
 */
class InteractionRequiredAuthError extends AuthError {
    constructor(errorCode, errorMessage, subError, timestamp, traceId, correlationId, claims) {
        super(errorCode, errorMessage, subError);
        Object.setPrototypeOf(this, InteractionRequiredAuthError.prototype);
        this.timestamp = timestamp || Constants.EMPTY_STRING;
        this.traceId = traceId || Constants.EMPTY_STRING;
        this.correlationId = correlationId || Constants.EMPTY_STRING;
        this.claims = claims || Constants.EMPTY_STRING;
        this.name = "InteractionRequiredAuthError";
    }
    /**
     * Helper function used to determine if an error thrown by the server requires interaction to resolve
     * @param errorCode
     * @param errorString
     * @param subError
     */
    static isInteractionRequiredError(errorCode, errorString, subError) {
        const isInteractionRequiredErrorCode = !!errorCode &&
            InteractionRequiredServerErrorMessage.indexOf(errorCode) > -1;
        const isInteractionRequiredSubError = !!subError &&
            InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
        const isInteractionRequiredErrorDesc = !!errorString &&
            InteractionRequiredServerErrorMessage.some((irErrorCode) => {
                return errorString.indexOf(irErrorCode) > -1;
            });
        return (isInteractionRequiredErrorCode ||
            isInteractionRequiredErrorDesc ||
            isInteractionRequiredSubError);
    }
    /**
     * Creates an error thrown when the authorization code required for a token request is null or empty.
     */
    static createNoTokensFoundError() {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.noTokensFoundError.code, InteractionRequiredAuthErrorMessage.noTokensFoundError.desc);
    }
    /**
     * Creates an error thrown when the native broker returns ACCOUNT_UNAVAILABLE status, indicating that the account was removed and interactive sign-in is required
     * @returns
     */
    static createNativeAccountUnavailableError() {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.native_account_unavailable.code, InteractionRequiredAuthErrorMessage.native_account_unavailable.desc);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class CacheRecord {
    constructor(accountEntity, idTokenEntity, accessTokenEntity, refreshTokenEntity, appMetadataEntity) {
        this.account = accountEntity || null;
        this.idToken = idTokenEntity || null;
        this.accessToken = accessTokenEntity || null;
        this.refreshToken = refreshTokenEntity || null;
        this.appMetadata = appMetadataEntity || null;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which provides helpers for OAuth 2.0 protocol specific values
 */
class ProtocolUtils {
    /**
     * Appends user state with random guid, or returns random guid.
     * @param userState
     * @param randomGuid
     */
    static setRequestState(cryptoObj, userState, meta) {
        const libraryState = ProtocolUtils.generateLibraryState(cryptoObj, meta);
        return !StringUtils.isEmpty(userState)
            ? `${libraryState}${Constants.RESOURCE_DELIM}${userState}`
            : libraryState;
    }
    /**
     * Generates the state value used by the common library.
     * @param randomGuid
     * @param cryptoObj
     */
    static generateLibraryState(cryptoObj, meta) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("generateLibraryState");
        }
        // Create a state object containing a unique id and the timestamp of the request creation
        const stateObj = {
            id: cryptoObj.createNewGuid(),
        };
        if (meta) {
            stateObj.meta = meta;
        }
        const stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
    }
    /**
     * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
     * @param state
     * @param cryptoObj
     */
    static parseRequestState(cryptoObj, state) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("parseRequestState");
        }
        if (StringUtils.isEmpty(state)) {
            throw ClientAuthError.createInvalidStateError(state, "Null, undefined or empty state");
        }
        try {
            // Split the state between library state and user passed state and decode them separately
            const splitState = state.split(Constants.RESOURCE_DELIM);
            const libraryState = splitState[0];
            const userState = splitState.length > 1
                ? splitState.slice(1).join(Constants.RESOURCE_DELIM)
                : Constants.EMPTY_STRING;
            const libraryStateString = cryptoObj.base64Decode(libraryState);
            const libraryStateObj = JSON.parse(libraryStateString);
            return {
                userRequestState: !StringUtils.isEmpty(userState)
                    ? userState
                    : Constants.EMPTY_STRING,
                libraryState: libraryStateObj,
            };
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(state, e);
        }
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Url object class which can perform various transformations on url strings.
 */
class UrlString {
    get urlString() {
        return this._urlString;
    }
    constructor(url) {
        this._urlString = url;
        if (StringUtils.isEmpty(this._urlString)) {
            // Throws error if url is empty
            throw ClientConfigurationError.createUrlEmptyError();
        }
        if (StringUtils.isEmpty(this.getHash())) {
            this._urlString = UrlString.canonicalizeUri(url);
        }
    }
    /**
     * Ensure urls are lower case and end with a / character.
     * @param url
     */
    static canonicalizeUri(url) {
        if (url) {
            let lowerCaseUrl = url.toLowerCase();
            if (StringUtils.endsWith(lowerCaseUrl, "?")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -1);
            }
            else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
                lowerCaseUrl = lowerCaseUrl.slice(0, -2);
            }
            if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    }
    /**
     * Throws if urlString passed is not a valid authority URI string.
     */
    validateAsUri() {
        // Attempts to parse url for uri components
        let components;
        try {
            components = this.getUrlComponents();
        }
        catch (e) {
            throw ClientConfigurationError.createUrlParseError(e);
        }
        // Throw error if URI or path segments are not parseable.
        if (!components.HostNameAndPort || !components.PathSegments) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${this.urlString}`);
        }
        // Throw error if uri is insecure.
        if (!components.Protocol ||
            components.Protocol.toLowerCase() !== "https:") {
            throw ClientConfigurationError.createInsecureAuthorityUriError(this.urlString);
        }
    }
    /**
     * Given a url and a query string return the url with provided query string appended
     * @param url
     * @param queryString
     */
    static appendQueryString(url, queryString) {
        if (StringUtils.isEmpty(queryString)) {
            return url;
        }
        return url.indexOf("?") < 0
            ? `${url}?${queryString}`
            : `${url}&${queryString}`;
    }
    /**
     * Returns a url with the hash removed
     * @param url
     */
    static removeHashFromUrl(url) {
        return UrlString.canonicalizeUri(url.split("#")[0]);
    }
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    replaceTenantPath(tenantId) {
        const urlObject = this.getUrlComponents();
        const pathArray = urlObject.PathSegments;
        if (tenantId &&
            pathArray.length !== 0 &&
            (pathArray[0] === AADAuthorityConstants.COMMON ||
                pathArray[0] === AADAuthorityConstants.ORGANIZATIONS)) {
            pathArray[0] = tenantId;
        }
        return UrlString.constructAuthorityUriFromObject(urlObject);
    }
    /**
     * Returns the anchor part(#) of the URL
     */
    getHash() {
        return UrlString.parseHash(this.urlString);
    }
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    getUrlComponents() {
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        // If url string does not match regEx, we throw an error
        const match = this.urlString.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${this.urlString}`);
        }
        // Url component object
        const urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5],
            QueryString: match[7],
        };
        let pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter((val) => val && val.length > 0); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (!StringUtils.isEmpty(urlComponents.QueryString) &&
            urlComponents.QueryString.endsWith("/")) {
            urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
    }
    static getDomainFromUrl(url) {
        const regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        const match = url.match(regEx);
        if (!match) {
            throw ClientConfigurationError.createUrlParseError(`Given url string: ${url}`);
        }
        return match[2];
    }
    static getAbsoluteUrl(relativeUrl, baseUrl) {
        if (relativeUrl[0] === Constants.FORWARD_SLASH) {
            const url = new UrlString(baseUrl);
            const baseComponents = url.getUrlComponents();
            return (baseComponents.Protocol +
                "//" +
                baseComponents.HostNameAndPort +
                relativeUrl);
        }
        return relativeUrl;
    }
    /**
     * Parses hash string from given string. Returns empty string if no hash symbol is found.
     * @param hashString
     */
    static parseHash(hashString) {
        const hashIndex1 = hashString.indexOf("#");
        const hashIndex2 = hashString.indexOf("#/");
        if (hashIndex2 > -1) {
            return hashString.substring(hashIndex2 + 2);
        }
        else if (hashIndex1 > -1) {
            return hashString.substring(hashIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Parses query string from given string. Returns empty string if no query symbol is found.
     * @param queryString
     */
    static parseQueryString(queryString) {
        const queryIndex1 = queryString.indexOf("?");
        const queryIndex2 = queryString.indexOf("/?");
        if (queryIndex2 > -1) {
            return queryString.substring(queryIndex2 + 2);
        }
        else if (queryIndex1 > -1) {
            return queryString.substring(queryIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Parses query server response string from given string.
     * Extract hash between '?code=' and '#' if trailing '# is present.
     * Returns empty string if no query symbol is found.
     * @param queryString
     */
    static parseQueryServerResponse(queryString) {
        const queryIndex1 = queryString.indexOf("?code");
        const queryIndex2 = queryString.indexOf("/?code");
        const hashIndex = queryString.indexOf("#");
        if (queryIndex2 > -1 && hashIndex > -1) {
            return queryString.substring(queryIndex2 + 2, hashIndex);
        }
        else if (queryIndex2 > -1) {
            return queryString.substring(queryIndex2 + 2);
        }
        else if (queryIndex1 > -1 && hashIndex > -1) {
            return queryString.substring(queryIndex1 + 1, hashIndex);
        }
        else if (queryIndex1 > -1) {
            return queryString.substring(queryIndex1 + 1);
        }
        return Constants.EMPTY_STRING;
    }
    static constructAuthorityUriFromObject(urlObject) {
        return new UrlString(urlObject.Protocol +
            "//" +
            urlObject.HostNameAndPort +
            "/" +
            urlObject.PathSegments.join("/"));
    }
    /**
     * Returns URL hash as server auth code response object.
     */
    static getDeserializedHash(hash) {
        // Check if given hash is empty
        if (StringUtils.isEmpty(hash)) {
            return {};
        }
        // Strip the # symbol if present
        const parsedHash = UrlString.parseHash(hash);
        // If # symbol was not present, above will return empty string, so give original hash value
        const deserializedHash = StringUtils.queryStringToObject(StringUtils.isEmpty(parsedHash) ? hash : parsedHash);
        // Check if deserialization didn't work
        if (!deserializedHash) {
            throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedHash));
        }
        return deserializedHash;
    }
    /**
     * Returns URL query string as server auth code response object.
     */
    static getDeserializedQueryString(query) {
        // Check if given query is empty
        if (StringUtils.isEmpty(query)) {
            return {};
        }
        // Strip the ? symbol if present
        const parsedQueryString = UrlString.parseQueryString(query);
        // If ? symbol was not present, above will return empty string, so give original query value
        const deserializedQueryString = StringUtils.queryStringToObject(StringUtils.isEmpty(parsedQueryString)
            ? query
            : parsedQueryString);
        // Check if deserialization didn't work
        if (!deserializedQueryString) {
            throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedQueryString));
        }
        return deserializedQueryString;
    }
    /**
     * Returns either deserialized query string or deserialized hash, depending on the serverResponseType
     * as a server auth code response object.
     */
    static getDeserializedCodeResponse(serverResponseType, hashFragment) {
        const hashUrlString = new UrlString(hashFragment);
        let serverParams;
        if (serverResponseType === ServerResponseType.QUERY) {
            serverParams = UrlString.getDeserializedQueryString(hashFragment);
        }
        else {
            serverParams = UrlString.getDeserializedHash(hashUrlString.getHash());
        }
        return serverParams;
    }
    /**
     * Check if the hash of the URL string contains known properties
     */
    static hashContainsKnownProperties(hash) {
        if (StringUtils.isEmpty(hash) || hash.indexOf("=") < 0) {
            // Hash doesn't contain key/value pairs
            return false;
        }
        const parameters = UrlString.getDeserializedHash(hash);
        return !!(parameters.code ||
            parameters.error_description ||
            parameters.error ||
            parameters.state);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Enumeration of operations that are instrumented by have their performance measured by the PerformanceClient.
 *
 * @export
 * @enum {number}
 */
const PerformanceEvents = {
    /**
     * acquireTokenByCode API (msal-browser and msal-node).
     * Used to acquire tokens by trading an authorization code against the token endpoint.
     */
    AcquireTokenByCode: "acquireTokenByCode",
    /**
     * acquireTokenByRefreshToken API (msal-browser and msal-node).
     * Used to renew an access token using a refresh token against the token endpoint.
     */
    AcquireTokenByRefreshToken: "acquireTokenByRefreshToken",
    /**
     * acquireTokenSilent API (msal-browser and msal-node).
     * Used to silently acquire a new access token (from the cache or the network).
     */
    AcquireTokenSilent: "acquireTokenSilent",
    /**
     * acquireTokenSilentAsync (msal-browser).
     * Internal API for acquireTokenSilent.
     */
    AcquireTokenSilentAsync: "acquireTokenSilentAsync",
    /**
     * acquireTokenPopup (msal-browser).
     * Used to acquire a new access token interactively through pop ups
     */
    AcquireTokenPopup: "acquireTokenPopup",
    /**
     * getPublicKeyThumbprint API in CryptoOpts class (msal-browser).
     * Used to generate a public/private keypair and generate a public key thumbprint for pop requests.
     */
    CryptoOptsGetPublicKeyThumbprint: "cryptoOptsGetPublicKeyThumbprint",
    /**
     * signJwt API in CryptoOpts class (msal-browser).
     * Used to signed a pop token.
     */
    CryptoOptsSignJwt: "cryptoOptsSignJwt",
    /**
     * acquireToken API in the SilentCacheClient class (msal-browser).
     * Used to read access tokens from the cache.
     */
    SilentCacheClientAcquireToken: "silentCacheClientAcquireToken",
    /**
     * acquireToken API in the SilentIframeClient class (msal-browser).
     * Used to acquire a new set of tokens from the authorize endpoint in a hidden iframe.
     */
    SilentIframeClientAcquireToken: "silentIframeClientAcquireToken",
    /**
     * acquireToken API in SilentRereshClient (msal-browser).
     * Used to acquire a new set of tokens from the token endpoint using a refresh token.
     */
    SilentRefreshClientAcquireToken: "silentRefreshClientAcquireToken",
    /**
     * ssoSilent API (msal-browser).
     * Used to silently acquire an authorization code and set of tokens using a hidden iframe.
     */
    SsoSilent: "ssoSilent",
    /**
     * getDiscoveredAuthority API in StandardInteractionClient class (msal-browser).
     * Used to load authority metadata for a request.
     */
    StandardInteractionClientGetDiscoveredAuthority: "standardInteractionClientGetDiscoveredAuthority",
    /**
     * acquireToken APIs in msal-browser.
     * Used to make an /authorize endpoint call with native brokering enabled.
     */
    FetchAccountIdWithNativeBroker: "fetchAccountIdWithNativeBroker",
    /**
     * acquireToken API in NativeInteractionClient class (msal-browser).
     * Used to acquire a token from Native component when native brokering is enabled.
     */
    NativeInteractionClientAcquireToken: "nativeInteractionClientAcquireToken",
    /**
     * Time spent creating default headers for requests to token endpoint
     */
    BaseClientCreateTokenRequestHeaders: "baseClientCreateTokenRequestHeaders",
    /**
     * Used to measure the time taken for completing embedded-broker handshake (PW-Broker).
     */
    BrokerHandhshake: "brokerHandshake",
    /**
     * acquireTokenByRefreshToken API in BrokerClientApplication (PW-Broker) .
     */
    AcquireTokenByRefreshTokenInBroker: "acquireTokenByRefreshTokenInBroker",
    /**
     * Time taken for token acquisition by broker
     */
    AcquireTokenByBroker: "acquireTokenByBroker",
    /**
     * Time spent on the network for refresh token acquisition
     */
    RefreshTokenClientExecuteTokenRequest: "refreshTokenClientExecuteTokenRequest",
    /**
     * Time taken for acquiring refresh token , records RT size
     */
    RefreshTokenClientAcquireToken: "refreshTokenClientAcquireToken",
    /**
     * Time taken for acquiring cached refresh token
     */
    RefreshTokenClientAcquireTokenWithCachedRefreshToken: "refreshTokenClientAcquireTokenWithCachedRefreshToken",
    /**
     * acquireTokenByRefreshToken API in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientAcquireTokenByRefreshToken: "refreshTokenClientAcquireTokenByRefreshToken",
    /**
     * Helper function to create token request body in RefreshTokenClient (msal-common).
     */
    RefreshTokenClientCreateTokenRequestBody: "refreshTokenClientCreateTokenRequestBody",
    /**
     * acquireTokenFromCache (msal-browser).
     * Internal API for acquiring token from cache
     */
    AcquireTokenFromCache: "acquireTokenFromCache",
    /**
     * acquireTokenBySilentIframe (msal-browser).
     * Internal API for acquiring token by silent Iframe
     */
    AcquireTokenBySilentIframe: "acquireTokenBySilentIframe",
    /**
     * Internal API for initializing base request in BaseInteractionClient (msal-browser)
     */
    InitializeBaseRequest: "initializeBaseRequest",
    /**
     * Internal API for initializing silent request in SilentCacheClient (msal-browser)
     */
    InitializeSilentRequest: "initializeSilentRequest",
    InitializeClientApplication: "initializeClientApplication",
    /**
     * Helper function in SilentIframeClient class (msal-browser).
     */
    SilentIframeClientTokenHelper: "silentIframeClientTokenHelper",
    /**
     * SilentHandler
     */
    SilentHandlerInitiateAuthRequest: "silentHandlerInitiateAuthRequest",
    SilentHandlerMonitorIframeForHash: "silentHandlerMonitorIframeForHash",
    SilentHandlerLoadFrame: "silentHandlerLoadFrame",
    /**
     * Helper functions in StandardInteractionClient class (msal-browser)
     */
    StandardInteractionClientCreateAuthCodeClient: "standardInteractionClientCreateAuthCodeClient",
    StandardInteractionClientGetClientConfiguration: "standardInteractionClientGetClientConfiguration",
    StandardInteractionClientInitializeAuthorizationRequest: "standardInteractionClientInitializeAuthorizationRequest",
    StandardInteractionClientInitializeAuthorizationCodeRequest: "standardInteractionClientInitializeAuthorizationCodeRequest",
    /**
     * getAuthCodeUrl API (msal-browser and msal-node).
     */
    GetAuthCodeUrl: "getAuthCodeUrl",
    /**
     * Functions from InteractionHandler (msal-browser)
     */
    HandleCodeResponseFromServer: "handleCodeResponseFromServer",
    HandleCodeResponseFromHash: "handleCodeResponseFromHash",
    UpdateTokenEndpointAuthority: "updateTokenEndpointAuthority",
    /**
     * APIs in Authorization Code Client (msal-common)
     */
    AuthClientAcquireToken: "authClientAcquireToken",
    AuthClientExecuteTokenRequest: "authClientExecuteTokenRequest",
    AuthClientCreateTokenRequestBody: "authClientCreateTokenRequestBody",
    AuthClientCreateQueryString: "authClientCreateQueryString",
    /**
     * Generate functions in PopTokenGenerator (msal-common)
     */
    PopTokenGenerateCnf: "popTokenGenerateCnf",
    PopTokenGenerateKid: "popTokenGenerateKid",
    /**
     * handleServerTokenResponse API in ResponseHandler (msal-common)
     */
    HandleServerTokenResponse: "handleServerTokenResponse",
    /**
     * Authority functions
     */
    AuthorityFactoryCreateDiscoveredInstance: "authorityFactoryCreateDiscoveredInstance",
    AuthorityResolveEndpointsAsync: "authorityResolveEndpointsAsync",
    AuthorityGetCloudDiscoveryMetadataFromNetwork: "authorityGetCloudDiscoveryMetadataFromNetwork",
    AuthorityUpdateCloudDiscoveryMetadata: "authorityUpdateCloudDiscoveryMetadata",
    AuthorityGetEndpointMetadataFromNetwork: "authorityGetEndpointMetadataFromNetwork",
    AuthorityUpdateEndpointMetadata: "authorityUpdateEndpointMetadata",
    AuthorityUpdateMetadataWithRegionalInformation: "authorityUpdateMetadataWithRegionalInformation",
    /**
     * Region Discovery functions
     */
    RegionDiscoveryDetectRegion: "regionDiscoveryDetectRegion",
    RegionDiscoveryGetRegionFromIMDS: "regionDiscoveryGetRegionFromIMDS",
    RegionDiscoveryGetCurrentVersion: "regionDiscoveryGetCurrentVersion",
    AcquireTokenByCodeAsync: "acquireTokenByCodeAsync",
    GetEndpointMetadataFromNetwork: "getEndpointMetadataFromNetwork",
    GetCloudDiscoveryMetadataFromNetworkMeasurement: "getCloudDiscoveryMetadataFromNetworkMeasurement",
    HandleRedirectPromiseMeasurement: "handleRedirectPromiseMeasurement",
    UpdateCloudDiscoveryMetadataMeasurement: "updateCloudDiscoveryMetadataMeasurement",
    UsernamePasswordClientAcquireToken: "usernamePasswordClientAcquireToken",
    NativeMessageHandlerHandshake: "nativeMessageHandlerHandshake",
    NativeGenerateAuthResult: "nativeGenerateAuthResult",
};
/**
 * State of the performance event.
 *
 * @export
 * @enum {number}
 */
const PerformanceEventStatus = {
    NotStarted: 0,
    InProgress: 1,
    Completed: 2,
};
const IntFields = new Set([
    "accessTokenSize",
    "durationMs",
    "idTokenSize",
    "matsSilentStatus",
    "matsHttpStatus",
    "refreshTokenSize",
    "queuedTimeMs",
    "startTimeMs",
    "status",
]);

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const KeyLocation = {
    SW: "sw",
    UHW: "uhw",
};
class PopTokenGenerator {
    constructor(cryptoUtils, performanceClient) {
        this.cryptoUtils = cryptoUtils;
        this.performanceClient = performanceClient;
    }
    /**
     * Generates the req_cnf validated at the RP in the POP protocol for SHR parameters
     * and returns an object containing the keyid, the full req_cnf string and the req_cnf string hash
     * @param request
     * @returns
     */
    async generateCnf(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateKid, request.correlationId);
        const reqCnf = await this.generateKid(request);
        const reqCnfString = this.cryptoUtils.base64Encode(JSON.stringify(reqCnf));
        return {
            kid: reqCnf.kid,
            reqCnfString,
            reqCnfHash: await this.cryptoUtils.hashString(reqCnfString),
        };
    }
    /**
     * Generates key_id for a SHR token request
     * @param request
     * @returns
     */
    async generateKid(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.PopTokenGenerateKid, request.correlationId);
        const kidThumbprint = await this.cryptoUtils.getPublicKeyThumbprint(request);
        return {
            kid: kidThumbprint,
            xms_ksl: KeyLocation.SW,
        };
    }
    /**
     * Signs the POP access_token with the local generated key-pair
     * @param accessToken
     * @param request
     * @returns
     */
    async signPopToken(accessToken, keyId, request) {
        return this.signPayload(accessToken, keyId, request);
    }
    /**
     * Utility function to generate the signed JWT for an access_token
     * @param payload
     * @param kid
     * @param request
     * @param claims
     * @returns
     */
    async signPayload(payload, keyId, request, claims) {
        // Deconstruct request to extract SHR parameters
        const { resourceRequestMethod, resourceRequestUri, shrClaims, shrNonce, } = request;
        const resourceUrlString = resourceRequestUri
            ? new UrlString(resourceRequestUri)
            : undefined;
        const resourceUrlComponents = resourceUrlString?.getUrlComponents();
        return await this.cryptoUtils.signJwt({
            at: payload,
            ts: TimeUtils.nowSeconds(),
            m: resourceRequestMethod?.toUpperCase(),
            u: resourceUrlComponents?.HostNameAndPort,
            nonce: shrNonce || this.cryptoUtils.createNewGuid(),
            p: resourceUrlComponents?.AbsolutePath,
            q: resourceUrlComponents?.QueryString
                ? [[], resourceUrlComponents.QueryString]
                : undefined,
            client_claims: shrClaims || undefined,
            ...claims,
        }, keyId, request.correlationId);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * APP_METADATA Cache
 *
 * Key:Value Schema:
 *
 * Key: appmetadata-<environment>-<client_id>
 *
 * Value:
 * {
 *      clientId: client ID of the application
 *      environment: entity that issued the token, represented as a full host
 *      familyId: Family ID identifier, '1' represents Microsoft Family
 * }
 */
class AppMetadataEntity {
    /**
     * Generate AppMetadata Cache Key as per the schema: appmetadata-<environment>-<client_id>
     */
    generateAppMetadataKey() {
        return AppMetadataEntity.generateAppMetadataCacheKey(this.environment, this.clientId);
    }
    /**
     * Generate AppMetadata Cache Key
     */
    static generateAppMetadataCacheKey(environment, clientId) {
        const appMetaDataKeyArray = [
            APP_METADATA,
            environment,
            clientId,
        ];
        return appMetaDataKeyArray
            .join(Separators.CACHE_KEY_SEPARATOR)
            .toLowerCase();
    }
    /**
     * Creates AppMetadataEntity
     * @param clientId
     * @param environment
     * @param familyId
     */
    static createAppMetadataEntity(clientId, environment, familyId) {
        const appMetadata = new AppMetadataEntity();
        appMetadata.clientId = clientId;
        appMetadata.environment = environment;
        if (familyId) {
            appMetadata.familyId = familyId;
        }
        return appMetadata;
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAppMetadataEntity(key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(APP_METADATA) === 0 &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("environment"));
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class instance helps track the memory changes facilitating
 * decisions to read from and write to the persistent cache
 */ class TokenCacheContext {
    constructor(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
    }
    /**
     * boolean which indicates the changes in cache
     */
    get cacheHasChanged() {
        return this.hasChanged;
    }
    /**
     * function to retrieve the token cache
     */
    get tokenCache() {
        return this.cache;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class that handles response parsing.
 */
class ResponseHandler {
    constructor(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin, performanceClient) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
        this.performanceClient = performanceClient;
    }
    /**
     * Function which validates server authorization code response.
     * @param serverResponseHash
     * @param cachedState
     * @param cryptoObj
     */
    validateServerAuthorizationCodeResponse(serverResponseHash, cachedState, cryptoObj) {
        if (!serverResponseHash.state || !cachedState) {
            throw serverResponseHash.state
                ? ClientAuthError.createStateNotFoundError("Cached State")
                : ClientAuthError.createStateNotFoundError("Server State");
        }
        let decodedServerResponseHash;
        let decodedCachedState;
        try {
            decodedServerResponseHash = decodeURIComponent(serverResponseHash.state);
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(serverResponseHash.state, `Server response hash URI could not be decoded`);
        }
        try {
            decodedCachedState = decodeURIComponent(cachedState);
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(serverResponseHash.state, `Cached state URI could not be decoded`);
        }
        if (decodedServerResponseHash !== decodedCachedState) {
            throw ClientAuthError.createStateMismatchError();
        }
        // Check for error
        if (serverResponseHash.error ||
            serverResponseHash.error_description ||
            serverResponseHash.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponseHash.error, serverResponseHash.error_description, serverResponseHash.suberror)) {
                throw new InteractionRequiredAuthError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror, serverResponseHash.timestamp || Constants.EMPTY_STRING, serverResponseHash.trace_id || Constants.EMPTY_STRING, serverResponseHash.correlation_id || Constants.EMPTY_STRING, serverResponseHash.claims || Constants.EMPTY_STRING);
            }
            throw new ServerError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
        }
        if (serverResponseHash.client_info) {
            buildClientInfo(serverResponseHash.client_info, cryptoObj);
        }
    }
    /**
     * Function which validates server authorization token response.
     * @param serverResponse
     */
    validateTokenResponse(serverResponse) {
        // Check for error
        if (serverResponse.error ||
            serverResponse.error_description ||
            serverResponse.suberror) {
            if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
                throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror, serverResponse.timestamp || Constants.EMPTY_STRING, serverResponse.trace_id || Constants.EMPTY_STRING, serverResponse.correlation_id || Constants.EMPTY_STRING, serverResponse.claims || Constants.EMPTY_STRING);
            }
            const errString = `${serverResponse.error_codes} - [${serverResponse.timestamp}]: ${serverResponse.error_description} - Correlation ID: ${serverResponse.correlation_id} - Trace ID: ${serverResponse.trace_id}`;
            throw new ServerError(serverResponse.error, errString, serverResponse.suberror);
        }
    }
    /**
     * Returns a constructed token response based on given string. Also manages the cache updates and cleanups.
     * @param serverTokenResponse
     * @param authority
     */
    async handleServerTokenResponse(serverTokenResponse, authority, reqTimestamp, request, authCodePayload, userAssertionHash, handlingRefreshTokenResponse, forceCacheRefreshTokenResponse, serverRequestId) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.HandleServerTokenResponse, serverTokenResponse.correlation_id);
        // create an idToken object (not entity)
        let idTokenObj;
        if (serverTokenResponse.id_token) {
            idTokenObj = new AuthToken(serverTokenResponse.id_token || Constants.EMPTY_STRING, this.cryptoObj);
            // token nonce check (TODO: Add a warning if no nonce is given?)
            if (authCodePayload &&
                !StringUtils.isEmpty(authCodePayload.nonce)) {
                if (idTokenObj.claims.nonce !== authCodePayload.nonce) {
                    throw ClientAuthError.createNonceMismatchError();
                }
            }
            // token max_age check
            if (request.maxAge || request.maxAge === 0) {
                const authTime = idTokenObj.claims.auth_time;
                if (!authTime) {
                    throw ClientAuthError.createAuthTimeNotFoundError();
                }
                AuthToken.checkMaxAge(authTime, request.maxAge);
            }
        }
        // generate homeAccountId
        this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenObj?.claims);
        // save the response tokens
        let requestStateObj;
        if (!!authCodePayload && !!authCodePayload.state) {
            requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
        }
        // Add keyId from request to serverTokenResponse if defined
        serverTokenResponse.key_id =
            serverTokenResponse.key_id || request.sshKid || undefined;
        const cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenObj, userAssertionHash, authCodePayload);
        let cacheContext;
        try {
            if (this.persistencePlugin && this.serializableCache) {
                this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                cacheContext = new TokenCacheContext(this.serializableCache, true);
                await this.persistencePlugin.beforeCacheAccess(cacheContext);
            }
            /*
             * When saving a refreshed tokens to the cache, it is expected that the account that was used is present in the cache.
             * If not present, we should return null, as it's the case that another application called removeAccount in between
             * the calls to getAllAccounts and acquireTokenSilent. We should not overwrite that removal, unless explicitly flagged by
             * the developer, as in the case of refresh token flow used in ADAL Node to MSAL Node migration.
             */
            if (handlingRefreshTokenResponse &&
                !forceCacheRefreshTokenResponse &&
                cacheRecord.account) {
                const key = cacheRecord.account.generateAccountKey();
                const account = this.cacheStorage.getAccount(key);
                if (!account) {
                    this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                    return ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj, undefined, serverRequestId);
                }
            }
            await this.cacheStorage.saveCacheRecord(cacheRecord, request.storeInCache);
        }
        finally {
            if (this.persistencePlugin &&
                this.serializableCache &&
                cacheContext) {
                this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                await this.persistencePlugin.afterCacheAccess(cacheContext);
            }
        }
        return ResponseHandler.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj, serverTokenResponse, serverRequestId);
    }
    /**
     * Generates CacheRecord
     * @param serverTokenResponse
     * @param idTokenObj
     * @param authority
     */
    generateCacheRecord(serverTokenResponse, authority, reqTimestamp, request, idTokenObj, userAssertionHash, authCodePayload) {
        const env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
            throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        // IdToken: non AAD scenarios can have empty realm
        let cachedIdToken;
        let cachedAccount;
        if (!StringUtils.isEmpty(serverTokenResponse.id_token) &&
            !!idTokenObj) {
            cachedIdToken = IdTokenEntity.createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token || Constants.EMPTY_STRING, this.clientId, idTokenObj.claims.tid || Constants.EMPTY_STRING);
            cachedAccount = AccountEntity.createAccount({
                homeAccountId: this.homeAccountIdentifier,
                idTokenClaims: idTokenObj.claims,
                clientInfo: serverTokenResponse.client_info,
                cloudGraphHostName: authCodePayload?.cloud_graph_host_name,
                msGraphHost: authCodePayload?.msgraph_host,
            }, authority);
        }
        // AccessToken
        let cachedAccessToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.access_token)) {
            // If scopes not returned in server response, use request scopes
            const responseScopes = serverTokenResponse.scope
                ? ScopeSet.fromString(serverTokenResponse.scope)
                : new ScopeSet(request.scopes || []);
            /*
             * Use timestamp calculated before request
             * Server may return timestamps as strings, parse to numbers if so.
             */
            const expiresIn = (typeof serverTokenResponse.expires_in === "string"
                ? parseInt(serverTokenResponse.expires_in, 10)
                : serverTokenResponse.expires_in) || 0;
            const extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string"
                ? parseInt(serverTokenResponse.ext_expires_in, 10)
                : serverTokenResponse.ext_expires_in) || 0;
            const refreshIn = (typeof serverTokenResponse.refresh_in === "string"
                ? parseInt(serverTokenResponse.refresh_in, 10)
                : serverTokenResponse.refresh_in) || undefined;
            const tokenExpirationSeconds = reqTimestamp + expiresIn;
            const extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
            const refreshOnSeconds = refreshIn && refreshIn > 0
                ? reqTimestamp + refreshIn
                : undefined;
            // non AAD scenarios can have empty realm
            cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token || Constants.EMPTY_STRING, this.clientId, idTokenObj
                ? idTokenObj.claims.tid || Constants.EMPTY_STRING
                : authority.tenant, responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj, refreshOnSeconds, serverTokenResponse.token_type, userAssertionHash, serverTokenResponse.key_id, request.claims, request.requestedClaimsHash);
        }
        // refreshToken
        let cachedRefreshToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.refresh_token)) {
            cachedRefreshToken = RefreshTokenEntity.createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token || Constants.EMPTY_STRING, this.clientId, serverTokenResponse.foci, userAssertionHash);
        }
        // appMetadata
        let cachedAppMetadata = null;
        if (!StringUtils.isEmpty(serverTokenResponse.foci)) {
            cachedAppMetadata = AppMetadataEntity.createAppMetadataEntity(this.clientId, env, serverTokenResponse.foci);
        }
        return new CacheRecord(cachedAccount, cachedIdToken, cachedAccessToken, cachedRefreshToken, cachedAppMetadata);
    }
    /**
     * Creates an @AuthenticationResult from @CacheRecord , @IdToken , and a boolean that states whether or not the result is from cache.
     *
     * Optionally takes a state string that is set as-is in the response.
     *
     * @param cacheRecord
     * @param idTokenObj
     * @param fromTokenCache
     * @param stateString
     */
    static async generateAuthenticationResult(cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenObj, requestState, serverTokenResponse, requestId) {
        let accessToken = Constants.EMPTY_STRING;
        let responseScopes = [];
        let expiresOn = null;
        let extExpiresOn;
        let familyId = Constants.EMPTY_STRING;
        if (cacheRecord.accessToken) {
            if (cacheRecord.accessToken.tokenType === AuthenticationScheme.POP) {
                const popTokenGenerator = new PopTokenGenerator(cryptoObj);
                const { secret, keyId } = cacheRecord.accessToken;
                if (!keyId) {
                    throw ClientAuthError.createKeyIdMissingError();
                }
                accessToken = await popTokenGenerator.signPopToken(secret, keyId, request);
            }
            else {
                accessToken = cacheRecord.accessToken.secret;
            }
            responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
            expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
            extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
        }
        if (cacheRecord.appMetadata) {
            familyId =
                cacheRecord.appMetadata.familyId === THE_FAMILY_ID
                    ? THE_FAMILY_ID
                    : Constants.EMPTY_STRING;
        }
        const uid = idTokenObj?.claims.oid ||
            idTokenObj?.claims.sub ||
            Constants.EMPTY_STRING;
        const tid = idTokenObj?.claims.tid || Constants.EMPTY_STRING;
        // for hybrid + native bridge enablement, send back the native account Id
        if (serverTokenResponse?.spa_accountid && !!cacheRecord.account) {
            cacheRecord.account.nativeAccountId =
                serverTokenResponse?.spa_accountid;
        }
        return {
            authority: authority.canonicalAuthority,
            uniqueId: uid,
            tenantId: tid,
            scopes: responseScopes,
            account: cacheRecord.account
                ? cacheRecord.account.getAccountInfo()
                : null,
            idToken: idTokenObj ? idTokenObj.rawToken : Constants.EMPTY_STRING,
            idTokenClaims: idTokenObj ? idTokenObj.claims : {},
            accessToken: accessToken,
            fromCache: fromTokenCache,
            expiresOn: expiresOn,
            correlationId: request.correlationId,
            requestId: requestId || Constants.EMPTY_STRING,
            extExpiresOn: extExpiresOn,
            familyId: familyId,
            tokenType: cacheRecord.accessToken?.tokenType || Constants.EMPTY_STRING,
            state: requestState
                ? requestState.userRequestState
                : Constants.EMPTY_STRING,
            cloudGraphHostName: cacheRecord.account?.cloudGraphHostName ||
                Constants.EMPTY_STRING,
            msGraphHost: cacheRecord.account?.msGraphHost || Constants.EMPTY_STRING,
            code: serverTokenResponse?.spa_code,
            fromNativeBroker: false,
        };
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Oauth2.0 Authorization Code client
 */
class AuthorizationCodeClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
        // Flag to indicate if client is for hybrid spa auth code redemption
        this.includeRedirectUri = true;
        this.oidcDefaultScopes =
            this.config.authOptions.authority.options.OIDCOptions?.defaultScopes;
    }
    /**
     * Creates the URL of the authorization request letting the user input credentials and consent to the
     * application. The URL target the /authorize endpoint of the authority configured in the
     * application object.
     *
     * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
     * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
     * acquireToken(AuthorizationCodeRequest)
     * @param request
     */
    async getAuthCodeUrl(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.GetAuthCodeUrl, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthClientCreateQueryString, request.correlationId);
        const queryString = await this.createAuthCodeUrlQueryString(request);
        return UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString);
    }
    /**
     * API to acquire a token in exchange of 'authorization_code` acquired by the user in the first leg of the
     * authorization_code_grant
     * @param request
     */
    async acquireToken(request, authCodePayload) {
        if (!request || !request.code) {
            throw ClientAuthError.createTokenRequestCannotBeMadeError();
        }
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientAcquireToken, request.correlationId);
        const atsMeasurement = this.performanceClient?.startMeasurement(
        // @ts-ignore
        "AuthCodeClientAcquireToken", request.correlationId);
        this.logger.info("in acquireToken call in auth-code client");
        const reqTimestamp = TimeUtils.nowSeconds();
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthClientExecuteTokenRequest, request.correlationId);
        const response = await this.executeTokenRequest(this.authority, request);
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const httpVerAuthority = response.headers?.[HeaderNames.X_MS_HTTP_VERSION];
        if (httpVerAuthority) {
            atsMeasurement?.add({
                httpVerAuthority,
            });
        }
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin, this.performanceClient);
        // Validate response. This function throws a server error if an error is returned by the server.
        responseHandler.validateTokenResponse(response.body);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.HandleServerTokenResponse, request.correlationId);
        return responseHandler
            .handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, authCodePayload, undefined, undefined, undefined, requestId)
            .then((result) => {
            atsMeasurement?.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            this.logger.verbose("Error in fetching token in ACC", request.correlationId);
            atsMeasurement?.end({
                errorCode: error.errorCode,
                subErrorCode: error.subError,
                success: false,
            });
            throw error;
        });
    }
    /**
     * Handles the hash fragment response from public client code request. Returns a code response used by
     * the client to exchange for a token in acquireToken.
     * @param hashFragment
     */
    handleFragmentResponse(hashFragment, cachedState) {
        // Handle responses.
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        const serverParams = UrlString.getDeserializedCodeResponse(this.config.authOptions.authority.options.OIDCOptions
            ?.serverResponseType, hashFragment);
        // Get code response
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState, this.cryptoUtils);
        // throw when there is no auth code in the response
        if (!serverParams.code) {
            throw ClientAuthError.createNoAuthCodeInServerResponseError();
        }
        return {
            ...serverParams,
            // Code param is optional in ServerAuthorizationCodeResponse but required in AuthorizationCodePaylod
            code: serverParams.code,
        };
    }
    /**
     * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param authorityUri
     */
    getLogoutUri(logoutRequest) {
        // Throw error if logoutRequest is null/undefined
        if (!logoutRequest) {
            throw ClientConfigurationError.createEmptyLogoutRequestError();
        }
        const queryString = this.createLogoutUrlQueryString(logoutRequest);
        // Construct logout URI
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
    }
    /**
     * Executes POST request to token endpoint
     * @param authority
     * @param request
     */
    async executeTokenRequest(authority, request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientExecuteTokenRequest, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthClientCreateTokenRequestBody, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await this.createTokenRequestBody(request);
        let ccsCredential = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                ccsCredential = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        const headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint);
    }
    /**
     * Generates a map for all the params to be sent to the service
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateTokenRequestBody, request.correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(request.tokenBodyParameters?.[AADServerParamKeys.CLIENT_ID] ||
            this.config.authOptions.clientId);
        /*
         * For hybrid spa flow, there will be a code but no verifier
         * In this scenario, don't include redirect uri as auth code will not be bound to redirect URI
         */
        if (!this.includeRedirectUri) {
            // Just validate
            RequestValidator.validateRedirectUri(request.redirectUri);
        }
        else {
            // Validate and include redirect uri
            parameterBuilder.addRedirectUri(request.redirectUri);
        }
        // Add scope array, parameter builder will add default scopes and dedupe
        parameterBuilder.addScopes(request.scopes, true, this.oidcDefaultScopes);
        // add code: user set, not validated
        parameterBuilder.addAuthorizationCode(request.code);
        // Add library metadata
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        // add code_verifier if passed
        if (request.codeVerifier) {
            parameterBuilder.addCodeVerifier(request.codeVerifier);
        }
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
        parameterBuilder.addClientInfo();
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
            const reqCnfData = await popTokenGenerator.generateCnf(request);
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData.reqCnfString);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                throw ClientConfigurationError.createMissingSshJwkError();
            }
        }
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        let ccsCred = undefined;
        if (request.clientInfo) {
            try {
                const clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                ccsCred = {
                    credential: `${clientInfo.uid}${Separators.CLIENT_INFO_SEPARATOR}${clientInfo.utid}`,
                    type: CcsCredentialType.HOME_ACCOUNT_ID,
                };
            }
            catch (e) {
                this.logger.verbose("Could not parse client info for CCS Header: " + e);
            }
        }
        else {
            ccsCred = request.ccsCredential;
        }
        // Adds these as parameters in the request instead of headers to prevent CORS preflight request
        if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
            switch (ccsCred.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(ccsCred.credential);
                    break;
            }
        }
        if (request.tokenBodyParameters) {
            parameterBuilder.addExtraQueryParameters(request.tokenBodyParameters);
        }
        // Add hybrid spa parameters if not already provided
        if (request.enableSpaAuthorizationCode &&
            (!request.tokenBodyParameters ||
                !request.tokenBodyParameters[AADServerParamKeys.RETURN_SPA_CODE])) {
            parameterBuilder.addExtraQueryParameters({
                [AADServerParamKeys.RETURN_SPA_CODE]: "1",
            });
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `AuthorizationCodeUrlRequest` and creates a URL
     * @param request
     */
    async createAuthCodeUrlQueryString(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthClientCreateQueryString, request.correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(request.extraQueryParameters?.[AADServerParamKeys.CLIENT_ID] ||
            this.config.authOptions.clientId);
        const requestScopes = [
            ...(request.scopes || []),
            ...(request.extraScopesToConsent || []),
        ];
        parameterBuilder.addScopes(requestScopes, true, this.oidcDefaultScopes);
        // validate the redirectUri (to be a non null value)
        parameterBuilder.addRedirectUri(request.redirectUri);
        // generate the correlationId if not set by the user and add
        const correlationId = request.correlationId ||
            this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        // add response_mode. If not passed in it defaults to query.
        parameterBuilder.addResponseMode(request.responseMode);
        // add response_type = code
        parameterBuilder.addResponseTypeCode();
        // add library info parameters
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        if (!isOidcProtocolMode(this.config)) {
            parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        }
        // add client_info=1
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
            parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
            parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
            parameterBuilder.addDomainHint(request.domainHint);
        }
        // Add sid or loginHint with preference for login_hint claim (in request) -> sid -> loginHint (upn/email) -> username of AccountInfo object
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
            // AAD will throw if prompt=select_account is passed with an account hint
            if (request.sid && request.prompt === PromptValue.NONE) {
                // SessionID is only used in silent calls
                this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
                parameterBuilder.addSid(request.sid);
            }
            else if (request.account) {
                const accountSid = this.extractAccountSid(request.account);
                const accountLoginHintClaim = this.extractLoginHint(request.account);
                // If login_hint claim is present, use it over sid/username
                if (accountLoginHintClaim) {
                    this.logger.verbose("createAuthCodeUrlQueryString: login_hint claim present on account");
                    parameterBuilder.addLoginHint(accountLoginHintClaim);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (accountSid && request.prompt === PromptValue.NONE) {
                    /*
                     * If account and loginHint are provided, we will check account first for sid before adding loginHint
                     * SessionId is only used in silent calls
                     */
                    this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
                    parameterBuilder.addSid(accountSid);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
                else if (request.loginHint) {
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
                    parameterBuilder.addLoginHint(request.loginHint);
                    parameterBuilder.addCcsUpn(request.loginHint);
                }
                else if (request.account.username) {
                    // Fallback to account username if provided
                    this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
                    parameterBuilder.addLoginHint(request.account.username);
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("createAuthCodeUrlQueryString: Could not parse home account ID for CCS Header");
                    }
                }
            }
            else if (request.loginHint) {
                this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
                parameterBuilder.addLoginHint(request.loginHint);
                parameterBuilder.addCcsUpn(request.loginHint);
            }
        }
        else {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
            parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (!StringUtils.isEmpty(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        if (request.nativeBroker) {
            // signal ests that this is a WAM call
            parameterBuilder.addNativeBroker();
            // pass the req_cnf for POP
            if (request.authenticationScheme === AuthenticationScheme.POP) {
                const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                // to reduce the URL length, it is recommended to send the hash of the req_cnf instead of the whole string
                const reqCnfData = await popTokenGenerator.generateCnf(request);
                parameterBuilder.addPopToken(reqCnfData.reqCnfHash);
            }
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * This API validates the `EndSessionRequest` and creates a URL
     * @param request
     */
    createLogoutUrlQueryString(request) {
        const parameterBuilder = new RequestParameterBuilder();
        if (request.postLogoutRedirectUri) {
            parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
            parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
            parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        if (request.state) {
            parameterBuilder.addState(request.state);
        }
        if (request.logoutHint) {
            parameterBuilder.addLogoutHint(request.logoutHint);
        }
        if (request.extraQueryParameters) {
            parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        return parameterBuilder.createQueryString();
    }
    /**
     * Helper to get sid from account. Returns null if idTokenClaims are not present or sid is not present.
     * @param account
     */
    extractAccountSid(account) {
        return account.idTokenClaims?.sid || null;
    }
    extractLoginHint(account) {
        return account.idTokenClaims?.login_hint || null;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * OAuth2.0 refresh token client
 */
class RefreshTokenClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    async acquireToken(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        const atsMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        this.logger.verbose("RefreshTokenClientAcquireToken called", request.correlationId);
        const reqTimestamp = TimeUtils.nowSeconds();
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        const response = await this.executeTokenRequest(request, this.authority);
        const httpVerToken = response.headers?.[HeaderNames.X_MS_HTTP_VERSION];
        atsMeasurement?.add({
            refreshTokenSize: response.body.refresh_token?.length || 0,
        });
        if (httpVerToken) {
            atsMeasurement?.add({
                httpVerToken,
            });
        }
        // Retrieve requestId from response headers
        const requestId = response.headers?.[HeaderNames.X_MS_REQUEST_ID];
        const responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
        responseHandler.validateTokenResponse(response.body);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.HandleServerTokenResponse, request.correlationId);
        return responseHandler
            .handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, undefined, undefined, true, request.forceCache, requestId)
            .then((result) => {
            atsMeasurement?.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            this.logger.verbose("Error in fetching refresh token", request.correlationId);
            atsMeasurement?.end({
                errorCode: error.errorCode,
                subErrorCode: error.subError,
                success: false,
            });
            throw error;
        });
    }
    /**
     * Gets cached refresh token and attaches to request, then calls acquireToken API
     * @param request
     */
    async acquireTokenByRefreshToken(request) {
        // Cannot renew token if no request object is given.
        if (!request) {
            throw ClientConfigurationError.createEmptyTokenRequestError();
        }
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenByRefreshToken, request.correlationId);
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw ClientAuthError.createNoAccountInSilentRequestError();
        }
        // try checking if FOCI is enabled for the given application
        const isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment);
        // if the app is part of the family, retrive a Family refresh token if present and make a refreshTokenRequest
        if (isFOCI) {
            try {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
                return this.acquireTokenWithCachedRefreshToken(request, true);
            }
            catch (e) {
                const noFamilyRTInCache = e instanceof InteractionRequiredAuthError &&
                    e.errorCode ===
                        InteractionRequiredAuthErrorMessage.noTokensFoundError
                            .code;
                const clientMismatchErrorWithFamilyRT = e instanceof ServerError &&
                    e.errorCode === Errors.INVALID_GRANT_ERROR &&
                    e.subError === Errors.CLIENT_MISMATCH_ERROR;
                // if family Refresh Token (FRT) cache acquisition fails or if client_mismatch error is seen with FRT, reattempt with application Refresh Token (ART)
                if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
                    return this.acquireTokenWithCachedRefreshToken(request, false);
                    // throw in all other cases
                }
                else {
                    throw e;
                }
            }
        }
        // fall back to application refresh token acquisition
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        return this.acquireTokenWithCachedRefreshToken(request, false);
    }
    /**
     * makes a network call to acquire tokens by exchanging RefreshToken available in userCache; throws if refresh token is not cached
     * @param request
     */
    async acquireTokenWithCachedRefreshToken(request, foci) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        // fetches family RT or application RT based on FOCI value
        const atsMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientAcquireTokenWithCachedRefreshToken, request.correlationId);
        this.logger.verbose("RefreshTokenClientAcquireTokenWithCachedRefreshToken called", request.correlationId);
        const refreshToken = this.cacheManager.getRefreshToken(request.account, foci);
        if (!refreshToken) {
            atsMeasurement?.discard();
            throw InteractionRequiredAuthError.createNoTokensFoundError();
        }
        // attach cached RT size to the current measurement
        atsMeasurement?.end({
            success: true,
        });
        const refreshTokenRequest = {
            ...request,
            refreshToken: refreshToken.secret,
            authenticationScheme: request.authenticationScheme || AuthenticationScheme.BEARER,
            ccsCredential: {
                credential: request.account.homeAccountId,
                type: CcsCredentialType.HOME_ACCOUNT_ID,
            },
        };
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireToken, request.correlationId);
        return this.acquireToken(refreshTokenRequest);
    }
    /**
     * Constructs the network message and makes a NW call to the underlying secure token service
     * @param request
     * @param authority
     */
    async executeTokenRequest(request, authority) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        const acquireTokenMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.RefreshTokenClientExecuteTokenRequest, request.correlationId);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, request.correlationId);
        const queryParametersString = this.createTokenQueryParameters(request);
        const endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParametersString);
        const requestBody = await this.createTokenRequestBody(request);
        const headers = this.createTokenRequestHeaders(request.ccsCredential);
        const thumbprint = {
            clientId: this.config.authOptions.clientId,
            authority: authority.canonicalAuthority,
            scopes: request.scopes,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        return this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)
            .then((result) => {
            acquireTokenMeasurement?.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            acquireTokenMeasurement?.end({
                success: false,
            });
            throw error;
        });
    }
    /**
     * Helper function to create the token request body
     * @param request
     */
    async createTokenRequestBody(request) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RefreshTokenClientCreateTokenRequestBody, request.correlationId);
        const correlationId = request.correlationId;
        const acquireTokenMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.BaseClientCreateTokenRequestHeaders, correlationId);
        const parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, true, this.config.authOptions.authority.options.OIDCOptions?.defaultScopes);
        parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addApplicationTelemetry(this.config.telemetry.application);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager && !isOidcProtocolMode(this.config)) {
            parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRefreshToken(request.refreshToken);
        if (this.config.clientCredentials.clientSecret) {
            parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
            const clientAssertion = this.config.clientCredentials.clientAssertion;
            parameterBuilder.addClientAssertion(clientAssertion.assertion);
            parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            const popTokenGenerator = new PopTokenGenerator(this.cryptoUtils, this.performanceClient);
            this.performanceClient?.setPreQueueTime(PerformanceEvents.PopTokenGenerateCnf, request.correlationId);
            const reqCnfData = await popTokenGenerator.generateCnf(request);
            // SPA PoP requires full Base64Url encoded req_cnf string (unhashed)
            parameterBuilder.addPopToken(reqCnfData.reqCnfString);
        }
        else if (request.authenticationScheme === AuthenticationScheme.SSH) {
            if (request.sshJwk) {
                parameterBuilder.addSshJwk(request.sshJwk);
            }
            else {
                acquireTokenMeasurement?.end({
                    success: false,
                });
                throw ClientConfigurationError.createMissingSshJwkError();
            }
        }
        if (!StringUtils.isEmptyObj(request.claims) ||
            (this.config.authOptions.clientCapabilities &&
                this.config.authOptions.clientCapabilities.length > 0)) {
            parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight &&
            request.ccsCredential) {
            switch (request.ccsCredential.type) {
                case CcsCredentialType.HOME_ACCOUNT_ID:
                    try {
                        const clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                    }
                    catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " +
                            e);
                    }
                    break;
                case CcsCredentialType.UPN:
                    parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                    break;
            }
        }
        acquireTokenMeasurement?.end({
            success: true,
        });
        return parameterBuilder.createQueryString();
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentFlowClient extends BaseClient {
    constructor(configuration, performanceClient) {
        super(configuration, performanceClient);
    }
    /**
     * Retrieves a token from cache if it is still valid, or uses the cached refresh token to renew
     * the given token and returns the renewed token
     * @param request
     */
    async acquireToken(request) {
        try {
            return await this.acquireCachedToken(request);
        }
        catch (e) {
            if (e instanceof ClientAuthError &&
                e.errorCode === ClientAuthErrorMessage.tokenRefreshRequired.code) {
                const refreshTokenClient = new RefreshTokenClient(this.config, this.performanceClient);
                return refreshTokenClient.acquireTokenByRefreshToken(request);
            }
            else {
                throw e;
            }
        }
    }
    /**
     * Retrieves token from cache or throws an error if it must be refreshed.
     * @param request
     */
    async acquireCachedToken(request) {
        // Cannot renew token if no request object is given.
        if (!request) {
            throw ClientConfigurationError.createEmptyTokenRequestError();
        }
        if (request.forceRefresh) {
            // Must refresh due to present force_refresh flag.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.FORCE_REFRESH);
            this.logger.info("SilentFlowClient:acquireCachedToken - Skipping cache because forceRefresh is true.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (!this.config.cacheOptions.claimsBasedCachingEnabled &&
            !StringUtils.isEmptyObj(request.claims)) {
            // Must refresh due to request parameters.
            this.logger.info("SilentFlowClient:acquireCachedToken - Skipping cache because claims-based caching is disabled and claims were requested.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        // We currently do not support silent flow for account === null use cases; This will be revisited for confidential flow usecases
        if (!request.account) {
            throw ClientAuthError.createNoAccountInSilentRequestError();
        }
        const environment = request.authority || this.authority.getPreferredCache();
        const cacheRecord = this.cacheManager.readCacheRecord(request.account, request, environment);
        if (!cacheRecord.accessToken) {
            // Must refresh due to non-existent access_token.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
            this.logger.info("SilentFlowClient:acquireCachedToken - No access token found in cache for the given properties.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (TimeUtils.wasClockTurnedBack(cacheRecord.accessToken.cachedAt) ||
            TimeUtils.isTokenExpired(cacheRecord.accessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
            // Must refresh due to expired access_token.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
            this.logger.info(`SilentFlowClient:acquireCachedToken - Cached access token is expired or will expire within ${this.config.systemOptions.tokenRenewalOffsetSeconds} seconds.`);
            throw ClientAuthError.createRefreshRequiredError();
        }
        else if (cacheRecord.accessToken.refreshOn &&
            TimeUtils.isTokenExpired(cacheRecord.accessToken.refreshOn, 0)) {
            // Must refresh due to the refresh_in value.
            this.serverTelemetryManager?.setCacheOutcome(CacheOutcome.REFRESH_CACHED_ACCESS_TOKEN);
            this.logger.info("SilentFlowClient:acquireCachedToken - Cached access token's refreshOn property has been exceeded'.");
            throw ClientAuthError.createRefreshRequiredError();
        }
        if (this.config.serverTelemetryManager) {
            this.config.serverTelemetryManager.incrementCacheHits();
        }
        return await this.generateResultFromCacheRecord(cacheRecord, request);
    }
    /**
     * Helper function to build response object from the CacheRecord
     * @param cacheRecord
     */
    async generateResultFromCacheRecord(cacheRecord, request) {
        let idTokenObj;
        if (cacheRecord.idToken) {
            idTokenObj = new AuthToken(cacheRecord.idToken.secret, this.config.cryptoInterface);
        }
        // token max_age check
        if (request.maxAge || request.maxAge === 0) {
            const authTime = idTokenObj?.claims.auth_time;
            if (!authTime) {
                throw ClientAuthError.createAuthTimeNotFoundError();
            }
            AuthToken.checkMaxAge(authTime, request.maxAge);
        }
        return await ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenObj);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isOpenIdConfigResponse(response) {
    return (response.hasOwnProperty("authorization_endpoint") &&
        response.hasOwnProperty("token_endpoint") &&
        response.hasOwnProperty("issuer") &&
        response.hasOwnProperty("jwks_uri"));
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const rawMetdataJSON = {
    endpointMetadata: {
        "https://login.microsoftonline.com/common/": {
            token_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/common/": {
            token_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/common/": {
            token_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/common/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/common/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/common/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
        "https://login.microsoftonline.com/consumers/": {
            token_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/consumers/": {
            token_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/consumers/": {
            token_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/consumers/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/9188040d-6c67-4c5b-b112-36a304b66dad/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/consumers/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/consumers/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
        "https://login.microsoftonline.com/organizations/": {
            token_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.com/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.com/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.com/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.com/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.com",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pas.windows.net",
        },
        "https://login.chinacloudapi.cn/organizations/": {
            token_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.chinacloudapi.cn/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.partner.microsoftonline.cn/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://microsoftgraph.chinacloudapi.cn/oidc/userinfo",
            authorization_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.chinacloudapi.cn/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.chinacloudapi.cn/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "partner.microsoftonline.cn",
            cloud_graph_host_name: "graph.chinacloudapi.cn",
            msgraph_host: "microsoftgraph.chinacloudapi.cn",
            rbac_url: "https://pas.chinacloudapi.cn",
        },
        "https://login.microsoftonline.us/organizations/": {
            token_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/token",
            token_endpoint_auth_methods_supported: [
                "client_secret_post",
                "private_key_jwt",
                "client_secret_basic",
            ],
            jwks_uri: "https://login.microsoftonline.us/organizations/discovery/v2.0/keys",
            response_modes_supported: ["query", "fragment", "form_post"],
            subject_types_supported: ["pairwise"],
            id_token_signing_alg_values_supported: ["RS256"],
            response_types_supported: [
                "code",
                "id_token",
                "code id_token",
                "id_token token",
            ],
            scopes_supported: ["openid", "profile", "email", "offline_access"],
            issuer: "https://login.microsoftonline.us/{tenantid}/v2.0",
            request_uri_parameter_supported: false,
            userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
            authorization_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/authorize",
            device_authorization_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/devicecode",
            http_logout_supported: true,
            frontchannel_logout_supported: true,
            end_session_endpoint: "https://login.microsoftonline.us/organizations/oauth2/v2.0/logout",
            claims_supported: [
                "sub",
                "iss",
                "cloud_instance_name",
                "cloud_instance_host_name",
                "cloud_graph_host_name",
                "msgraph_host",
                "aud",
                "exp",
                "iat",
                "auth_time",
                "acr",
                "nonce",
                "preferred_username",
                "name",
                "tid",
                "ver",
                "at_hash",
                "c_hash",
                "email",
            ],
            kerberos_endpoint: "https://login.microsoftonline.us/organizations/kerberos",
            tenant_region_scope: null,
            cloud_instance_name: "microsoftonline.us",
            cloud_graph_host_name: "graph.windows.net",
            msgraph_host: "graph.microsoft.com",
            rbac_url: "https://pasff.usgovcloudapi.net",
        },
    },
    instanceDiscoveryMetadata: {
        "https://login.microsoftonline.com/common/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/common/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/common/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/common/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.com/consumers/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/consumers/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/consumers/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/consumers/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.com/organizations/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.chinacloudapi.cn/organizations/": {
            tenant_discovery_endpoint: "https://login.chinacloudapi.cn/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
        "https://login.microsoftonline.us/organizations/": {
            tenant_discovery_endpoint: "https://login.microsoftonline.us/organizations/v2.0/.well-known/openid-configuration",
            "api-version": "1.1",
            metadata: [
                {
                    preferred_network: "login.microsoftonline.com",
                    preferred_cache: "login.windows.net",
                    aliases: [
                        "login.microsoftonline.com",
                        "login.windows.net",
                        "login.microsoft.com",
                        "sts.windows.net",
                    ],
                },
                {
                    preferred_network: "login.partner.microsoftonline.cn",
                    preferred_cache: "login.partner.microsoftonline.cn",
                    aliases: [
                        "login.partner.microsoftonline.cn",
                        "login.chinacloudapi.cn",
                    ],
                },
                {
                    preferred_network: "login.microsoftonline.de",
                    preferred_cache: "login.microsoftonline.de",
                    aliases: ["login.microsoftonline.de"],
                },
                {
                    preferred_network: "login.microsoftonline.us",
                    preferred_cache: "login.microsoftonline.us",
                    aliases: [
                        "login.microsoftonline.us",
                        "login.usgovcloudapi.net",
                    ],
                },
                {
                    preferred_network: "login-us.microsoftonline.com",
                    preferred_cache: "login-us.microsoftonline.com",
                    aliases: ["login-us.microsoftonline.com"],
                },
            ],
        },
    },
};
const EndpointMetadata = rawMetdataJSON.endpointMetadata;
const InstanceDiscoveryMetadata = rawMetdataJSON.instanceDiscoveryMetadata;
const InstanceDiscoveryMetadataAliases = new Set();
for (const key in InstanceDiscoveryMetadata) {
    for (const metadata of InstanceDiscoveryMetadata[key].metadata) {
        for (const alias of metadata.aliases) {
            InstanceDiscoveryMetadataAliases.add(alias);
        }
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class AuthorityMetadataEntity {
    constructor() {
        this.expiresAt =
            TimeUtils.nowSeconds() +
                AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Update the entity with new aliases, preferred_cache and preferred_network values
     * @param metadata
     * @param fromNetwork
     */
    updateCloudDiscoveryMetadata(metadata, fromNetwork) {
        this.aliases = metadata.aliases;
        this.preferred_cache = metadata.preferred_cache;
        this.preferred_network = metadata.preferred_network;
        this.aliasesFromNetwork = fromNetwork;
    }
    /**
     * Update the entity with new endpoints
     * @param metadata
     * @param fromNetwork
     */
    updateEndpointMetadata(metadata, fromNetwork) {
        this.authorization_endpoint = metadata.authorization_endpoint;
        this.token_endpoint = metadata.token_endpoint;
        this.end_session_endpoint = metadata.end_session_endpoint;
        this.issuer = metadata.issuer;
        this.endpointsFromNetwork = fromNetwork;
        this.jwks_uri = metadata.jwks_uri;
    }
    /**
     * Save the authority that was used to create this cache entry
     * @param authority
     */
    updateCanonicalAuthority(authority) {
        this.canonical_authority = authority;
    }
    /**
     * Reset the exiresAt value
     */
    resetExpiresAt() {
        this.expiresAt =
            TimeUtils.nowSeconds() +
                AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
    }
    /**
     * Returns whether or not the data needs to be refreshed
     */
    isExpired() {
        return this.expiresAt <= TimeUtils.nowSeconds();
    }
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    static isAuthorityMetadataEntity(key, entity) {
        if (!entity) {
            return false;
        }
        return (key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 &&
            entity.hasOwnProperty("aliases") &&
            entity.hasOwnProperty("preferred_cache") &&
            entity.hasOwnProperty("preferred_network") &&
            entity.hasOwnProperty("canonical_authority") &&
            entity.hasOwnProperty("authorization_endpoint") &&
            entity.hasOwnProperty("token_endpoint") &&
            entity.hasOwnProperty("issuer") &&
            entity.hasOwnProperty("aliasesFromNetwork") &&
            entity.hasOwnProperty("endpointsFromNetwork") &&
            entity.hasOwnProperty("expiresAt") &&
            entity.hasOwnProperty("jwks_uri"));
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryResponse(response) {
    return (response.hasOwnProperty("tenant_discovery_endpoint") &&
        response.hasOwnProperty("metadata"));
}

/*! @azure/msal-common v14.0.1 2023-08-11 */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
function isCloudInstanceDiscoveryErrorResponse(response) {
    return (response.hasOwnProperty("error") &&
        response.hasOwnProperty("error_description"));
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RegionDiscovery {
    constructor(networkInterface, performanceClient, correlationId) {
        this.networkInterface = networkInterface;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
    }
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    async detectRegion(environmentRegion, regionDiscoveryMetadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryDetectRegion, this.correlationId);
        // Initialize auto detected region with the region from the envrionment
        let autodetectedRegionName = environmentRegion;
        // Check if a region was detected from the environment, if not, attempt to get the region from IMDS
        if (!autodetectedRegionName) {
            const options = RegionDiscovery.IMDS_OPTIONS;
            try {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
                const localIMDSVersionResponse = await this.getRegionFromIMDS(Constants.IMDS_VERSION, options);
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpSuccess) {
                    autodetectedRegionName = localIMDSVersionResponse.body;
                    regionDiscoveryMetadata.region_source =
                        RegionDiscoverySources.IMDS;
                }
                // If the response using the local IMDS version failed, try to fetch the current version of IMDS and retry.
                if (localIMDSVersionResponse.status ===
                    ResponseCodes.httpBadRequest) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.correlationId);
                    const currentIMDSVersion = await this.getCurrentVersion(options);
                    if (!currentIMDSVersion) {
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        return null;
                    }
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
                    const currentIMDSVersionResponse = await this.getRegionFromIMDS(currentIMDSVersion, options);
                    if (currentIMDSVersionResponse.status ===
                        ResponseCodes.httpSuccess) {
                        autodetectedRegionName =
                            currentIMDSVersionResponse.body;
                        regionDiscoveryMetadata.region_source =
                            RegionDiscoverySources.IMDS;
                    }
                }
            }
            catch (e) {
                regionDiscoveryMetadata.region_source =
                    RegionDiscoverySources.FAILED_AUTO_DETECTION;
                return null;
            }
        }
        else {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.ENVIRONMENT_VARIABLE;
        }
        // If no region was auto detected from the environment or from the IMDS endpoint, mark the attempt as a FAILED_AUTO_DETECTION
        if (!autodetectedRegionName) {
            regionDiscoveryMetadata.region_source =
                RegionDiscoverySources.FAILED_AUTO_DETECTION;
        }
        return autodetectedRegionName || null;
    }
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    async getRegionFromIMDS(version, options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetRegionFromIMDS, this.correlationId);
        return this.networkInterface.sendGetRequestAsync(`${Constants.IMDS_ENDPOINT}?api-version=${version}&format=text`, options, Constants.IMDS_TIMEOUT);
    }
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    async getCurrentVersion(options) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.RegionDiscoveryGetCurrentVersion, this.correlationId);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(`${Constants.IMDS_ENDPOINT}?format=json`, options);
            // When IMDS endpoint is called without the api version query param, bad request response comes back with latest version.
            if (response.status === ResponseCodes.httpBadRequest &&
                response.body &&
                response.body["newest-versions"] &&
                response.body["newest-versions"].length > 0) {
                return response.body["newest-versions"][0];
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
}
// Options for the IMDS endpoint request
RegionDiscovery.IMDS_OPTIONS = {
    headers: {
        Metadata: "true",
    },
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The authority class validates the authority URIs used by the user, and retrieves the OpenID Configuration Data from the
 * endpoint. It will store the pertinent config data in this object for use during token calls.
 */
class Authority {
    constructor(authority, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscoveryMetadata = {
            region_used: undefined,
            region_source: undefined,
            region_outcome: undefined,
        };
        this.logger = logger;
        this.performanceClient = performanceClient;
        this.correlationId = correlationId;
        this.regionDiscovery = new RegionDiscovery(networkInterface, this.performanceClient, this.correlationId);
    }
    /**
     * Get {@link AuthorityType}
     * @param authorityUri {@link IUri}
     * @private
     */
    getAuthorityType(authorityUri) {
        // CIAM auth url pattern is being standardized as: <tenant>.ciamlogin.com
        if (authorityUri.HostNameAndPort.endsWith(Constants.CIAM_AUTH_URL)) {
            return AuthorityType.Ciam;
        }
        const pathSegments = authorityUri.PathSegments;
        if (pathSegments.length) {
            switch (pathSegments[0].toLowerCase()) {
                case Constants.ADFS:
                    return AuthorityType.Adfs;
                case Constants.DSTS:
                    return AuthorityType.Dsts;
            }
        }
        return AuthorityType.Default;
    }
    // See above for AuthorityType
    get authorityType() {
        return this.getAuthorityType(this.canonicalAuthorityUrlComponents);
    }
    /**
     * ProtocolMode enum representing the way endpoints are constructed.
     */
    get protocolMode() {
        return this.authorityOptions.protocolMode;
    }
    /**
     * Returns authorityOptions which can be used to reinstantiate a new authority instance
     */
    get options() {
        return this.authorityOptions;
    }
    /**
     * A URL that is the authority set by the developer
     */
    get canonicalAuthority() {
        return this._canonicalAuthority.urlString;
    }
    /**
     * Sets canonical authority.
     */
    set canonicalAuthority(url) {
        this._canonicalAuthority = new UrlString(url);
        this._canonicalAuthority.validateAsUri();
        this._canonicalAuthorityUrlComponents = null;
    }
    /**
     * Get authority components.
     */
    get canonicalAuthorityUrlComponents() {
        if (!this._canonicalAuthorityUrlComponents) {
            this._canonicalAuthorityUrlComponents =
                this._canonicalAuthority.getUrlComponents();
        }
        return this._canonicalAuthorityUrlComponents;
    }
    /**
     * Get hostname and port i.e. login.microsoftonline.com
     */
    get hostnameAndPort() {
        return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
    }
    /**
     * Get tenant for authority.
     */
    get tenant() {
        return this.canonicalAuthorityUrlComponents.PathSegments[0];
    }
    /**
     * OAuth /authorize endpoint for requests
     */
    get authorizationEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.authorization_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth /token endpoint for requests
     */
    get tokenEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    get deviceCodeEndpoint() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth logout endpoint for requests
     */
    get endSessionEndpoint() {
        if (this.discoveryComplete()) {
            // ROPC policies may not have end_session_endpoint set
            if (!this.metadata.end_session_endpoint) {
                throw ClientAuthError.createLogoutNotSupportedError();
            }
            return this.replacePath(this.metadata.end_session_endpoint);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * OAuth issuer for requests
     */
    get selfSignedJwtAudience() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.issuer);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Jwks_uri for token signing keys
     */
    get jwksUri() {
        if (this.discoveryComplete()) {
            return this.replacePath(this.metadata.jwks_uri);
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Returns a flag indicating that tenant name can be replaced in authority {@link IUri}
     * @param authorityUri {@link IUri}
     * @private
     */
    canReplaceTenant(authorityUri) {
        return (authorityUri.PathSegments.length === 1 &&
            !Authority.reservedTenantDomains.has(authorityUri.PathSegments[0]) &&
            this.getAuthorityType(authorityUri) === AuthorityType.Default &&
            this.protocolMode === ProtocolMode.AAD);
    }
    /**
     * Replaces tenant in url path with current tenant. Defaults to common.
     * @param urlString
     */
    replaceTenant(urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
    }
    /**
     * Replaces path such as tenant or policy with the current tenant or policy.
     * @param urlString
     */
    replacePath(urlString) {
        let endpoint = urlString;
        const cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        const cachedAuthorityUrlComponents = cachedAuthorityUrl.getUrlComponents();
        const cachedAuthorityParts = cachedAuthorityUrlComponents.PathSegments;
        const currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach((currentPart, index) => {
            let cachedPart = cachedAuthorityParts[index];
            if (index === 0 &&
                this.canReplaceTenant(cachedAuthorityUrlComponents)) {
                const tenantId = new UrlString(this.metadata.authorization_endpoint).getUrlComponents().PathSegments[0];
                /**
                 * Check if AAD canonical authority contains tenant domain name, for example "testdomain.onmicrosoft.com",
                 * by comparing its first path segment to the corresponding authorization endpoint path segment, which is
                 * always resolved with tenant id by OIDC.
                 */
                if (cachedPart !== tenantId) {
                    this.logger.verbose(`Replacing tenant domain name ${cachedPart} with id ${tenantId}`);
                    cachedPart = tenantId;
                }
            }
            if (currentPart !== cachedPart) {
                endpoint = endpoint.replace(`/${cachedPart}/`, `/${currentPart}/`);
            }
        });
        return this.replaceTenant(endpoint);
    }
    /**
     * The default open id configuration endpoint for any canonical authority.
     */
    get defaultOpenIdConfigurationEndpoint() {
        const canonicalAuthorityHost = this.hostnameAndPort;
        if (this.authorityType === AuthorityType.Adfs ||
            !this.isAliasOfKnownMicrosoftAuthority(canonicalAuthorityHost)) {
            return `${this.canonicalAuthority}.well-known/openid-configuration`;
        }
        return `${this.canonicalAuthority}v2.0/.well-known/openid-configuration`;
    }
    /**
     * Boolean that returns whethr or not tenant discovery has been completed.
     */
    discoveryComplete() {
        return !!this.metadata;
    }
    /**
     * Perform endpoint discovery to discover aliases, preferred_cache, preferred_network
     * and the /authorize, /token and logout endpoints.
     */
    async resolveEndpointsAsync() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityResolveEndpointsAsync, this.correlationId);
        let metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
        if (!metadataEntity) {
            metadataEntity = new AuthorityMetadataEntity();
            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
        }
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
        const cloudDiscoverySource = await this.updateCloudDiscoveryMetadata(metadataEntity);
        this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateEndpointMetadata, this.correlationId);
        const endpointSource = await this.updateEndpointMetadata(metadataEntity);
        if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE &&
            endpointSource !== AuthorityMetadataSource.CACHE) {
            // Reset the expiration time unless both values came from a successful cache lookup
            metadataEntity.resetExpiresAt();
            metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
        }
        const cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
        this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
        this.metadata = metadataEntity;
    }
    /**
     * Update AuthorityMetadataEntity with new endpoints and return where the information came from
     * @param metadataEntity
     */
    async updateEndpointMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateEndpointMetadata, this.correlationId);
        this.logger.verbose("Attempting to get endpoint metadata from authority configuration");
        let metadata = this.getEndpointMetadataFromConfig();
        if (metadata) {
            this.logger.verbose("Found endpoint metadata in authority configuration");
            metadataEntity.updateEndpointMetadata(metadata, false);
            return AuthorityMetadataSource.CONFIG;
        }
        this.logger.verbose("Did not find endpoint metadata in the config... Attempting to get endpoint metadata from the hardcoded values.");
        // skipAuthorityMetadataCache is used to bypass hardcoded authority metadata and force a network metadata cache lookup and network metadata request if no cached response is available.
        if (this.authorityOptions.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get endpoint metadata from the network metadata cache.");
        }
        else {
            let hardcodedMetadata = this.getEndpointMetadataFromHardcodedValues();
            if (hardcodedMetadata) {
                this.logger.verbose("Found endpoint metadata from hardcoded values.");
                // If the user prefers to use an azure region replace the global endpoints with regional information.
                if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                    this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
                    this.logger.verbose("Found azure region configuration. Updating endpoints with regional information.");
                    hardcodedMetadata =
                        await this.updateMetadataWithRegionalInformation(hardcodedMetadata);
                }
                metadataEntity.updateEndpointMetadata(hardcodedMetadata, false);
                return AuthorityMetadataSource.HARDCODED_VALUES;
            }
            else {
                this.logger.verbose("Did not find endpoint metadata in hardcoded values... Attempting to get endpoint metadata from the network metadata cache.");
            }
        }
        // Check cached metadata entity expiration status
        const metadataEntityExpired = metadataEntity.isExpired();
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.endpointsFromNetwork &&
            !metadataEntityExpired) {
            // No need to update
            this.logger.verbose("Found endpoint metadata in the cache.");
            return AuthorityMetadataSource.CACHE;
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        this.logger.verbose("Did not find cached endpoint metadata... Attempting to get endpoint metadata from the network.");
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        metadata = await this.getEndpointMetadataFromNetwork();
        if (metadata) {
            this.logger.verbose("Endpoint metadata was successfully returned from getEndpointMetadataFromNetwork()");
            // If the user prefers to use an azure region replace the global endpoints with regional information.
            if (this.authorityOptions.azureRegionConfiguration?.azureRegion) {
                this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
                this.logger.verbose("Found azure region configuration. Updating endpoints with regional information.");
                metadata = await this.updateMetadataWithRegionalInformation(metadata);
            }
            metadataEntity.updateEndpointMetadata(metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        else {
            // Metadata could not be obtained from the config, cache, network or hardcoded values
            this.logger.error("Did not find endpoint metadata from network... Metadata could not be obtained from config, cache, network or hardcoded values. Throwing Untrusted Authority Error.");
            throw ClientAuthError.createUnableToGetOpenidConfigError(this.defaultOpenIdConfigurationEndpoint);
        }
    }
    /**
     * Compares the number of url components after the domain to determine if the cached
     * authority metadata can be used for the requested authority. Protects against same domain different
     * authority such as login.microsoftonline.com/tenant and login.microsoftonline.com/tfp/tenant/policy
     * @param metadataEntity
     */
    isAuthoritySameType(metadataEntity) {
        const cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        const cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return (cachedParts.length ===
            this.canonicalAuthorityUrlComponents.PathSegments.length);
    }
    /**
     * Parse authorityMetadata config option
     */
    getEndpointMetadataFromConfig() {
        if (this.authorityOptions.authorityMetadata) {
            try {
                return JSON.parse(this.authorityOptions.authorityMetadata);
            }
            catch (e) {
                throw ClientConfigurationError.createInvalidAuthorityMetadataError();
            }
        }
        return null;
    }
    /**
     * Gets OAuth endpoints from the given OpenID configuration endpoint.
     *
     * @param hasHardcodedMetadata boolean
     */
    async getEndpointMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        const perfEvent = this.performanceClient?.startMeasurement(PerformanceEvents.AuthorityGetEndpointMetadataFromNetwork, this.correlationId);
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        const openIdConfigurationEndpoint = this.defaultOpenIdConfigurationEndpoint;
        this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: attempting to retrieve OAuth endpoints from ${openIdConfigurationEndpoint}`);
        try {
            const response = await this.networkInterface.sendGetRequestAsync(openIdConfigurationEndpoint, options);
            const isValidResponse = isOpenIdConfigResponse(response.body);
            if (isValidResponse) {
                perfEvent?.end({ success: true });
                return response.body;
            }
            else {
                perfEvent?.end({
                    success: false,
                    errorCode: "invalid_response",
                });
                this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: could not parse response as OpenID configuration`);
                return null;
            }
        }
        catch (e) {
            perfEvent?.end({
                success: false,
                errorCode: "request_failure",
            });
            this.logger.verbose(`Authority.getEndpointMetadataFromNetwork: ${e}`);
            return null;
        }
    }
    /**
     * Get OAuth endpoints for common authorities.
     */
    getEndpointMetadataFromHardcodedValues() {
        if (this.canonicalAuthority in EndpointMetadata) {
            return EndpointMetadata[this.canonicalAuthority];
        }
        return null;
    }
    /**
     * Update the retrieved metadata with regional information.
     * User selected Azure region will be used if configured.
     */
    async updateMetadataWithRegionalInformation(metadata) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateMetadataWithRegionalInformation, this.correlationId);
        const userConfiguredAzureRegion = this.authorityOptions.azureRegionConfiguration?.azureRegion;
        if (userConfiguredAzureRegion) {
            if (userConfiguredAzureRegion !==
                Constants.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                this.regionDiscoveryMetadata.region_used =
                    userConfiguredAzureRegion;
                return Authority.replaceWithRegionalInformation(metadata, userConfiguredAzureRegion);
            }
            this.performanceClient?.setPreQueueTime(PerformanceEvents.RegionDiscoveryDetectRegion, this.correlationId);
            const autodetectedRegionName = await this.regionDiscovery.detectRegion(this.authorityOptions.azureRegionConfiguration
                ?.environmentRegion, this.regionDiscoveryMetadata);
            if (autodetectedRegionName) {
                this.regionDiscoveryMetadata.region_outcome =
                    RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL;
                this.regionDiscoveryMetadata.region_used =
                    autodetectedRegionName;
                return Authority.replaceWithRegionalInformation(metadata, autodetectedRegionName);
            }
            this.regionDiscoveryMetadata.region_outcome =
                RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
        }
        return metadata;
    }
    /**
     * Updates the AuthorityMetadataEntity with new aliases, preferred_network and preferred_cache
     * and returns where the information was retrieved from
     * @param metadataEntity
     * @returns AuthorityMetadataSource
     */
    async updateCloudDiscoveryMetadata(metadataEntity) {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityUpdateCloudDiscoveryMetadata, this.correlationId);
        this.logger.verbose("Attempting to get cloud discovery metadata  from authority configuration");
        this.logger.verbosePii(`Known Authorities: ${this.authorityOptions.knownAuthorities ||
            Constants.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Authority Metadata: ${this.authorityOptions.authorityMetadata ||
            Constants.NOT_APPLICABLE}`);
        this.logger.verbosePii(`Canonical Authority: ${metadataEntity.canonical_authority || Constants.NOT_APPLICABLE}`);
        let metadata = this.getCloudDiscoveryMetadataFromConfig();
        if (metadata) {
            this.logger.verbose("Found cloud discovery metadata in authority configuration");
            metadataEntity.updateCloudDiscoveryMetadata(metadata, false);
            return AuthorityMetadataSource.CONFIG;
        }
        // If the cached metadata came from config but that config was not passed to this instance, we must go to hardcoded values
        this.logger.verbose("Did not find cloud discovery metadata in the config... Attempting to get cloud discovery metadata from the hardcoded values.");
        if (this.options.skipAuthorityMetadataCache) {
            this.logger.verbose("Skipping hardcoded cloud discovery metadata cache since skipAuthorityMetadataCache is set to true. Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        else {
            const hardcodedMetadata = this.getCloudDiscoveryMetadataFromHardcodedValues();
            if (hardcodedMetadata) {
                this.logger.verbose("Found cloud discovery metadata from hardcoded values.");
                metadataEntity.updateCloudDiscoveryMetadata(hardcodedMetadata, false);
                return AuthorityMetadataSource.HARDCODED_VALUES;
            }
            this.logger.verbose("Did not find cloud discovery metadata in hardcoded values... Attempting to get cloud discovery metadata from the network metadata cache.");
        }
        const metadataEntityExpired = metadataEntity.isExpired();
        if (this.isAuthoritySameType(metadataEntity) &&
            metadataEntity.aliasesFromNetwork &&
            !metadataEntityExpired) {
            this.logger.verbose("Found cloud discovery metadata in the cache.");
            // No need to update
            return AuthorityMetadataSource.CACHE;
        }
        else if (metadataEntityExpired) {
            this.logger.verbose("The metadata entity is expired.");
        }
        this.logger.verbose("Did not find cloud discovery metadata in the cache... Attempting to get cloud discovery metadata from the network.");
        this.performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
        metadata = await this.getCloudDiscoveryMetadataFromNetwork();
        if (metadata) {
            this.logger.verbose("cloud discovery metadata was successfully returned from getCloudDiscoveryMetadataFromNetwork()");
            metadataEntity.updateCloudDiscoveryMetadata(metadata, true);
            return AuthorityMetadataSource.NETWORK;
        }
        // Metadata could not be obtained from the config, cache, network or hardcoded values
        this.logger.error("Did not find cloud discovery metadata from network... Metadata could not be obtained from config, cache, network or hardcoded values. Throwing Untrusted Authority Error.");
        throw ClientConfigurationError.createUntrustedAuthorityError();
    }
    /**
     * Parse cloudDiscoveryMetadata config or check knownAuthorities
     */
    getCloudDiscoveryMetadataFromConfig() {
        // CIAM does not support cloud discovery metadata
        if (this.authorityType === AuthorityType.Ciam) {
            this.logger.verbose("CIAM authorities do not support cloud discovery metadata, generate the aliases from authority host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        // Check if network response was provided in config
        if (this.authorityOptions.cloudDiscoveryMetadata) {
            this.logger.verbose("The cloud discovery metadata has been provided as a network response, in the config.");
            try {
                this.logger.verbose("Attempting to parse the cloud discovery metadata.");
                const parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
                const metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
                this.logger.verbose("Parsed the cloud discovery metadata.");
                if (metadata) {
                    this.logger.verbose("There is returnable metadata attached to the parsed cloud discovery metadata.");
                    return metadata;
                }
                else {
                    this.logger.verbose("There is no metadata attached to the parsed cloud discovery metadata.");
                }
            }
            catch (e) {
                this.logger.verbose("Unable to parse the cloud discovery metadata. Throwing Invalid Cloud Discovery Metadata Error.");
                throw ClientConfigurationError.createInvalidCloudDiscoveryMetadataError();
            }
        }
        // If cloudDiscoveryMetadata is empty or does not contain the host, check knownAuthorities
        if (this.isInKnownAuthorities()) {
            this.logger.verbose("The host is included in knownAuthorities. Creating new cloud discovery metadata from the host.");
            return Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
    }
    /**
     * Called to get metadata from network if CloudDiscoveryMetadata was not populated by config
     *
     * @param hasHardcodedMetadata boolean
     */
    async getCloudDiscoveryMetadataFromNetwork() {
        this.performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityGetCloudDiscoveryMetadataFromNetwork, this.correlationId);
        const instanceDiscoveryEndpoint = `${Constants.AAD_INSTANCE_DISCOVERY_ENDPT}${this.canonicalAuthority}oauth2/v2.0/authorize`;
        const options = {};
        /*
         * TODO: Add a timeout if the authority exists in our library's
         * hardcoded list of metadata
         */
        let match = null;
        try {
            const response = await this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint, options);
            let typedResponseBody;
            let metadata;
            if (isCloudInstanceDiscoveryResponse(response.body)) {
                typedResponseBody =
                    response.body;
                metadata = typedResponseBody.metadata;
                this.logger.verbosePii(`tenant_discovery_endpoint is: ${typedResponseBody.tenant_discovery_endpoint}`);
            }
            else if (isCloudInstanceDiscoveryErrorResponse(response.body)) {
                this.logger.warning(`A CloudInstanceDiscoveryErrorResponse was returned. The cloud instance discovery network request's status code is: ${response.status}`);
                typedResponseBody =
                    response.body;
                if (typedResponseBody.error === Constants.INVALID_INSTANCE) {
                    this.logger.error("The CloudInstanceDiscoveryErrorResponse error is invalid_instance.");
                    return null;
                }
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error is ${typedResponseBody.error}`);
                this.logger.warning(`The CloudInstanceDiscoveryErrorResponse error description is ${typedResponseBody.error_description}`);
                this.logger.warning("Setting the value of the CloudInstanceDiscoveryMetadata (returned from the network) to []");
                metadata = [];
            }
            else {
                this.logger.error("AAD did not return a CloudInstanceDiscoveryResponse or CloudInstanceDiscoveryErrorResponse");
                return null;
            }
            this.logger.verbose("Attempting to find a match between the developer's authority and the CloudInstanceDiscoveryMetadata returned from the network request.");
            match = Authority.getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
        }
        catch (error) {
            if (error instanceof AuthError) {
                this.logger.error(`There was a network error while attempting to get the cloud discovery instance metadata.\nError: ${error.errorCode}\nError Description: ${error.errorMessage}`);
            }
            else {
                const typedError = error;
                this.logger.error(`A non-MSALJS error was thrown while attempting to get the cloud instance discovery metadata.\nError: ${typedError.name}\nError Description: ${typedError.message}`);
            }
            return null;
        }
        // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
        if (!match) {
            this.logger.warning("The developer's authority was not found within the CloudInstanceDiscoveryMetadata returned from the network request.");
            this.logger.verbose("Creating custom Authority for custom domain scenario.");
            match = Authority.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return match;
    }
    /**
     * Get cloud discovery metadata for common authorities
     */
    getCloudDiscoveryMetadataFromHardcodedValues() {
        if (this.canonicalAuthority in InstanceDiscoveryMetadata) {
            const hardcodedMetadataResponse = InstanceDiscoveryMetadata[this.canonicalAuthority];
            const metadata = Authority.getCloudDiscoveryMetadataFromNetworkResponse(hardcodedMetadataResponse.metadata, this.hostnameAndPort);
            return metadata;
        }
        return null;
    }
    /**
     * Helper function to determine if this host is included in the knownAuthorities config option
     */
    isInKnownAuthorities() {
        const matches = this.authorityOptions.knownAuthorities.filter((authority) => {
            return (UrlString.getDomainFromUrl(authority).toLowerCase() ===
                this.hostnameAndPort);
        });
        return matches.length > 0;
    }
    /**
     * helper function to populate the authority based on azureCloudOptions
     * @param authorityString
     * @param azureCloudOptions
     */
    static generateAuthority(authorityString, azureCloudOptions) {
        let authorityAzureCloudInstance;
        if (azureCloudOptions &&
            azureCloudOptions.azureCloudInstance !== AzureCloudInstance.None) {
            const tenant = azureCloudOptions.tenant
                ? azureCloudOptions.tenant
                : Constants.DEFAULT_COMMON_TENANT;
            authorityAzureCloudInstance = `${azureCloudOptions.azureCloudInstance}/${tenant}/`;
        }
        return authorityAzureCloudInstance
            ? authorityAzureCloudInstance
            : authorityString;
    }
    /**
     * Creates cloud discovery metadata object from a given host
     * @param host
     */
    static createCloudDiscoveryMetadataFromHost(host) {
        return {
            preferred_network: host,
            preferred_cache: host,
            aliases: [host],
        };
    }
    /**
     * Searches instance discovery network response for the entry that contains the host in the aliases list
     * @param response
     * @param authority
     */
    static getCloudDiscoveryMetadataFromNetworkResponse(response, authority) {
        for (let i = 0; i < response.length; i++) {
            const metadata = response[i];
            if (metadata.aliases.indexOf(authority) > -1) {
                return metadata;
            }
        }
        return null;
    }
    /**
     * helper function to generate environment from authority object
     */
    getPreferredCache() {
        if (this.discoveryComplete()) {
            return this.metadata.preferred_cache;
        }
        else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
    }
    /**
     * Returns whether or not the provided host is an alias of this authority instance
     * @param host
     */
    isAlias(host) {
        return this.metadata.aliases.indexOf(host) > -1;
    }
    /**
     * Returns whether or not the provided host is an alias of a known Microsoft authority for purposes of endpoint discovery
     * @param host
     */
    isAliasOfKnownMicrosoftAuthority(host) {
        return InstanceDiscoveryMetadataAliases.has(host);
    }
    /**
     * Checks whether the provided host is that of a public cloud authority
     *
     * @param authority string
     * @returns bool
     */
    static isPublicCloudAuthority(host) {
        return Constants.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
    }
    /**
     * Rebuild the authority string with the region
     *
     * @param host string
     * @param region string
     */
    static buildRegionalAuthorityString(host, region, queryString) {
        // Create and validate a Url string object with the initial authority string
        const authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        const authorityUrlParts = authorityUrlInstance.getUrlComponents();
        let hostNameAndPort = `${region}.${authorityUrlParts.HostNameAndPort}`;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
            hostNameAndPort = `${region}.${Constants.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX}`;
        }
        // Include the query string portion of the url
        const url = UrlString.constructAuthorityUriFromObject({
            ...authorityUrlInstance.getUrlComponents(),
            HostNameAndPort: hostNameAndPort,
        }).urlString;
        // Add the query string if a query string was provided
        if (queryString)
            return `${url}?${queryString}`;
        return url;
    }
    /**
     * Replace the endpoints in the metadata object with their regional equivalents.
     *
     * @param metadata OpenIdConfigResponse
     * @param azureRegion string
     */
    static replaceWithRegionalInformation(metadata, azureRegion) {
        const regionalMetadata = { ...metadata };
        regionalMetadata.authorization_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.authorization_endpoint, azureRegion);
        // TODO: Enquire on whether we should leave the query string or remove it before releasing the feature
        regionalMetadata.token_endpoint =
            Authority.buildRegionalAuthorityString(regionalMetadata.token_endpoint, azureRegion, Constants.REGIONAL_AUTH_NON_MSI_QUERY_STRING);
        if (regionalMetadata.end_session_endpoint) {
            regionalMetadata.end_session_endpoint =
                Authority.buildRegionalAuthorityString(regionalMetadata.end_session_endpoint, azureRegion);
        }
        return regionalMetadata;
    }
    /**
     * Transform CIAM_AUTHORIY as per the below rules:
     * If no path segments found and it is a CIAM authority (hostname ends with .ciamlogin.com), then transform it
     *
     * NOTE: The transformation path should go away once STS supports CIAM with the format: `tenantIdorDomain.ciamlogin.com`
     * `ciamlogin.com` can also change in the future and we should accommodate the same
     *
     * @param authority
     */
    static transformCIAMAuthority(authority) {
        let ciamAuthority = authority.endsWith(Constants.FORWARD_SLASH)
            ? authority
            : `${authority}${Constants.FORWARD_SLASH}`;
        const authorityUrl = new UrlString(authority);
        const authorityUrlComponents = authorityUrl.getUrlComponents();
        // check if transformation is needed
        if (authorityUrlComponents.PathSegments.length === 0 &&
            authorityUrlComponents.HostNameAndPort.endsWith(Constants.CIAM_AUTH_URL)) {
            const tenantIdOrDomain = authorityUrlComponents.HostNameAndPort.split(".")[0];
            ciamAuthority = `${ciamAuthority}${tenantIdOrDomain}${Constants.AAD_TENANT_DOMAIN_SUFFIX}`;
        }
        return ciamAuthority;
    }
}
// Reserved tenant domain names that will not be replaced with tenant id
Authority.reservedTenantDomains = new Set([
    "{tenant}",
    "{tenantid}",
    AADAuthorityConstants.COMMON,
    AADAuthorityConstants.CONSUMERS,
    AADAuthorityConstants.ORGANIZATIONS,
]);

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class AuthorityFactory {
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Also performs endpoint discovery.
     *
     * @param authorityUri
     * @param networkClient
     * @param protocolMode
     */
    static async createDiscoveredInstance(authorityUri, networkClient, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        performanceClient?.addQueueMeasurement(PerformanceEvents.AuthorityFactoryCreateDiscoveredInstance, correlationId);
        const authorityUriFinal = Authority.transformCIAMAuthority(authorityUri);
        // Initialize authority and perform discovery endpoint check.
        const acquireTokenAuthority = AuthorityFactory.createInstance(authorityUriFinal, networkClient, cacheManager, authorityOptions, logger, performanceClient, correlationId);
        try {
            performanceClient?.setPreQueueTime(PerformanceEvents.AuthorityResolveEndpointsAsync, correlationId);
            await acquireTokenAuthority.resolveEndpointsAsync();
            return acquireTokenAuthority;
        }
        catch (e) {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError(e);
        }
    }
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Does not perform endpoint discovery.
     *
     * @param authorityUrl
     * @param networkInterface
     * @param protocolMode
     */
    static createInstance(authorityUrl, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId) {
        // Throw error if authority url is empty
        if (StringUtils.isEmpty(authorityUrl)) {
            throw ClientConfigurationError.createUrlEmptyError();
        }
        return new Authority(authorityUrl, networkInterface, cacheManager, authorityOptions, logger, performanceClient, correlationId);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ServerTelemetryEntity {
    constructor() {
        this.failedRequests = [];
        this.errors = [];
        this.cacheHits = 0;
    }
    /**
     * validates if a given cache entry is "Telemetry", parses <key,value>
     * @param key
     * @param entity
     */
    static isServerTelemetryEntity(key, entity) {
        const validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
        let validateEntity = true;
        if (entity) {
            validateEntity =
                entity.hasOwnProperty("failedRequests") &&
                    entity.hasOwnProperty("errors") &&
                    entity.hasOwnProperty("cacheHits");
        }
        return validateKey && validateEntity;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ThrottlingEntity {
    /**
     * validates if a given cache entry is "Throttling", parses <key,value>
     * @param key
     * @param entity
     */
    static isThrottlingEntity(key, entity) {
        let validateKey = false;
        if (key) {
            validateKey =
                key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
        }
        let validateEntity = true;
        if (entity) {
            validateEntity = entity.hasOwnProperty("throttleTime");
        }
        return validateKey && validateEntity;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const StubbedNetworkModule = {
    sendGetRequestAsync: () => {
        const notImplErr = "Network interface - sendGetRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
    sendPostRequestAsync: () => {
        const notImplErr = "Network interface - sendPostRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
};

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
const JoseHeaderErrorMessage = {
    missingKidError: {
        code: "missing_kid_error",
        desc: "The JOSE Header for the requested JWT, JWS or JWK object requires a keyId to be configured as the 'kid' header claim. No 'kid' value was provided.",
    },
    missingAlgError: {
        code: "missing_alg_error",
        desc: "The JOSE Header for the requested JWT, JWS or JWK object requires an algorithm to be specified as the 'alg' header claim. No 'alg' value was provided.",
    },
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
class JoseHeaderError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "JoseHeaderError";
        Object.setPrototypeOf(this, JoseHeaderError.prototype);
    }
    /**
     * Creates an error thrown when keyId isn't set on JOSE header.
     */
    static createMissingKidError() {
        return new JoseHeaderError(JoseHeaderErrorMessage.missingKidError.code, JoseHeaderErrorMessage.missingKidError.desc);
    }
    /**
     * Creates an error thrown when algorithm isn't set on JOSE header.
     */
    static createMissingAlgError() {
        return new JoseHeaderError(JoseHeaderErrorMessage.missingAlgError.code, JoseHeaderErrorMessage.missingAlgError.desc);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class JoseHeader {
    constructor(options) {
        this.typ = options.typ;
        this.alg = options.alg;
        this.kid = options.kid;
    }
    /**
     * Builds SignedHttpRequest formatted JOSE Header from the
     * JOSE Header options provided or previously set on the object and returns
     * the stringified header object.
     * Throws if keyId or algorithm aren't provided since they are required for Access Token Binding.
     * @param shrHeaderOptions
     * @returns
     */
    static getShrHeaderString(shrHeaderOptions) {
        // KeyID is required on the SHR header
        if (!shrHeaderOptions.kid) {
            throw JoseHeaderError.createMissingKidError();
        }
        // Alg is required on the SHR header
        if (!shrHeaderOptions.alg) {
            throw JoseHeaderError.createMissingAlgError();
        }
        const shrHeader = new JoseHeader({
            // Access Token PoP headers must have type pop, but the type header can be overriden for special cases
            typ: shrHeaderOptions.typ || JsonTypes.Pop,
            kid: shrHeaderOptions.kid,
            alg: shrHeaderOptions.alg,
        });
        return JSON.stringify(shrHeader);
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This is a helper class that parses supported HTTP response authentication headers to extract and return
 * header challenge values that can be used outside the basic authorization flows.
 */
class AuthenticationHeaderParser {
    constructor(headers) {
        this.headers = headers;
    }
    /**
     * This method parses the SHR nonce value out of either the Authentication-Info or WWW-Authenticate authentication headers.
     * @returns
     */
    getShrNonce() {
        // Attempt to parse nonce from Authentiacation-Info
        const authenticationInfo = this.headers[HeaderNames.AuthenticationInfo];
        if (authenticationInfo) {
            const authenticationInfoChallenges = this.parseChallenges(authenticationInfo);
            if (authenticationInfoChallenges.nextnonce) {
                return authenticationInfoChallenges.nextnonce;
            }
            throw ClientConfigurationError.createInvalidAuthenticationHeaderError(HeaderNames.AuthenticationInfo, "nextnonce challenge is missing.");
        }
        // Attempt to parse nonce from WWW-Authenticate
        const wwwAuthenticate = this.headers[HeaderNames.WWWAuthenticate];
        if (wwwAuthenticate) {
            const wwwAuthenticateChallenges = this.parseChallenges(wwwAuthenticate);
            if (wwwAuthenticateChallenges.nonce) {
                return wwwAuthenticateChallenges.nonce;
            }
            throw ClientConfigurationError.createInvalidAuthenticationHeaderError(HeaderNames.WWWAuthenticate, "nonce challenge is missing.");
        }
        // If neither header is present, throw missing headers error
        throw ClientConfigurationError.createMissingNonceAuthenticationHeadersError();
    }
    /**
     * Parses an HTTP header's challenge set into a key/value map.
     * @param header
     * @returns
     */
    parseChallenges(header) {
        const schemeSeparator = header.indexOf(" ");
        const challenges = header.substr(schemeSeparator + 1).split(",");
        const challengeMap = {};
        challenges.forEach((challenge) => {
            const [key, value] = challenge.split("=");
            // Remove escaped quotation marks (', ") from challenge string to keep only the challenge value
            challengeMap[key] = unescape(value.replace(/['"]+/g, Constants.EMPTY_STRING));
        });
        return challengeMap;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ServerTelemetryManager {
    constructor(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NO_CACHE_HIT;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants.EMPTY_STRING;
        this.telemetryCacheKey =
            SERVER_TELEM_CONSTANTS.CACHE_KEY +
                Separators.CACHE_KEY_SEPARATOR +
                telemetryRequest.clientId;
    }
    /**
     * API to add MSER Telemetry to request
     */
    generateCurrentRequestHeaderValue() {
        const request = `${this.apiId}${SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR}${this.cacheOutcome}`;
        const platformFields = [this.wrapperSKU, this.wrapperVer].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const regionDiscoveryFields = this.getRegionDiscoveryFields();
        const requestWithRegionDiscoveryFields = [
            request,
            regionDiscoveryFields,
        ].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            requestWithRegionDiscoveryFields,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to add MSER Telemetry for the last failed request
     */
    generateLastRequestHeaderValue() {
        const lastRequests = this.getLastRequests();
        const maxErrors = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const failedRequests = lastRequests.failedRequests
            .slice(0, 2 * maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errors = lastRequests.errors
            .slice(0, maxErrors)
            .join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        const errorCount = lastRequests.errors.length;
        // Indicate whether this header contains all data or partial data
        const overflow = maxErrors < errorCount
            ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE
            : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        const platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [
            SERVER_TELEM_CONSTANTS.SCHEMA_VERSION,
            lastRequests.cacheHits,
            failedRequests,
            errors,
            platformFields,
        ].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    }
    /**
     * API to cache token failures for MSER data capture
     * @param error
     */
    cacheFailedRequest(error) {
        const lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >=
            SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
            // Remove a cached error to make room, first in first out
            lastRequests.failedRequests.shift(); // apiId
            lastRequests.failedRequests.shift(); // correlationId
            lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (error instanceof Error && !!error && error.toString()) {
            if (error instanceof AuthError) {
                if (!StringUtils.isEmpty(error.subError)) {
                    lastRequests.errors.push(error.subError);
                }
                else if (!StringUtils.isEmpty(error.errorCode)) {
                    lastRequests.errors.push(error.errorCode);
                }
                else {
                    lastRequests.errors.push(error.toString());
                }
            }
            else {
                lastRequests.errors.push(error.toString());
            }
        }
        else {
            lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
    }
    /**
     * Update server telemetry cache entry by incrementing cache hit counter
     */
    incrementCacheHits() {
        const lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
    }
    /**
     * Get the server telemetry entity from cache or initialize a new one
     */
    getLastRequests() {
        const initialValue = new ServerTelemetryEntity();
        const lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
    }
    /**
     * Remove server telemetry cache entry
     */
    clearTelemetryCache() {
        const lastRequests = this.getLastRequests();
        const numErrorsFlushed = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        const errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
            // All errors were sent on last request, clear Telemetry cache
            this.cacheManager.removeItem(this.telemetryCacheKey);
        }
        else {
            // Partial data was flushed to server, construct a new telemetry cache item with errors that were not flushed
            const serverTelemEntity = new ServerTelemetryEntity();
            serverTelemEntity.failedRequests =
                lastRequests.failedRequests.slice(numErrorsFlushed * 2); // failedRequests contains 2 items for each error
            serverTelemEntity.errors =
                lastRequests.errors.slice(numErrorsFlushed);
            this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
    }
    /**
     * Returns the maximum number of errors that can be flushed to the server in the next network request
     * @param serverTelemetryEntity
     */
    static maxErrorsToSend(serverTelemetryEntity) {
        let i;
        let maxErrors = 0;
        let dataSize = 0;
        const errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
            // failedRequests parameter contains pairs of apiId and correlationId, multiply index by 2 to preserve pairs
            const apiId = serverTelemetryEntity.failedRequests[2 * i] ||
                Constants.EMPTY_STRING;
            const correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] ||
                Constants.EMPTY_STRING;
            const errorCode = serverTelemetryEntity.errors[i] || Constants.EMPTY_STRING;
            // Count number of characters that would be added to header, each character is 1 byte. Add 3 at the end to account for separators
            dataSize +=
                apiId.toString().length +
                    correlationId.toString().length +
                    errorCode.length +
                    3;
            if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
                // Adding this entry to the header would still keep header size below the limit
                maxErrors += 1;
            }
            else {
                break;
            }
        }
        return maxErrors;
    }
    /**
     * Get the region discovery fields
     *
     * @returns string
     */
    getRegionDiscoveryFields() {
        const regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || Constants.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionSource || Constants.EMPTY_STRING);
        regionDiscoveryFields.push(this.regionOutcome || Constants.EMPTY_STRING);
        return regionDiscoveryFields.join(",");
    }
    /**
     * Update the region discovery metadata
     *
     * @param regionDiscoveryMetadata
     * @returns void
     */
    updateRegionDiscoveryMetadata(regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
    }
    /**
     * Set cache outcome
     */
    setCacheOutcome(cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class PerformanceClient {
    /**
     * Creates an instance of PerformanceClient,
     * an abstract class containing core performance telemetry logic.
     *
     * @constructor
     * @param {string} clientId Client ID of the application
     * @param {string} authority Authority used by the application
     * @param {Logger} logger Logger used by the application
     * @param {string} libraryName Name of the library
     * @param {string} libraryVersion Version of the library
     * @param {ApplicationTelemetry} applicationTelemetry application name and version
     * @param {Set<String>} intFields integer fields to be truncated
     */
    constructor(clientId, authority, logger, libraryName, libraryVersion, applicationTelemetry, intFields) {
        this.authority = authority;
        this.libraryName = libraryName;
        this.libraryVersion = libraryVersion;
        this.applicationTelemetry = applicationTelemetry;
        this.clientId = clientId;
        this.logger = logger;
        this.callbacks = new Map();
        this.eventsByCorrelationId = new Map();
        this.queueMeasurements = new Map();
        this.preQueueTimeByCorrelationId = new Map();
        this.intFields = intFields || new Set();
        for (const item of IntFields) {
            this.intFields.add(item);
        }
    }
    /**
     * Starts and returns an platform-specific implementation of IPerformanceMeasurement.
     * Note: this function can be changed to abstract at the next major version bump.
     *
     * @param {string} measureName
     * @param {string} correlationId
     * @returns {IPerformanceMeasurement}
     */
    startPerformanceMeasurement(measureName, // eslint-disable-line @typescript-eslint/no-unused-vars
    correlationId // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
        return {};
    }
    /**
     * Gets map of pre-queue times by correlation Id
     *
     * @param {PerformanceEvents} eventName
     * @param {string} correlationId
     * @returns {number}
     */
    getPreQueueTime(eventName, correlationId) {
        const preQueueEvent = this.preQueueTimeByCorrelationId.get(correlationId);
        if (!preQueueEvent) {
            this.logger.trace(`PerformanceClient.getPreQueueTime: no pre-queue times found for correlationId: ${correlationId}, unable to add queue measurement`);
            return;
        }
        else if (preQueueEvent.name !== eventName) {
            this.logger.trace(`PerformanceClient.getPreQueueTime: no pre-queue time found for ${eventName}, unable to add queue measurement`);
            return;
        }
        return preQueueEvent.time;
    }
    /**
     * Calculates the difference between current time and time when function was queued.
     * Note: It is possible to have 0 as the queue time if the current time and the queued time was the same.
     *
     * @param {number} preQueueTime
     * @param {number} currentTime
     * @returns {number}
     */
    calculateQueuedTime(preQueueTime, currentTime) {
        if (preQueueTime < 1) {
            this.logger.trace(`PerformanceClient: preQueueTime should be a positive integer and not ${preQueueTime}`);
            return 0;
        }
        if (currentTime < 1) {
            this.logger.trace(`PerformanceClient: currentTime should be a positive integer and not ${currentTime}`);
            return 0;
        }
        if (currentTime < preQueueTime) {
            this.logger.trace("PerformanceClient: currentTime is less than preQueueTime, check how time is being retrieved");
            return 0;
        }
        return currentTime - preQueueTime;
    }
    /**
     * Adds queue measurement time to QueueMeasurements array for given correlation ID.
     *
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @param {?number} queueTime
     * @param {?boolean} manuallyCompleted - indicator for manually completed queue measurements
     * @returns
     */
    addQueueMeasurement(eventName, correlationId, queueTime, manuallyCompleted) {
        if (!correlationId) {
            this.logger.trace(`PerformanceClient.addQueueMeasurement: correlationId not provided for ${eventName}, cannot add queue measurement`);
            return;
        }
        if (queueTime === 0) {
            // Possible for there to be no queue time after calculation
            this.logger.trace(`PerformanceClient.addQueueMeasurement: queue time provided for ${eventName} is ${queueTime}`);
        }
        else if (!queueTime) {
            this.logger.trace(`PerformanceClient.addQueueMeasurement: no queue time provided for ${eventName}`);
            return;
        }
        const queueMeasurement = {
            eventName,
            queueTime,
            manuallyCompleted,
        };
        // Adds to existing correlation Id if present in queueMeasurements
        const existingMeasurements = this.queueMeasurements.get(correlationId);
        if (existingMeasurements) {
            existingMeasurements.push(queueMeasurement);
            this.queueMeasurements.set(correlationId, existingMeasurements);
        }
        else {
            // Sets new correlation Id if not present in queueMeasurements
            this.logger.trace(`PerformanceClient.addQueueMeasurement: adding correlationId ${correlationId} to queue measurements`);
            const measurementArray = [queueMeasurement];
            this.queueMeasurements.set(correlationId, measurementArray);
        }
        // Delete processed pre-queue event.
        this.preQueueTimeByCorrelationId.delete(correlationId);
    }
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {InProgressPerformanceEvent}
     */
    startMeasurement(measureName, correlationId) {
        // Generate a placeholder correlation if the request does not provide one
        const eventCorrelationId = correlationId || this.generateId();
        if (!correlationId) {
            this.logger.info(`PerformanceClient: No correlation id provided for ${measureName}, generating`, eventCorrelationId);
        }
        this.logger.trace(`PerformanceClient: Performance measurement started for ${measureName}`, eventCorrelationId);
        const performanceMeasurement = this.startPerformanceMeasurement(measureName, eventCorrelationId);
        performanceMeasurement.startMeasurement();
        const inProgressEvent = {
            eventId: this.generateId(),
            status: PerformanceEventStatus.InProgress,
            authority: this.authority,
            libraryName: this.libraryName,
            libraryVersion: this.libraryVersion,
            clientId: this.clientId,
            name: measureName,
            startTimeMs: Date.now(),
            correlationId: eventCorrelationId,
            appName: this.applicationTelemetry?.appName,
            appVersion: this.applicationTelemetry?.appVersion,
        };
        // Store in progress events so they can be discarded if not ended properly
        this.cacheEventByCorrelationId(inProgressEvent);
        // Return the event and functions the caller can use to properly end/flush the measurement
        return {
            end: (event) => {
                return this.endMeasurement({
                    // Initial set of event properties
                    ...inProgressEvent,
                    // Properties set when event ends
                    ...event,
                }, performanceMeasurement);
            },
            discard: () => {
                return this.discardMeasurements(inProgressEvent.correlationId);
            },
            add: (fields) => {
                return this.addFields(fields, inProgressEvent.correlationId);
            },
            increment: (fields) => {
                return this.incrementFields(fields, inProgressEvent.correlationId);
            },
            measurement: performanceMeasurement,
            event: inProgressEvent,
        };
    }
    /**
     * Stops measuring the performance for an operation. Should only be called directly by PerformanceClient classes,
     * as consumers should instead use the function returned by startMeasurement.
     * Adds a new field named as "[event name]DurationMs" for sub-measurements, completes and emits an event
     * otherwise.
     *
     * @param {PerformanceEvent} event
     * @param {IPerformanceMeasurement} measurement
     * @returns {(PerformanceEvent | null)}
     */
    endMeasurement(event, measurement) {
        const rootEvent = this.eventsByCorrelationId.get(event.correlationId);
        if (!rootEvent) {
            this.logger.trace(`PerformanceClient: Measurement not found for ${event.eventId}`, event.correlationId);
            return null;
        }
        const isRoot = event.eventId === rootEvent.eventId;
        let queueInfo = {
            totalQueueTime: 0,
            totalQueueCount: 0,
            manuallyCompletedCount: 0,
        };
        if (isRoot) {
            queueInfo = this.getQueueInfo(event.correlationId);
            this.discardCache(rootEvent.correlationId);
        }
        else {
            rootEvent.incompleteSubMeasurements?.delete(event.eventId);
        }
        measurement?.endMeasurement();
        const durationMs = measurement?.flushMeasurement();
        // null indicates no measurement was taken (e.g. needed performance APIs not present)
        if (!durationMs) {
            this.logger.trace("PerformanceClient: Performance measurement not taken", rootEvent.correlationId);
            return null;
        }
        this.logger.trace(`PerformanceClient: Performance measurement ended for ${event.name}: ${durationMs} ms`, event.correlationId);
        // Add sub-measurement attribute to root event.
        if (!isRoot) {
            rootEvent[event.name + "DurationMs"] = Math.floor(durationMs);
            return { ...rootEvent };
        }
        let finalEvent = { ...rootEvent, ...event };
        let incompleteSubsCount = 0;
        // Incomplete sub-measurements are discarded. They are likely an instrumentation bug that should be fixed.
        finalEvent.incompleteSubMeasurements?.forEach((subMeasurement) => {
            this.logger.trace(`PerformanceClient: Incomplete submeasurement ${subMeasurement.name} found for ${event.name}`, finalEvent.correlationId);
            incompleteSubsCount++;
        });
        finalEvent.incompleteSubMeasurements = undefined;
        finalEvent = {
            ...finalEvent,
            durationMs: Math.round(durationMs),
            queuedTimeMs: queueInfo.totalQueueTime,
            queuedCount: queueInfo.totalQueueCount,
            queuedManuallyCompletedCount: queueInfo.manuallyCompletedCount,
            status: PerformanceEventStatus.Completed,
            incompleteSubsCount,
        };
        this.truncateIntegralFields(finalEvent);
        this.emitEvents([finalEvent], event.correlationId);
        return finalEvent;
    }
    /**
     * Saves extra information to be emitted when the measurements are flushed
     * @param fields
     * @param correlationId
     */
    addFields(fields, correlationId) {
        this.logger.trace("PerformanceClient: Updating static fields");
        const event = this.eventsByCorrelationId.get(correlationId);
        if (event) {
            this.eventsByCorrelationId.set(correlationId, {
                ...event,
                ...fields,
            });
        }
        else {
            this.logger.trace("PerformanceClient: Event not found for", correlationId);
        }
    }
    /**
     * Increment counters to be emitted when the measurements are flushed
     * @param fields {string[]}
     * @param correlationId {string} correlation identifier
     */
    incrementFields(fields, correlationId) {
        this.logger.trace("PerformanceClient: Updating counters");
        const event = this.eventsByCorrelationId.get(correlationId);
        if (event) {
            for (const counter in fields) {
                if (!event.hasOwnProperty(counter)) {
                    event[counter] = 0;
                }
                else if (isNaN(Number(event[counter]))) {
                    return;
                }
                event[counter] += fields[counter];
            }
        }
        else {
            this.logger.trace("PerformanceClient: Event not found for", correlationId);
        }
    }
    /**
     * Upserts event into event cache.
     * First key is the correlation id, second key is the event id.
     * Allows for events to be grouped by correlation id,
     * and to easily allow for properties on them to be updated.
     *
     * @private
     * @param {PerformanceEvent} event
     */
    cacheEventByCorrelationId(event) {
        const rootEvent = this.eventsByCorrelationId.get(event.correlationId);
        if (rootEvent) {
            this.logger.trace(`PerformanceClient: Performance measurement for ${event.name} added/updated`, event.correlationId);
            rootEvent.incompleteSubMeasurements =
                rootEvent.incompleteSubMeasurements || new Map();
            rootEvent.incompleteSubMeasurements.set(event.eventId, {
                name: event.name,
                startTimeMs: event.startTimeMs,
            });
        }
        else {
            this.logger.trace(`PerformanceClient: Performance measurement for ${event.name} started`, event.correlationId);
            this.eventsByCorrelationId.set(event.correlationId, { ...event });
        }
    }
    getQueueInfo(correlationId) {
        const queueMeasurementForCorrelationId = this.queueMeasurements.get(correlationId);
        if (!queueMeasurementForCorrelationId) {
            this.logger.trace(`PerformanceClient: no queue measurements found for for correlationId: ${correlationId}`);
        }
        let totalQueueTime = 0;
        let totalQueueCount = 0;
        let manuallyCompletedCount = 0;
        queueMeasurementForCorrelationId?.forEach((measurement) => {
            totalQueueTime += measurement.queueTime;
            totalQueueCount++;
            manuallyCompletedCount += measurement.manuallyCompleted ? 1 : 0;
        });
        return {
            totalQueueTime,
            totalQueueCount,
            manuallyCompletedCount,
        };
    }
    /**
     * Removes measurements for a given correlation id.
     *
     * @param {string} correlationId
     */
    discardMeasurements(correlationId) {
        this.logger.trace("PerformanceClient: Performance measurements discarded", correlationId);
        this.eventsByCorrelationId.delete(correlationId);
    }
    /**
     * Removes cache for a given correlation id.
     *
     * @param {string} correlationId correlation identifier
     */
    discardCache(correlationId) {
        this.discardMeasurements(correlationId);
        this.logger.trace("PerformanceClient: QueueMeasurements discarded", correlationId);
        this.queueMeasurements.delete(correlationId);
        this.logger.trace("PerformanceClient: Pre-queue times discarded", correlationId);
        this.preQueueTimeByCorrelationId.delete(correlationId);
    }
    /**
     * Registers a callback function to receive performance events.
     *
     * @param {PerformanceCallbackFunction} callback
     * @returns {string}
     */
    addPerformanceCallback(callback) {
        const callbackId = this.generateId();
        this.callbacks.set(callbackId, callback);
        this.logger.verbose(`PerformanceClient: Performance callback registered with id: ${callbackId}`);
        return callbackId;
    }
    /**
     * Removes a callback registered with addPerformanceCallback.
     *
     * @param {string} callbackId
     * @returns {boolean}
     */
    removePerformanceCallback(callbackId) {
        const result = this.callbacks.delete(callbackId);
        if (result) {
            this.logger.verbose(`PerformanceClient: Performance callback ${callbackId} removed.`);
        }
        else {
            this.logger.verbose(`PerformanceClient: Performance callback ${callbackId} not removed.`);
        }
        return result;
    }
    /**
     * Emits events to all registered callbacks.
     *
     * @param {PerformanceEvent[]} events
     * @param {?string} [correlationId]
     */
    emitEvents(events, correlationId) {
        this.logger.verbose("PerformanceClient: Emitting performance events", correlationId);
        this.callbacks.forEach((callback, callbackId) => {
            this.logger.trace(`PerformanceClient: Emitting event to callback ${callbackId}`, correlationId);
            callback.apply(null, [events]);
        });
    }
    /**
     * Enforce truncation of integral fields in performance event.
     * @param {PerformanceEvent} event performance event to update.
     * @param {Set<string>} intFields integral fields.
     */
    truncateIntegralFields(event) {
        this.intFields.forEach((key) => {
            if (key in event && typeof event[key] === "number") {
                event[key] = Math.floor(event[key]);
            }
        });
    }
}

/*! @azure/msal-common v14.0.1 2023-08-11 */

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class StubPerformanceMeasurement {
    startMeasurement() {
        return;
    }
    endMeasurement() {
        return;
    }
    flushMeasurement() {
        return null;
    }
}
class StubPerformanceClient extends PerformanceClient {
    generateId() {
        return "callback-id";
    }
    startPerformanceMeasurement() {
        return new StubPerformanceMeasurement();
    }
    calculateQueuedTime() {
        return 0;
    }
    addQueueMeasurement() {
        return;
    }
    setPreQueueTime() {
        return;
    }
    endMeasurement() {
        return null;
    }
    discardMeasurements() {
        return;
    }
    removePerformanceCallback() {
        return true;
    }
    addPerformanceCallback() {
        return "";
    }
    emitEvents() {
        return;
    }
    addFields() {
        return;
    }
    incrementFields() {
        return;
    }
    cacheEventByCorrelationId() {
        return;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * BrowserAuthErrorMessage class containing string constants used by error codes and messages.
 */
const BrowserAuthErrorMessage = {
    pkceNotGenerated: {
        code: "pkce_not_created",
        desc: "The PKCE code challenge and verifier could not be generated.",
    },
    cryptoDoesNotExist: {
        code: "crypto_nonexistent",
        desc: "The crypto object or function is not available.",
    },
    httpMethodNotImplementedError: {
        code: "http_method_not_implemented",
        desc: "The HTTP method given has not been implemented in this library.",
    },
    emptyNavigateUriError: {
        code: "empty_navigate_uri",
        desc: "Navigation URI is empty. Please check stack trace for more info.",
    },
    hashEmptyError: {
        code: "hash_empty_error",
        desc: "Hash value cannot be processed because it is empty. Please verify that your redirectUri is not clearing the hash. For more visit: aka.ms/msaljs/browser-errors.",
    },
    hashDoesNotContainStateError: {
        code: "no_state_in_hash",
        desc: "Hash does not contain state. Please verify that the request originated from msal.",
    },
    hashDoesNotContainKnownPropertiesError: {
        code: "hash_does_not_contain_known_properties",
        desc: "Hash does not contain known properites. Please verify that your redirectUri is not changing the hash. For more visit: aka.ms/msaljs/browser-errors.",
    },
    unableToParseStateError: {
        code: "unable_to_parse_state",
        desc: "Unable to parse state. Please verify that the request originated from msal.",
    },
    stateInteractionTypeMismatchError: {
        code: "state_interaction_type_mismatch",
        desc: "Hash contains state but the interaction type does not match the caller.",
    },
    interactionInProgress: {
        code: "interaction_in_progress",
        desc: "Interaction is currently in progress. Please ensure that this interaction has been completed before calling an interactive API.  For more visit: aka.ms/msaljs/browser-errors.",
    },
    popupWindowError: {
        code: "popup_window_error",
        desc: "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser.",
    },
    emptyWindowError: {
        code: "empty_window_error",
        desc: "window.open returned null or undefined window object.",
    },
    userCancelledError: {
        code: "user_cancelled",
        desc: "User cancelled the flow.",
    },
    monitorPopupTimeoutError: {
        code: "monitor_window_timeout",
        desc: "Token acquisition in popup failed due to timeout. For more visit: aka.ms/msaljs/browser-errors.",
    },
    monitorIframeTimeoutError: {
        code: "monitor_window_timeout",
        desc: "Token acquisition in iframe failed due to timeout. For more visit: aka.ms/msaljs/browser-errors.",
    },
    redirectInIframeError: {
        code: "redirect_in_iframe",
        desc: "Redirects are not supported for iframed or brokered applications. Please ensure you are using MSAL.js in a top frame of the window if using the redirect APIs, or use the popup APIs.",
    },
    blockTokenRequestsInHiddenIframeError: {
        code: "block_iframe_reload",
        desc: "Request was blocked inside an iframe because MSAL detected an authentication response. For more visit: aka.ms/msaljs/browser-errors",
    },
    blockAcquireTokenInPopupsError: {
        code: "block_nested_popups",
        desc: "Request was blocked inside a popup because MSAL detected it was running in a popup.",
    },
    iframeClosedPrematurelyError: {
        code: "iframe_closed_prematurely",
        desc: "The iframe being monitored was closed prematurely.",
    },
    silentLogoutUnsupportedError: {
        code: "silent_logout_unsupported",
        desc: "Silent logout not supported. Please call logoutRedirect or logoutPopup instead.",
    },
    noAccountError: {
        code: "no_account_error",
        desc: "No account object provided to acquireTokenSilent and no active account has been set. Please call setActiveAccount or provide an account on the request.",
    },
    silentPromptValueError: {
        code: "silent_prompt_value_error",
        desc: "The value given for the prompt value is not valid for silent requests - must be set to 'none' or 'no_session'.",
    },
    noTokenRequestCacheError: {
        code: "no_token_request_cache_error",
        desc: "No token request found in cache.",
    },
    unableToParseTokenRequestCacheError: {
        code: "unable_to_parse_token_request_cache_error",
        desc: "The cached token request could not be parsed.",
    },
    noCachedAuthorityError: {
        code: "no_cached_authority_error",
        desc: "No cached authority found.",
    },
    authRequestNotSet: {
        code: "auth_request_not_set_error",
        desc: "Auth Request not set. Please ensure initiateAuthRequest was called from the InteractionHandler",
    },
    invalidCacheType: {
        code: "invalid_cache_type",
        desc: "Invalid cache type",
    },
    notInBrowserEnvironment: {
        code: "non_browser_environment",
        desc: "Login and token requests are not supported in non-browser environments.",
    },
    databaseNotOpen: {
        code: "database_not_open",
        desc: "Database is not open!",
    },
    noNetworkConnectivity: {
        code: "no_network_connectivity",
        desc: "No network connectivity. Check your internet connection.",
    },
    postRequestFailed: {
        code: "post_request_failed",
        desc: "Network request failed: If the browser threw a CORS error, check that the redirectUri is registered in the Azure App Portal as type 'SPA'",
    },
    getRequestFailed: {
        code: "get_request_failed",
        desc: "Network request failed. Please check the network trace to determine root cause.",
    },
    failedToParseNetworkResponse: {
        code: "failed_to_parse_response",
        desc: "Failed to parse network response. Check network trace.",
    },
    unableToLoadTokenError: {
        code: "unable_to_load_token",
        desc: "Error loading token to cache.",
    },
    signingKeyNotFoundInStorage: {
        code: "crypto_key_not_found",
        desc: "Cryptographic Key or Keypair not found in browser storage.",
    },
    authCodeRequired: {
        code: "auth_code_required",
        desc: "An authorization code must be provided (as the `code` property on the request) to this flow.",
    },
    authCodeOrNativeAccountRequired: {
        code: "auth_code_or_nativeAccountId_required",
        desc: "An authorization code or nativeAccountId must be provided to this flow.",
    },
    spaCodeAndNativeAccountPresent: {
        code: "spa_code_and_nativeAccountId_present",
        desc: "Request cannot contain both spa code and native account id.",
    },
    databaseUnavailable: {
        code: "database_unavailable",
        desc: "IndexedDB, which is required for persistent cryptographic key storage, is unavailable. This may be caused by browser privacy features which block persistent storage in third-party contexts.",
    },
    unableToAcquireTokenFromNativePlatform: {
        code: "unable_to_acquire_token_from_native_platform",
        desc: "Unable to acquire token from native platform. For a list of possible reasons visit aka.ms/msaljs/browser-errors.",
    },
    nativeHandshakeTimeout: {
        code: "native_handshake_timeout",
        desc: "Timed out while attempting to establish connection to browser extension",
    },
    nativeExtensionNotInstalled: {
        code: "native_extension_not_installed",
        desc: "Native extension is not installed. If you think this is a mistake call the initialize function.",
    },
    nativeConnectionNotEstablished: {
        code: "native_connection_not_established",
        desc: "Connection to native platform has not been established. Please install a compatible browser extension and run initialize(). For more please visit aka.ms/msaljs/browser-errors.",
    },
    uninitializedPublicClientApplication: {
        code: "uninitialized_public_client_application",
        desc: "You must call and await the initialize function before attempting to call any other MSAL API. For more please visit aka.ms/msaljs/browser-errors.",
    },
    nativePromptNotSupported: {
        code: "native_prompt_not_supported",
        desc: "The provided prompt is not supported by the native platform. This request should be routed to the web based flow.",
    },
};
/**
 * Browser library error class thrown by the MSAL.js library for SPAs
 */
class BrowserAuthError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        Object.setPrototypeOf(this, BrowserAuthError.prototype);
        this.name = "BrowserAuthError";
    }
    /**
     * Creates an error thrown when PKCE is not implemented.
     * @param errDetail
     */
    static createPkceNotGeneratedError(errDetail) {
        return new BrowserAuthError(BrowserAuthErrorMessage.pkceNotGenerated.code, `${BrowserAuthErrorMessage.pkceNotGenerated.desc} Detail:${errDetail}`);
    }
    /**
     * Creates an error thrown when the crypto object is unavailable.
     * @param errDetail
     */
    static createCryptoNotAvailableError(errDetail) {
        return new BrowserAuthError(BrowserAuthErrorMessage.cryptoDoesNotExist.code, `${BrowserAuthErrorMessage.cryptoDoesNotExist.desc} Detail:${errDetail}`);
    }
    /**
     * Creates an error thrown when an HTTP method hasn't been implemented by the browser class.
     * @param method
     */
    static createHttpMethodNotImplementedError(method) {
        return new BrowserAuthError(BrowserAuthErrorMessage.httpMethodNotImplementedError.code, `${BrowserAuthErrorMessage.httpMethodNotImplementedError.desc} Given Method: ${method}`);
    }
    /**
     * Creates an error thrown when the navigation URI is empty.
     */
    static createEmptyNavigationUriError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.emptyNavigateUriError.code, BrowserAuthErrorMessage.emptyNavigateUriError.desc);
    }
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     * @param hashValue
     */
    static createEmptyHashError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.hashEmptyError.code, `${BrowserAuthErrorMessage.hashEmptyError.desc}`);
    }
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     */
    static createHashDoesNotContainStateError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.hashDoesNotContainStateError.code, BrowserAuthErrorMessage.hashDoesNotContainStateError.desc);
    }
    /**
     * Creates an error thrown when the hash string value does not contain known properties
     */
    static createHashDoesNotContainKnownPropertiesError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.hashDoesNotContainKnownPropertiesError.code, BrowserAuthErrorMessage.hashDoesNotContainKnownPropertiesError.desc);
    }
    /**
     * Creates an error thrown when the hash string value is unexpectedly empty.
     */
    static createUnableToParseStateError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.unableToParseStateError.code, BrowserAuthErrorMessage.unableToParseStateError.desc);
    }
    /**
     * Creates an error thrown when the state value in the hash does not match the interaction type of the API attempting to consume it.
     */
    static createStateInteractionTypeMismatchError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.stateInteractionTypeMismatchError.code, BrowserAuthErrorMessage.stateInteractionTypeMismatchError.desc);
    }
    /**
     * Creates an error thrown when a browser interaction (redirect or popup) is in progress.
     */
    static createInteractionInProgressError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.interactionInProgress.code, BrowserAuthErrorMessage.interactionInProgress.desc);
    }
    /**
     * Creates an error thrown when the popup window could not be opened.
     * @param errDetail
     */
    static createPopupWindowError(errDetail) {
        let errorMessage = BrowserAuthErrorMessage.popupWindowError.desc;
        errorMessage = !StringUtils.isEmpty(errDetail)
            ? `${errorMessage} Details: ${errDetail}`
            : errorMessage;
        return new BrowserAuthError(BrowserAuthErrorMessage.popupWindowError.code, errorMessage);
    }
    /**
     * Creates an error thrown when window.open returns an empty window object.
     * @param errDetail
     */
    static createEmptyWindowCreatedError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.emptyWindowError.code, BrowserAuthErrorMessage.emptyWindowError.desc);
    }
    /**
     * Creates an error thrown when the user closes a popup.
     */
    static createUserCancelledError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.userCancelledError.code, BrowserAuthErrorMessage.userCancelledError.desc);
    }
    /**
     * Creates an error thrown when monitorPopupFromHash times out for a given popup.
     */
    static createMonitorPopupTimeoutError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.monitorPopupTimeoutError.code, BrowserAuthErrorMessage.monitorPopupTimeoutError.desc);
    }
    /**
     * Creates an error thrown when monitorIframeFromHash times out for a given iframe.
     */
    static createMonitorIframeTimeoutError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.monitorIframeTimeoutError.code, BrowserAuthErrorMessage.monitorIframeTimeoutError.desc);
    }
    /**
     * Creates an error thrown when navigateWindow is called inside an iframe or brokered applications.
     * @param windowParentCheck
     */
    static createRedirectInIframeError(windowParentCheck) {
        return new BrowserAuthError(BrowserAuthErrorMessage.redirectInIframeError.code, `${BrowserAuthErrorMessage.redirectInIframeError.desc} (window.parent !== window) => ${windowParentCheck}`);
    }
    /**
     * Creates an error thrown when an auth reload is done inside an iframe.
     */
    static createBlockReloadInHiddenIframeError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.blockTokenRequestsInHiddenIframeError.code, BrowserAuthErrorMessage.blockTokenRequestsInHiddenIframeError.desc);
    }
    /**
     * Creates an error thrown when a popup attempts to call an acquireToken API
     * @returns
     */
    static createBlockAcquireTokenInPopupsError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.blockAcquireTokenInPopupsError.code, BrowserAuthErrorMessage.blockAcquireTokenInPopupsError.desc);
    }
    /**
     * Creates an error thrown when an iframe is found to be closed before the timeout is reached.
     */
    static createIframeClosedPrematurelyError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.iframeClosedPrematurelyError.code, BrowserAuthErrorMessage.iframeClosedPrematurelyError.desc);
    }
    /**
     * Creates an error thrown when the logout API is called on any of the silent interaction clients
     */
    static createSilentLogoutUnsupportedError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.silentLogoutUnsupportedError.code, BrowserAuthErrorMessage.silentLogoutUnsupportedError.desc);
    }
    /**
     * Creates an error thrown when the account object is not provided in the acquireTokenSilent API.
     */
    static createNoAccountError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.noAccountError.code, BrowserAuthErrorMessage.noAccountError.desc);
    }
    /**
     * Creates an error thrown when a given prompt value is invalid for silent requests.
     */
    static createSilentPromptValueError(givenPrompt) {
        return new BrowserAuthError(BrowserAuthErrorMessage.silentPromptValueError.code, `${BrowserAuthErrorMessage.silentPromptValueError.desc} Given value: ${givenPrompt}`);
    }
    /**
     * Creates an error thrown when the cached token request could not be retrieved from the cache
     */
    static createUnableToParseTokenRequestCacheError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.unableToParseTokenRequestCacheError.code, BrowserAuthErrorMessage.unableToParseTokenRequestCacheError.desc);
    }
    /**
     * Creates an error thrown when the token request could not be retrieved from the cache
     */
    static createNoTokenRequestCacheError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.noTokenRequestCacheError.code, BrowserAuthErrorMessage.noTokenRequestCacheError.desc);
    }
    /**
     * Creates an error thrown when handleCodeResponse is called before initiateAuthRequest (InteractionHandler)
     */
    static createAuthRequestNotSetError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.authRequestNotSet.code, BrowserAuthErrorMessage.authRequestNotSet.desc);
    }
    /**
     * Creates an error thrown when the authority could not be retrieved from the cache
     */
    static createNoCachedAuthorityError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.noCachedAuthorityError.code, BrowserAuthErrorMessage.noCachedAuthorityError.desc);
    }
    /**
     * Creates an error thrown if cache type is invalid.
     */
    static createInvalidCacheTypeError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.invalidCacheType.code, `${BrowserAuthErrorMessage.invalidCacheType.desc}`);
    }
    /**
     * Create an error thrown when login and token requests are made from a non-browser environment
     */
    static createNonBrowserEnvironmentError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.notInBrowserEnvironment.code, BrowserAuthErrorMessage.notInBrowserEnvironment.desc);
    }
    /**
     * Create an error thrown when indexDB database is not open
     */
    static createDatabaseNotOpenError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.databaseNotOpen.code, BrowserAuthErrorMessage.databaseNotOpen.desc);
    }
    /**
     * Create an error thrown when token fetch fails due to no internet
     */
    static createNoNetworkConnectivityError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.noNetworkConnectivity.code, BrowserAuthErrorMessage.noNetworkConnectivity.desc);
    }
    /**
     * Create an error thrown when token fetch fails due to reasons other than internet connectivity
     */
    static createPostRequestFailedError(errorDesc, endpoint) {
        return new BrowserAuthError(BrowserAuthErrorMessage.postRequestFailed.code, `${BrowserAuthErrorMessage.postRequestFailed.desc} | Network client threw: ${errorDesc} | Attempted to reach: ${endpoint.split("?")[0]}`);
    }
    /**
     * Create an error thrown when get request fails due to reasons other than internet connectivity
     */
    static createGetRequestFailedError(errorDesc, endpoint) {
        return new BrowserAuthError(BrowserAuthErrorMessage.getRequestFailed.code, `${BrowserAuthErrorMessage.getRequestFailed.desc} | Network client threw: ${errorDesc} | Attempted to reach: ${endpoint.split("?")[0]}`);
    }
    /**
     * Create an error thrown when network client fails to parse network response
     */
    static createFailedToParseNetworkResponseError(endpoint) {
        return new BrowserAuthError(BrowserAuthErrorMessage.failedToParseNetworkResponse.code, `${BrowserAuthErrorMessage.failedToParseNetworkResponse.desc} | Attempted to reach: ${endpoint.split("?")[0]}`);
    }
    /**
     * Create an error thrown when the necessary information is not available to sideload tokens
     */
    static createUnableToLoadTokenError(errorDetail) {
        return new BrowserAuthError(BrowserAuthErrorMessage.unableToLoadTokenError.code, `${BrowserAuthErrorMessage.unableToLoadTokenError.desc} | ${errorDetail}`);
    }
    /**
     * Create an error thrown when the queried cryptographic key is not found in IndexedDB
     */
    static createSigningKeyNotFoundInStorageError(keyId) {
        return new BrowserAuthError(BrowserAuthErrorMessage.signingKeyNotFoundInStorage.code, `${BrowserAuthErrorMessage.signingKeyNotFoundInStorage.desc} | No match found for KeyId: ${keyId}`);
    }
    /**
     * Create an error when an authorization code is required but not provided
     */
    static createAuthCodeRequiredError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.authCodeRequired.code, BrowserAuthErrorMessage.authCodeRequired.desc);
    }
    /**
     * Create an error when an authorization code or native account ID is required but not provided
     */
    static createAuthCodeOrNativeAccountIdRequiredError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.authCodeOrNativeAccountRequired.code, BrowserAuthErrorMessage.authCodeOrNativeAccountRequired.desc);
    }
    /**
     * Create an error when both authorization code and native account ID are provided
     */
    static createSpaCodeAndNativeAccountIdPresentError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.spaCodeAndNativeAccountPresent.code, BrowserAuthErrorMessage.spaCodeAndNativeAccountPresent.desc);
    }
    /**
     * Create an error when IndexedDB is unavailable
     */
    static createDatabaseUnavailableError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.databaseUnavailable.code, BrowserAuthErrorMessage.databaseUnavailable.desc);
    }
    /**
     * Create an error when native token acquisition is not possible
     */
    static createUnableToAcquireTokenFromNativePlatformError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.unableToAcquireTokenFromNativePlatform.code, BrowserAuthErrorMessage.unableToAcquireTokenFromNativePlatform.desc);
    }
    /**
     * Create an error thrown when Handshake with browser extension times out
     */
    static createNativeHandshakeTimeoutError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.nativeHandshakeTimeout.code, BrowserAuthErrorMessage.nativeHandshakeTimeout.desc);
    }
    /**
     * Create an error thrown when browser extension is not installed
     */
    static createNativeExtensionNotInstalledError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.nativeExtensionNotInstalled.code, BrowserAuthErrorMessage.nativeExtensionNotInstalled.desc);
    }
    /**
     * Create an error when native connection has not been established
     * @returns
     */
    static createNativeConnectionNotEstablishedError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.nativeConnectionNotEstablished.code, BrowserAuthErrorMessage.nativeConnectionNotEstablished.desc);
    }
    /**
     * Create an error thrown when the initialize function hasn't been called
     */
    static createUninitializedPublicClientApplication() {
        return new BrowserAuthError(BrowserAuthErrorMessage.uninitializedPublicClientApplication.code, BrowserAuthErrorMessage.uninitializedPublicClientApplication.desc);
    }
    /**
     * Create an error thrown when requesting a token directly from the native platform with an unsupported prompt parameter e.g. select_account, login or create
     * These requests must go through eSTS to ensure eSTS is aware of the new account
     */
    static createNativePromptParameterNotSupportedError() {
        return new BrowserAuthError(BrowserAuthErrorMessage.nativePromptNotSupported.code, BrowserAuthErrorMessage.nativePromptNotSupported.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Constants
 */
const BrowserConstants = {
    /**
     * Interaction in progress cache value
     */
    INTERACTION_IN_PROGRESS_VALUE: "interaction_in_progress",
    /**
     * Invalid grant error code
     */
    INVALID_GRANT_ERROR: "invalid_grant",
    /**
     * Default popup window width
     */
    POPUP_WIDTH: 483,
    /**
     * Default popup window height
     */
    POPUP_HEIGHT: 600,
    /**
     * Name of the popup window starts with
     */
    POPUP_NAME_PREFIX: "msal",
    /**
     * Default popup monitor poll interval in milliseconds
     */
    DEFAULT_POLL_INTERVAL_MS: 30,
    /**
     * Msal-browser SKU
     */
    MSAL_SKU: "msal.js.browser",
};
const NativeConstants = {
    CHANNEL_ID: "53ee284d-920a-4b59-9d30-a60315b26836",
    PREFERRED_EXTENSION_ID: "ppnbnpeolgkicgegkbkbjmhlideopiji",
    MATS_TELEMETRY: "MATS",
};
const NativeExtensionMethod = {
    HandshakeRequest: "Handshake",
    HandshakeResponse: "HandshakeResponse",
    GetToken: "GetToken",
    Response: "Response",
};
const BrowserCacheLocation = {
    LocalStorage: "localStorage",
    SessionStorage: "sessionStorage",
    MemoryStorage: "memoryStorage",
};
/**
 * HTTP Request types supported by MSAL.
 */
const HTTP_REQUEST_TYPE = {
    GET: "GET",
    POST: "POST",
};
/**
 * Temporary cache keys for MSAL, deleted after any request.
 */
const TemporaryCacheKeys = {
    AUTHORITY: "authority",
    ACQUIRE_TOKEN_ACCOUNT: "acquireToken.account",
    SESSION_STATE: "session.state",
    REQUEST_STATE: "request.state",
    NONCE_IDTOKEN: "nonce.id_token",
    ORIGIN_URI: "request.origin",
    RENEW_STATUS: "token.renew.status",
    URL_HASH: "urlHash",
    REQUEST_PARAMS: "request.params",
    SCOPES: "scopes",
    INTERACTION_STATUS_KEY: "interaction.status",
    CCS_CREDENTIAL: "ccs.credential",
    CORRELATION_ID: "request.correlationId",
    NATIVE_REQUEST: "request.native",
    REDIRECT_CONTEXT: "request.redirect.context",
};
const StaticCacheKeys = {
    ACCOUNT_KEYS: "msal.account.keys",
    TOKEN_KEYS: "msal.token.keys",
};
/**
 * Cache keys stored in-memory
 */
const InMemoryCacheKeys = {
    WRAPPER_SKU: "wrapper.sku",
    WRAPPER_VER: "wrapper.version",
};
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 800-899 Auth Code Flow
 */
const ApiId = {
    acquireTokenRedirect: 861,
    acquireTokenPopup: 862,
    ssoSilent: 863,
    acquireTokenSilent_authCode: 864,
    handleRedirectPromise: 865,
    acquireTokenByCode: 866,
    acquireTokenSilent_silentFlow: 61,
    logout: 961,
    logoutPopup: 962,
};
/*
 * Interaction type of the API - used for state and telemetry
 */
exports.InteractionType = void 0;
(function (InteractionType) {
    InteractionType["Redirect"] = "redirect";
    InteractionType["Popup"] = "popup";
    InteractionType["Silent"] = "silent";
    InteractionType["None"] = "none";
})(exports.InteractionType || (exports.InteractionType = {}));
/**
 * Types of interaction currently in progress.
 * Used in events in wrapper libraries to invoke functions when certain interaction is in progress or all interactions are complete.
 */
const InteractionStatus = {
    /**
     * Initial status before interaction occurs
     */
    Startup: "startup",
    /**
     * Status set when all login calls occuring
     */
    Login: "login",
    /**
     * Status set when logout call occuring
     */
    Logout: "logout",
    /**
     * Status set for acquireToken calls
     */
    AcquireToken: "acquireToken",
    /**
     * Status set for ssoSilent calls
     */
    SsoSilent: "ssoSilent",
    /**
     * Status set when handleRedirect in progress
     */
    HandleRedirect: "handleRedirect",
    /**
     * Status set when interaction is complete
     */
    None: "none",
};
const DEFAULT_REQUEST = {
    scopes: OIDC_DEFAULT_SCOPES,
};
/**
 * JWK Key Format string (Type MUST be defined for window crypto APIs)
 */
const KEY_FORMAT_JWK = "jwk";
// Supported wrapper SKUs
const WrapperSKU = {
    React: "@azure/msal-react",
    Angular: "@azure/msal-angular",
};
// DatabaseStorage Constants
const DB_NAME = "msal.db";
const DB_VERSION = 1;
const DB_TABLE_NAME = `${DB_NAME}.keys`;
const CacheLookupPolicy = {
    /*
     * acquireTokenSilent will attempt to retrieve an access token from the cache. If the access token is expired
     * or cannot be found the refresh token will be used to acquire a new one. Finally, if the refresh token
     * is expired acquireTokenSilent will attempt to acquire new access and refresh tokens.
     */
    Default: 0,
    /*
     * acquireTokenSilent will only look for access tokens in the cache. It will not attempt to renew access or
     * refresh tokens.
     */
    AccessToken: 1,
    /*
     * acquireTokenSilent will attempt to retrieve an access token from the cache. If the access token is expired or
     * cannot be found, the refresh token will be used to acquire a new one. If the refresh token is expired, it
     * will not be renewed and acquireTokenSilent will fail.
     */
    AccessTokenAndRefreshToken: 2,
    /*
     * acquireTokenSilent will not attempt to retrieve access tokens from the cache and will instead attempt to
     * exchange the cached refresh token for a new access token. If the refresh token is expired, it will not be
     * renewed and acquireTokenSilent will fail.
     */
    RefreshToken: 3,
    /*
     * acquireTokenSilent will not look in the cache for the access token. It will go directly to network with the
     * cached refresh token. If the refresh token is expired an attempt will be made to renew it. This is equivalent to
     * setting "forceRefresh: true".
     */
    RefreshTokenAndNetwork: 4,
    /*
     * acquireTokenSilent will attempt to renew both access and refresh tokens. It will not look in the cache. This will
     * always fail if 3rd party cookies are blocked by the browser.
     */
    Skip: 5,
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * BrowserAuthErrorMessage class containing string constants used by error codes and messages.
 */
const BrowserConfigurationAuthErrorMessage = {
    redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set.",
    },
    postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set.",
    },
    storageNotSupportedError: {
        code: "storage_not_supported",
        desc: "Given storage configuration option was not supported.",
    },
    noRedirectCallbacksSet: {
        code: "no_redirect_callbacks",
        desc: "No redirect callbacks have been set. Please call setRedirectCallbacks() with the appropriate function arguments before continuing. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics.",
    },
    invalidCallbackObject: {
        code: "invalid_callback_object",
        desc: "The object passed for the callback was invalid. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics.",
    },
    stubPcaInstanceCalled: {
        code: "stubbed_public_client_application_called",
        desc: "Stub instance of Public Client Application was called. If using msal-react, please ensure context is not used without a provider. For more visit: aka.ms/msaljs/browser-errors",
    },
    inMemRedirectUnavailable: {
        code: "in_mem_redirect_unavailable",
        desc: "Redirect cannot be supported. In-memory storage was selected and storeAuthStateInCookie=false, which would cause the library to be unable to handle the incoming hash. If you would like to use the redirect API, please use session/localStorage or set storeAuthStateInCookie=true.",
    },
    entropyNotProvided: {
        code: "entropy_not_provided",
        desc: "The available browser crypto interface requires entropy set via system.cryptoOptions.entropy configuration option.",
    },
};
/**
 * Browser library error class thrown by the MSAL.js library for SPAs
 */
class BrowserConfigurationAuthError extends AuthError {
    constructor(errorCode, errorMessage) {
        super(errorCode, errorMessage);
        this.name = "BrowserConfigurationAuthError";
        Object.setPrototypeOf(this, BrowserConfigurationAuthError.prototype);
    }
    /**
     * Creates an error thrown when the redirect uri is empty (not set by caller)
     */
    static createRedirectUriEmptyError() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.redirectUriNotSet.code, BrowserConfigurationAuthErrorMessage.redirectUriNotSet.desc);
    }
    /**
     * Creates an error thrown when the post-logout redirect uri is empty (not set by caller)
     */
    static createPostLogoutRedirectUriEmptyError() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.postLogoutUriNotSet.code, BrowserConfigurationAuthErrorMessage.postLogoutUriNotSet.desc);
    }
    /**
     * Creates error thrown when given storage location is not supported.
     * @param givenStorageLocation
     */
    static createStorageNotSupportedError(givenStorageLocation) {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.storageNotSupportedError.code, `${BrowserConfigurationAuthErrorMessage.storageNotSupportedError.desc} Given Location: ${givenStorageLocation}`);
    }
    /**
     * Creates error thrown when redirect callbacks are not set before calling loginRedirect() or acquireTokenRedirect().
     */
    static createRedirectCallbacksNotSetError() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.noRedirectCallbacksSet.code, BrowserConfigurationAuthErrorMessage.noRedirectCallbacksSet.desc);
    }
    /**
     * Creates error thrown when the stub instance of PublicClientApplication is called.
     */
    static createStubPcaInstanceCalledError() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.stubPcaInstanceCalled.code, BrowserConfigurationAuthErrorMessage.stubPcaInstanceCalled.desc);
    }
    /*
     * Create an error thrown when in-memory storage is used and storeAuthStateInCookie=false.
     */
    static createInMemoryRedirectUnavailableError() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.inMemRedirectUnavailable.code, BrowserConfigurationAuthErrorMessage.inMemRedirectUnavailable.desc);
    }
    /**
     * Creates an error thrown when a crypto interface that requires entropy is initialized without entropy
     */
    static createEntropyNotProvided() {
        return new BrowserConfigurationAuthError(BrowserConfigurationAuthErrorMessage.entropyNotProvided.code, BrowserConfigurationAuthErrorMessage.entropyNotProvided.desc);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BrowserStorage {
    constructor(cacheLocation) {
        this.validateWindowStorage(cacheLocation);
        this.windowStorage = window[cacheLocation];
    }
    validateWindowStorage(cacheLocation) {
        if (cacheLocation !== BrowserCacheLocation.LocalStorage &&
            cacheLocation !== BrowserCacheLocation.SessionStorage) {
            throw BrowserConfigurationAuthError.createStorageNotSupportedError(cacheLocation);
        }
        const storageSupported = !!window[cacheLocation];
        if (!storageSupported) {
            throw BrowserConfigurationAuthError.createStorageNotSupportedError(cacheLocation);
        }
    }
    getItem(key) {
        return this.windowStorage.getItem(key);
    }
    setItem(key, value) {
        this.windowStorage.setItem(key, value);
    }
    removeItem(key) {
        this.windowStorage.removeItem(key);
    }
    getKeys() {
        return Object.keys(this.windowStorage);
    }
    containsKey(key) {
        return this.windowStorage.hasOwnProperty(key);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class MemoryStorage {
    constructor() {
        this.cache = new Map();
    }
    getItem(key) {
        return this.cache.get(key) || null;
    }
    setItem(key, value) {
        this.cache.set(key, value);
    }
    removeItem(key) {
        this.cache.delete(key);
    }
    getKeys() {
        const cacheKeys = [];
        this.cache.forEach((value, key) => {
            cacheKeys.push(key);
        });
        return cacheKeys;
    }
    containsKey(key) {
        return this.cache.has(key);
    }
    clear() {
        this.cache.clear();
    }
}

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements the cache storage interface for MSAL through browser local or session storage.
 * Cookies are only used if storeAuthStateInCookie is true, and are only used for
 * parameters such as state and nonce, generally.
 */
class BrowserCacheManager extends CacheManager {
    constructor(clientId, cacheConfig, cryptoImpl, logger) {
        super(clientId, cryptoImpl, logger);
        // Cookie life calculation (hours * minutes * seconds * ms)
        this.COOKIE_LIFE_MULTIPLIER = 24 * 60 * 60 * 1000;
        this.cacheConfig = cacheConfig;
        this.logger = logger;
        this.internalStorage = new MemoryStorage();
        this.browserStorage = this.setupBrowserStorage(this.cacheConfig.cacheLocation);
        this.temporaryCacheStorage = this.setupTemporaryCacheStorage(this.cacheConfig.temporaryCacheLocation, this.cacheConfig.cacheLocation);
        // Migrate cache entries from older versions of MSAL.
        if (cacheConfig.cacheMigrationEnabled) {
            this.migrateCacheEntries();
            this.createKeyMaps();
        }
    }
    /**
     * Returns a window storage class implementing the IWindowStorage interface that corresponds to the configured cacheLocation.
     * @param cacheLocation
     */
    setupBrowserStorage(cacheLocation) {
        switch (cacheLocation) {
            case BrowserCacheLocation.LocalStorage:
            case BrowserCacheLocation.SessionStorage:
                try {
                    return new BrowserStorage(cacheLocation);
                }
                catch (e) {
                    this.logger.verbose(e);
                    break;
                }
            case BrowserCacheLocation.MemoryStorage:
        }
        this.cacheConfig.cacheLocation = BrowserCacheLocation.MemoryStorage;
        return new MemoryStorage();
    }
    /**
     * Returns a window storage class implementing the IWindowStorage interface that corresponds to the configured temporaryCacheLocation.
     * @param temporaryCacheLocation
     * @param cacheLocation
     */
    setupTemporaryCacheStorage(temporaryCacheLocation, cacheLocation) {
        switch (cacheLocation) {
            case BrowserCacheLocation.LocalStorage:
            case BrowserCacheLocation.SessionStorage:
                try {
                    // Temporary cache items will always be stored in session storage to mitigate problems caused by multiple tabs
                    return new BrowserStorage(temporaryCacheLocation ||
                        BrowserCacheLocation.SessionStorage);
                }
                catch (e) {
                    this.logger.verbose(e);
                    return this.internalStorage;
                }
            case BrowserCacheLocation.MemoryStorage:
            default:
                return this.internalStorage;
        }
    }
    /**
     * Migrate all old cache entries to new schema. No rollback supported.
     * @param storeAuthStateInCookie
     */
    migrateCacheEntries() {
        const idTokenKey = `${Constants.CACHE_PREFIX}.${PersistentCacheKeys.ID_TOKEN}`;
        const clientInfoKey = `${Constants.CACHE_PREFIX}.${PersistentCacheKeys.CLIENT_INFO}`;
        const errorKey = `${Constants.CACHE_PREFIX}.${PersistentCacheKeys.ERROR}`;
        const errorDescKey = `${Constants.CACHE_PREFIX}.${PersistentCacheKeys.ERROR_DESC}`;
        const idTokenValue = this.browserStorage.getItem(idTokenKey);
        const clientInfoValue = this.browserStorage.getItem(clientInfoKey);
        const errorValue = this.browserStorage.getItem(errorKey);
        const errorDescValue = this.browserStorage.getItem(errorDescKey);
        const values = [
            idTokenValue,
            clientInfoValue,
            errorValue,
            errorDescValue,
        ];
        const keysToMigrate = [
            PersistentCacheKeys.ID_TOKEN,
            PersistentCacheKeys.CLIENT_INFO,
            PersistentCacheKeys.ERROR,
            PersistentCacheKeys.ERROR_DESC,
        ];
        keysToMigrate.forEach((cacheKey, index) => this.migrateCacheEntry(cacheKey, values[index]));
    }
    /**
     * Utility function to help with migration.
     * @param newKey
     * @param value
     * @param storeAuthStateInCookie
     */
    migrateCacheEntry(newKey, value) {
        if (value) {
            this.setTemporaryCache(newKey, value, true);
        }
    }
    /**
     * Searches all cache entries for MSAL accounts and creates the account key map
     * This is used to migrate users from older versions of MSAL which did not create the map.
     * @returns
     */
    createKeyMaps() {
        this.logger.trace("BrowserCacheManager - createKeyMaps called.");
        const accountKeys = this.getItem(StaticCacheKeys.ACCOUNT_KEYS);
        const tokenKeys = this.getItem(`${StaticCacheKeys.TOKEN_KEYS}.${this.clientId}`);
        if (accountKeys && tokenKeys) {
            this.logger.verbose("BrowserCacheManager:createKeyMaps - account and token key maps already exist, skipping migration.");
            // Key maps already exist, no need to iterate through cache
            return;
        }
        const allKeys = this.browserStorage.getKeys();
        allKeys.forEach((key) => {
            if (this.isCredentialKey(key)) {
                // Get item, parse, validate and write key to map
                const value = this.getItem(key);
                if (value) {
                    const credObj = this.validateAndParseJson(value);
                    if (credObj && credObj.hasOwnProperty("credentialType")) {
                        switch (credObj["credentialType"]) {
                            case CredentialType.ID_TOKEN:
                                if (IdTokenEntity.isIdTokenEntity(credObj)) {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - idToken found, saving key to token key map");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - idToken with key: ${key} found, saving key to token key map`);
                                    const idTokenEntity = CacheManager.toObject(new IdTokenEntity(), credObj);
                                    const newKey = this.updateCredentialCacheKey(key, idTokenEntity);
                                    this.addTokenKey(newKey, CredentialType.ID_TOKEN);
                                    return;
                                }
                                else {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - key found matching idToken schema with value containing idToken credentialType field but value failed IdTokenEntity validation, skipping.");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - failed idToken validation on key: ${key}`);
                                }
                                break;
                            case CredentialType.ACCESS_TOKEN:
                            case CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
                                if (AccessTokenEntity.isAccessTokenEntity(credObj)) {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - accessToken found, saving key to token key map");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - accessToken with key: ${key} found, saving key to token key map`);
                                    const accessTokenEntity = CacheManager.toObject(new AccessTokenEntity(), credObj);
                                    const newKey = this.updateCredentialCacheKey(key, accessTokenEntity);
                                    this.addTokenKey(newKey, CredentialType.ACCESS_TOKEN);
                                    return;
                                }
                                else {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - key found matching accessToken schema with value containing accessToken credentialType field but value failed AccessTokenEntity validation, skipping.");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - failed accessToken validation on key: ${key}`);
                                }
                                break;
                            case CredentialType.REFRESH_TOKEN:
                                if (RefreshTokenEntity.isRefreshTokenEntity(credObj)) {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - refreshToken found, saving key to token key map");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - refreshToken with key: ${key} found, saving key to token key map`);
                                    const refreshTokenEntity = CacheManager.toObject(new RefreshTokenEntity(), credObj);
                                    const newKey = this.updateCredentialCacheKey(key, refreshTokenEntity);
                                    this.addTokenKey(newKey, CredentialType.REFRESH_TOKEN);
                                    return;
                                }
                                else {
                                    this.logger.trace("BrowserCacheManager:createKeyMaps - key found matching refreshToken schema with value containing refreshToken credentialType field but value failed RefreshTokenEntity validation, skipping.");
                                    this.logger.tracePii(`BrowserCacheManager:createKeyMaps - failed refreshToken validation on key: ${key}`);
                                }
                                break;
                            // If credentialType isn't one of our predefined ones, it may not be an MSAL cache value. Ignore.
                        }
                    }
                }
            }
            if (this.isAccountKey(key)) {
                const value = this.getItem(key);
                if (value) {
                    const accountObj = this.validateAndParseJson(value);
                    if (accountObj &&
                        AccountEntity.isAccountEntity(accountObj)) {
                        this.logger.trace("BrowserCacheManager:createKeyMaps - account found, saving key to account key map");
                        this.logger.tracePii(`BrowserCacheManager:createKeyMaps - account with key: ${key} found, saving key to account key map`);
                        this.addAccountKeyToMap(key);
                    }
                }
            }
        });
    }
    /**
     * Parses passed value as JSON object, JSON.parse() will throw an error.
     * @param input
     */
    validateAndParseJson(jsonValue) {
        try {
            const parsedJson = JSON.parse(jsonValue);
            /**
             * There are edge cases in which JSON.parse will successfully parse a non-valid JSON object
             * (e.g. JSON.parse will parse an escaped string into an unescaped string), so adding a type check
             * of the parsed value is necessary in order to be certain that the string represents a valid JSON object.
             *
             */
            return parsedJson && typeof parsedJson === "object"
                ? parsedJson
                : null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * fetches the entry from the browser storage based off the key
     * @param key
     */
    getItem(key) {
        return this.browserStorage.getItem(key);
    }
    /**
     * sets the entry in the browser storage
     * @param key
     * @param value
     */
    setItem(key, value) {
        this.browserStorage.setItem(key, value);
    }
    /**
     * fetch the account entity from the platform cache
     * @param accountKey
     */
    getAccount(accountKey) {
        this.logger.trace("BrowserCacheManager.getAccount called");
        const account = this.getItem(accountKey);
        if (!account) {
            this.removeAccountKeyFromMap(accountKey);
            return null;
        }
        const parsedAccount = this.validateAndParseJson(account);
        if (!parsedAccount || !AccountEntity.isAccountEntity(parsedAccount)) {
            this.removeAccountKeyFromMap(accountKey);
            return null;
        }
        return CacheManager.toObject(new AccountEntity(), parsedAccount);
    }
    /**
     * set account entity in the platform cache
     * @param account
     */
    setAccount(account) {
        this.logger.trace("BrowserCacheManager.setAccount called");
        const key = account.generateAccountKey();
        this.setItem(key, JSON.stringify(account));
        this.addAccountKeyToMap(key);
    }
    /**
     * Returns the array of account keys currently cached
     * @returns
     */
    getAccountKeys() {
        this.logger.trace("BrowserCacheManager.getAccountKeys called");
        const accountKeys = this.getItem(StaticCacheKeys.ACCOUNT_KEYS);
        if (accountKeys) {
            return JSON.parse(accountKeys);
        }
        this.logger.verbose("BrowserCacheManager.getAccountKeys - No account keys found");
        return [];
    }
    /**
     * Add a new account to the key map
     * @param key
     */
    addAccountKeyToMap(key) {
        this.logger.trace("BrowserCacheManager.addAccountKeyToMap called");
        this.logger.tracePii(`BrowserCacheManager.addAccountKeyToMap called with key: ${key}`);
        const accountKeys = this.getAccountKeys();
        if (accountKeys.indexOf(key) === -1) {
            // Only add key if it does not already exist in the map
            accountKeys.push(key);
            this.setItem(StaticCacheKeys.ACCOUNT_KEYS, JSON.stringify(accountKeys));
            this.logger.verbose("BrowserCacheManager.addAccountKeyToMap account key added");
        }
        else {
            this.logger.verbose("BrowserCacheManager.addAccountKeyToMap account key already exists in map");
        }
    }
    /**
     * Remove an account from the key map
     * @param key
     */
    removeAccountKeyFromMap(key) {
        this.logger.trace("BrowserCacheManager.removeAccountKeyFromMap called");
        this.logger.tracePii(`BrowserCacheManager.removeAccountKeyFromMap called with key: ${key}`);
        const accountKeys = this.getAccountKeys();
        const removalIndex = accountKeys.indexOf(key);
        if (removalIndex > -1) {
            accountKeys.splice(removalIndex, 1);
            this.setItem(StaticCacheKeys.ACCOUNT_KEYS, JSON.stringify(accountKeys));
            this.logger.trace("BrowserCacheManager.removeAccountKeyFromMap account key removed");
        }
        else {
            this.logger.trace("BrowserCacheManager.removeAccountKeyFromMap key not found in existing map");
        }
    }
    /**
     * Extends inherited removeAccount function to include removal of the account key from the map
     * @param key
     */
    async removeAccount(key) {
        super.removeAccount(key);
        this.removeAccountKeyFromMap(key);
    }
    /**
     * Removes given idToken from the cache and from the key map
     * @param key
     */
    removeIdToken(key) {
        super.removeIdToken(key);
        this.removeTokenKey(key, CredentialType.ID_TOKEN);
    }
    /**
     * Removes given accessToken from the cache and from the key map
     * @param key
     */
    async removeAccessToken(key) {
        super.removeAccessToken(key);
        this.removeTokenKey(key, CredentialType.ACCESS_TOKEN);
    }
    /**
     * Removes given refreshToken from the cache and from the key map
     * @param key
     */
    removeRefreshToken(key) {
        super.removeRefreshToken(key);
        this.removeTokenKey(key, CredentialType.REFRESH_TOKEN);
    }
    /**
     * Gets the keys for the cached tokens associated with this clientId
     * @returns
     */
    getTokenKeys() {
        this.logger.trace("BrowserCacheManager.getTokenKeys called");
        const item = this.getItem(`${StaticCacheKeys.TOKEN_KEYS}.${this.clientId}`);
        if (item) {
            const tokenKeys = this.validateAndParseJson(item);
            if (tokenKeys &&
                tokenKeys.hasOwnProperty("idToken") &&
                tokenKeys.hasOwnProperty("accessToken") &&
                tokenKeys.hasOwnProperty("refreshToken")) {
                return tokenKeys;
            }
            else {
                this.logger.error("BrowserCacheManager.getTokenKeys - Token keys found but in an unknown format. Returning empty key map.");
            }
        }
        else {
            this.logger.verbose("BrowserCacheManager.getTokenKeys - No token keys found");
        }
        return {
            idToken: [],
            accessToken: [],
            refreshToken: [],
        };
    }
    /**
     * Adds the given key to the token key map
     * @param key
     * @param type
     */
    addTokenKey(key, type) {
        this.logger.trace("BrowserCacheManager addTokenKey called");
        const tokenKeys = this.getTokenKeys();
        switch (type) {
            case CredentialType.ID_TOKEN:
                if (tokenKeys.idToken.indexOf(key) === -1) {
                    this.logger.info("BrowserCacheManager: addTokenKey - idToken added to map");
                    tokenKeys.idToken.push(key);
                }
                break;
            case CredentialType.ACCESS_TOKEN:
                if (tokenKeys.accessToken.indexOf(key) === -1) {
                    this.logger.info("BrowserCacheManager: addTokenKey - accessToken added to map");
                    tokenKeys.accessToken.push(key);
                }
                break;
            case CredentialType.REFRESH_TOKEN:
                if (tokenKeys.refreshToken.indexOf(key) === -1) {
                    this.logger.info("BrowserCacheManager: addTokenKey - refreshToken added to map");
                    tokenKeys.refreshToken.push(key);
                }
                break;
            default:
                this.logger.error(`BrowserCacheManager:addTokenKey - CredentialType provided invalid. CredentialType: ${type}`);
                ClientAuthError.createUnexpectedCredentialTypeError();
        }
        this.setItem(`${StaticCacheKeys.TOKEN_KEYS}.${this.clientId}`, JSON.stringify(tokenKeys));
    }
    /**
     * Removes the given key from the token key map
     * @param key
     * @param type
     */
    removeTokenKey(key, type) {
        this.logger.trace("BrowserCacheManager removeTokenKey called");
        const tokenKeys = this.getTokenKeys();
        switch (type) {
            case CredentialType.ID_TOKEN:
                this.logger.infoPii(`BrowserCacheManager: removeTokenKey - attempting to remove idToken with key: ${key} from map`);
                const idRemoval = tokenKeys.idToken.indexOf(key);
                if (idRemoval > -1) {
                    this.logger.info("BrowserCacheManager: removeTokenKey - idToken removed from map");
                    tokenKeys.idToken.splice(idRemoval, 1);
                }
                else {
                    this.logger.info("BrowserCacheManager: removeTokenKey - idToken does not exist in map. Either it was previously removed or it was never added.");
                }
                break;
            case CredentialType.ACCESS_TOKEN:
                this.logger.infoPii(`BrowserCacheManager: removeTokenKey - attempting to remove accessToken with key: ${key} from map`);
                const accessRemoval = tokenKeys.accessToken.indexOf(key);
                if (accessRemoval > -1) {
                    this.logger.info("BrowserCacheManager: removeTokenKey - accessToken removed from map");
                    tokenKeys.accessToken.splice(accessRemoval, 1);
                }
                else {
                    this.logger.info("BrowserCacheManager: removeTokenKey - accessToken does not exist in map. Either it was previously removed or it was never added.");
                }
                break;
            case CredentialType.REFRESH_TOKEN:
                this.logger.infoPii(`BrowserCacheManager: removeTokenKey - attempting to remove refreshToken with key: ${key} from map`);
                const refreshRemoval = tokenKeys.refreshToken.indexOf(key);
                if (refreshRemoval > -1) {
                    this.logger.info("BrowserCacheManager: removeTokenKey - refreshToken removed from map");
                    tokenKeys.refreshToken.splice(refreshRemoval, 1);
                }
                else {
                    this.logger.info("BrowserCacheManager: removeTokenKey - refreshToken does not exist in map. Either it was previously removed or it was never added.");
                }
                break;
            default:
                this.logger.error(`BrowserCacheManager:removeTokenKey - CredentialType provided invalid. CredentialType: ${type}`);
                ClientAuthError.createUnexpectedCredentialTypeError();
        }
        this.setItem(`${StaticCacheKeys.TOKEN_KEYS}.${this.clientId}`, JSON.stringify(tokenKeys));
    }
    /**
     * generates idToken entity from a string
     * @param idTokenKey
     */
    getIdTokenCredential(idTokenKey) {
        const value = this.getItem(idTokenKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getIdTokenCredential: called, no cache hit");
            this.removeTokenKey(idTokenKey, CredentialType.ID_TOKEN);
            return null;
        }
        const parsedIdToken = this.validateAndParseJson(value);
        if (!parsedIdToken || !IdTokenEntity.isIdTokenEntity(parsedIdToken)) {
            this.logger.trace("BrowserCacheManager.getIdTokenCredential: called, no cache hit");
            this.removeTokenKey(idTokenKey, CredentialType.ID_TOKEN);
            return null;
        }
        this.logger.trace("BrowserCacheManager.getIdTokenCredential: cache hit");
        return CacheManager.toObject(new IdTokenEntity(), parsedIdToken);
    }
    /**
     * set IdToken credential to the platform cache
     * @param idToken
     */
    setIdTokenCredential(idToken) {
        this.logger.trace("BrowserCacheManager.setIdTokenCredential called");
        const idTokenKey = idToken.generateCredentialKey();
        this.setItem(idTokenKey, JSON.stringify(idToken));
        this.addTokenKey(idTokenKey, CredentialType.ID_TOKEN);
    }
    /**
     * generates accessToken entity from a string
     * @param key
     */
    getAccessTokenCredential(accessTokenKey) {
        const value = this.getItem(accessTokenKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getAccessTokenCredential: called, no cache hit");
            this.removeTokenKey(accessTokenKey, CredentialType.ACCESS_TOKEN);
            return null;
        }
        const parsedAccessToken = this.validateAndParseJson(value);
        if (!parsedAccessToken ||
            !AccessTokenEntity.isAccessTokenEntity(parsedAccessToken)) {
            this.logger.trace("BrowserCacheManager.getAccessTokenCredential: called, no cache hit");
            this.removeTokenKey(accessTokenKey, CredentialType.ACCESS_TOKEN);
            return null;
        }
        this.logger.trace("BrowserCacheManager.getAccessTokenCredential: cache hit");
        return CacheManager.toObject(new AccessTokenEntity(), parsedAccessToken);
    }
    /**
     * set accessToken credential to the platform cache
     * @param accessToken
     */
    setAccessTokenCredential(accessToken) {
        this.logger.trace("BrowserCacheManager.setAccessTokenCredential called");
        const accessTokenKey = accessToken.generateCredentialKey();
        this.setItem(accessTokenKey, JSON.stringify(accessToken));
        this.addTokenKey(accessTokenKey, CredentialType.ACCESS_TOKEN);
    }
    /**
     * generates refreshToken entity from a string
     * @param refreshTokenKey
     */
    getRefreshTokenCredential(refreshTokenKey) {
        const value = this.getItem(refreshTokenKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getRefreshTokenCredential: called, no cache hit");
            this.removeTokenKey(refreshTokenKey, CredentialType.REFRESH_TOKEN);
            return null;
        }
        const parsedRefreshToken = this.validateAndParseJson(value);
        if (!parsedRefreshToken ||
            !RefreshTokenEntity.isRefreshTokenEntity(parsedRefreshToken)) {
            this.logger.trace("BrowserCacheManager.getRefreshTokenCredential: called, no cache hit");
            this.removeTokenKey(refreshTokenKey, CredentialType.REFRESH_TOKEN);
            return null;
        }
        this.logger.trace("BrowserCacheManager.getRefreshTokenCredential: cache hit");
        return CacheManager.toObject(new RefreshTokenEntity(), parsedRefreshToken);
    }
    /**
     * set refreshToken credential to the platform cache
     * @param refreshToken
     */
    setRefreshTokenCredential(refreshToken) {
        this.logger.trace("BrowserCacheManager.setRefreshTokenCredential called");
        const refreshTokenKey = refreshToken.generateCredentialKey();
        this.setItem(refreshTokenKey, JSON.stringify(refreshToken));
        this.addTokenKey(refreshTokenKey, CredentialType.REFRESH_TOKEN);
    }
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey
     */
    getAppMetadata(appMetadataKey) {
        const value = this.getItem(appMetadataKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getAppMetadata: called, no cache hit");
            return null;
        }
        const parsedMetadata = this.validateAndParseJson(value);
        if (!parsedMetadata ||
            !AppMetadataEntity.isAppMetadataEntity(appMetadataKey, parsedMetadata)) {
            this.logger.trace("BrowserCacheManager.getAppMetadata: called, no cache hit");
            return null;
        }
        this.logger.trace("BrowserCacheManager.getAppMetadata: cache hit");
        return CacheManager.toObject(new AppMetadataEntity(), parsedMetadata);
    }
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata
     */
    setAppMetadata(appMetadata) {
        this.logger.trace("BrowserCacheManager.setAppMetadata called");
        const appMetadataKey = appMetadata.generateAppMetadataKey();
        this.setItem(appMetadataKey, JSON.stringify(appMetadata));
    }
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetryKey
     */
    getServerTelemetry(serverTelemetryKey) {
        const value = this.getItem(serverTelemetryKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getServerTelemetry: called, no cache hit");
            return null;
        }
        const parsedMetadata = this.validateAndParseJson(value);
        if (!parsedMetadata ||
            !ServerTelemetryEntity.isServerTelemetryEntity(serverTelemetryKey, parsedMetadata)) {
            this.logger.trace("BrowserCacheManager.getServerTelemetry: called, no cache hit");
            return null;
        }
        this.logger.trace("BrowserCacheManager.getServerTelemetry: cache hit");
        return CacheManager.toObject(new ServerTelemetryEntity(), parsedMetadata);
    }
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey
     * @param serverTelemetry
     */
    setServerTelemetry(serverTelemetryKey, serverTelemetry) {
        this.logger.trace("BrowserCacheManager.setServerTelemetry called");
        this.setItem(serverTelemetryKey, JSON.stringify(serverTelemetry));
    }
    /**
     *
     */
    getAuthorityMetadata(key) {
        const value = this.internalStorage.getItem(key);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getAuthorityMetadata: called, no cache hit");
            return null;
        }
        const parsedMetadata = this.validateAndParseJson(value);
        if (parsedMetadata &&
            AuthorityMetadataEntity.isAuthorityMetadataEntity(key, parsedMetadata)) {
            this.logger.trace("BrowserCacheManager.getAuthorityMetadata: cache hit");
            return CacheManager.toObject(new AuthorityMetadataEntity(), parsedMetadata);
        }
        return null;
    }
    /**
     *
     */
    getAuthorityMetadataKeys() {
        const allKeys = this.internalStorage.getKeys();
        return allKeys.filter((key) => {
            return this.isAuthorityMetadata(key);
        });
    }
    /**
     * Sets wrapper metadata in memory
     * @param wrapperSKU
     * @param wrapperVersion
     */
    setWrapperMetadata(wrapperSKU, wrapperVersion) {
        this.internalStorage.setItem(InMemoryCacheKeys.WRAPPER_SKU, wrapperSKU);
        this.internalStorage.setItem(InMemoryCacheKeys.WRAPPER_VER, wrapperVersion);
    }
    /**
     * Returns wrapper metadata from in-memory storage
     */
    getWrapperMetadata() {
        const sku = this.internalStorage.getItem(InMemoryCacheKeys.WRAPPER_SKU) ||
            Constants.EMPTY_STRING;
        const version = this.internalStorage.getItem(InMemoryCacheKeys.WRAPPER_VER) ||
            Constants.EMPTY_STRING;
        return [sku, version];
    }
    /**
     *
     * @param entity
     */
    setAuthorityMetadata(key, entity) {
        this.logger.trace("BrowserCacheManager.setAuthorityMetadata called");
        this.internalStorage.setItem(key, JSON.stringify(entity));
    }
    /**
     * Gets the active account
     */
    getActiveAccount() {
        const activeAccountKeyFilters = this.generateCacheKey(PersistentCacheKeys.ACTIVE_ACCOUNT_FILTERS);
        const activeAccountValueFilters = this.getItem(activeAccountKeyFilters);
        if (!activeAccountValueFilters) {
            // if new active account cache type isn't found, it's an old version, so look for that instead
            this.logger.trace("BrowserCacheManager.getActiveAccount: No active account filters cache schema found, looking for legacy schema");
            const activeAccountKeyLocal = this.generateCacheKey(PersistentCacheKeys.ACTIVE_ACCOUNT);
            const activeAccountValueLocal = this.getItem(activeAccountKeyLocal);
            if (!activeAccountValueLocal) {
                this.logger.trace("BrowserCacheManager.getActiveAccount: No active account found");
                return null;
            }
            const activeAccount = this.getAccountInfoByFilter({
                localAccountId: activeAccountValueLocal,
            })[0] || null;
            if (activeAccount) {
                this.logger.trace("BrowserCacheManager.getActiveAccount: Legacy active account cache schema found");
                this.logger.trace("BrowserCacheManager.getActiveAccount: Adding active account filters cache schema");
                this.setActiveAccount(activeAccount);
                return activeAccount;
            }
            return null;
        }
        const activeAccountValueObj = this.validateAndParseJson(activeAccountValueFilters);
        if (activeAccountValueObj) {
            this.logger.trace("BrowserCacheManager.getActiveAccount: Active account filters schema found");
            return (this.getAccountInfoByFilter({
                homeAccountId: activeAccountValueObj.homeAccountId,
                localAccountId: activeAccountValueObj.localAccountId,
            })[0] || null);
        }
        this.logger.trace("BrowserCacheManager.getActiveAccount: No active account found");
        return null;
    }
    /**
     * Sets the active account's localAccountId in cache
     * @param account
     */
    setActiveAccount(account) {
        const activeAccountKey = this.generateCacheKey(PersistentCacheKeys.ACTIVE_ACCOUNT_FILTERS);
        const activeAccountKeyLocal = this.generateCacheKey(PersistentCacheKeys.ACTIVE_ACCOUNT);
        if (account) {
            this.logger.verbose("setActiveAccount: Active account set");
            const activeAccountValue = {
                homeAccountId: account.homeAccountId,
                localAccountId: account.localAccountId,
            };
            this.browserStorage.setItem(activeAccountKey, JSON.stringify(activeAccountValue));
            this.browserStorage.setItem(activeAccountKeyLocal, account.localAccountId);
        }
        else {
            this.logger.verbose("setActiveAccount: No account passed, active account not set");
            this.browserStorage.removeItem(activeAccountKey);
            this.browserStorage.removeItem(activeAccountKeyLocal);
        }
    }
    /**
     * Gets a list of accounts that match all of the filters provided
     * @param account
     */
    getAccountInfoByFilter(accountFilter) {
        const allAccounts = this.getAllAccounts();
        this.logger.trace(`BrowserCacheManager.getAccountInfoByFilter: total ${allAccounts.length} accounts found`);
        return allAccounts.filter((accountObj) => {
            if (accountFilter.username &&
                accountFilter.username.toLowerCase() !==
                    accountObj.username.toLowerCase()) {
                return false;
            }
            if (accountFilter.homeAccountId &&
                accountFilter.homeAccountId !== accountObj.homeAccountId) {
                return false;
            }
            if (accountFilter.localAccountId &&
                accountFilter.localAccountId !== accountObj.localAccountId) {
                return false;
            }
            if (accountFilter.tenantId &&
                accountFilter.tenantId !== accountObj.tenantId) {
                return false;
            }
            if (accountFilter.environment &&
                accountFilter.environment !== accountObj.environment) {
                return false;
            }
            return true;
        });
    }
    /**
     * Checks the cache for accounts matching loginHint or SID
     * @param loginHint
     * @param sid
     */
    getAccountInfoByHints(loginHint, sid) {
        const matchingAccounts = this.getAllAccounts().filter((accountInfo) => {
            if (sid) {
                const accountSid = accountInfo.idTokenClaims &&
                    accountInfo.idTokenClaims["sid"];
                return sid === accountSid;
            }
            if (loginHint) {
                return loginHint === accountInfo.username;
            }
            return false;
        });
        if (matchingAccounts.length === 1) {
            return matchingAccounts[0];
        }
        else if (matchingAccounts.length > 1) {
            throw ClientAuthError.createMultipleMatchingAccountsInCacheError();
        }
        return null;
    }
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey
     */
    getThrottlingCache(throttlingCacheKey) {
        const value = this.getItem(throttlingCacheKey);
        if (!value) {
            this.logger.trace("BrowserCacheManager.getThrottlingCache: called, no cache hit");
            return null;
        }
        const parsedThrottlingCache = this.validateAndParseJson(value);
        if (!parsedThrottlingCache ||
            !ThrottlingEntity.isThrottlingEntity(throttlingCacheKey, parsedThrottlingCache)) {
            this.logger.trace("BrowserCacheManager.getThrottlingCache: called, no cache hit");
            return null;
        }
        this.logger.trace("BrowserCacheManager.getThrottlingCache: cache hit");
        return CacheManager.toObject(new ThrottlingEntity(), parsedThrottlingCache);
    }
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey
     * @param throttlingCache
     */
    setThrottlingCache(throttlingCacheKey, throttlingCache) {
        this.logger.trace("BrowserCacheManager.setThrottlingCache called");
        this.setItem(throttlingCacheKey, JSON.stringify(throttlingCache));
    }
    /**
     * Gets cache item with given key.
     * Will retrieve from cookies if storeAuthStateInCookie is set to true.
     * @param key
     */
    getTemporaryCache(cacheKey, generateKey) {
        const key = generateKey ? this.generateCacheKey(cacheKey) : cacheKey;
        if (this.cacheConfig.storeAuthStateInCookie) {
            const itemCookie = this.getItemCookie(key);
            if (itemCookie) {
                this.logger.trace("BrowserCacheManager.getTemporaryCache: storeAuthStateInCookies set to true, retrieving from cookies");
                return itemCookie;
            }
        }
        const value = this.temporaryCacheStorage.getItem(key);
        if (!value) {
            // If temp cache item not found in session/memory, check local storage for items set by old versions
            if (this.cacheConfig.cacheLocation ===
                BrowserCacheLocation.LocalStorage) {
                const item = this.browserStorage.getItem(key);
                if (item) {
                    this.logger.trace("BrowserCacheManager.getTemporaryCache: Temporary cache item found in local storage");
                    return item;
                }
            }
            this.logger.trace("BrowserCacheManager.getTemporaryCache: No cache item found in local storage");
            return null;
        }
        this.logger.trace("BrowserCacheManager.getTemporaryCache: Temporary cache item returned");
        return value;
    }
    /**
     * Sets the cache item with the key and value given.
     * Stores in cookie if storeAuthStateInCookie is set to true.
     * This can cause cookie overflow if used incorrectly.
     * @param key
     * @param value
     */
    setTemporaryCache(cacheKey, value, generateKey) {
        const key = generateKey ? this.generateCacheKey(cacheKey) : cacheKey;
        this.temporaryCacheStorage.setItem(key, value);
        if (this.cacheConfig.storeAuthStateInCookie) {
            this.logger.trace("BrowserCacheManager.setTemporaryCache: storeAuthStateInCookie set to true, setting item cookie");
            this.setItemCookie(key, value);
        }
    }
    /**
     * Removes the cache item with the given key.
     * Will also clear the cookie item if storeAuthStateInCookie is set to true.
     * @param key
     */
    removeItem(key) {
        this.browserStorage.removeItem(key);
        this.temporaryCacheStorage.removeItem(key);
        if (this.cacheConfig.storeAuthStateInCookie) {
            this.logger.trace("BrowserCacheManager.removeItem: storeAuthStateInCookie is true, clearing item cookie");
            this.clearItemCookie(key);
        }
    }
    /**
     * Checks whether key is in cache.
     * @param key
     */
    containsKey(key) {
        return (this.browserStorage.containsKey(key) ||
            this.temporaryCacheStorage.containsKey(key));
    }
    /**
     * Gets all keys in window.
     */
    getKeys() {
        return [
            ...this.browserStorage.getKeys(),
            ...this.temporaryCacheStorage.getKeys(),
        ];
    }
    /**
     * Clears all cache entries created by MSAL.
     */
    async clear() {
        // Removes all accounts and their credentials
        await this.removeAllAccounts();
        this.removeAppMetadata();
        // Removes all remaining MSAL cache items
        this.getKeys().forEach((cacheKey) => {
            // Check if key contains msal prefix; For now, we are clearing all the cache items created by MSAL.js
            if ((this.browserStorage.containsKey(cacheKey) ||
                this.temporaryCacheStorage.containsKey(cacheKey)) &&
                (cacheKey.indexOf(Constants.CACHE_PREFIX) !== -1 ||
                    cacheKey.indexOf(this.clientId) !== -1)) {
                this.removeItem(cacheKey);
            }
        });
        this.internalStorage.clear();
    }
    /**
     * Add value to cookies
     * @param cookieName
     * @param cookieValue
     * @param expires
     */
    setItemCookie(cookieName, cookieValue, expires) {
        let cookieStr = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)};path=/;SameSite=Lax;`;
        if (expires) {
            const expireTime = this.getCookieExpirationTime(expires);
            cookieStr += `expires=${expireTime};`;
        }
        if (this.cacheConfig.secureCookies) {
            cookieStr += "Secure;";
        }
        document.cookie = cookieStr;
    }
    /**
     * Get one item by key from cookies
     * @param cookieName
     */
    getItemCookie(cookieName) {
        const name = `${encodeURIComponent(cookieName)}=`;
        const cookieList = document.cookie.split(";");
        for (let i = 0; i < cookieList.length; i++) {
            let cookie = cookieList[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return decodeURIComponent(cookie.substring(name.length, cookie.length));
            }
        }
        return Constants.EMPTY_STRING;
    }
    /**
     * Clear all msal-related cookies currently set in the browser. Should only be used to clear temporary cache items.
     */
    clearMsalCookies() {
        const cookiePrefix = `${Constants.CACHE_PREFIX}.${this.clientId}`;
        const cookieList = document.cookie.split(";");
        cookieList.forEach((cookie) => {
            while (cookie.charAt(0) === " ") {
                // eslint-disable-next-line no-param-reassign
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookiePrefix) === 0) {
                const cookieKey = cookie.split("=")[0];
                this.clearItemCookie(cookieKey);
            }
        });
    }
    /**
     * Clear an item in the cookies by key
     * @param cookieName
     */
    clearItemCookie(cookieName) {
        this.setItemCookie(cookieName, Constants.EMPTY_STRING, -1);
    }
    /**
     * Get cookie expiration time
     * @param cookieLifeDays
     */
    getCookieExpirationTime(cookieLifeDays) {
        const today = new Date();
        const expr = new Date(today.getTime() + cookieLifeDays * this.COOKIE_LIFE_MULTIPLIER);
        return expr.toUTCString();
    }
    /**
     * Gets the cache object referenced by the browser
     */
    getCache() {
        return this.browserStorage;
    }
    /**
     * interface compat, we cannot overwrite browser cache; Functionality is supported by individual entities in browser
     */
    setCache() {
        // sets nothing
    }
    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    generateCacheKey(key) {
        const generatedKey = this.validateAndParseJson(key);
        if (!generatedKey) {
            if (StringUtils.startsWith(key, Constants.CACHE_PREFIX) ||
                StringUtils.startsWith(key, PersistentCacheKeys.ADAL_ID_TOKEN)) {
                return key;
            }
            return `${Constants.CACHE_PREFIX}.${this.clientId}.${key}`;
        }
        return JSON.stringify(key);
    }
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    generateAuthorityKey(stateString) {
        const { libraryState: { id: stateId }, } = ProtocolUtils.parseRequestState(this.cryptoImpl, stateString);
        return this.generateCacheKey(`${TemporaryCacheKeys.AUTHORITY}.${stateId}`);
    }
    /**
     * Create Nonce key to cache nonce
     * @param state
     */
    generateNonceKey(stateString) {
        const { libraryState: { id: stateId }, } = ProtocolUtils.parseRequestState(this.cryptoImpl, stateString);
        return this.generateCacheKey(`${TemporaryCacheKeys.NONCE_IDTOKEN}.${stateId}`);
    }
    /**
     * Creates full cache key for the request state
     * @param stateString State string for the request
     */
    generateStateKey(stateString) {
        // Use the library state id to key temp storage for uniqueness for multiple concurrent requests
        const { libraryState: { id: stateId }, } = ProtocolUtils.parseRequestState(this.cryptoImpl, stateString);
        return this.generateCacheKey(`${TemporaryCacheKeys.REQUEST_STATE}.${stateId}`);
    }
    /**
     * Gets the cached authority based on the cached state. Returns empty if no cached state found.
     */
    getCachedAuthority(cachedState) {
        const stateCacheKey = this.generateStateKey(cachedState);
        const state = this.getTemporaryCache(stateCacheKey);
        if (!state) {
            return null;
        }
        const authorityCacheKey = this.generateAuthorityKey(state);
        return this.getTemporaryCache(authorityCacheKey);
    }
    /**
     * Updates account, authority, and state in cache
     * @param serverAuthenticationRequest
     * @param account
     */
    updateCacheEntries(state, nonce, authorityInstance, loginHint, account) {
        this.logger.trace("BrowserCacheManager.updateCacheEntries called");
        // Cache the request state
        const stateCacheKey = this.generateStateKey(state);
        this.setTemporaryCache(stateCacheKey, state, false);
        // Cache the nonce
        const nonceCacheKey = this.generateNonceKey(state);
        this.setTemporaryCache(nonceCacheKey, nonce, false);
        // Cache authorityKey
        const authorityCacheKey = this.generateAuthorityKey(state);
        this.setTemporaryCache(authorityCacheKey, authorityInstance, false);
        if (account) {
            const ccsCredential = {
                credential: account.homeAccountId,
                type: CcsCredentialType.HOME_ACCOUNT_ID,
            };
            this.setTemporaryCache(TemporaryCacheKeys.CCS_CREDENTIAL, JSON.stringify(ccsCredential), true);
        }
        else if (!StringUtils.isEmpty(loginHint)) {
            const ccsCredential = {
                credential: loginHint,
                type: CcsCredentialType.UPN,
            };
            this.setTemporaryCache(TemporaryCacheKeys.CCS_CREDENTIAL, JSON.stringify(ccsCredential), true);
        }
    }
    /**
     * Reset all temporary cache items
     * @param state
     */
    resetRequestCache(state) {
        this.logger.trace("BrowserCacheManager.resetRequestCache called");
        // check state and remove associated cache items
        if (!StringUtils.isEmpty(state)) {
            this.getKeys().forEach((key) => {
                if (key.indexOf(state) !== -1) {
                    this.removeItem(key);
                }
            });
        }
        // delete generic interactive request parameters
        if (state) {
            this.removeItem(this.generateStateKey(state));
            this.removeItem(this.generateNonceKey(state));
            this.removeItem(this.generateAuthorityKey(state));
        }
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.REQUEST_PARAMS));
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.ORIGIN_URI));
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.URL_HASH));
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.CORRELATION_ID));
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.CCS_CREDENTIAL));
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.NATIVE_REQUEST));
        this.setInteractionInProgress(false);
    }
    /**
     * Removes temporary cache for the provided state
     * @param stateString
     */
    cleanRequestByState(stateString) {
        this.logger.trace("BrowserCacheManager.cleanRequestByState called");
        // Interaction is completed - remove interaction status.
        if (stateString) {
            const stateKey = this.generateStateKey(stateString);
            const cachedState = this.temporaryCacheStorage.getItem(stateKey);
            this.logger.infoPii(`BrowserCacheManager.cleanRequestByState: Removing temporary cache items for state: ${cachedState}`);
            this.resetRequestCache(cachedState || Constants.EMPTY_STRING);
        }
        this.clearMsalCookies();
    }
    /**
     * Looks in temporary cache for any state values with the provided interactionType and removes all temporary cache items for that state
     * Used in scenarios where temp cache needs to be cleaned but state is not known, such as clicking browser back button.
     * @param interactionType
     */
    cleanRequestByInteractionType(interactionType) {
        this.logger.trace("BrowserCacheManager.cleanRequestByInteractionType called");
        // Loop through all keys to find state key
        this.getKeys().forEach((key) => {
            // If this key is not the state key, move on
            if (key.indexOf(TemporaryCacheKeys.REQUEST_STATE) === -1) {
                return;
            }
            // Retrieve state value, return if not a valid value
            const stateValue = this.temporaryCacheStorage.getItem(key);
            if (!stateValue) {
                return;
            }
            // Extract state and ensure it matches given InteractionType, then clean request cache
            const parsedState = BrowserProtocolUtils.extractBrowserRequestState(this.cryptoImpl, stateValue);
            if (parsedState &&
                parsedState.interactionType === interactionType) {
                this.logger.infoPii(`BrowserCacheManager.cleanRequestByInteractionType: Removing temporary cache items for state: ${stateValue}`);
                this.resetRequestCache(stateValue);
            }
        });
        this.clearMsalCookies();
        this.setInteractionInProgress(false);
    }
    cacheCodeRequest(authCodeRequest, browserCrypto) {
        this.logger.trace("BrowserCacheManager.cacheCodeRequest called");
        const encodedValue = browserCrypto.base64Encode(JSON.stringify(authCodeRequest));
        this.setTemporaryCache(TemporaryCacheKeys.REQUEST_PARAMS, encodedValue, true);
    }
    /**
     * Gets the token exchange parameters from the cache. Throws an error if nothing is found.
     */
    getCachedRequest(state, browserCrypto) {
        this.logger.trace("BrowserCacheManager.getCachedRequest called");
        // Get token request from cache and parse as TokenExchangeParameters.
        const encodedTokenRequest = this.getTemporaryCache(TemporaryCacheKeys.REQUEST_PARAMS, true);
        if (!encodedTokenRequest) {
            throw BrowserAuthError.createNoTokenRequestCacheError();
        }
        const parsedRequest = this.validateAndParseJson(browserCrypto.base64Decode(encodedTokenRequest));
        if (!parsedRequest) {
            throw BrowserAuthError.createUnableToParseTokenRequestCacheError();
        }
        this.removeItem(this.generateCacheKey(TemporaryCacheKeys.REQUEST_PARAMS));
        // Get cached authority and use if no authority is cached with request.
        if (StringUtils.isEmpty(parsedRequest.authority)) {
            const authorityCacheKey = this.generateAuthorityKey(state);
            const cachedAuthority = this.getTemporaryCache(authorityCacheKey);
            if (!cachedAuthority) {
                throw BrowserAuthError.createNoCachedAuthorityError();
            }
            parsedRequest.authority = cachedAuthority;
        }
        return parsedRequest;
    }
    /**
     * Gets cached native request for redirect flows
     */
    getCachedNativeRequest() {
        this.logger.trace("BrowserCacheManager.getCachedNativeRequest called");
        const cachedRequest = this.getTemporaryCache(TemporaryCacheKeys.NATIVE_REQUEST, true);
        if (!cachedRequest) {
            this.logger.trace("BrowserCacheManager.getCachedNativeRequest: No cached native request found");
            return null;
        }
        const parsedRequest = this.validateAndParseJson(cachedRequest);
        if (!parsedRequest) {
            this.logger.error("BrowserCacheManager.getCachedNativeRequest: Unable to parse native request");
            return null;
        }
        return parsedRequest;
    }
    isInteractionInProgress(matchClientId) {
        const clientId = this.getInteractionInProgress();
        if (matchClientId) {
            return clientId === this.clientId;
        }
        else {
            return !!clientId;
        }
    }
    getInteractionInProgress() {
        const key = `${Constants.CACHE_PREFIX}.${TemporaryCacheKeys.INTERACTION_STATUS_KEY}`;
        return this.getTemporaryCache(key, false);
    }
    setInteractionInProgress(inProgress) {
        // Ensure we don't overwrite interaction in progress for a different clientId
        const key = `${Constants.CACHE_PREFIX}.${TemporaryCacheKeys.INTERACTION_STATUS_KEY}`;
        if (inProgress) {
            if (this.getInteractionInProgress()) {
                throw BrowserAuthError.createInteractionInProgressError();
            }
            else {
                // No interaction is in progress
                this.setTemporaryCache(key, this.clientId, false);
            }
        }
        else if (!inProgress &&
            this.getInteractionInProgress() === this.clientId) {
            this.removeItem(key);
        }
    }
    /**
     * Returns username retrieved from ADAL or MSAL v1 idToken
     */
    getLegacyLoginHint() {
        // Only check for adal/msal token if no SSO params are being used
        const adalIdTokenString = this.getTemporaryCache(PersistentCacheKeys.ADAL_ID_TOKEN);
        if (adalIdTokenString) {
            this.browserStorage.removeItem(PersistentCacheKeys.ADAL_ID_TOKEN);
            this.logger.verbose("Cached ADAL id token retrieved.");
        }
        // Check for cached MSAL v1 id token
        const msalIdTokenString = this.getTemporaryCache(PersistentCacheKeys.ID_TOKEN, true);
        if (msalIdTokenString) {
            this.removeItem(this.generateCacheKey(PersistentCacheKeys.ID_TOKEN));
            this.logger.verbose("Cached MSAL.js v1 id token retrieved");
        }
        const cachedIdTokenString = msalIdTokenString || adalIdTokenString;
        if (cachedIdTokenString) {
            const cachedIdToken = new AuthToken(cachedIdTokenString, this.cryptoImpl);
            if (cachedIdToken.claims &&
                cachedIdToken.claims.preferred_username) {
                this.logger.verbose("No SSO params used and ADAL/MSAL v1 token retrieved, setting ADAL/MSAL v1 preferred_username as loginHint");
                return cachedIdToken.claims.preferred_username;
            }
            else if (cachedIdToken.claims && cachedIdToken.claims.upn) {
                this.logger.verbose("No SSO params used and ADAL/MSAL v1 token retrieved, setting ADAL/MSAL v1 upn as loginHint");
                return cachedIdToken.claims.upn;
            }
            else {
                this.logger.verbose("No SSO params used and ADAL/MSAL v1 token retrieved, however, no account hint claim found. Enable preferred_username or upn id token claim to get SSO.");
            }
        }
        return null;
    }
    /**
     * Updates a credential's cache key if the current cache key is outdated
     */
    updateCredentialCacheKey(currentCacheKey, credential) {
        const updatedCacheKey = credential.generateCredentialKey();
        if (currentCacheKey !== updatedCacheKey) {
            const cacheItem = this.getItem(currentCacheKey);
            if (cacheItem) {
                this.removeItem(currentCacheKey);
                this.setItem(updatedCacheKey, cacheItem);
                this.logger.verbose(`Updated an outdated ${credential.credentialType} cache key`);
                return updatedCacheKey;
            }
            else {
                this.logger.error(`Attempted to update an outdated ${credential.credentialType} cache key but no item matching the outdated key was found in storage`);
            }
        }
        return currentCacheKey;
    }
    /**
     * Returns application id as redirect context during AcquireTokenRedirect flow.
     */
    getRedirectRequestContext() {
        return this.getTemporaryCache(TemporaryCacheKeys.REDIRECT_CONTEXT, true);
    }
    /**
     * Sets application id as the redirect context during AcquireTokenRedirect flow.
     * @param value
     */
    setRedirectRequestContext(value) {
        this.setTemporaryCache(TemporaryCacheKeys.REDIRECT_CONTEXT, value, true);
    }
    /**
     * Builds credential entities from AuthenticationResult object and saves the resulting credentials to the cache
     * @param result
     * @param request
     */
    async hydrateCache(result, request) {
        const idTokenEntity = IdTokenEntity.createIdTokenEntity(result.account?.homeAccountId, result.account?.environment, result.idToken, this.clientId, result.tenantId);
        let claimsHash;
        if (request.claims) {
            claimsHash = await this.cryptoImpl.hashString(request.claims);
        }
        const accessTokenEntity = AccessTokenEntity.createAccessTokenEntity(result.account?.homeAccountId, result.account.environment, result.accessToken, this.clientId, result.tenantId, result.scopes.join(" "), result.expiresOn?.getTime() || 0, result.extExpiresOn?.getTime() || 0, this.cryptoImpl, undefined, // refreshOn
        result.tokenType, undefined, // userAssertionHash
        request.sshKid, request.claims, claimsHash);
        const cacheRecord = new CacheRecord(undefined, idTokenEntity, accessTokenEntity);
        return this.saveCacheRecord(cacheRecord);
    }
}
const DEFAULT_BROWSER_CACHE_MANAGER = (clientId, logger) => {
    const cacheOptions = {
        cacheLocation: BrowserCacheLocation.MemoryStorage,
        temporaryCacheLocation: BrowserCacheLocation.MemoryStorage,
        storeAuthStateInCookie: false,
        secureCookies: false,
        cacheMigrationEnabled: false,
        claimsBasedCachingEnabled: false,
    };
    return new BrowserCacheManager(clientId, cacheOptions, DEFAULT_CRYPTO_IMPLEMENTATION, logger);
};

/* eslint-disable header/header */
const name = "@azure/msal-browser";
const version = "3.0.1";

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class for browser specific functions
 */
class BrowserUtils {
    // #region Window Navigation and URL management
    /**
     * Clears hash from window url.
     */
    static clearHash(contentWindow) {
        // Office.js sets history.replaceState to null
        contentWindow.location.hash = Constants.EMPTY_STRING;
        if (typeof contentWindow.history.replaceState === "function") {
            // Full removes "#" from url
            contentWindow.history.replaceState(null, Constants.EMPTY_STRING, `${contentWindow.location.origin}${contentWindow.location.pathname}${contentWindow.location.search}`);
        }
    }
    /**
     * Replaces current hash with hash from provided url
     */
    static replaceHash(url) {
        const urlParts = url.split("#");
        urlParts.shift(); // Remove part before the hash
        window.location.hash =
            urlParts.length > 0 ? urlParts.join("#") : Constants.EMPTY_STRING;
    }
    /**
     * Returns boolean of whether the current window is in an iframe or not.
     */
    static isInIframe() {
        return window.parent !== window;
    }
    /**
     * Returns boolean of whether or not the current window is a popup opened by msal
     */
    static isInPopup() {
        return (typeof window !== "undefined" &&
            !!window.opener &&
            window.opener !== window &&
            typeof window.name === "string" &&
            window.name.indexOf(`${BrowserConstants.POPUP_NAME_PREFIX}.`) === 0);
    }
    // #endregion
    /**
     * Returns current window URL as redirect uri
     */
    static getCurrentUri() {
        return window.location.href.split("?")[0].split("#")[0];
    }
    /**
     * Gets the homepage url for the current window location.
     */
    static getHomepage() {
        const currentUrl = new UrlString(window.location.href);
        const urlComponents = currentUrl.getUrlComponents();
        return `${urlComponents.Protocol}//${urlComponents.HostNameAndPort}/`;
    }
    /**
     * Returns best compatible network client object.
     */
    static getBrowserNetworkClient() {
        // @ts-ignore TS2774
        if (window.fetch && window.Headers) {
            return new FetchClient();
        }
        else {
            return new XhrClient();
        }
    }
    /**
     * Throws error if we have completed an auth and are
     * attempting another auth request inside an iframe.
     */
    static blockReloadInHiddenIframes() {
        const isResponseHash = UrlString.hashContainsKnownProperties(window.location.hash);
        // return an error if called from the hidden iframe created by the msal js silent calls
        if (isResponseHash && BrowserUtils.isInIframe()) {
            throw BrowserAuthError.createBlockReloadInHiddenIframeError();
        }
    }
    /**
     * Block redirect operations in iframes unless explicitly allowed
     * @param interactionType Interaction type for the request
     * @param allowRedirectInIframe Config value to allow redirects when app is inside an iframe
     */
    static blockRedirectInIframe(interactionType, allowRedirectInIframe) {
        const isIframedApp = BrowserUtils.isInIframe();
        if (interactionType === exports.InteractionType.Redirect &&
            isIframedApp &&
            !allowRedirectInIframe) {
            // If we are not in top frame, we shouldn't redirect. This is also handled by the service.
            throw BrowserAuthError.createRedirectInIframeError(isIframedApp);
        }
    }
    /**
     * Block redirectUri loaded in popup from calling AcquireToken APIs
     */
    static blockAcquireTokenInPopups() {
        // Popups opened by msal popup APIs are given a name that starts with "msal."
        if (BrowserUtils.isInPopup()) {
            throw BrowserAuthError.createBlockAcquireTokenInPopupsError();
        }
    }
    /**
     * Throws error if token requests are made in non-browser environment
     * @param isBrowserEnvironment Flag indicating if environment is a browser.
     */
    static blockNonBrowserEnvironment(isBrowserEnvironment) {
        if (!isBrowserEnvironment) {
            throw BrowserAuthError.createNonBrowserEnvironmentError();
        }
    }
    /**
     * Throws error if initialize hasn't been called
     * @param initialized
     */
    static blockAPICallsBeforeInitialize(initialized) {
        if (!initialized) {
            throw BrowserAuthError.createUninitializedPublicClientApplication();
        }
    }
    /**
     * Returns boolean of whether current browser is an Internet Explorer or Edge browser.
     */
    static detectIEOrEdge() {
        const ua = window.navigator.userAgent;
        const msie = ua.indexOf("MSIE ");
        const msie11 = ua.indexOf("Trident/");
        const msedge = ua.indexOf("Edge/");
        const isIE = msie > 0 || msie11 > 0;
        const isEdge = msedge > 0;
        return isIE || isEdge;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BaseInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId) {
        this.config = config;
        this.browserStorage = storageImpl;
        this.browserCrypto = browserCrypto;
        this.networkClient = this.config.system.networkClient;
        this.eventHandler = eventHandler;
        this.navigationClient = navigationClient;
        this.nativeMessageHandler = nativeMessageHandler;
        this.correlationId =
            correlationId || this.browserCrypto.createNewGuid();
        this.logger = logger.clone(BrowserConstants.MSAL_SKU, version, this.correlationId);
        this.performanceClient = performanceClient;
    }
    async clearCacheOnLogout(account) {
        if (account) {
            if (AccountEntity.accountInfoIsEqual(account, this.browserStorage.getActiveAccount(), false)) {
                this.logger.verbose("Setting active account to null");
                this.browserStorage.setActiveAccount(null);
            }
            // Clear given account.
            try {
                await this.browserStorage.removeAccount(AccountEntity.generateAccountCacheKey(account));
                this.logger.verbose("Cleared cache items belonging to the account provided in the logout request.");
            }
            catch (error) {
                this.logger.error("Account provided in logout request was not found. Local cache unchanged.");
            }
        }
        else {
            try {
                this.logger.verbose("No account provided in logout request, clearing all cache items.", this.correlationId);
                // Clear all accounts and tokens
                await this.browserStorage.clear();
                // Clear any stray keys from IndexedDB
                await this.browserCrypto.clearKeystore();
            }
            catch (e) {
                this.logger.error("Attempted to clear all MSAL cache items and failed. Local cache unchanged.");
            }
        }
    }
    /**
     * Initializer function for all request APIs
     * @param request
     */
    async initializeBaseRequest(request, account) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.InitializeBaseRequest, request.correlationId);
        this.logger.verbose("Initializing BaseAuthRequest");
        const authority = request.authority || this.config.auth.authority;
        if (account) {
            await this.validateRequestAuthority(authority, account);
        }
        const scopes = [...((request && request.scopes) || [])];
        const validatedRequest = {
            ...request,
            correlationId: this.correlationId,
            authority,
            scopes,
        };
        // Set authenticationScheme to BEARER if not explicitly set in the request
        if (!validatedRequest.authenticationScheme) {
            validatedRequest.authenticationScheme = AuthenticationScheme.BEARER;
            this.logger.verbose('Authentication Scheme wasn\'t explicitly set in request, defaulting to "Bearer" request');
        }
        else {
            if (validatedRequest.authenticationScheme ===
                AuthenticationScheme.SSH) {
                if (!request.sshJwk) {
                    throw ClientConfigurationError.createMissingSshJwkError();
                }
                if (!request.sshKid) {
                    throw ClientConfigurationError.createMissingSshKidError();
                }
            }
            this.logger.verbose(`Authentication Scheme set to "${validatedRequest.authenticationScheme}" as configured in Auth request`);
        }
        // Set requested claims hash if claims-based caching is enabled and claims were requested
        if (this.config.cache.claimsBasedCachingEnabled &&
            request.claims &&
            // Checks for empty stringified object "{}" which doesn't qualify as requested claims
            !StringUtils.isEmptyObj(request.claims)) {
            validatedRequest.requestedClaimsHash =
                await this.browserCrypto.hashString(request.claims);
        }
        return validatedRequest;
    }
    /**
     *
     * Use to get the redirect uri configured in MSAL or null.
     * @param requestRedirectUri
     * @returns Redirect URL
     *
     */
    getRedirectUri(requestRedirectUri) {
        this.logger.verbose("getRedirectUri called");
        const redirectUri = requestRedirectUri ||
            this.config.auth.redirectUri ||
            BrowserUtils.getCurrentUri();
        return UrlString.getAbsoluteUrl(redirectUri, BrowserUtils.getCurrentUri());
    }
    /*
     * If authority provided in the request does not match environment/authority specified
     * in the account or MSAL config, we throw an error.
     */
    async validateRequestAuthority(authority, account) {
        const discoveredAuthority = await this.getDiscoveredAuthority(authority);
        if (!discoveredAuthority.isAlias(account.environment)) {
            throw ClientConfigurationError.createAuthorityMismatchError();
        }
    }
    /**
     *
     * @param apiId
     * @param correlationId
     * @param forceRefresh
     */
    initializeServerTelemetryManager(apiId, forceRefresh) {
        this.logger.verbose("initializeServerTelemetryManager called");
        const telemetryPayload = {
            clientId: this.config.auth.clientId,
            correlationId: this.correlationId,
            apiId: apiId,
            forceRefresh: forceRefresh || false,
            wrapperSKU: this.browserStorage.getWrapperMetadata()[0],
            wrapperVer: this.browserStorage.getWrapperMetadata()[1],
        };
        return new ServerTelemetryManager(telemetryPayload, this.browserStorage);
    }
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    async getDiscoveredAuthority(requestAuthority) {
        this.logger.verbose("getDiscoveredAuthority called");
        const authorityOptions = {
            protocolMode: this.config.auth.protocolMode,
            OIDCOptions: this.config.auth.OIDCOptions,
            knownAuthorities: this.config.auth.knownAuthorities,
            cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
            authorityMetadata: this.config.auth.authorityMetadata,
        };
        if (requestAuthority) {
            this.logger.verbose("Creating discovered authority with request authority");
            return await AuthorityFactory.createDiscoveredInstance(requestAuthority, this.config.system.networkClient, this.browserStorage, authorityOptions, this.logger);
        }
        this.logger.verbose("Creating discovered authority with configured authority");
        return await AuthorityFactory.createDiscoveredInstance(this.config.auth.authority, this.config.system.networkClient, this.browserStorage, authorityOptions, this.logger);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Defines the class structure and helper functions used by the "standard", non-brokered auth flows (popup, redirect, silent (RT), silent (iframe))
 */
class StandardInteractionClient extends BaseInteractionClient {
    /**
     * Generates an auth code request tied to the url request.
     * @param request
     */
    async initializeAuthorizationCodeRequest(request) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.StandardInteractionClientInitializeAuthorizationCodeRequest, request.correlationId);
        this.logger.verbose("initializeAuthorizationRequest called", request.correlationId);
        const generatedPkceParams = await this.browserCrypto.generatePkceCodes();
        const authCodeRequest = {
            ...request,
            redirectUri: request.redirectUri,
            code: Constants.EMPTY_STRING,
            codeVerifier: generatedPkceParams.verifier,
        };
        request.codeChallenge = generatedPkceParams.challenge;
        request.codeChallengeMethod = Constants.S256_CODE_CHALLENGE_METHOD;
        return authCodeRequest;
    }
    /**
     * Initializer for the logout request.
     * @param logoutRequest
     */
    initializeLogoutRequest(logoutRequest) {
        this.logger.verbose("initializeLogoutRequest called", logoutRequest?.correlationId);
        const validLogoutRequest = {
            correlationId: this.correlationId || this.browserCrypto.createNewGuid(),
            ...logoutRequest,
        };
        /**
         * Set logout_hint to be login_hint from ID Token Claims if present
         * and logoutHint attribute wasn't manually set in logout request
         */
        if (logoutRequest) {
            // If logoutHint isn't set and an account was passed in, try to extract logoutHint from ID Token Claims
            if (!logoutRequest.logoutHint) {
                if (logoutRequest.account) {
                    const logoutHint = this.getLogoutHintFromIdTokenClaims(logoutRequest.account);
                    if (logoutHint) {
                        this.logger.verbose("Setting logoutHint to login_hint ID Token Claim value for the account provided");
                        validLogoutRequest.logoutHint = logoutHint;
                    }
                }
                else {
                    this.logger.verbose("logoutHint was not set and account was not passed into logout request, logoutHint will not be set");
                }
            }
            else {
                this.logger.verbose("logoutHint has already been set in logoutRequest");
            }
        }
        else {
            this.logger.verbose("logoutHint will not be set since no logout request was configured");
        }
        /*
         * Only set redirect uri if logout request isn't provided or the set uri isn't null.
         * Otherwise, use passed uri, config, or current page.
         */
        if (!logoutRequest || logoutRequest.postLogoutRedirectUri !== null) {
            if (logoutRequest && logoutRequest.postLogoutRedirectUri) {
                this.logger.verbose("Setting postLogoutRedirectUri to uri set on logout request", validLogoutRequest.correlationId);
                validLogoutRequest.postLogoutRedirectUri =
                    UrlString.getAbsoluteUrl(logoutRequest.postLogoutRedirectUri, BrowserUtils.getCurrentUri());
            }
            else if (this.config.auth.postLogoutRedirectUri === null) {
                this.logger.verbose("postLogoutRedirectUri configured as null and no uri set on request, not passing post logout redirect", validLogoutRequest.correlationId);
            }
            else if (this.config.auth.postLogoutRedirectUri) {
                this.logger.verbose("Setting postLogoutRedirectUri to configured uri", validLogoutRequest.correlationId);
                validLogoutRequest.postLogoutRedirectUri =
                    UrlString.getAbsoluteUrl(this.config.auth.postLogoutRedirectUri, BrowserUtils.getCurrentUri());
            }
            else {
                this.logger.verbose("Setting postLogoutRedirectUri to current page", validLogoutRequest.correlationId);
                validLogoutRequest.postLogoutRedirectUri =
                    UrlString.getAbsoluteUrl(BrowserUtils.getCurrentUri(), BrowserUtils.getCurrentUri());
            }
        }
        else {
            this.logger.verbose("postLogoutRedirectUri passed as null, not setting post logout redirect uri", validLogoutRequest.correlationId);
        }
        return validLogoutRequest;
    }
    /**
     * Parses login_hint ID Token Claim out of AccountInfo object to be used as
     * logout_hint in end session request.
     * @param account
     */
    getLogoutHintFromIdTokenClaims(account) {
        const idTokenClaims = account.idTokenClaims;
        if (idTokenClaims) {
            if (idTokenClaims.login_hint) {
                return idTokenClaims.login_hint;
            }
            else {
                this.logger.verbose("The ID Token Claims tied to the provided account do not contain a login_hint claim, logoutHint will not be added to logout request");
            }
        }
        else {
            this.logger.verbose("The provided account does not contain ID Token Claims, logoutHint will not be added to logout request");
        }
        return null;
    }
    /**
     * Creates an Authorization Code Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    async createAuthCodeClient(serverTelemetryManager, authorityUrl, requestAzureCloudOptions) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, this.correlationId);
        // Create auth module.
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientGetClientConfiguration, this.correlationId);
        const clientConfig = await this.getClientConfiguration(serverTelemetryManager, authorityUrl, requestAzureCloudOptions);
        return new AuthorizationCodeClient(clientConfig, this.performanceClient);
    }
    /**
     * Creates a Client Configuration object with the given request authority, or the default authority.
     * @param serverTelemetryManager
     * @param requestAuthority
     * @param requestCorrelationId
     */
    async getClientConfiguration(serverTelemetryManager, requestAuthority, requestAzureCloudOptions) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.StandardInteractionClientGetClientConfiguration, this.correlationId);
        this.logger.verbose("getClientConfiguration called", this.correlationId);
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientGetDiscoveredAuthority, this.correlationId);
        const discoveredAuthority = await this.getDiscoveredAuthority(requestAuthority, requestAzureCloudOptions);
        const logger = this.config.system.loggerOptions;
        return {
            authOptions: {
                clientId: this.config.auth.clientId,
                authority: discoveredAuthority,
                clientCapabilities: this.config.auth.clientCapabilities,
            },
            systemOptions: {
                tokenRenewalOffsetSeconds: this.config.system.tokenRenewalOffsetSeconds,
                preventCorsPreflight: true,
            },
            loggerOptions: {
                loggerCallback: logger.loggerCallback,
                piiLoggingEnabled: logger.piiLoggingEnabled,
                logLevel: logger.logLevel,
                correlationId: this.correlationId,
            },
            cacheOptions: {
                claimsBasedCachingEnabled: this.config.cache.claimsBasedCachingEnabled,
            },
            cryptoInterface: this.browserCrypto,
            networkInterface: this.networkClient,
            storageInterface: this.browserStorage,
            serverTelemetryManager: serverTelemetryManager,
            libraryInfo: {
                sku: BrowserConstants.MSAL_SKU,
                version: version,
                cpu: Constants.EMPTY_STRING,
                os: Constants.EMPTY_STRING,
            },
            telemetry: this.config.telemetry,
        };
    }
    /**
     * @param hash
     * @param interactionType
     */
    validateAndExtractStateFromHash(serverParams, interactionType, requestCorrelationId) {
        this.logger.verbose("validateAndExtractStateFromHash called", requestCorrelationId);
        if (!serverParams.state) {
            throw BrowserAuthError.createHashDoesNotContainStateError();
        }
        const platformStateObj = BrowserProtocolUtils.extractBrowserRequestState(this.browserCrypto, serverParams.state);
        if (!platformStateObj) {
            throw BrowserAuthError.createUnableToParseStateError();
        }
        if (platformStateObj.interactionType !== interactionType) {
            throw BrowserAuthError.createStateInteractionTypeMismatchError();
        }
        this.logger.verbose("Returning state from hash", requestCorrelationId);
        return serverParams.state;
    }
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    async getDiscoveredAuthority(requestAuthority, requestAzureCloudOptions) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.StandardInteractionClientGetDiscoveredAuthority, this.correlationId);
        this.logger.verbose("getDiscoveredAuthority called", this.correlationId);
        const getAuthorityMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.StandardInteractionClientGetDiscoveredAuthority, this.correlationId);
        const authorityOptions = {
            protocolMode: this.config.auth.protocolMode,
            OIDCOptions: this.config.auth.OIDCOptions,
            knownAuthorities: this.config.auth.knownAuthorities,
            cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
            authorityMetadata: this.config.auth.authorityMetadata,
            skipAuthorityMetadataCache: this.config.auth.skipAuthorityMetadataCache,
        };
        // build authority string based on auth params, precedence - azureCloudInstance + tenant >> authority
        const userAuthority = requestAuthority
            ? requestAuthority
            : this.config.auth.authority;
        // fall back to the authority from config
        const builtAuthority = Authority.generateAuthority(userAuthority, requestAzureCloudOptions || this.config.auth.azureCloudOptions);
        this.logger.verbose("Creating discovered authority with configured authority", this.correlationId);
        this.performanceClient.setPreQueueTime(PerformanceEvents.AuthorityFactoryCreateDiscoveredInstance, this.correlationId);
        return await AuthorityFactory.createDiscoveredInstance(builtAuthority, this.config.system.networkClient, this.browserStorage, authorityOptions, this.logger, this.performanceClient, this.correlationId)
            .then((result) => {
            getAuthorityMeasurement.end({
                success: true,
            });
            return result;
        })
            .catch((error) => {
            getAuthorityMeasurement.end({
                errorCode: error.errorCode,
                subErrorCode: error.subError,
                success: false,
            });
            throw error;
        });
    }
    /**
     * Helper to initialize required request parameters for interactive APIs and ssoSilent()
     * @param request
     * @param interactionType
     */
    async initializeAuthorizationRequest(request, interactionType) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.StandardInteractionClientInitializeAuthorizationRequest, this.correlationId);
        this.logger.verbose("initializeAuthorizationRequest called", this.correlationId);
        const redirectUri = this.getRedirectUri(request.redirectUri);
        const browserState = {
            interactionType: interactionType,
        };
        const state = ProtocolUtils.setRequestState(this.browserCrypto, (request && request.state) || Constants.EMPTY_STRING, browserState);
        this.performanceClient.setPreQueueTime(PerformanceEvents.InitializeBaseRequest, this.correlationId);
        const validatedRequest = {
            ...(await this.initializeBaseRequest(request)),
            redirectUri: redirectUri,
            state: state,
            nonce: request.nonce || this.browserCrypto.createNewGuid(),
            responseMode: this.config.auth.OIDCOptions
                .serverResponseType,
        };
        const account = request.account || this.browserStorage.getActiveAccount();
        if (account) {
            this.logger.verbose("Setting validated request account", this.correlationId);
            this.logger.verbosePii(`Setting validated request account: ${account.homeAccountId}`, this.correlationId);
            validatedRequest.account = account;
        }
        // Check for ADAL/MSAL v1 SSO
        if (StringUtils.isEmpty(validatedRequest.loginHint) && !account) {
            const legacyLoginHint = this.browserStorage.getLegacyLoginHint();
            if (legacyLoginHint) {
                validatedRequest.loginHint = legacyLoginHint;
            }
        }
        return validatedRequest;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Abstract class which defines operations for a browser interaction handling class.
 */
class InteractionHandler {
    constructor(authCodeModule, storageImpl, authCodeRequest, logger, performanceClient) {
        this.authModule = authCodeModule;
        this.browserStorage = storageImpl;
        this.authCodeRequest = authCodeRequest;
        this.logger = logger;
        this.performanceClient = performanceClient;
    }
    /**
     * Function to handle response parameters from hash.
     * @param locationHash
     */
    async handleCodeResponseFromHash(locationHash, state, authority, networkModule) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.HandleCodeResponseFromHash, this.authCodeRequest.correlationId);
        this.logger.verbose("InteractionHandler.handleCodeResponse called");
        // Check that location hash isn't empty.
        if (StringUtils.isEmpty(locationHash)) {
            throw BrowserAuthError.createEmptyHashError();
        }
        // Handle code response.
        const stateKey = this.browserStorage.generateStateKey(state);
        const requestState = this.browserStorage.getTemporaryCache(stateKey);
        if (!requestState) {
            throw ClientAuthError.createStateNotFoundError("Cached State");
        }
        let authCodeResponse;
        try {
            authCodeResponse = this.authModule.handleFragmentResponse(locationHash, requestState);
        }
        catch (e) {
            if (e instanceof ServerError &&
                e.subError === BrowserAuthErrorMessage.userCancelledError.code) {
                // Translate server error caused by user closing native prompt to corresponding first class MSAL error
                throw BrowserAuthError.createUserCancelledError();
            }
            else {
                throw e;
            }
        }
        this.performanceClient.setPreQueueTime(PerformanceEvents.HandleCodeResponseFromServer, this.authCodeRequest.correlationId);
        return this.handleCodeResponseFromServer(authCodeResponse, state, authority, networkModule);
    }
    /**
     * Process auth code response from AAD
     * @param authCodeResponse
     * @param state
     * @param authority
     * @param networkModule
     * @returns
     */
    async handleCodeResponseFromServer(authCodeResponse, state, authority, networkModule, validateNonce = true) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.HandleCodeResponseFromServer, this.authCodeRequest.correlationId);
        this.logger.trace("InteractionHandler.handleCodeResponseFromServer called");
        // Handle code response.
        const stateKey = this.browserStorage.generateStateKey(state);
        const requestState = this.browserStorage.getTemporaryCache(stateKey);
        if (!requestState) {
            throw ClientAuthError.createStateNotFoundError("Cached State");
        }
        // Get cached items
        const nonceKey = this.browserStorage.generateNonceKey(requestState);
        const cachedNonce = this.browserStorage.getTemporaryCache(nonceKey);
        // Assign code to request
        this.authCodeRequest.code = authCodeResponse.code;
        // Check for new cloud instance
        if (authCodeResponse.cloud_instance_host_name) {
            this.performanceClient.setPreQueueTime(PerformanceEvents.UpdateTokenEndpointAuthority, this.authCodeRequest.correlationId);
            await this.updateTokenEndpointAuthority(authCodeResponse.cloud_instance_host_name, authority, networkModule);
        }
        // Nonce validation not needed when redirect not involved (e.g. hybrid spa, renewing token via rt)
        if (validateNonce) {
            authCodeResponse.nonce = cachedNonce || undefined;
        }
        authCodeResponse.state = requestState;
        // Add CCS parameters if available
        if (authCodeResponse.client_info) {
            this.authCodeRequest.clientInfo = authCodeResponse.client_info;
        }
        else {
            const cachedCcsCred = this.checkCcsCredentials();
            if (cachedCcsCred) {
                this.authCodeRequest.ccsCredential = cachedCcsCred;
            }
        }
        // Acquire token with retrieved code.
        this.performanceClient.setPreQueueTime(PerformanceEvents.AuthClientAcquireToken, this.authCodeRequest.correlationId);
        const tokenResponse = (await this.authModule.acquireToken(this.authCodeRequest, authCodeResponse));
        this.browserStorage.cleanRequestByState(state);
        return tokenResponse;
    }
    /**
     * Updates authority based on cloudInstanceHostname
     * @param cloudInstanceHostname
     * @param authority
     * @param networkModule
     */
    async updateTokenEndpointAuthority(cloudInstanceHostname, authority, networkModule) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.UpdateTokenEndpointAuthority, this.authCodeRequest.correlationId);
        const cloudInstanceAuthorityUri = `https://${cloudInstanceHostname}/${authority.tenant}/`;
        const cloudInstanceAuthority = await AuthorityFactory.createDiscoveredInstance(cloudInstanceAuthorityUri, networkModule, this.browserStorage, authority.options, this.logger, this.performanceClient, this.authCodeRequest.correlationId);
        this.authModule.updateAuthority(cloudInstanceAuthority);
    }
    /**
     * Looks up ccs creds in the cache
     */
    checkCcsCredentials() {
        // Look up ccs credential in temp cache
        const cachedCcsCred = this.browserStorage.getTemporaryCache(TemporaryCacheKeys.CCS_CREDENTIAL, true);
        if (cachedCcsCred) {
            try {
                return JSON.parse(cachedCcsCred);
            }
            catch (e) {
                this.authModule.logger.error("Cache credential could not be parsed");
                this.authModule.logger.errorPii(`Cache credential could not be parsed: ${cachedCcsCred}`);
            }
        }
        return null;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RedirectHandler extends InteractionHandler {
    constructor(authCodeModule, storageImpl, authCodeRequest, logger, browserCrypto, performanceClient) {
        super(authCodeModule, storageImpl, authCodeRequest, logger, performanceClient);
        this.browserCrypto = browserCrypto;
    }
    /**
     * Redirects window to given URL.
     * @param urlNavigate
     */
    async initiateAuthRequest(requestUrl, params) {
        this.logger.verbose("RedirectHandler.initiateAuthRequest called");
        // Navigate if valid URL
        if (!StringUtils.isEmpty(requestUrl)) {
            // Cache start page, returns to this page after redirectUri if navigateToLoginRequestUrl is true
            if (params.redirectStartPage) {
                this.logger.verbose("RedirectHandler.initiateAuthRequest: redirectStartPage set, caching start page");
                this.browserStorage.setTemporaryCache(TemporaryCacheKeys.ORIGIN_URI, params.redirectStartPage, true);
            }
            // Set interaction status in the library.
            this.browserStorage.setTemporaryCache(TemporaryCacheKeys.CORRELATION_ID, this.authCodeRequest.correlationId, true);
            this.browserStorage.cacheCodeRequest(this.authCodeRequest, this.browserCrypto);
            this.logger.infoPii(`RedirectHandler.initiateAuthRequest: Navigate to: ${requestUrl}`);
            const navigationOptions = {
                apiId: ApiId.acquireTokenRedirect,
                timeout: params.redirectTimeout,
                noHistory: false,
            };
            // If onRedirectNavigate is implemented, invoke it and provide requestUrl
            if (typeof params.onRedirectNavigate === "function") {
                this.logger.verbose("RedirectHandler.initiateAuthRequest: Invoking onRedirectNavigate callback");
                const navigate = params.onRedirectNavigate(requestUrl);
                // Returning false from onRedirectNavigate will stop navigation
                if (navigate !== false) {
                    this.logger.verbose("RedirectHandler.initiateAuthRequest: onRedirectNavigate did not return false, navigating");
                    await params.navigationClient.navigateExternal(requestUrl, navigationOptions);
                    return;
                }
                else {
                    this.logger.verbose("RedirectHandler.initiateAuthRequest: onRedirectNavigate returned false, stopping navigation");
                    return;
                }
            }
            else {
                // Navigate window to request URL
                this.logger.verbose("RedirectHandler.initiateAuthRequest: Navigating window to navigate url");
                await params.navigationClient.navigateExternal(requestUrl, navigationOptions);
                return;
            }
        }
        else {
            // Throw error if request URL is empty.
            this.logger.info("RedirectHandler.initiateAuthRequest: Navigate url is empty");
            throw BrowserAuthError.createEmptyNavigationUriError();
        }
    }
    /**
     * Handle authorization code response in the window.
     * @param hash
     */
    async handleCodeResponseFromHash(locationHash, state, authority, networkModule) {
        this.logger.verbose("RedirectHandler.handleCodeResponse called");
        // Check that location hash isn't empty.
        if (StringUtils.isEmpty(locationHash)) {
            throw BrowserAuthError.createEmptyHashError();
        }
        // Interaction is completed - remove interaction status.
        this.browserStorage.setInteractionInProgress(false);
        // Handle code response.
        const stateKey = this.browserStorage.generateStateKey(state);
        const requestState = this.browserStorage.getTemporaryCache(stateKey);
        if (!requestState) {
            throw ClientAuthError.createStateNotFoundError("Cached State");
        }
        let authCodeResponse;
        try {
            authCodeResponse = this.authModule.handleFragmentResponse(locationHash, requestState);
        }
        catch (e) {
            if (e instanceof ServerError &&
                e.subError === BrowserAuthErrorMessage.userCancelledError.code) {
                // Translate server error caused by user closing native prompt to corresponding first class MSAL error
                throw BrowserAuthError.createUserCancelledError();
            }
            else {
                throw e;
            }
        }
        // Get cached items
        const nonceKey = this.browserStorage.generateNonceKey(requestState);
        const cachedNonce = this.browserStorage.getTemporaryCache(nonceKey);
        // Assign code to request
        this.authCodeRequest.code = authCodeResponse.code;
        // Check for new cloud instance
        if (authCodeResponse.cloud_instance_host_name) {
            await this.updateTokenEndpointAuthority(authCodeResponse.cloud_instance_host_name, authority, networkModule);
        }
        authCodeResponse.nonce = cachedNonce || undefined;
        authCodeResponse.state = requestState;
        // Add CCS parameters if available
        if (authCodeResponse.client_info) {
            this.authCodeRequest.clientInfo = authCodeResponse.client_info;
        }
        else {
            const cachedCcsCred = this.checkCcsCredentials();
            if (cachedCcsCred) {
                this.authCodeRequest.ccsCredential = cachedCcsCred;
            }
        }
        // Acquire token with retrieved code.
        const tokenResponse = (await this.authModule.acquireToken(this.authCodeRequest, authCodeResponse));
        this.browserStorage.cleanRequestByState(state);
        return tokenResponse;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const EventType = {
    INITIALIZE_START: "msal:initializeStart",
    INITIALIZE_END: "msal:initializeEnd",
    ACCOUNT_ADDED: "msal:accountAdded",
    ACCOUNT_REMOVED: "msal:accountRemoved",
    LOGIN_START: "msal:loginStart",
    LOGIN_SUCCESS: "msal:loginSuccess",
    LOGIN_FAILURE: "msal:loginFailure",
    ACQUIRE_TOKEN_START: "msal:acquireTokenStart",
    ACQUIRE_TOKEN_SUCCESS: "msal:acquireTokenSuccess",
    ACQUIRE_TOKEN_FAILURE: "msal:acquireTokenFailure",
    ACQUIRE_TOKEN_NETWORK_START: "msal:acquireTokenFromNetworkStart",
    SSO_SILENT_START: "msal:ssoSilentStart",
    SSO_SILENT_SUCCESS: "msal:ssoSilentSuccess",
    SSO_SILENT_FAILURE: "msal:ssoSilentFailure",
    ACQUIRE_TOKEN_BY_CODE_START: "msal:acquireTokenByCodeStart",
    ACQUIRE_TOKEN_BY_CODE_SUCCESS: "msal:acquireTokenByCodeSuccess",
    ACQUIRE_TOKEN_BY_CODE_FAILURE: "msal:acquireTokenByCodeFailure",
    HANDLE_REDIRECT_START: "msal:handleRedirectStart",
    HANDLE_REDIRECT_END: "msal:handleRedirectEnd",
    POPUP_OPENED: "msal:popupOpened",
    LOGOUT_START: "msal:logoutStart",
    LOGOUT_SUCCESS: "msal:logoutSuccess",
    LOGOUT_FAILURE: "msal:logoutFailure",
    LOGOUT_END: "msal:logoutEnd",
    RESTORE_FROM_BFCACHE: "msal:restoreFromBFCache",
};

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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentCacheClient extends StandardInteractionClient {
    /**
     * Returns unexpired tokens from the cache, if available
     * @param silentRequest
     */
    async acquireToken(silentRequest) {
        const acquireTokenMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.SilentCacheClientAcquireToken, silentRequest.correlationId);
        // Telemetry manager only used to increment cacheHits here
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent_silentFlow);
        const silentAuthClient = await this.createSilentFlowClient(serverTelemetryManager, silentRequest.authority, silentRequest.azureCloudOptions);
        this.logger.verbose("Silent auth client created");
        try {
            const cachedToken = (await silentAuthClient.acquireCachedToken(silentRequest));
            acquireTokenMeasurement.end({
                success: true,
                fromCache: true,
            });
            return cachedToken;
        }
        catch (error) {
            if (error instanceof BrowserAuthError &&
                error.errorCode ===
                    BrowserAuthErrorMessage.signingKeyNotFoundInStorage.code) {
                this.logger.verbose("Signing keypair for bound access token not found. Refreshing bound access token and generating a new crypto keypair.");
            }
            acquireTokenMeasurement.end({
                errorCode: (error instanceof AuthError && error.errorCode) ||
                    undefined,
                subErrorCode: (error instanceof AuthError && error.subError) || undefined,
                success: false,
            });
            throw error;
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
     * Creates an Silent Flow Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    async createSilentFlowClient(serverTelemetryManager, authorityUrl, azureCloudOptions) {
        // Create auth module.
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientGetClientConfiguration, this.correlationId);
        const clientConfig = await this.getClientConfiguration(serverTelemetryManager, authorityUrl, azureCloudOptions);
        return new SilentFlowClient(clientConfig, this.performanceClient);
    }
    async initializeSilentRequest(request, account) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.InitializeSilentRequest, this.correlationId);
        this.performanceClient.setPreQueueTime(PerformanceEvents.InitializeBaseRequest, this.correlationId);
        return {
            ...request,
            ...(await this.initializeBaseRequest(request, account)),
            account: account,
            forceRefresh: request.forceRefresh || false,
        };
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const BrokerServerParamKeys = {
    BROKER_CLIENT_ID: "brk_client_id",
    BROKER_REDIRECT_URI: "brk_redirect_uri",
};
class NativeInteractionClient extends BaseInteractionClient {
    constructor(config, browserStorage, browserCrypto, logger, eventHandler, navigationClient, apiId, performanceClient, provider, accountId, nativeStorageImpl, correlationId) {
        super(config, browserStorage, browserCrypto, logger, eventHandler, navigationClient, performanceClient, provider, correlationId);
        this.apiId = apiId;
        this.accountId = accountId;
        this.nativeMessageHandler = provider;
        this.nativeStorageManager = nativeStorageImpl;
        this.silentCacheClient = new SilentCacheClient(config, this.nativeStorageManager, browserCrypto, logger, eventHandler, navigationClient, performanceClient, provider, correlationId);
    }
    /**
     * Acquire token from native platform via browser extension
     * @param request
     */
    async acquireToken(request) {
        this.logger.trace("NativeInteractionClient - acquireToken called.");
        // start the perf measurement
        const nativeATMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.NativeInteractionClientAcquireToken, request.correlationId);
        const reqTimestamp = TimeUtils.nowSeconds();
        // initialize native request
        const nativeRequest = await this.initializeNativeRequest(request);
        // check if the tokens can be retrieved from internal cache
        try {
            const result = await this.acquireTokensFromCache(this.accountId, nativeRequest);
            nativeATMeasurement.end({
                success: true,
                isNativeBroker: false,
                fromCache: true,
            });
            return result;
        }
        catch (e) {
            // continue with a native call for any and all errors
            this.logger.info("MSAL internal Cache does not contain tokens, proceed to make a native call");
        }
        // fall back to native calls
        const messageBody = {
            method: NativeExtensionMethod.GetToken,
            request: nativeRequest,
        };
        const response = await this.nativeMessageHandler.sendMessage(messageBody);
        const validatedResponse = this.validateNativeResponse(response);
        return this.handleNativeResponse(validatedResponse, nativeRequest, reqTimestamp)
            .then((result) => {
            nativeATMeasurement.end({
                success: true,
                isNativeBroker: true,
                requestId: result.requestId,
            });
            return result;
        })
            .catch((error) => {
            nativeATMeasurement.end({
                success: false,
                errorCode: error.errorCode,
                subErrorCode: error.subError,
                isNativeBroker: true,
            });
            throw error;
        });
    }
    /**
     * Creates silent flow request
     * @param request
     * @param cachedAccount
     * @returns CommonSilentFlowRequest
     */
    createSilentCacheRequest(request, cachedAccount) {
        return {
            authority: request.authority,
            correlationId: this.correlationId,
            scopes: ScopeSet.fromString(request.scope).asArray(),
            account: cachedAccount,
            forceRefresh: false,
        };
    }
    /**
     * Fetches the tokens from the cache if un-expired
     * @param nativeAccountId
     * @param request
     * @returns authenticationResult
     */
    async acquireTokensFromCache(nativeAccountId, request) {
        if (!nativeAccountId) {
            this.logger.warning("NativeInteractionClient:acquireTokensFromCache - No nativeAccountId provided");
            throw ClientAuthError.createNoAccountFoundError();
        }
        // fetch the account from browser cache
        const account = this.browserStorage.getAccountInfoFilteredBy({
            nativeAccountId,
        });
        if (!account) {
            throw ClientAuthError.createNoAccountFoundError();
        }
        // leverage silent flow for cached tokens retrieval
        try {
            const silentRequest = this.createSilentCacheRequest(request, account);
            const result = await this.silentCacheClient.acquireToken(silentRequest);
            return {
                ...result,
                account,
            };
        }
        catch (e) {
            throw e;
        }
    }
    /**
     * Acquires a token from native platform then redirects to the redirectUri instead of returning the response
     * @param request
     */
    async acquireTokenRedirect(request) {
        this.logger.trace("NativeInteractionClient - acquireTokenRedirect called.");
        const nativeRequest = await this.initializeNativeRequest(request);
        const messageBody = {
            method: NativeExtensionMethod.GetToken,
            request: nativeRequest,
        };
        try {
            const response = await this.nativeMessageHandler.sendMessage(messageBody);
            this.validateNativeResponse(response);
        }
        catch (e) {
            // Only throw fatal errors here to allow application to fallback to regular redirect. Otherwise proceed and the error will be thrown in handleRedirectPromise
            if (e instanceof NativeAuthError && e.isFatal()) {
                throw e;
            }
        }
        this.browserStorage.setTemporaryCache(TemporaryCacheKeys.NATIVE_REQUEST, JSON.stringify(nativeRequest), true);
        const navigationOptions = {
            apiId: ApiId.acquireTokenRedirect,
            timeout: this.config.system.redirectNavigationTimeout,
            noHistory: false,
        };
        const redirectUri = this.config.auth.navigateToLoginRequestUrl
            ? window.location.href
            : this.getRedirectUri(request.redirectUri);
        await this.navigationClient.navigateExternal(redirectUri, navigationOptions); // Need to treat this as external to ensure handleRedirectPromise is run again
    }
    /**
     * If the previous page called native platform for a token using redirect APIs, send the same request again and return the response
     */
    async handleRedirectPromise() {
        this.logger.trace("NativeInteractionClient - handleRedirectPromise called.");
        if (!this.browserStorage.isInteractionInProgress(true)) {
            this.logger.info("handleRedirectPromise called but there is no interaction in progress, returning null.");
            return null;
        }
        // remove prompt from the request to prevent WAM from prompting twice
        const cachedRequest = this.browserStorage.getCachedNativeRequest();
        if (!cachedRequest) {
            this.logger.verbose("NativeInteractionClient - handleRedirectPromise called but there is no cached request, returning null.");
            return null;
        }
        const { prompt, ...request } = cachedRequest;
        if (prompt) {
            this.logger.verbose("NativeInteractionClient - handleRedirectPromise called and prompt was included in the original request, removing prompt from cached request to prevent second interaction with native broker window.");
        }
        this.browserStorage.removeItem(this.browserStorage.generateCacheKey(TemporaryCacheKeys.NATIVE_REQUEST));
        const messageBody = {
            method: NativeExtensionMethod.GetToken,
            request: request,
        };
        const reqTimestamp = TimeUtils.nowSeconds();
        try {
            this.logger.verbose("NativeInteractionClient - handleRedirectPromise sending message to native broker.");
            const response = await this.nativeMessageHandler.sendMessage(messageBody);
            this.validateNativeResponse(response);
            const result = this.handleNativeResponse(response, request, reqTimestamp);
            this.browserStorage.setInteractionInProgress(false);
            return result;
        }
        catch (e) {
            this.browserStorage.setInteractionInProgress(false);
            throw e;
        }
    }
    /**
     * Logout from native platform via browser extension
     * @param request
     */
    logout() {
        this.logger.trace("NativeInteractionClient - logout called.");
        return Promise.reject("Logout not implemented yet");
    }
    /**
     * Transform response from native platform into AuthenticationResult object which will be returned to the end user
     * @param response
     * @param request
     * @param reqTimestamp
     */
    async handleNativeResponse(response, request, reqTimestamp) {
        this.logger.trace("NativeInteractionClient - handleNativeResponse called.");
        if (response.account.id !== request.accountId) {
            // User switch in native broker prompt is not supported. All users must first sign in through web flow to ensure server state is in sync
            throw NativeAuthError.createUserSwitchError();
        }
        // Get the preferred_cache domain for the given authority
        const authority = await this.getDiscoveredAuthority(request.authority);
        // generate identifiers
        const idTokenObj = this.createIdTokenObj(response);
        const homeAccountIdentifier = this.createHomeAccountIdentifier(response, idTokenObj);
        const accountEntity = AccountEntity.createAccount({
            homeAccountId: homeAccountIdentifier,
            idTokenClaims: idTokenObj.claims,
            clientInfo: response.client_info,
            nativeAccountId: response.account.id,
        }, authority);
        // generate authenticationResult
        const result = await this.generateAuthenticationResult(response, request, idTokenObj, accountEntity, authority.canonicalAuthority, reqTimestamp);
        // cache accounts and tokens in the appropriate storage
        this.cacheAccount(accountEntity);
        this.cacheNativeTokens(response, request, homeAccountIdentifier, idTokenObj, result.accessToken, result.tenantId, reqTimestamp);
        return result;
    }
    /**
     * Create an idToken Object (not entity)
     * @param response
     * @returns
     */
    createIdTokenObj(response) {
        return new AuthToken(response.id_token || Constants.EMPTY_STRING, this.browserCrypto);
    }
    /**
     * creates an homeAccountIdentifier for the account
     * @param response
     * @param idTokenObj
     * @returns
     */
    createHomeAccountIdentifier(response, idTokenObj) {
        // Save account in browser storage
        const homeAccountIdentifier = AccountEntity.generateHomeAccountId(response.client_info || Constants.EMPTY_STRING, AuthorityType.Default, this.logger, this.browserCrypto, idTokenObj.claims);
        return homeAccountIdentifier;
    }
    /**
     * Helper to generate scopes
     * @param response
     * @param request
     * @returns
     */
    generateScopes(response, request) {
        return response.scope
            ? ScopeSet.fromString(response.scope)
            : ScopeSet.fromString(request.scope);
    }
    /**
     * If PoP token is requesred, records the PoP token if returned from the WAM, else generates one in the browser
     * @param request
     * @param response
     */
    async generatePopAccessToken(response, request) {
        if (request.tokenType === AuthenticationScheme.POP) {
            /**
             * This code prioritizes SHR returned from the native layer. In case of error/SHR not calculated from WAM and the AT
             * is still received, SHR is calculated locally
             */
            // Check if native layer returned an SHR token
            if (response.shr) {
                this.logger.trace("handleNativeServerResponse: SHR is enabled in native layer");
                return response.shr;
            }
            // Generate SHR in msal js if WAM does not compute it when POP is enabled
            const popTokenGenerator = new PopTokenGenerator(this.browserCrypto);
            const shrParameters = {
                resourceRequestMethod: request.resourceRequestMethod,
                resourceRequestUri: request.resourceRequestUri,
                shrClaims: request.shrClaims,
                shrNonce: request.shrNonce,
            };
            /**
             * KeyID must be present in the native request from when the PoP key was generated in order for
             * PopTokenGenerator to query the full key for signing
             */
            if (!request.keyId) {
                throw ClientAuthError.createKeyIdMissingError();
            }
            return await popTokenGenerator.signPopToken(response.access_token, request.keyId, shrParameters);
        }
        else {
            return response.access_token;
        }
    }
    /**
     * Generates authentication result
     * @param response
     * @param request
     * @param idTokenObj
     * @param accountEntity
     * @param authority
     * @param reqTimestamp
     * @returns
     */
    async generateAuthenticationResult(response, request, idTokenObj, accountEntity, authority, reqTimestamp) {
        // Add Native Broker fields to Telemetry
        const mats = this.addTelemetryFromNativeResponse(response);
        // If scopes not returned in server response, use request scopes
        const responseScopes = response.scope
            ? ScopeSet.fromString(response.scope)
            : ScopeSet.fromString(request.scope);
        const accountProperties = response.account.properties || {};
        const uid = accountProperties["UID"] ||
            idTokenObj.claims.oid ||
            idTokenObj.claims.sub ||
            Constants.EMPTY_STRING;
        const tid = accountProperties["TenantId"] ||
            idTokenObj.claims.tid ||
            Constants.EMPTY_STRING;
        // generate PoP token as needed
        const responseAccessToken = await this.generatePopAccessToken(response, request);
        const tokenType = request.tokenType === AuthenticationScheme.POP
            ? AuthenticationScheme.POP
            : AuthenticationScheme.BEARER;
        const result = {
            authority: authority,
            uniqueId: uid,
            tenantId: tid,
            scopes: responseScopes.asArray(),
            account: accountEntity.getAccountInfo(),
            idToken: response.id_token,
            idTokenClaims: idTokenObj.claims,
            accessToken: responseAccessToken,
            fromCache: mats ? this.isResponseFromCache(mats) : false,
            expiresOn: new Date(Number(reqTimestamp + response.expires_in) * 1000),
            tokenType: tokenType,
            correlationId: this.correlationId,
            state: response.state,
            fromNativeBroker: true,
        };
        return result;
    }
    /**
     * cache the account entity in browser storage
     * @param accountEntity
     */
    cacheAccount(accountEntity) {
        // Store the account info and hence `nativeAccountId` in browser cache
        this.browserStorage.setAccount(accountEntity);
        // Remove any existing cached tokens for this account in browser storage
        this.browserStorage.removeAccountContext(accountEntity).catch((e) => {
            this.logger.error(`Error occurred while removing account context from browser storage. ${e}`);
        });
    }
    /**
     * Stores the access_token and id_token in inmemory storage
     * @param response
     * @param request
     * @param homeAccountIdentifier
     * @param idTokenObj
     * @param responseAccessToken
     * @param tenantId
     * @param reqTimestamp
     */
    cacheNativeTokens(response, request, homeAccountIdentifier, idTokenObj, responseAccessToken, tenantId, reqTimestamp) {
        const cachedIdToken = IdTokenEntity.createIdTokenEntity(homeAccountIdentifier, request.authority, response.id_token || Constants.EMPTY_STRING, request.clientId, idTokenObj.claims.tid || Constants.EMPTY_STRING);
        // cache accessToken in inmemory storage
        const expiresIn = request.tokenType === AuthenticationScheme.POP
            ? Constants.SHR_NONCE_VALIDITY
            : (typeof response.expires_in === "string"
                ? parseInt(response.expires_in, 10)
                : response.expires_in) || 0;
        const tokenExpirationSeconds = reqTimestamp + expiresIn;
        const responseScopes = this.generateScopes(response, request);
        const cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(homeAccountIdentifier, request.authority, responseAccessToken, request.clientId, idTokenObj
            ? idTokenObj.claims.tid || Constants.EMPTY_STRING
            : tenantId, responseScopes.printScopes(), tokenExpirationSeconds, 0, this.browserCrypto);
        const nativeCacheRecord = new CacheRecord(undefined, cachedIdToken, cachedAccessToken);
        this.nativeStorageManager.saveCacheRecord(nativeCacheRecord, request.storeInCache);
    }
    addTelemetryFromNativeResponse(response) {
        const mats = this.getMATSFromResponse(response);
        if (!mats) {
            return null;
        }
        this.performanceClient.addFields({
            extensionId: this.nativeMessageHandler.getExtensionId(),
            extensionVersion: this.nativeMessageHandler.getExtensionVersion(),
            matsBrokerVersion: mats.broker_version,
            matsAccountJoinOnStart: mats.account_join_on_start,
            matsAccountJoinOnEnd: mats.account_join_on_end,
            matsDeviceJoin: mats.device_join,
            matsPromptBehavior: mats.prompt_behavior,
            matsApiErrorCode: mats.api_error_code,
            matsUiVisible: mats.ui_visible,
            matsSilentCode: mats.silent_code,
            matsSilentBiSubCode: mats.silent_bi_sub_code,
            matsSilentMessage: mats.silent_message,
            matsSilentStatus: mats.silent_status,
            matsHttpStatus: mats.http_status,
            matsHttpEventCount: mats.http_event_count,
        }, this.correlationId);
        return mats;
    }
    /**
     * Validates native platform response before processing
     * @param response
     */
    validateNativeResponse(response) {
        if (response.hasOwnProperty("access_token") &&
            response.hasOwnProperty("id_token") &&
            response.hasOwnProperty("client_info") &&
            response.hasOwnProperty("account") &&
            response.hasOwnProperty("scope") &&
            response.hasOwnProperty("expires_in")) {
            return response;
        }
        else {
            throw NativeAuthError.createUnexpectedError("Response missing expected properties.");
        }
    }
    /**
     * Gets MATS telemetry from native response
     * @param response
     * @returns
     */
    getMATSFromResponse(response) {
        if (response.properties.MATS) {
            try {
                return JSON.parse(response.properties.MATS);
            }
            catch (e) {
                this.logger.error("NativeInteractionClient - Error parsing MATS telemetry, returning null instead");
            }
        }
        return null;
    }
    /**
     * Returns whether or not response came from native cache
     * @param response
     * @returns
     */
    isResponseFromCache(mats) {
        if (typeof mats.is_cached === "undefined") {
            this.logger.verbose("NativeInteractionClient - MATS telemetry does not contain field indicating if response was served from cache. Returning false.");
            return false;
        }
        return !!mats.is_cached;
    }
    /**
     * Translates developer provided request object into NativeRequest object
     * @param request
     */
    async initializeNativeRequest(request) {
        this.logger.trace("NativeInteractionClient - initializeNativeRequest called");
        const authority = request.authority || this.config.auth.authority;
        if (request.account) {
            await this.validateRequestAuthority(authority, request.account);
        }
        const canonicalAuthority = new UrlString(authority);
        canonicalAuthority.validateAsUri();
        // scopes are expected to be received by the native broker as "scope" and will be added to the request below. Other properties that should be dropped from the request to the native broker can be included in the object destructuring here.
        const { scopes, ...remainingProperties } = request;
        const scopeSet = new ScopeSet(scopes || []);
        scopeSet.appendScopes(OIDC_DEFAULT_SCOPES);
        const getPrompt = () => {
            // If request is silent, prompt is always none
            switch (this.apiId) {
                case ApiId.ssoSilent:
                case ApiId.acquireTokenSilent_silentFlow:
                    this.logger.trace("initializeNativeRequest: silent request sets prompt to none");
                    return PromptValue.NONE;
            }
            // Prompt not provided, request may proceed and native broker decides if it needs to prompt
            if (!request.prompt) {
                this.logger.trace("initializeNativeRequest: prompt was not provided");
                return undefined;
            }
            // If request is interactive, check if prompt provided is allowed to go directly to native broker
            switch (request.prompt) {
                case PromptValue.NONE:
                case PromptValue.CONSENT:
                case PromptValue.LOGIN:
                    this.logger.trace("initializeNativeRequest: prompt is compatible with native flow");
                    return request.prompt;
                default:
                    this.logger.trace(`initializeNativeRequest: prompt = ${request.prompt} is not compatible with native flow`);
                    throw BrowserAuthError.createNativePromptParameterNotSupportedError();
            }
        };
        const validatedRequest = {
            ...remainingProperties,
            accountId: this.accountId,
            clientId: this.config.auth.clientId,
            authority: canonicalAuthority.urlString,
            scope: scopeSet.printScopes(),
            redirectUri: this.getRedirectUri(request.redirectUri),
            prompt: getPrompt(),
            correlationId: this.correlationId,
            tokenType: request.authenticationScheme,
            windowTitleSubstring: document.title,
            extraParameters: {
                ...request.extraQueryParameters,
                ...request.tokenQueryParameters,
            },
            extendedExpiryToken: false, // Make this configurable?
        };
        this.handleExtraBrokerParams(validatedRequest);
        validatedRequest.extraParameters =
            validatedRequest.extraParameters || {};
        validatedRequest.extraParameters.telemetry =
            NativeConstants.MATS_TELEMETRY;
        if (request.authenticationScheme === AuthenticationScheme.POP) {
            // add POP request type
            const shrParameters = {
                resourceRequestUri: request.resourceRequestUri,
                resourceRequestMethod: request.resourceRequestMethod,
                shrClaims: request.shrClaims,
                shrNonce: request.shrNonce,
            };
            const popTokenGenerator = new PopTokenGenerator(this.browserCrypto);
            const reqCnfData = await popTokenGenerator.generateCnf(shrParameters);
            // to reduce the URL length, it is recommended to send the hash of the req_cnf instead of the whole string
            validatedRequest.reqCnf = reqCnfData.reqCnfHash;
            validatedRequest.keyId = reqCnfData.kid;
        }
        return validatedRequest;
    }
    /**
     * Handles extra broker request parameters
     * @param request {NativeTokenRequest}
     * @private
     */
    handleExtraBrokerParams(request) {
        if (!request.extraParameters) {
            return;
        }
        if (request.extraParameters.hasOwnProperty(BrokerServerParamKeys.BROKER_CLIENT_ID) &&
            request.extraParameters.hasOwnProperty(BrokerServerParamKeys.BROKER_REDIRECT_URI) &&
            request.extraParameters.hasOwnProperty(AADServerParamKeys.CLIENT_ID)) {
            const child_client_id = request.extraParameters[AADServerParamKeys.CLIENT_ID];
            const child_redirect_uri = request.redirectUri;
            const brk_redirect_uri = request.extraParameters[BrokerServerParamKeys.BROKER_REDIRECT_URI];
            request.extraParameters = {
                child_client_id,
                child_redirect_uri,
            };
            request.redirectUri = brk_redirect_uri;
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class NativeMessageHandler {
    constructor(logger, handshakeTimeoutMs, performanceClient, crypto, extensionId) {
        this.logger = logger;
        this.handshakeTimeoutMs = handshakeTimeoutMs;
        this.extensionId = extensionId;
        this.resolvers = new Map(); // Used for non-handshake messages
        this.handshakeResolvers = new Map(); // Used for handshake messages
        this.messageChannel = new MessageChannel();
        this.windowListener = this.onWindowMessage.bind(this); // Window event callback doesn't have access to 'this' unless it's bound
        this.performanceClient = performanceClient;
        this.handshakeEvent = performanceClient.startMeasurement(PerformanceEvents.NativeMessageHandlerHandshake);
        this.crypto = crypto;
    }
    /**
     * Sends a given message to the extension and resolves with the extension response
     * @param body
     */
    async sendMessage(body) {
        this.logger.trace("NativeMessageHandler - sendMessage called.");
        const req = {
            channel: NativeConstants.CHANNEL_ID,
            extensionId: this.extensionId,
            responseId: this.crypto.createNewGuid(),
            body: body,
        };
        this.logger.trace("NativeMessageHandler - Sending request to browser extension");
        this.logger.tracePii(`NativeMessageHandler - Sending request to browser extension: ${JSON.stringify(req)}`);
        this.messageChannel.port1.postMessage(req);
        return new Promise((resolve, reject) => {
            this.resolvers.set(req.responseId, { resolve, reject });
        });
    }
    /**
     * Returns an instance of the MessageHandler that has successfully established a connection with an extension
     * @param {Logger} logger
     * @param {number} handshakeTimeoutMs
     * @param {IPerformanceClient} performanceClient
     * @param {ICrypto} crypto
     */
    static async createProvider(logger, handshakeTimeoutMs, performanceClient, crypto) {
        logger.trace("NativeMessageHandler - createProvider called.");
        try {
            const preferredProvider = new NativeMessageHandler(logger, handshakeTimeoutMs, performanceClient, crypto, NativeConstants.PREFERRED_EXTENSION_ID);
            await preferredProvider.sendHandshakeRequest();
            return preferredProvider;
        }
        catch (e) {
            // If preferred extension fails for whatever reason, fallback to using any installed extension
            const backupProvider = new NativeMessageHandler(logger, handshakeTimeoutMs, performanceClient, crypto);
            await backupProvider.sendHandshakeRequest();
            return backupProvider;
        }
    }
    /**
     * Send handshake request helper.
     */
    async sendHandshakeRequest() {
        this.logger.trace("NativeMessageHandler - sendHandshakeRequest called.");
        // Register this event listener before sending handshake
        window.addEventListener("message", this.windowListener, false); // false is important, because content script message processing should work first
        const req = {
            channel: NativeConstants.CHANNEL_ID,
            extensionId: this.extensionId,
            responseId: this.crypto.createNewGuid(),
            body: {
                method: NativeExtensionMethod.HandshakeRequest,
            },
        };
        this.handshakeEvent.add({
            extensionId: this.extensionId,
            extensionHandshakeTimeoutMs: this.handshakeTimeoutMs,
        });
        this.messageChannel.port1.onmessage = (event) => {
            this.onChannelMessage(event);
        };
        window.postMessage(req, window.origin, [this.messageChannel.port2]);
        return new Promise((resolve, reject) => {
            this.handshakeResolvers.set(req.responseId, { resolve, reject });
            this.timeoutId = window.setTimeout(() => {
                /*
                 * Throw an error if neither HandshakeResponse nor original Handshake request are received in a reasonable timeframe.
                 * This typically suggests an event handler stopped propagation of the Handshake request but did not respond to it on the MessageChannel port
                 */
                window.removeEventListener("message", this.windowListener, false);
                this.messageChannel.port1.close();
                this.messageChannel.port2.close();
                this.handshakeEvent.end({
                    extensionHandshakeTimedOut: true,
                    success: false,
                });
                reject(BrowserAuthError.createNativeHandshakeTimeoutError());
                this.handshakeResolvers.delete(req.responseId);
            }, this.handshakeTimeoutMs); // Use a reasonable timeout in milliseconds here
        });
    }
    /**
     * Invoked when a message is posted to the window. If a handshake request is received it means the extension is not installed.
     * @param event
     */
    onWindowMessage(event) {
        this.logger.trace("NativeMessageHandler - onWindowMessage called");
        // We only accept messages from ourselves
        if (event.source !== window) {
            return;
        }
        const request = event.data;
        if (!request.channel ||
            request.channel !== NativeConstants.CHANNEL_ID) {
            return;
        }
        if (request.extensionId && request.extensionId !== this.extensionId) {
            return;
        }
        if (request.body.method === NativeExtensionMethod.HandshakeRequest) {
            const handshakeResolver = this.handshakeResolvers.get(request.responseId);
            /*
             * Filter out responses with no matched resolvers sooner to keep channel ports open while waiting for
             * the proper response.
             */
            if (!handshakeResolver) {
                this.logger.trace(`NativeMessageHandler.onWindowMessage - resolver can't be found for request ${request.responseId}`);
                return;
            }
            // If we receive this message back it means no extension intercepted the request, meaning no extension supporting handshake protocol is installed
            this.logger.verbose(request.extensionId
                ? `Extension with id: ${request.extensionId} not installed`
                : "No extension installed");
            clearTimeout(this.timeoutId);
            this.messageChannel.port1.close();
            this.messageChannel.port2.close();
            window.removeEventListener("message", this.windowListener, false);
            this.handshakeEvent.end({
                success: false,
                extensionInstalled: false,
            });
            handshakeResolver.reject(BrowserAuthError.createNativeExtensionNotInstalledError());
        }
    }
    /**
     * Invoked when a message is received from the extension on the MessageChannel port
     * @param event
     */
    onChannelMessage(event) {
        this.logger.trace("NativeMessageHandler - onChannelMessage called.");
        const request = event.data;
        const resolver = this.resolvers.get(request.responseId);
        const handshakeResolver = this.handshakeResolvers.get(request.responseId);
        try {
            const method = request.body.method;
            if (method === NativeExtensionMethod.Response) {
                if (!resolver) {
                    return;
                }
                const response = request.body.response;
                this.logger.trace("NativeMessageHandler - Received response from browser extension");
                this.logger.tracePii(`NativeMessageHandler - Received response from browser extension: ${JSON.stringify(response)}`);
                if (response.status !== "Success") {
                    resolver.reject(NativeAuthError.createError(response.code, response.description, response.ext));
                }
                else if (response.result) {
                    if (response.result["code"] &&
                        response.result["description"]) {
                        resolver.reject(NativeAuthError.createError(response.result["code"], response.result["description"], response.result["ext"]));
                    }
                    else {
                        resolver.resolve(response.result);
                    }
                }
                else {
                    throw AuthError.createUnexpectedError("Event does not contain result.");
                }
                this.resolvers.delete(request.responseId);
            }
            else if (method === NativeExtensionMethod.HandshakeResponse) {
                if (!handshakeResolver) {
                    this.logger.trace(`NativeMessageHandler.onChannelMessage - resolver can't be found for request ${request.responseId}`);
                    return;
                }
                clearTimeout(this.timeoutId); // Clear setTimeout
                window.removeEventListener("message", this.windowListener, false); // Remove 'No extension' listener
                this.extensionId = request.extensionId;
                this.extensionVersion = request.body.version;
                this.logger.verbose(`NativeMessageHandler - Received HandshakeResponse from extension: ${this.extensionId}`);
                this.handshakeEvent.end({
                    extensionInstalled: true,
                    success: true,
                });
                handshakeResolver.resolve();
                this.handshakeResolvers.delete(request.responseId);
            }
            // Do nothing if method is not Response or HandshakeResponse
        }
        catch (err) {
            this.logger.error("Error parsing response from WAM Extension");
            this.logger.errorPii(`Error parsing response from WAM Extension: ${err}`);
            this.logger.errorPii(`Unable to parse ${event}`);
            if (resolver) {
                resolver.reject(err);
            }
            else if (handshakeResolver) {
                handshakeResolver.reject(err);
            }
        }
    }
    /**
     * Returns the Id for the browser extension this handler is communicating with
     * @returns
     */
    getExtensionId() {
        return this.extensionId;
    }
    /**
     * Returns the version for the browser extension this handler is communicating with
     * @returns
     */
    getExtensionVersion() {
        return this.extensionVersion;
    }
    /**
     * Returns boolean indicating whether or not the request should attempt to use native broker
     * @param logger
     * @param config
     * @param nativeExtensionProvider
     * @param authenticationScheme
     */
    static isNativeAvailable(config, logger, nativeExtensionProvider, authenticationScheme) {
        logger.trace("isNativeAvailable called");
        if (!config.system.allowNativeBroker) {
            logger.trace("isNativeAvailable: allowNativeBroker is not enabled, returning false");
            // Developer disabled WAM
            return false;
        }
        if (!nativeExtensionProvider) {
            logger.trace("isNativeAvailable: WAM extension provider is not initialized, returning false");
            // Extension is not available
            return false;
        }
        if (authenticationScheme) {
            switch (authenticationScheme) {
                case AuthenticationScheme.BEARER:
                case AuthenticationScheme.POP:
                    logger.trace("isNativeAvailable: authenticationScheme is supported, returning true");
                    return true;
                default:
                    logger.trace("isNativeAvailable: authenticationScheme is not supported, returning false");
                    return false;
            }
        }
        return true;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class RedirectClient extends StandardInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeStorageImpl, nativeMessageHandler, correlationId) {
        super(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId);
        this.nativeStorage = nativeStorageImpl;
    }
    /**
     * Redirects the page to the /authorize endpoint of the IDP
     * @param request
     */
    async acquireToken(request) {
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationRequest, request.correlationId);
        const validRequest = await this.initializeAuthorizationRequest(request, exports.InteractionType.Redirect);
        this.browserStorage.updateCacheEntries(validRequest.state, validRequest.nonce, validRequest.authority, validRequest.loginHint || Constants.EMPTY_STRING, validRequest.account || null);
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenRedirect);
        const handleBackButton = (event) => {
            // Clear temporary cache if the back button is clicked during the redirect flow.
            if (event.persisted) {
                this.logger.verbose("Page was restored from back/forward cache. Clearing temporary cache.");
                this.browserStorage.cleanRequestByState(validRequest.state);
                this.eventHandler.emitEvent(EventType.RESTORE_FROM_BFCACHE, exports.InteractionType.Redirect);
            }
        };
        try {
            // Create auth code request and generate PKCE params
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationCodeRequest, request.correlationId);
            const authCodeRequest = await this.initializeAuthorizationCodeRequest(validRequest);
            // Initialize the client
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, request.correlationId);
            const authClient = await this.createAuthCodeClient(serverTelemetryManager, validRequest.authority, validRequest.azureCloudOptions);
            this.logger.verbose("Auth code client created");
            // Create redirect interaction handler.
            const interactionHandler = new RedirectHandler(authClient, this.browserStorage, authCodeRequest, this.logger, this.browserCrypto, this.performanceClient);
            // Create acquire token url.
            const navigateUrl = await authClient.getAuthCodeUrl({
                ...validRequest,
                nativeBroker: NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeMessageHandler, request.authenticationScheme),
            });
            const redirectStartPage = this.getRedirectStartPage(request.redirectStartPage);
            this.logger.verbosePii(`Redirect start page: ${redirectStartPage}`);
            // Clear temporary cache if the back button is clicked during the redirect flow.
            window.addEventListener("pageshow", handleBackButton);
            // Show the UI once the url has been created. Response will come back in the hash, which will be handled in the handleRedirectCallback function.
            return await interactionHandler.initiateAuthRequest(navigateUrl, {
                navigationClient: this.navigationClient,
                redirectTimeout: this.config.system.redirectNavigationTimeout,
                redirectStartPage: redirectStartPage,
                onRedirectNavigate: request.onRedirectNavigate,
            });
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            window.removeEventListener("pageshow", handleBackButton);
            this.browserStorage.cleanRequestByState(validRequest.state);
            throw e;
        }
    }
    /**
     * Checks if navigateToLoginRequestUrl is set, and:
     * - if true, performs logic to cache and navigate
     * - if false, handles hash string and parses response
     * @param hash
     */
    async handleRedirectPromise(hash) {
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.handleRedirectPromise);
        try {
            if (!this.browserStorage.isInteractionInProgress(true)) {
                this.logger.info("handleRedirectPromise called but there is no interaction in progress, returning null.");
                return null;
            }
            const responseHash = this.getRedirectResponseHash(hash || window.location.hash);
            if (!responseHash) {
                // Not a recognized server response hash or hash not associated with a redirect request
                this.logger.info("handleRedirectPromise did not detect a response hash as a result of a redirect. Cleaning temporary cache.");
                this.browserStorage.cleanRequestByInteractionType(exports.InteractionType.Redirect);
                return null;
            }
            let state;
            try {
                // Deserialize hash fragment response parameters.
                const serverParams = UrlString.getDeserializedHash(responseHash);
                state = this.validateAndExtractStateFromHash(serverParams, exports.InteractionType.Redirect);
                this.logger.verbose("State extracted from hash");
            }
            catch (e) {
                this.logger.info(`handleRedirectPromise was unable to extract state due to: ${e}`);
                this.browserStorage.cleanRequestByInteractionType(exports.InteractionType.Redirect);
                return null;
            }
            // If navigateToLoginRequestUrl is true, get the url where the redirect request was initiated
            const loginRequestUrl = this.browserStorage.getTemporaryCache(TemporaryCacheKeys.ORIGIN_URI, true) || Constants.EMPTY_STRING;
            const loginRequestUrlNormalized = UrlString.removeHashFromUrl(loginRequestUrl);
            const currentUrlNormalized = UrlString.removeHashFromUrl(window.location.href);
            if (loginRequestUrlNormalized === currentUrlNormalized &&
                this.config.auth.navigateToLoginRequestUrl) {
                // We are on the page we need to navigate to - handle hash
                this.logger.verbose("Current page is loginRequestUrl, handling hash");
                const handleHashResult = await this.handleHash(responseHash, state, serverTelemetryManager);
                if (loginRequestUrl.indexOf("#") > -1) {
                    // Replace current hash with non-msal hash, if present
                    BrowserUtils.replaceHash(loginRequestUrl);
                }
                return handleHashResult;
            }
            else if (!this.config.auth.navigateToLoginRequestUrl) {
                this.logger.verbose("NavigateToLoginRequestUrl set to false, handling hash");
                return this.handleHash(responseHash, state, serverTelemetryManager);
            }
            else if (!BrowserUtils.isInIframe() ||
                this.config.system.allowRedirectInIframe) {
                /*
                 * Returned from authority using redirect - need to perform navigation before processing response
                 * Cache the hash to be retrieved after the next redirect
                 */
                this.browserStorage.setTemporaryCache(TemporaryCacheKeys.URL_HASH, responseHash, true);
                const navigationOptions = {
                    apiId: ApiId.handleRedirectPromise,
                    timeout: this.config.system.redirectNavigationTimeout,
                    noHistory: true,
                };
                /**
                 * Default behavior is to redirect to the start page and not process the hash now.
                 * The start page is expected to also call handleRedirectPromise which will process the hash in one of the checks above.
                 */
                let processHashOnRedirect = true;
                if (!loginRequestUrl || loginRequestUrl === "null") {
                    // Redirect to home page if login request url is null (real null or the string null)
                    const homepage = BrowserUtils.getHomepage();
                    // Cache the homepage under ORIGIN_URI to ensure cached hash is processed on homepage
                    this.browserStorage.setTemporaryCache(TemporaryCacheKeys.ORIGIN_URI, homepage, true);
                    this.logger.warning("Unable to get valid login request url from cache, redirecting to home page");
                    processHashOnRedirect =
                        await this.navigationClient.navigateInternal(homepage, navigationOptions);
                }
                else {
                    // Navigate to page that initiated the redirect request
                    this.logger.verbose(`Navigating to loginRequestUrl: ${loginRequestUrl}`);
                    processHashOnRedirect =
                        await this.navigationClient.navigateInternal(loginRequestUrl, navigationOptions);
                }
                // If navigateInternal implementation returns false, handle the hash now
                if (!processHashOnRedirect) {
                    return this.handleHash(responseHash, state, serverTelemetryManager);
                }
            }
            return null;
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.browserStorage.cleanRequestByInteractionType(exports.InteractionType.Redirect);
            throw e;
        }
    }
    /**
     * Gets the response hash for a redirect request
     * Returns null if interactionType in the state value is not "redirect" or the hash does not contain known properties
     * @param hash
     */
    getRedirectResponseHash(hash) {
        this.logger.verbose("getRedirectResponseHash called");
        // Get current location hash from window or cache.
        const isResponseHash = UrlString.hashContainsKnownProperties(hash);
        if (isResponseHash) {
            BrowserUtils.clearHash(window);
            this.logger.verbose("Hash contains known properties, returning response hash");
            return hash;
        }
        const cachedHash = this.browserStorage.getTemporaryCache(TemporaryCacheKeys.URL_HASH, true);
        this.browserStorage.removeItem(this.browserStorage.generateCacheKey(TemporaryCacheKeys.URL_HASH));
        this.logger.verbose("Hash does not contain known properties, returning cached hash");
        return cachedHash;
    }
    /**
     * Checks if hash exists and handles in window.
     * @param hash
     * @param state
     */
    async handleHash(hash, state, serverTelemetryManager) {
        const cachedRequest = this.browserStorage.getCachedRequest(state, this.browserCrypto);
        this.logger.verbose("handleHash called, retrieved cached request");
        const serverParams = UrlString.getDeserializedHash(hash);
        if (serverParams.accountId) {
            this.logger.verbose("Account id found in hash, calling WAM for token");
            if (!this.nativeMessageHandler) {
                throw BrowserAuthError.createNativeConnectionNotEstablishedError();
            }
            const nativeInteractionClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.acquireTokenPopup, this.performanceClient, this.nativeMessageHandler, serverParams.accountId, this.nativeStorage, cachedRequest.correlationId);
            const { userRequestState } = ProtocolUtils.parseRequestState(this.browserCrypto, state);
            return nativeInteractionClient
                .acquireToken({
                ...cachedRequest,
                state: userRequestState,
                prompt: undefined, // Server should handle the prompt, ideally native broker can do this part silently
            })
                .finally(() => {
                this.browserStorage.cleanRequestByState(state);
            });
        }
        // Hash contains known properties - handle and return in callback
        const currentAuthority = this.browserStorage.getCachedAuthority(state);
        if (!currentAuthority) {
            throw BrowserAuthError.createNoCachedAuthorityError();
        }
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, cachedRequest.correlationId);
        const authClient = await this.createAuthCodeClient(serverTelemetryManager, currentAuthority);
        this.logger.verbose("Auth code client created");
        ThrottlingUtils.removeThrottle(this.browserStorage, this.config.auth.clientId, cachedRequest);
        const interactionHandler = new RedirectHandler(authClient, this.browserStorage, cachedRequest, this.logger, this.browserCrypto, this.performanceClient);
        return await interactionHandler.handleCodeResponseFromHash(hash, state, authClient.authority, this.networkClient);
    }
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    async logout(logoutRequest) {
        this.logger.verbose("logoutRedirect called");
        const validLogoutRequest = this.initializeLogoutRequest(logoutRequest);
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.logout);
        try {
            this.eventHandler.emitEvent(EventType.LOGOUT_START, exports.InteractionType.Redirect, logoutRequest);
            // Clear cache on logout
            await this.clearCacheOnLogout(validLogoutRequest.account);
            const navigationOptions = {
                apiId: ApiId.logout,
                timeout: this.config.system.redirectNavigationTimeout,
                noHistory: false,
            };
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, validLogoutRequest.correlationId);
            const authClient = await this.createAuthCodeClient(serverTelemetryManager, logoutRequest && logoutRequest.authority);
            this.logger.verbose("Auth code client created");
            if (authClient.authority.protocolMode === ProtocolMode.OIDC) {
                try {
                    authClient.authority.endSessionEndpoint;
                }
                catch {
                    if (validLogoutRequest.account?.homeAccountId) {
                        this.browserStorage.removeAccount(validLogoutRequest.account?.homeAccountId);
                        this.eventHandler.emitEvent(EventType.LOGOUT_SUCCESS, exports.InteractionType.Redirect, validLogoutRequest);
                        return;
                    }
                }
            }
            // Create logout string and navigate user window to logout.
            const logoutUri = authClient.getLogoutUri(validLogoutRequest);
            this.eventHandler.emitEvent(EventType.LOGOUT_SUCCESS, exports.InteractionType.Redirect, validLogoutRequest);
            // Check if onRedirectNavigate is implemented, and invoke it if so
            if (logoutRequest &&
                typeof logoutRequest.onRedirectNavigate === "function") {
                const navigate = logoutRequest.onRedirectNavigate(logoutUri);
                if (navigate !== false) {
                    this.logger.verbose("Logout onRedirectNavigate did not return false, navigating");
                    // Ensure interaction is in progress
                    if (!this.browserStorage.getInteractionInProgress()) {
                        this.browserStorage.setInteractionInProgress(true);
                    }
                    await this.navigationClient.navigateExternal(logoutUri, navigationOptions);
                    return;
                }
                else {
                    // Ensure interaction is not in progress
                    this.browserStorage.setInteractionInProgress(false);
                    this.logger.verbose("Logout onRedirectNavigate returned false, stopping navigation");
                }
            }
            else {
                // Ensure interaction is in progress
                if (!this.browserStorage.getInteractionInProgress()) {
                    this.browserStorage.setInteractionInProgress(true);
                }
                await this.navigationClient.navigateExternal(logoutUri, navigationOptions);
                return;
            }
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.eventHandler.emitEvent(EventType.LOGOUT_FAILURE, exports.InteractionType.Redirect, null, e);
            this.eventHandler.emitEvent(EventType.LOGOUT_END, exports.InteractionType.Redirect);
            throw e;
        }
        this.eventHandler.emitEvent(EventType.LOGOUT_END, exports.InteractionType.Redirect);
    }
    /**
     * Use to get the redirectStartPage either from request or use current window
     * @param requestStartPage
     */
    getRedirectStartPage(requestStartPage) {
        const redirectStartPage = requestStartPage || window.location.href;
        return UrlString.getAbsoluteUrl(redirectStartPage, BrowserUtils.getCurrentUri());
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class PopupClient extends StandardInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeStorageImpl, nativeMessageHandler, correlationId) {
        super(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId);
        // Properly sets this reference for the unload event.
        this.unloadWindow = this.unloadWindow.bind(this);
        this.nativeStorage = nativeStorageImpl;
    }
    /**
     * Acquires tokens by opening a popup window to the /authorize endpoint of the authority
     * @param request
     */
    acquireToken(request) {
        try {
            const popupName = this.generatePopupName(request.scopes || OIDC_DEFAULT_SCOPES, request.authority || this.config.auth.authority);
            const popupWindowAttributes = request.popupWindowAttributes || {};
            // asyncPopups flag is true. Acquires token without first opening popup. Popup will be opened later asynchronously.
            if (this.config.system.asyncPopups) {
                this.logger.verbose("asyncPopups set to true, acquiring token");
                // Passes on popup position and dimensions if in request
                return this.acquireTokenPopupAsync(request, popupName, popupWindowAttributes);
            }
            else {
                // asyncPopups flag is set to false. Opens popup before acquiring token.
                this.logger.verbose("asyncPopup set to false, opening popup before acquiring token");
                const popup = this.openSizedPopup("about:blank", popupName, popupWindowAttributes);
                return this.acquireTokenPopupAsync(request, popupName, popupWindowAttributes, popup);
            }
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logout(logoutRequest) {
        try {
            this.logger.verbose("logoutPopup called");
            const validLogoutRequest = this.initializeLogoutRequest(logoutRequest);
            const popupName = this.generateLogoutPopupName(validLogoutRequest);
            const authority = logoutRequest && logoutRequest.authority;
            const mainWindowRedirectUri = logoutRequest && logoutRequest.mainWindowRedirectUri;
            const popupWindowAttributes = logoutRequest?.popupWindowAttributes || {};
            // asyncPopups flag is true. Acquires token without first opening popup. Popup will be opened later asynchronously.
            if (this.config.system.asyncPopups) {
                this.logger.verbose("asyncPopups set to true");
                // Passes on popup position and dimensions if in request
                return this.logoutPopupAsync(validLogoutRequest, popupName, popupWindowAttributes, authority, undefined, mainWindowRedirectUri);
            }
            else {
                // asyncPopups flag is set to false. Opens popup before logging out.
                this.logger.verbose("asyncPopup set to false, opening popup");
                const popup = this.openSizedPopup("about:blank", popupName, popupWindowAttributes);
                return this.logoutPopupAsync(validLogoutRequest, popupName, popupWindowAttributes, authority, popup, mainWindowRedirectUri);
            }
        }
        catch (e) {
            // Since this function is synchronous we need to reject
            return Promise.reject(e);
        }
    }
    /**
     * Helper which obtains an access_token for your API via opening a popup window in the user's browser
     * @param validRequest
     * @param popupName
     * @param popup
     * @param popupWindowAttributes
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    async acquireTokenPopupAsync(request, popupName, popupWindowAttributes, popup) {
        this.logger.verbose("acquireTokenPopupAsync called");
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenPopup);
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationRequest, request.correlationId);
        const validRequest = await this.initializeAuthorizationRequest(request, exports.InteractionType.Popup);
        this.browserStorage.updateCacheEntries(validRequest.state, validRequest.nonce, validRequest.authority, validRequest.loginHint || Constants.EMPTY_STRING, validRequest.account || null);
        try {
            // Create auth code request and generate PKCE params
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationCodeRequest, request.correlationId);
            const authCodeRequest = await this.initializeAuthorizationCodeRequest(validRequest);
            // Initialize the client
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, request.correlationId);
            const authClient = await this.createAuthCodeClient(serverTelemetryManager, validRequest.authority, validRequest.azureCloudOptions);
            this.logger.verbose("Auth code client created");
            const isNativeBroker = NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeMessageHandler, request.authenticationScheme);
            // Start measurement for server calls with native brokering enabled
            let fetchNativeAccountIdMeasurement;
            if (isNativeBroker) {
                fetchNativeAccountIdMeasurement =
                    this.performanceClient.startMeasurement(PerformanceEvents.FetchAccountIdWithNativeBroker, request.correlationId);
            }
            // Create acquire token url.
            const navigateUrl = await authClient.getAuthCodeUrl({
                ...validRequest,
                nativeBroker: isNativeBroker,
            });
            // Create popup interaction handler.
            const interactionHandler = new InteractionHandler(authClient, this.browserStorage, authCodeRequest, this.logger, this.performanceClient);
            // Show the UI once the url has been created. Get the window handle for the popup.
            const popupParameters = {
                popup,
                popupName,
                popupWindowAttributes,
            };
            const popupWindow = this.initiateAuthRequest(navigateUrl, popupParameters);
            this.eventHandler.emitEvent(EventType.POPUP_OPENED, exports.InteractionType.Popup, { popupWindow }, null);
            // Monitor the window for the hash. Return the string value and close the popup when the hash is received. Default timeout is 60 seconds.
            const hash = await this.monitorPopupForHash(popupWindow);
            // Deserialize hash fragment response parameters.
            const serverParams = UrlString.getDeserializedHash(hash);
            const state = this.validateAndExtractStateFromHash(serverParams, exports.InteractionType.Popup, validRequest.correlationId);
            // Remove throttle if it exists
            ThrottlingUtils.removeThrottle(this.browserStorage, this.config.auth.clientId, authCodeRequest);
            if (serverParams.accountId) {
                this.logger.verbose("Account id found in hash, calling WAM for token");
                // end measurement for server call with native brokering enabled
                if (fetchNativeAccountIdMeasurement) {
                    fetchNativeAccountIdMeasurement.end({
                        success: true,
                        isNativeBroker: true,
                    });
                }
                if (!this.nativeMessageHandler) {
                    throw BrowserAuthError.createNativeConnectionNotEstablishedError();
                }
                const nativeInteractionClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.acquireTokenPopup, this.performanceClient, this.nativeMessageHandler, serverParams.accountId, this.nativeStorage, validRequest.correlationId);
                const { userRequestState } = ProtocolUtils.parseRequestState(this.browserCrypto, state);
                return nativeInteractionClient
                    .acquireToken({
                    ...validRequest,
                    state: userRequestState,
                    prompt: undefined, // Server should handle the prompt, ideally native broker can do this part silently
                })
                    .finally(() => {
                    this.browserStorage.cleanRequestByState(state);
                });
            }
            // Handle response from hash string.
            const result = await interactionHandler.handleCodeResponseFromHash(hash, state, authClient.authority, this.networkClient);
            return result;
        }
        catch (e) {
            if (popup) {
                // Close the synchronous popup if an error is thrown before the window unload event is registered
                popup.close();
            }
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.browserStorage.cleanRequestByState(validRequest.state);
            throw e;
        }
    }
    /**
     *
     * @param validRequest
     * @param popupName
     * @param requestAuthority
     * @param popup
     * @param mainWindowRedirectUri
     * @param popupWindowAttributes
     */
    async logoutPopupAsync(validRequest, popupName, popupWindowAttributes, requestAuthority, popup, mainWindowRedirectUri) {
        this.logger.verbose("logoutPopupAsync called");
        this.eventHandler.emitEvent(EventType.LOGOUT_START, exports.InteractionType.Popup, validRequest);
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.logoutPopup);
        try {
            // Clear cache on logout
            await this.clearCacheOnLogout(validRequest.account);
            // Initialize the client
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientCreateAuthCodeClient, validRequest.correlationId);
            const authClient = await this.createAuthCodeClient(serverTelemetryManager, requestAuthority);
            this.logger.verbose("Auth code client created");
            try {
                authClient.authority.endSessionEndpoint;
            }
            catch {
                if (validRequest.account?.homeAccountId &&
                    validRequest.postLogoutRedirectUri &&
                    authClient.authority.protocolMode === ProtocolMode.OIDC) {
                    this.browserStorage.removeAccount(validRequest.account?.homeAccountId);
                    this.eventHandler.emitEvent(EventType.LOGOUT_SUCCESS, exports.InteractionType.Popup, validRequest);
                    if (mainWindowRedirectUri) {
                        const navigationOptions = {
                            apiId: ApiId.logoutPopup,
                            timeout: this.config.system.redirectNavigationTimeout,
                            noHistory: false,
                        };
                        const absoluteUrl = UrlString.getAbsoluteUrl(mainWindowRedirectUri, BrowserUtils.getCurrentUri());
                        await this.navigationClient.navigateInternal(absoluteUrl, navigationOptions);
                    }
                    if (popup) {
                        popup.close();
                    }
                    return;
                }
            }
            // Create logout string and navigate user window to logout.
            const logoutUri = authClient.getLogoutUri(validRequest);
            this.eventHandler.emitEvent(EventType.LOGOUT_SUCCESS, exports.InteractionType.Popup, validRequest);
            // Open the popup window to requestUrl.
            const popupWindow = this.openPopup(logoutUri, {
                popupName,
                popupWindowAttributes,
                popup,
            });
            this.eventHandler.emitEvent(EventType.POPUP_OPENED, exports.InteractionType.Popup, { popupWindow }, null);
            await this.waitForLogoutPopup(popupWindow);
            if (mainWindowRedirectUri) {
                const navigationOptions = {
                    apiId: ApiId.logoutPopup,
                    timeout: this.config.system.redirectNavigationTimeout,
                    noHistory: false,
                };
                const absoluteUrl = UrlString.getAbsoluteUrl(mainWindowRedirectUri, BrowserUtils.getCurrentUri());
                this.logger.verbose("Redirecting main window to url specified in the request");
                this.logger.verbosePii(`Redirecting main window to: ${absoluteUrl}`);
                this.navigationClient.navigateInternal(absoluteUrl, navigationOptions);
            }
            else {
                this.logger.verbose("No main window navigation requested");
            }
        }
        catch (e) {
            if (popup) {
                // Close the synchronous popup if an error is thrown before the window unload event is registered
                popup.close();
            }
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.browserStorage.setInteractionInProgress(false);
            this.eventHandler.emitEvent(EventType.LOGOUT_FAILURE, exports.InteractionType.Popup, null, e);
            this.eventHandler.emitEvent(EventType.LOGOUT_END, exports.InteractionType.Popup);
            throw e;
        }
        this.eventHandler.emitEvent(EventType.LOGOUT_END, exports.InteractionType.Popup);
    }
    /**
     * Opens a popup window with given request Url.
     * @param requestUrl
     */
    initiateAuthRequest(requestUrl, params) {
        // Check that request url is not empty.
        if (!StringUtils.isEmpty(requestUrl)) {
            this.logger.infoPii(`Navigate to: ${requestUrl}`);
            // Open the popup window to requestUrl.
            return this.openPopup(requestUrl, params);
        }
        else {
            // Throw error if request URL is empty.
            this.logger.error("Navigate url is empty");
            throw BrowserAuthError.createEmptyNavigationUriError();
        }
    }
    /**
     * Monitors a window until it loads a url with the same origin.
     * @param popupWindow - window that is being monitored
     * @param timeout - timeout for processing hash once popup is redirected back to application
     */
    monitorPopupForHash(popupWindow) {
        return new Promise((resolve, reject) => {
            /*
             * Polling for popups needs to be tick-based,
             * since a non-trivial amount of time can be spent on interaction (which should not count against the timeout).
             */
            const maxTicks = this.config.system.windowHashTimeout /
                this.config.system.pollIntervalMilliseconds;
            let ticks = 0;
            this.logger.verbose("PopupHandler.monitorPopupForHash - polling started");
            const intervalId = setInterval(() => {
                // Window is closed
                if (popupWindow.closed) {
                    this.logger.error("PopupHandler.monitorPopupForHash - window closed");
                    this.cleanPopup();
                    clearInterval(intervalId);
                    reject(BrowserAuthError.createUserCancelledError());
                    return;
                }
                let href = Constants.EMPTY_STRING;
                let serverResponseString = Constants.EMPTY_STRING;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = popupWindow.location.href;
                    serverResponseString =
                        this.extractServerResponseStringFromPopup(popupWindow, href);
                }
                catch (e) { }
                // Don't process blank pages or cross domain
                if (StringUtils.isEmpty(href) || href === "about:blank") {
                    return;
                }
                this.logger.verbose("PopupHandler.monitorPopupForHash - popup window is on same origin as caller");
                /*
                 * Only run clock when we are on same domain for popups
                 * as popup operations can take a long time.
                 */
                ticks++;
                if (serverResponseString) {
                    this.logger.verbose("PopupHandler.monitorPopupForHash - found hash in url");
                    clearInterval(intervalId);
                    this.cleanPopup(popupWindow);
                    if (UrlString.hashContainsKnownProperties(serverResponseString)) {
                        this.logger.verbose("PopupHandler.monitorPopupForHash - hash contains known properties, returning.");
                        resolve(serverResponseString);
                    }
                    else {
                        this.logger.error("PopupHandler.monitorPopupForHash - found hash in url but it does not contain known properties. Check that your router is not changing the hash prematurely.");
                        this.logger.errorPii(`PopupHandler.monitorPopupForHash - hash found: ${serverResponseString}`);
                        reject(BrowserAuthError.createHashDoesNotContainKnownPropertiesError());
                    }
                }
                else if (ticks > maxTicks) {
                    this.logger.error("PopupHandler.monitorPopupForHash - unable to find hash in url, timing out");
                    clearInterval(intervalId);
                    reject(BrowserAuthError.createMonitorPopupTimeoutError());
                }
            }, this.config.system.pollIntervalMilliseconds);
        });
    }
    /**
     * Waits for user interaction in logout popup window
     * @param popupWindow
     * @returns
     */
    waitForLogoutPopup(popupWindow) {
        return new Promise((resolve) => {
            this.logger.verbose("PopupHandler.waitForLogoutPopup - polling started");
            const intervalId = setInterval(() => {
                // Window is closed
                if (popupWindow.closed) {
                    this.logger.error("PopupHandler.waitForLogoutPopup - window closed");
                    this.cleanPopup();
                    clearInterval(intervalId);
                    resolve();
                }
                let href = Constants.EMPTY_STRING;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = popupWindow.location.href;
                }
                catch (e) { }
                // Don't process blank pages or cross domain
                if (StringUtils.isEmpty(href) || href === "about:blank") {
                    return;
                }
                this.logger.verbose("PopupHandler.waitForLogoutPopup - popup window is on same origin as caller, closing.");
                clearInterval(intervalId);
                this.cleanPopup(popupWindow);
                resolve();
            }, this.config.system.pollIntervalMilliseconds);
        });
    }
    /**
     * @hidden
     *
     * Configures popup window for login.
     *
     * @param urlNavigate
     * @param title
     * @param popUpWidth
     * @param popUpHeight
     * @param popupWindowAttributes
     * @ignore
     * @hidden
     */
    openPopup(urlNavigate, popupParams) {
        try {
            let popupWindow;
            // Popup window passed in, setting url to navigate to
            if (popupParams.popup) {
                popupWindow = popupParams.popup;
                this.logger.verbosePii(`Navigating popup window to: ${urlNavigate}`);
                popupWindow.location.assign(urlNavigate);
            }
            else if (typeof popupParams.popup === "undefined") {
                // Popup will be undefined if it was not passed in
                this.logger.verbosePii(`Opening popup window to: ${urlNavigate}`);
                popupWindow = this.openSizedPopup(urlNavigate, popupParams.popupName, popupParams.popupWindowAttributes);
            }
            // Popup will be null if popups are blocked
            if (!popupWindow) {
                throw BrowserAuthError.createEmptyWindowCreatedError();
            }
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            this.currentWindow = popupWindow;
            window.addEventListener("beforeunload", this.unloadWindow);
            return popupWindow;
        }
        catch (e) {
            this.logger.error("error opening popup " + e.message);
            this.browserStorage.setInteractionInProgress(false);
            throw BrowserAuthError.createPopupWindowError(e.toString());
        }
    }
    /**
     * Helper function to set popup window dimensions and position
     * @param urlNavigate
     * @param popupName
     * @param popupWindowAttributes
     * @returns
     */
    openSizedPopup(urlNavigate, popupName, popupWindowAttributes) {
        /**
         * adding winLeft and winTop to account for dual monitor
         * using screenLeft and screenTop for IE8 and earlier
         */
        const winLeft = window.screenLeft ? window.screenLeft : window.screenX;
        const winTop = window.screenTop ? window.screenTop : window.screenY;
        /**
         * window.innerWidth displays browser window"s height and width excluding toolbars
         * using document.documentElement.clientWidth for IE8 and earlier
         */
        const winWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        const winHeight = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        let width = popupWindowAttributes.popupSize?.width;
        let height = popupWindowAttributes.popupSize?.height;
        let top = popupWindowAttributes.popupPosition?.top;
        let left = popupWindowAttributes.popupPosition?.left;
        if (!width || width < 0 || width > winWidth) {
            this.logger.verbose("Default popup window width used. Window width not configured or invalid.");
            width = BrowserConstants.POPUP_WIDTH;
        }
        if (!height || height < 0 || height > winHeight) {
            this.logger.verbose("Default popup window height used. Window height not configured or invalid.");
            height = BrowserConstants.POPUP_HEIGHT;
        }
        if (!top || top < 0 || top > winHeight) {
            this.logger.verbose("Default popup window top position used. Window top not configured or invalid.");
            top = Math.max(0, winHeight / 2 - BrowserConstants.POPUP_HEIGHT / 2 + winTop);
        }
        if (!left || left < 0 || left > winWidth) {
            this.logger.verbose("Default popup window left position used. Window left not configured or invalid.");
            left = Math.max(0, winWidth / 2 - BrowserConstants.POPUP_WIDTH / 2 + winLeft);
        }
        return window.open(urlNavigate, popupName, `width=${width}, height=${height}, top=${top}, left=${left}, scrollbars=yes`);
    }
    /**
     * Event callback to unload main window.
     */
    unloadWindow(e) {
        this.browserStorage.cleanRequestByInteractionType(exports.InteractionType.Popup);
        if (this.currentWindow) {
            this.currentWindow.close();
        }
        // Guarantees browser unload will happen, so no other errors will be thrown.
        e.preventDefault();
    }
    /**
     * Closes popup, removes any state vars created during popup calls.
     * @param popupWindow
     */
    cleanPopup(popupWindow) {
        if (popupWindow) {
            // Close window.
            popupWindow.close();
        }
        // Remove window unload function
        window.removeEventListener("beforeunload", this.unloadWindow);
        // Interaction is completed - remove interaction status.
        this.browserStorage.setInteractionInProgress(false);
    }
    /**
     * Generates the name for the popup based on the client id and request
     * @param clientId
     * @param request
     */
    generatePopupName(scopes, authority) {
        return `${BrowserConstants.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${scopes.join("-")}.${authority}.${this.correlationId}`;
    }
    /**
     * Generates the name for the popup based on the client id and request for logouts
     * @param clientId
     * @param request
     */
    generateLogoutPopupName(request) {
        const homeAccountId = request.account && request.account.homeAccountId;
        return `${BrowserConstants.POPUP_NAME_PREFIX}.${this.config.auth.clientId}.${homeAccountId}.${this.correlationId}`;
    }
    /**
     * Extracts the server response from the popup window
     */
    extractServerResponseStringFromPopup(popupWindow, href) {
        let serverResponseString;
        if (this.config.auth.OIDCOptions?.serverResponseType ===
            ServerResponseType.QUERY) {
            serverResponseString = UrlString.parseQueryServerResponse(href);
        }
        else {
            serverResponseString = popupWindow.location.hash;
        }
        return serverResponseString;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class NavigationClient {
    /**
     * Navigates to other pages within the same web application
     * @param url
     * @param options
     */
    navigateInternal(url, options) {
        return NavigationClient.defaultNavigateWindow(url, options);
    }
    /**
     * Navigates to other pages outside the web application i.e. the Identity Provider
     * @param url
     * @param options
     */
    navigateExternal(url, options) {
        return NavigationClient.defaultNavigateWindow(url, options);
    }
    /**
     * Default navigation implementation invoked by the internal and external functions
     * @param url
     * @param options
     */
    static defaultNavigateWindow(url, options) {
        if (options.noHistory) {
            window.location.replace(url);
        }
        else {
            window.location.assign(url);
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, options.timeout);
        });
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Default timeout for popup windows and iframes in milliseconds
const DEFAULT_POPUP_TIMEOUT_MS = 60000;
const DEFAULT_IFRAME_TIMEOUT_MS = 6000;
const DEFAULT_REDIRECT_TIMEOUT_MS = 30000;
const DEFAULT_NATIVE_BROKER_HANDSHAKE_TIMEOUT_MS = 2000;
/**
 * MSAL function that sets the default options when not explicitly configured from app developer
 *
 * @param auth
 * @param cache
 * @param system
 *
 * @returns Configuration object
 */
function buildConfiguration({ auth: userInputAuth, cache: userInputCache, system: userInputSystem, telemetry: userInputTelemetry, }, isBrowserEnvironment) {
    // Default auth options for browser
    const DEFAULT_AUTH_OPTIONS = {
        clientId: Constants.EMPTY_STRING,
        authority: `${Constants.DEFAULT_AUTHORITY}`,
        knownAuthorities: [],
        cloudDiscoveryMetadata: Constants.EMPTY_STRING,
        authorityMetadata: Constants.EMPTY_STRING,
        redirectUri: Constants.EMPTY_STRING,
        postLogoutRedirectUri: Constants.EMPTY_STRING,
        navigateToLoginRequestUrl: true,
        clientCapabilities: [],
        protocolMode: ProtocolMode.AAD,
        OIDCOptions: {
            serverResponseType: ServerResponseType.FRAGMENT,
            defaultScopes: [
                Constants.OPENID_SCOPE,
                Constants.PROFILE_SCOPE,
                Constants.OFFLINE_ACCESS_SCOPE,
            ],
        },
        azureCloudOptions: {
            azureCloudInstance: AzureCloudInstance.None,
            tenant: Constants.EMPTY_STRING,
        },
        skipAuthorityMetadataCache: false,
    };
    // Default cache options for browser
    const DEFAULT_CACHE_OPTIONS = {
        cacheLocation: BrowserCacheLocation.SessionStorage,
        temporaryCacheLocation: BrowserCacheLocation.SessionStorage,
        storeAuthStateInCookie: false,
        secureCookies: false,
        // Default cache migration to true if cache location is localStorage since entries are preserved across tabs/windows. Migration has little to no benefit in sessionStorage and memoryStorage
        cacheMigrationEnabled: userInputCache &&
            userInputCache.cacheLocation === BrowserCacheLocation.LocalStorage
            ? true
            : false,
        claimsBasedCachingEnabled: false,
    };
    // Default logger options for browser
    const DEFAULT_LOGGER_OPTIONS = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loggerCallback: () => {
            // allow users to not set logger call back
        },
        logLevel: exports.LogLevel.Info,
        piiLoggingEnabled: false,
    };
    // Default system options for browser
    const DEFAULT_BROWSER_SYSTEM_OPTIONS = {
        ...DEFAULT_SYSTEM_OPTIONS,
        loggerOptions: DEFAULT_LOGGER_OPTIONS,
        networkClient: isBrowserEnvironment
            ? BrowserUtils.getBrowserNetworkClient()
            : StubbedNetworkModule,
        navigationClient: new NavigationClient(),
        loadFrameTimeout: 0,
        // If loadFrameTimeout is provided, use that as default.
        windowHashTimeout: userInputSystem?.loadFrameTimeout || DEFAULT_POPUP_TIMEOUT_MS,
        iframeHashTimeout: userInputSystem?.loadFrameTimeout || DEFAULT_IFRAME_TIMEOUT_MS,
        navigateFrameWait: isBrowserEnvironment && BrowserUtils.detectIEOrEdge() ? 500 : 0,
        redirectNavigationTimeout: DEFAULT_REDIRECT_TIMEOUT_MS,
        asyncPopups: false,
        allowRedirectInIframe: false,
        allowNativeBroker: false,
        nativeBrokerHandshakeTimeout: userInputSystem?.nativeBrokerHandshakeTimeout ||
            DEFAULT_NATIVE_BROKER_HANDSHAKE_TIMEOUT_MS,
        pollIntervalMilliseconds: BrowserConstants.DEFAULT_POLL_INTERVAL_MS,
    };
    const providedSystemOptions = {
        ...userInputSystem,
        loggerOptions: userInputSystem?.loggerOptions || DEFAULT_LOGGER_OPTIONS,
    };
    const DEFAULT_TELEMETRY_OPTIONS = {
        application: {
            appName: Constants.EMPTY_STRING,
            appVersion: Constants.EMPTY_STRING,
        },
        client: new StubPerformanceClient(DEFAULT_AUTH_OPTIONS.clientId, DEFAULT_AUTH_OPTIONS.authority, new Logger(DEFAULT_LOGGER_OPTIONS, name, version), name, version, {
            appName: Constants.EMPTY_STRING,
            appVersion: Constants.EMPTY_STRING,
        }),
    };
    // Throw an error if user has set OIDCOptions without being in OIDC protocol mode
    if (userInputAuth?.protocolMode !== ProtocolMode.OIDC &&
        userInputAuth?.OIDCOptions) {
        // Logger has not been created yet
        // eslint-disable-next-line no-console
        console.warn(ClientConfigurationError.createCannotSetOIDCOptionsError());
    }
    // Throw an error if user has set allowNativeBroker to true without being in AAD protocol mode
    if (userInputAuth?.protocolMode &&
        userInputAuth.protocolMode !== ProtocolMode.AAD &&
        providedSystemOptions?.allowNativeBroker) {
        throw ClientConfigurationError.createCannotAllowNativeBrokerError();
    }
    const overlayedConfig = {
        auth: {
            ...DEFAULT_AUTH_OPTIONS,
            ...userInputAuth,
            OIDCOptions: {
                ...DEFAULT_AUTH_OPTIONS.OIDCOptions,
                ...userInputAuth?.OIDCOptions,
            },
        },
        cache: { ...DEFAULT_CACHE_OPTIONS, ...userInputCache },
        system: { ...DEFAULT_BROWSER_SYSTEM_OPTIONS, ...providedSystemOptions },
        telemetry: { ...DEFAULT_TELEMETRY_OPTIONS, ...userInputTelemetry },
    };
    return overlayedConfig;
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentHandler extends InteractionHandler {
    constructor(authCodeModule, storageImpl, authCodeRequest, logger, systemOptions, performanceClient) {
        super(authCodeModule, storageImpl, authCodeRequest, logger, performanceClient);
        this.navigateFrameWait = systemOptions.navigateFrameWait;
        this.pollIntervalMilliseconds = systemOptions.pollIntervalMilliseconds;
    }
    /**
     * Creates a hidden iframe to given URL using user-requested scopes as an id.
     * @param urlNavigate
     * @param userRequestScopes
     */
    async initiateAuthRequest(requestUrl) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentHandlerInitiateAuthRequest, this.authCodeRequest.correlationId);
        if (StringUtils.isEmpty(requestUrl)) {
            // Throw error if request URL is empty.
            this.logger.info("Navigate url is empty");
            throw BrowserAuthError.createEmptyNavigationUriError();
        }
        if (this.navigateFrameWait) {
            this.performanceClient.setPreQueueTime(PerformanceEvents.SilentHandlerLoadFrame, this.authCodeRequest.correlationId);
            return await this.loadFrame(requestUrl);
        }
        return this.loadFrameSync(requestUrl);
    }
    /**
     * Monitors an iframe content window until it loads a url with a known hash, or hits a specified timeout.
     * @param iframe
     * @param timeout
     */
    monitorIframeForHash(iframe, timeout) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentHandlerMonitorIframeForHash, this.authCodeRequest.correlationId);
        return new Promise((resolve, reject) => {
            if (timeout < DEFAULT_IFRAME_TIMEOUT_MS) {
                this.logger.warning(`system.loadFrameTimeout or system.iframeHashTimeout set to lower (${timeout}ms) than the default (${DEFAULT_IFRAME_TIMEOUT_MS}ms). This may result in timeouts.`);
            }
            /*
             * Polling for iframes can be purely timing based,
             * since we don't need to account for interaction.
             */
            const nowMark = window.performance.now();
            const timeoutMark = nowMark + timeout;
            const intervalId = setInterval(() => {
                if (window.performance.now() > timeoutMark) {
                    this.removeHiddenIframe(iframe);
                    clearInterval(intervalId);
                    reject(BrowserAuthError.createMonitorIframeTimeoutError());
                    return;
                }
                let href = Constants.EMPTY_STRING;
                const contentWindow = iframe.contentWindow;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = contentWindow
                        ? contentWindow.location.href
                        : Constants.EMPTY_STRING;
                }
                catch (e) { }
                if (StringUtils.isEmpty(href) || href === "about:blank") {
                    return;
                }
                const contentHash = contentWindow
                    ? contentWindow.location.hash
                    : Constants.EMPTY_STRING;
                if (contentHash) {
                    if (UrlString.hashContainsKnownProperties(contentHash)) {
                        // Success case
                        this.removeHiddenIframe(iframe);
                        clearInterval(intervalId);
                        resolve(contentHash);
                        return;
                    }
                    else {
                        // Hash is present but incorrect
                        this.logger.error("SilentHandler:monitorIFrameForHash - a hash is present in the iframe but it does not contain known properties. It's likely that the hash has been replaced by code running on the redirectUri page.");
                        this.logger.errorPii(`SilentHandler:monitorIFrameForHash - the url detected in the iframe is: ${href}`);
                        this.removeHiddenIframe(iframe);
                        clearInterval(intervalId);
                        reject(BrowserAuthError.createHashDoesNotContainKnownPropertiesError());
                        return;
                    }
                }
                else {
                    // No hash is present
                    this.logger.error("SilentHandler:monitorIFrameForHash - the request has returned to the redirectUri but a hash is not present in the iframe. It's likely that the hash has been removed or the page has been redirected by code running on the redirectUri page.");
                    this.logger.errorPii(`SilentHandler:monitorIFrameForHash - the url detected in the iframe is: ${href}`);
                    this.removeHiddenIframe(iframe);
                    clearInterval(intervalId);
                    reject(BrowserAuthError.createEmptyHashError());
                    return;
                }
            }, this.pollIntervalMilliseconds);
        });
    }
    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    loadFrame(urlNavigate) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentHandlerLoadFrame, this.authCodeRequest.correlationId);
        /*
         * This trick overcomes iframe navigation in IE
         * IE does not load the page consistently in iframe
         */
        return new Promise((resolve, reject) => {
            const frameHandle = this.createHiddenIframe();
            setTimeout(() => {
                if (!frameHandle) {
                    reject("Unable to load iframe");
                    return;
                }
                frameHandle.src = urlNavigate;
                resolve(frameHandle);
            }, this.navigateFrameWait);
        });
    }
    /**
     * @hidden
     * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
     * @param urlNavigate
     * @param frameName
     * @param logger
     */
    loadFrameSync(urlNavigate) {
        const frameHandle = this.createHiddenIframe();
        frameHandle.src = urlNavigate;
        return frameHandle;
    }
    /**
     * @hidden
     * Creates a new hidden iframe or gets an existing one for silent token renewal.
     * @ignore
     */
    createHiddenIframe() {
        const authFrame = document.createElement("iframe");
        authFrame.style.visibility = "hidden";
        authFrame.style.position = "absolute";
        authFrame.style.width = authFrame.style.height = "0";
        authFrame.style.border = "0";
        authFrame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
        document.getElementsByTagName("body")[0].appendChild(authFrame);
        return authFrame;
    }
    /**
     * @hidden
     * Removes a hidden iframe from the page.
     * @ignore
     */
    removeHiddenIframe(iframe) {
        if (document.body === iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    }
}

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
        }, exports.InteractionType.Silent);
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
        const state = this.validateAndExtractStateFromHash(serverParams, exports.InteractionType.Silent, authCodeRequest.correlationId);
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

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentRefreshClient extends StandardInteractionClient {
    /**
     * Exchanges the refresh token for new tokens
     * @param request
     */
    async acquireToken(request) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.SilentRefreshClientAcquireToken, request.correlationId);
        this.performanceClient.setPreQueueTime(PerformanceEvents.InitializeBaseRequest, request.correlationId);
        const silentRequest = {
            ...request,
            ...(await this.initializeBaseRequest(request, request.account)),
        };
        const acquireTokenMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.SilentRefreshClientAcquireToken, silentRequest.correlationId);
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent_silentFlow);
        const refreshTokenClient = await this.createRefreshTokenClient(serverTelemetryManager, silentRequest.authority, silentRequest.azureCloudOptions);
        this.logger.verbose("Refresh token client created");
        // Send request to renew token. Auth module will throw errors if token cannot be renewed.
        this.performanceClient.setPreQueueTime(PerformanceEvents.RefreshTokenClientAcquireTokenByRefreshToken, request.correlationId);
        return refreshTokenClient
            .acquireTokenByRefreshToken(silentRequest)
            .then((result) => result)
            .then((result) => {
            acquireTokenMeasurement.end({
                success: true,
                fromCache: result.fromCache,
                requestId: result.requestId,
            });
            return result;
        })
            .catch((e) => {
            e.setCorrelationId(this.correlationId);
            serverTelemetryManager.cacheFailedRequest(e);
            acquireTokenMeasurement.end({
                errorCode: e.errorCode,
                subErrorCode: e.subError,
                success: false,
            });
            throw e;
        });
    }
    /**
     * Currently Unsupported
     */
    logout() {
        // Synchronous so we must reject
        return Promise.reject(BrowserAuthError.createSilentLogoutUnsupportedError());
    }
    /**
     * Creates a Refresh Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    async createRefreshTokenClient(serverTelemetryManager, authorityUrl, azureCloudOptions) {
        // Create auth module.
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientGetClientConfiguration, this.correlationId);
        const clientConfig = await this.getClientConfiguration(serverTelemetryManager, authorityUrl, azureCloudOptions);
        return new RefreshTokenClient(clientConfig, this.performanceClient);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class EventHandler {
    constructor(logger, browserCrypto) {
        this.eventCallbacks = new Map();
        this.logger = logger;
        this.browserCrypto = browserCrypto;
        this.listeningToStorageEvents = false;
        this.handleAccountCacheChange =
            this.handleAccountCacheChange.bind(this);
    }
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback) {
        if (typeof window !== "undefined") {
            const callbackId = this.browserCrypto.createNewGuid();
            this.eventCallbacks.set(callbackId, callback);
            this.logger.verbose(`Event callback registered with id: ${callbackId}`);
            return callbackId;
        }
        return null;
    }
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId) {
        this.eventCallbacks.delete(callbackId);
        this.logger.verbose(`Event callback ${callbackId} removed.`);
    }
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents() {
        if (typeof window === "undefined") {
            return;
        }
        if (!this.listeningToStorageEvents) {
            this.logger.verbose("Adding account storage listener.");
            this.listeningToStorageEvents = true;
            window.addEventListener("storage", this.handleAccountCacheChange);
        }
        else {
            this.logger.verbose("Account storage listener already registered.");
        }
    }
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents() {
        if (typeof window === "undefined") {
            return;
        }
        if (this.listeningToStorageEvents) {
            this.logger.verbose("Removing account storage listener.");
            window.removeEventListener("storage", this.handleAccountCacheChange);
            this.listeningToStorageEvents = false;
        }
        else {
            this.logger.verbose("No account storage listener registered.");
        }
    }
    /**
     * Emits events by calling callback with event message
     * @param eventType
     * @param interactionType
     * @param payload
     * @param error
     */
    emitEvent(eventType, interactionType, payload, error) {
        if (typeof window !== "undefined") {
            const message = {
                eventType: eventType,
                interactionType: interactionType || null,
                payload: payload || null,
                error: error || null,
                timestamp: Date.now(),
            };
            this.logger.info(`Emitting event: ${eventType}`);
            this.eventCallbacks.forEach((callback, callbackId) => {
                this.logger.verbose(`Emitting event to callback ${callbackId}: ${eventType}`);
                callback.apply(null, [message]);
            });
        }
    }
    /**
     * Emit account added/removed events when cached accounts are changed in a different tab or frame
     */
    handleAccountCacheChange(e) {
        try {
            const cacheValue = e.newValue || e.oldValue;
            if (!cacheValue) {
                return;
            }
            const parsedValue = JSON.parse(cacheValue);
            if (typeof parsedValue !== "object" ||
                !AccountEntity.isAccountEntity(parsedValue)) {
                return;
            }
            const accountEntity = CacheManager.toObject(new AccountEntity(), parsedValue);
            const accountInfo = accountEntity.getAccountInfo();
            if (!e.oldValue && e.newValue) {
                this.logger.info("Account was added to cache in a different window");
                this.emitEvent(EventType.ACCOUNT_ADDED, undefined, accountInfo);
            }
            else if (!e.newValue && e.oldValue) {
                this.logger.info("Account was removed from cache in a different window");
                this.emitEvent(EventType.ACCOUNT_REMOVED, undefined, accountInfo);
            }
        }
        catch (e) {
            return;
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility class for math specific functions in browser.
 */
class MathUtils {
    /**
     * Decimal to Hex
     *
     * @param num
     */
    static decimalToHex(num) {
        let hex = num.toString(16);
        while (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class GuidGenerator {
    constructor(cryptoObj) {
        this.cryptoObj = cryptoObj;
    }
    /*
     * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
     * pseudo-random numbers.
     * The algorithm is as follows:
     *     Set the two most significant bits (bits 6 and 7) of the
     *        clock_seq_hi_and_reserved to zero and one, respectively.
     *     Set the four most significant bits (bits 12 through 15) of the
     *        time_hi_and_version field to the 4-bit version number from
     *        Section 4.1.3. Version4
     *     Set all the other bits to randomly (or pseudo-randomly) chosen
     *     values.
     * UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
     * time-low               = 4hexOctet
     * time-mid               = 2hexOctet
     * time-high-and-version  = 2hexOctet
     * clock-seq-and-reserved = hexOctet:
     * clock-seq-low          = hexOctet
     * node                   = 6hexOctet
     * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
     * y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
     * y values are 8, 9, A, B
     */
    generateGuid() {
        try {
            const buffer = new Uint8Array(16);
            this.cryptoObj.getRandomValues(buffer);
            // buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
            buffer[6] |= 0x40; // buffer[6] | 01000000 will set the 6 bit to 1.
            buffer[6] &= 0x4f; // buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
            // buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
            buffer[8] |= 0x80; // buffer[8] | 10000000 will set the 7 bit to 1.
            buffer[8] &= 0xbf; // buffer[8] & 10111111 will set the 6 bit to 0.
            return (MathUtils.decimalToHex(buffer[0]) +
                MathUtils.decimalToHex(buffer[1]) +
                MathUtils.decimalToHex(buffer[2]) +
                MathUtils.decimalToHex(buffer[3]) +
                "-" +
                MathUtils.decimalToHex(buffer[4]) +
                MathUtils.decimalToHex(buffer[5]) +
                "-" +
                MathUtils.decimalToHex(buffer[6]) +
                MathUtils.decimalToHex(buffer[7]) +
                "-" +
                MathUtils.decimalToHex(buffer[8]) +
                MathUtils.decimalToHex(buffer[9]) +
                "-" +
                MathUtils.decimalToHex(buffer[10]) +
                MathUtils.decimalToHex(buffer[11]) +
                MathUtils.decimalToHex(buffer[12]) +
                MathUtils.decimalToHex(buffer[13]) +
                MathUtils.decimalToHex(buffer[14]) +
                MathUtils.decimalToHex(buffer[15]));
        }
        catch (err) {
            const guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            const hex = "0123456789abcdef";
            let r = 0;
            let guidResponse = Constants.EMPTY_STRING;
            for (let i = 0; i < 36; i++) {
                if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
                    // each x and y needs to be random
                    r = (Math.random() * 16) | 0;
                }
                if (guidHolder[i] === "x") {
                    guidResponse += hex[r];
                }
                else if (guidHolder[i] === "y") {
                    // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                    r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                    r |= 0x8; // set pos 3 to 1 as 1???
                    guidResponse += hex[r];
                }
                else {
                    guidResponse += guidHolder[i];
                }
            }
            return guidResponse;
        }
    }
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    isGuid(guid) {
        const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regexGuid.test(guid);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Utility functions for strings in a browser. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
class BrowserStringUtils {
    /**
     * Converts string to Uint8Array
     * @param sDOMStr
     */
    static stringToUtf8Arr(sDOMStr) {
        let nChr;
        let nArrLen = 0;
        const nStrLen = sDOMStr.length;
        /* mapping... */
        for (let nMapIdx = 0; nMapIdx < nStrLen; nMapIdx++) {
            nChr = sDOMStr.charCodeAt(nMapIdx);
            nArrLen +=
                nChr < 0x80
                    ? 1
                    : nChr < 0x800
                        ? 2
                        : nChr < 0x10000
                            ? 3
                            : nChr < 0x200000
                                ? 4
                                : nChr < 0x4000000
                                    ? 5
                                    : 6;
        }
        const aBytes = new Uint8Array(nArrLen);
        /* transcription... */
        for (let nIdx = 0, nChrIdx = 0; nIdx < nArrLen; nChrIdx++) {
            nChr = sDOMStr.charCodeAt(nChrIdx);
            if (nChr < 128) {
                /* one byte */
                aBytes[nIdx++] = nChr;
            }
            else if (nChr < 0x800) {
                /* two bytes */
                aBytes[nIdx++] = 192 + (nChr >>> 6);
                aBytes[nIdx++] = 128 + (nChr & 63);
            }
            else if (nChr < 0x10000) {
                /* three bytes */
                aBytes[nIdx++] = 224 + (nChr >>> 12);
                aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
                aBytes[nIdx++] = 128 + (nChr & 63);
            }
            else if (nChr < 0x200000) {
                /* four bytes */
                aBytes[nIdx++] = 240 + (nChr >>> 18);
                aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
                aBytes[nIdx++] = 128 + (nChr & 63);
            }
            else if (nChr < 0x4000000) {
                /* five bytes */
                aBytes[nIdx++] = 248 + (nChr >>> 24);
                aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
                aBytes[nIdx++] = 128 + (nChr & 63);
            } /* if (nChr <= 0x7fffffff) */
            else {
                /* six bytes */
                aBytes[nIdx++] = 252 + (nChr >>> 30);
                aBytes[nIdx++] = 128 + ((nChr >>> 24) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 18) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 12) & 63);
                aBytes[nIdx++] = 128 + ((nChr >>> 6) & 63);
                aBytes[nIdx++] = 128 + (nChr & 63);
            }
        }
        return aBytes;
    }
    /**
     * Converts Uint8Array to a string
     * @param aBytes
     */
    static utf8ArrToString(aBytes) {
        let sView = Constants.EMPTY_STRING;
        for (let nPart, nLen = aBytes.length, nIdx = 0; nIdx < nLen; nIdx++) {
            nPart = aBytes[nIdx];
            sView += String.fromCharCode(nPart > 251 && nPart < 254 && nIdx + 5 < nLen /* six bytes */
                ? /* (nPart - 252 << 30) may be not so safe in ECMAScript! So...: */
                    (nPart - 252) * 1073741824 +
                        ((aBytes[++nIdx] - 128) << 24) +
                        ((aBytes[++nIdx] - 128) << 18) +
                        ((aBytes[++nIdx] - 128) << 12) +
                        ((aBytes[++nIdx] - 128) << 6) +
                        aBytes[++nIdx] -
                        128
                : nPart > 247 &&
                    nPart < 252 &&
                    nIdx + 4 < nLen /* five bytes */
                    ? ((nPart - 248) << 24) +
                        ((aBytes[++nIdx] - 128) << 18) +
                        ((aBytes[++nIdx] - 128) << 12) +
                        ((aBytes[++nIdx] - 128) << 6) +
                        aBytes[++nIdx] -
                        128
                    : nPart > 239 &&
                        nPart < 248 &&
                        nIdx + 3 < nLen /* four bytes */
                        ? ((nPart - 240) << 18) +
                            ((aBytes[++nIdx] - 128) << 12) +
                            ((aBytes[++nIdx] - 128) << 6) +
                            aBytes[++nIdx] -
                            128
                        : nPart > 223 &&
                            nPart < 240 &&
                            nIdx + 2 < nLen /* three bytes */
                            ? ((nPart - 224) << 12) +
                                ((aBytes[++nIdx] - 128) << 6) +
                                aBytes[++nIdx] -
                                128
                            : nPart > 191 &&
                                nPart < 224 &&
                                nIdx + 1 < nLen /* two bytes */
                                ? ((nPart - 192) << 6) + aBytes[++nIdx] - 128
                                : /* nPart < 127 ? */ /* one byte */
                                    nPart);
        }
        return sView;
    }
    /**
     * Returns stringified jwk.
     * @param jwk
     */
    static getSortedObjectString(obj) {
        return JSON.stringify(obj, Object.keys(obj).sort());
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which exposes APIs to encode plaintext to base64 encoded string. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
class Base64Encode {
    /**
     * Returns URL Safe b64 encoded string from a plaintext string.
     * @param input
     */
    urlEncode(input) {
        return encodeURIComponent(this.encode(input)
            .replace(/=/g, Constants.EMPTY_STRING)
            .replace(/\+/g, "-")
            .replace(/\//g, "_"));
    }
    /**
     * Returns URL Safe b64 encoded string from an int8Array.
     * @param inputArr
     */
    urlEncodeArr(inputArr) {
        return this.base64EncArr(inputArr)
            .replace(/=/g, Constants.EMPTY_STRING)
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
    /**
     * Returns b64 encoded string from plaintext string.
     * @param input
     */
    encode(input) {
        const inputUtf8Arr = BrowserStringUtils.stringToUtf8Arr(input);
        return this.base64EncArr(inputUtf8Arr);
    }
    /**
     * Base64 encode byte array
     * @param aBytes
     */
    base64EncArr(aBytes) {
        const eqLen = (3 - (aBytes.length % 3)) % 3;
        let sB64Enc = Constants.EMPTY_STRING;
        for (let nMod3, nLen = aBytes.length, nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
            nMod3 = nIdx % 3;
            /* Uncomment the following line in order to split the output in lines 76-character long: */
            /*
             *if (nIdx > 0 && (nIdx * 4 / 3) % 76 === 0) { sB64Enc += "\r\n"; }
             */
            nUint24 |= aBytes[nIdx] << ((16 >>> nMod3) & 24);
            if (nMod3 === 2 || aBytes.length - nIdx === 1) {
                sB64Enc += String.fromCharCode(this.uint6ToB64((nUint24 >>> 18) & 63), this.uint6ToB64((nUint24 >>> 12) & 63), this.uint6ToB64((nUint24 >>> 6) & 63), this.uint6ToB64(nUint24 & 63));
                nUint24 = 0;
            }
        }
        return eqLen === 0
            ? sB64Enc
            : sB64Enc.substring(0, sB64Enc.length - eqLen) +
                (eqLen === 1 ? "=" : "==");
    }
    /**
     * Base64 string to array encoding helper
     * @param nUint6
     */
    uint6ToB64(nUint6) {
        return nUint6 < 26
            ? nUint6 + 65
            : nUint6 < 52
                ? nUint6 + 71
                : nUint6 < 62
                    ? nUint6 - 4
                    : nUint6 === 62
                        ? 43
                        : nUint6 === 63
                            ? 47
                            : 65;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which exposes APIs to decode base64 strings to plaintext. See here for implementation details:
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_2_%E2%80%93_JavaScript's_UTF-16_%3E_UTF-8_%3E_base64
 */
class Base64Decode {
    /**
     * Returns a URL-safe plaintext decoded string from b64 encoded input.
     * @param input
     */
    decode(input) {
        let encodedString = input.replace(/-/g, "+").replace(/_/g, "/");
        switch (encodedString.length % 4) {
            case 0:
                break;
            case 2:
                encodedString += "==";
                break;
            case 3:
                encodedString += "=";
                break;
            default:
                throw new Error("Invalid base64 string");
        }
        const inputUtf8Arr = this.base64DecToArr(encodedString);
        return BrowserStringUtils.utf8ArrToString(inputUtf8Arr);
    }
    /**
     * Decodes base64 into Uint8Array
     * @param base64String
     * @param nBlockSize
     */
    base64DecToArr(base64String, nBlockSize) {
        const sB64Enc = base64String.replace(/[^A-Za-z0-9\+\/]/g, Constants.EMPTY_STRING);
        const nInLen = sB64Enc.length;
        const nOutLen = nBlockSize
            ? Math.ceil(((nInLen * 3 + 1) >>> 2) / nBlockSize) * nBlockSize
            : (nInLen * 3 + 1) >>> 2;
        const aBytes = new Uint8Array(nOutLen);
        for (let nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
            nMod4 = nInIdx & 3;
            nUint24 |=
                this.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << (18 - 6 * nMod4);
            if (nMod4 === 3 || nInLen - nInIdx === 1) {
                for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                    aBytes[nOutIdx] = (nUint24 >>> ((16 >>> nMod3) & 24)) & 255;
                }
                nUint24 = 0;
            }
        }
        return aBytes;
    }
    /**
     * Base64 string to array decoding helper
     * @param charNum
     */
    b64ToUint6(charNum) {
        return charNum > 64 && charNum < 91
            ? charNum - 65
            : charNum > 96 && charNum < 123
                ? charNum - 71
                : charNum > 47 && charNum < 58
                    ? charNum + 4
                    : charNum === 43
                        ? 62
                        : charNum === 47
                            ? 63
                            : 0;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
// Constant byte array length
const RANDOM_BYTE_ARR_LENGTH = 32;
/**
 * Class which exposes APIs to generate PKCE codes and code verifiers.
 */
class PkceGenerator {
    constructor(cryptoObj) {
        this.base64Encode = new Base64Encode();
        this.cryptoObj = cryptoObj;
    }
    /**
     * Generates PKCE Codes. See the RFC for more information: https://tools.ietf.org/html/rfc7636
     */
    async generateCodes() {
        const codeVerifier = this.generateCodeVerifier();
        const codeChallenge = await this.generateCodeChallengeFromVerifier(codeVerifier);
        return {
            verifier: codeVerifier,
            challenge: codeChallenge,
        };
    }
    /**
     * Generates a random 32 byte buffer and returns the base64
     * encoded string to be used as a PKCE Code Verifier
     */
    generateCodeVerifier() {
        try {
            // Generate random values as utf-8
            const buffer = new Uint8Array(RANDOM_BYTE_ARR_LENGTH);
            this.cryptoObj.getRandomValues(buffer);
            // encode verifier as base64
            const pkceCodeVerifierB64 = this.base64Encode.urlEncodeArr(buffer);
            return pkceCodeVerifierB64;
        }
        catch (e) {
            throw BrowserAuthError.createPkceNotGeneratedError(e);
        }
    }
    /**
     * Creates a base64 encoded PKCE Code Challenge string from the
     * hash created from the PKCE Code Verifier supplied
     */
    async generateCodeChallengeFromVerifier(pkceCodeVerifier) {
        try {
            // hashed verifier
            const pkceHashedCodeVerifier = await this.cryptoObj.sha256Digest(pkceCodeVerifier);
            // encode hash as base64
            return this.base64Encode.urlEncodeArr(new Uint8Array(pkceHashedCodeVerifier));
        }
        catch (e) {
            throw BrowserAuthError.createPkceNotGeneratedError(e);
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ModernBrowserCrypto {
    getRandomValues(dataBuffer) {
        return window.crypto.getRandomValues(dataBuffer);
    }
    async generateKey(algorithm, extractable, keyUsages) {
        return window.crypto.subtle.generateKey(algorithm, extractable, keyUsages);
    }
    async exportKey(key) {
        return window.crypto.subtle.exportKey(KEY_FORMAT_JWK, key);
    }
    async importKey(keyData, algorithm, extractable, keyUsages) {
        return window.crypto.subtle.importKey(KEY_FORMAT_JWK, keyData, algorithm, extractable, keyUsages);
    }
    async sign(algorithm, key, data) {
        return window.crypto.subtle.sign(algorithm, key, data);
    }
    async digest(algorithm, data) {
        return window.crypto.subtle.digest(algorithm, data);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * See here for more info on RsaHashedKeyGenParams: https://developer.mozilla.org/en-US/docs/Web/API/RsaHashedKeyGenParams
 */
// RSA KeyGen Algorithm
const PKCS1_V15_KEYGEN_ALG = "RSASSA-PKCS1-v1_5";
// SHA-256 hashing algorithm
const S256_HASH_ALG = "SHA-256";
// MOD length for PoP tokens
const MODULUS_LENGTH = 2048;
// Public Exponent
const PUBLIC_EXPONENT = new Uint8Array([0x01, 0x00, 0x01]);
/**
 * This class implements functions used by the browser library to perform cryptography operations such as
 * hashing and encoding. It also has helper functions to validate the availability of specific APIs.
 */
class BrowserCrypto {
    constructor(logger) {
        this.logger = logger;
        if (this.hasBrowserCrypto()) {
            // Use standard modern web crypto if available
            this.logger.verbose("BrowserCrypto: modern crypto interface available");
            this.subtleCrypto = new ModernBrowserCrypto();
        }
        else {
            this.logger.error("BrowserCrypto: crypto interface is unavailable");
            throw BrowserAuthError.createCryptoNotAvailableError("Browser crypto interface is not available.");
        }
        this.keygenAlgorithmOptions = {
            name: PKCS1_V15_KEYGEN_ALG,
            hash: S256_HASH_ALG,
            modulusLength: MODULUS_LENGTH,
            publicExponent: PUBLIC_EXPONENT,
        };
    }
    /**
     * Check whether browser crypto is available.
     */
    hasBrowserCrypto() {
        return "crypto" in window;
    }
    /**
     * Returns a sha-256 hash of the given dataString as an ArrayBuffer.
     * @param dataString
     */
    async sha256Digest(dataString) {
        const data = BrowserStringUtils.stringToUtf8Arr(dataString);
        // MSR Crypto wants object with name property, instead of string
        return this.subtleCrypto.digest({ name: S256_HASH_ALG }, data);
    }
    /**
     * Populates buffer with cryptographically random values.
     * @param dataBuffer
     */
    getRandomValues(dataBuffer) {
        return this.subtleCrypto.getRandomValues(dataBuffer);
    }
    /**
     * Generates a keypair based on current keygen algorithm config.
     * @param extractable
     * @param usages
     */
    async generateKeyPair(extractable, usages) {
        return this.subtleCrypto.generateKey(this.keygenAlgorithmOptions, extractable, usages);
    }
    /**
     * Export key as Json Web Key (JWK)
     * @param key
     */
    async exportJwk(key) {
        return this.subtleCrypto.exportKey(key);
    }
    /**
     * Imports key as Json Web Key (JWK), can set extractable and usages.
     * @param key
     * @param extractable
     * @param usages
     */
    async importJwk(key, extractable, usages) {
        return this.subtleCrypto.importKey(key, this.keygenAlgorithmOptions, extractable, usages);
    }
    /**
     * Signs given data with given key
     * @param key
     * @param data
     */
    async sign(key, data) {
        return this.subtleCrypto.sign(this.keygenAlgorithmOptions, key, data);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Storage wrapper for IndexedDB storage in browsers: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
class DatabaseStorage {
    constructor() {
        this.dbName = DB_NAME;
        this.version = DB_VERSION;
        this.tableName = DB_TABLE_NAME;
        this.dbOpen = false;
    }
    /**
     * Opens IndexedDB instance.
     */
    async open() {
        return new Promise((resolve, reject) => {
            const openDB = window.indexedDB.open(this.dbName, this.version);
            openDB.addEventListener("upgradeneeded", (e) => {
                const event = e;
                event.target.result.createObjectStore(this.tableName);
            });
            openDB.addEventListener("success", (e) => {
                const event = e;
                this.db = event.target.result;
                this.dbOpen = true;
                resolve();
            });
            openDB.addEventListener("error", () => reject(BrowserAuthError.createDatabaseUnavailableError()));
        });
    }
    /**
     * Closes the connection to IndexedDB database when all pending transactions
     * complete.
     */
    closeConnection() {
        const db = this.db;
        if (db && this.dbOpen) {
            db.close();
            this.dbOpen = false;
        }
    }
    /**
     * Opens database if it's not already open
     */
    async validateDbIsOpen() {
        if (!this.dbOpen) {
            return await this.open();
        }
    }
    /**
     * Retrieves item from IndexedDB instance.
     * @param key
     */
    async getItem(key) {
        await this.validateDbIsOpen();
        return new Promise((resolve, reject) => {
            // TODO: Add timeouts?
            if (!this.db) {
                return reject(BrowserAuthError.createDatabaseNotOpenError());
            }
            const transaction = this.db.transaction([this.tableName], "readonly");
            const objectStore = transaction.objectStore(this.tableName);
            const dbGet = objectStore.get(key);
            dbGet.addEventListener("success", (e) => {
                const event = e;
                this.closeConnection();
                resolve(event.target.result);
            });
            dbGet.addEventListener("error", (e) => {
                this.closeConnection();
                reject(e);
            });
        });
    }
    /**
     * Adds item to IndexedDB under given key
     * @param key
     * @param payload
     */
    async setItem(key, payload) {
        await this.validateDbIsOpen();
        return new Promise((resolve, reject) => {
            // TODO: Add timeouts?
            if (!this.db) {
                return reject(BrowserAuthError.createDatabaseNotOpenError());
            }
            const transaction = this.db.transaction([this.tableName], "readwrite");
            const objectStore = transaction.objectStore(this.tableName);
            const dbPut = objectStore.put(payload, key);
            dbPut.addEventListener("success", () => {
                this.closeConnection();
                resolve();
            });
            dbPut.addEventListener("error", (e) => {
                this.closeConnection();
                reject(e);
            });
        });
    }
    /**
     * Removes item from IndexedDB under given key
     * @param key
     */
    async removeItem(key) {
        await this.validateDbIsOpen();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(BrowserAuthError.createDatabaseNotOpenError());
            }
            const transaction = this.db.transaction([this.tableName], "readwrite");
            const objectStore = transaction.objectStore(this.tableName);
            const dbDelete = objectStore.delete(key);
            dbDelete.addEventListener("success", () => {
                this.closeConnection();
                resolve();
            });
            dbDelete.addEventListener("error", (e) => {
                this.closeConnection();
                reject(e);
            });
        });
    }
    /**
     * Get all the keys from the storage object as an iterable array of strings.
     */
    async getKeys() {
        await this.validateDbIsOpen();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(BrowserAuthError.createDatabaseNotOpenError());
            }
            const transaction = this.db.transaction([this.tableName], "readonly");
            const objectStore = transaction.objectStore(this.tableName);
            const dbGetKeys = objectStore.getAllKeys();
            dbGetKeys.addEventListener("success", (e) => {
                const event = e;
                this.closeConnection();
                resolve(event.target.result);
            });
            dbGetKeys.addEventListener("error", (e) => {
                this.closeConnection();
                reject(e);
            });
        });
    }
    /**
     *
     * Checks whether there is an object under the search key in the object store
     */
    async containsKey(key) {
        await this.validateDbIsOpen();
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject(BrowserAuthError.createDatabaseNotOpenError());
            }
            const transaction = this.db.transaction([this.tableName], "readonly");
            const objectStore = transaction.objectStore(this.tableName);
            const dbContainsKey = objectStore.count(key);
            dbContainsKey.addEventListener("success", (e) => {
                const event = e;
                this.closeConnection();
                resolve(event.target.result === 1);
            });
            dbContainsKey.addEventListener("error", (e) => {
                this.closeConnection();
                reject(e);
            });
        });
    }
    /**
     * Deletes the MSAL database. The database is deleted rather than cleared to make it possible
     * for client applications to downgrade to a previous MSAL version without worrying about forward compatibility issues
     * with IndexedDB database versions.
     */
    async deleteDatabase() {
        // Check if database being deleted exists
        if (this.db && this.dbOpen) {
            this.closeConnection();
        }
        return new Promise((resolve, reject) => {
            const deleteDbRequest = window.indexedDB.deleteDatabase(DB_NAME);
            deleteDbRequest.addEventListener("success", () => resolve(true));
            deleteDbRequest.addEventListener("blocked", () => resolve(true));
            deleteDbRequest.addEventListener("error", () => reject(false));
        });
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class allows MSAL to store artifacts asynchronously using the DatabaseStorage IndexedDB wrapper,
 * backed up with the more volatile MemoryStorage object for cases in which IndexedDB may be unavailable.
 */
class AsyncMemoryStorage {
    constructor(logger, storeName) {
        this.inMemoryCache = new MemoryStorage();
        this.indexedDBCache = new DatabaseStorage();
        this.logger = logger;
        this.storeName = storeName;
    }
    handleDatabaseAccessError(error) {
        if (error instanceof BrowserAuthError &&
            error.errorCode === BrowserAuthErrorMessage.databaseUnavailable.code) {
            this.logger.error("Could not access persistent storage. This may be caused by browser privacy features which block persistent storage in third-party contexts.");
        }
        else {
            throw error;
        }
    }
    /**
     * Get the item matching the given key. Tries in-memory cache first, then in the asynchronous
     * storage object if item isn't found in-memory.
     * @param key
     */
    async getItem(key) {
        const item = this.inMemoryCache.getItem(key);
        if (!item) {
            try {
                this.logger.verbose("Queried item not found in in-memory cache, now querying persistent storage.");
                return await this.indexedDBCache.getItem(key);
            }
            catch (e) {
                this.handleDatabaseAccessError(e);
            }
        }
        return item;
    }
    /**
     * Sets the item in the in-memory cache and then tries to set it in the asynchronous
     * storage object with the given key.
     * @param key
     * @param value
     */
    async setItem(key, value) {
        this.inMemoryCache.setItem(key, value);
        try {
            await this.indexedDBCache.setItem(key, value);
        }
        catch (e) {
            this.handleDatabaseAccessError(e);
        }
    }
    /**
     * Removes the item matching the key from the in-memory cache, then tries to remove it from the asynchronous storage object.
     * @param key
     */
    async removeItem(key) {
        this.inMemoryCache.removeItem(key);
        try {
            await this.indexedDBCache.removeItem(key);
        }
        catch (e) {
            this.handleDatabaseAccessError(e);
        }
    }
    /**
     * Get all the keys from the in-memory cache as an iterable array of strings. If no keys are found, query the keys in the
     * asynchronous storage object.
     */
    async getKeys() {
        const cacheKeys = this.inMemoryCache.getKeys();
        if (cacheKeys.length === 0) {
            try {
                this.logger.verbose("In-memory cache is empty, now querying persistent storage.");
                return await this.indexedDBCache.getKeys();
            }
            catch (e) {
                this.handleDatabaseAccessError(e);
            }
        }
        return cacheKeys;
    }
    /**
     * Returns true or false if the given key is present in the cache.
     * @param key
     */
    async containsKey(key) {
        const containsKey = this.inMemoryCache.containsKey(key);
        if (!containsKey) {
            try {
                this.logger.verbose("Key not found in in-memory cache, now querying persistent storage.");
                return await this.indexedDBCache.containsKey(key);
            }
            catch (e) {
                this.handleDatabaseAccessError(e);
            }
        }
        return containsKey;
    }
    /**
     * Clears in-memory Map
     */
    clearInMemory() {
        // InMemory cache is a Map instance, clear is straightforward
        this.logger.verbose(`Deleting in-memory keystore ${this.storeName}`);
        this.inMemoryCache.clear();
        this.logger.verbose(`In-memory keystore ${this.storeName} deleted`);
    }
    /**
     * Tries to delete the IndexedDB database
     * @returns
     */
    async clearPersistent() {
        try {
            this.logger.verbose("Deleting persistent keystore");
            const dbDeleted = await this.indexedDBCache.deleteDatabase();
            if (dbDeleted) {
                this.logger.verbose("Persistent keystore deleted");
            }
            return dbDeleted;
        }
        catch (e) {
            this.handleDatabaseAccessError(e);
            return false;
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const CryptoKeyStoreNames = {
    asymmetricKeys: "asymmetricKeys",
    symmetricKeys: "symmetricKeys",
};
/**
 * MSAL CryptoKeyStore DB Version 2
 */
class CryptoKeyStore {
    constructor(logger) {
        this.logger = logger;
        this.asymmetricKeys = new AsyncMemoryStorage(this.logger, CryptoKeyStoreNames.asymmetricKeys);
        this.symmetricKeys = new AsyncMemoryStorage(this.logger, CryptoKeyStoreNames.symmetricKeys);
    }
    async clear() {
        // Delete in-memory keystores
        this.asymmetricKeys.clearInMemory();
        this.symmetricKeys.clearInMemory();
        /**
         * There is only one database, so calling clearPersistent on asymmetric keystore takes care of
         * every persistent keystore
         */
        try {
            await this.asymmetricKeys.clearPersistent();
            return true;
        }
        catch (e) {
            if (e instanceof Error) {
                this.logger.error(`Clearing keystore failed with error: ${e.message}`);
            }
            else {
                this.logger.error("Clearing keystore failed with unknown error");
            }
            return false;
        }
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements MSAL's crypto interface, which allows it to perform base64 encoding and decoding, generating cryptographically random GUIDs and
 * implementing Proof Key for Code Exchange specs for the OAuth Authorization Code Flow using PKCE (rfc here: https://tools.ietf.org/html/rfc7636).
 */
class CryptoOps {
    constructor(logger, performanceClient) {
        this.logger = logger;
        // Browser crypto needs to be validated first before any other classes can be set.
        this.browserCrypto = new BrowserCrypto(this.logger);
        this.b64Encode = new Base64Encode();
        this.b64Decode = new Base64Decode();
        this.guidGenerator = new GuidGenerator(this.browserCrypto);
        this.pkceGenerator = new PkceGenerator(this.browserCrypto);
        this.cache = new CryptoKeyStore(this.logger);
        this.performanceClient = performanceClient;
    }
    /**
     * Creates a new random GUID - used to populate state and nonce.
     * @returns string (GUID)
     */
    createNewGuid() {
        return this.guidGenerator.generateGuid();
    }
    /**
     * Encodes input string to base64.
     * @param input
     */
    base64Encode(input) {
        return this.b64Encode.encode(input);
    }
    /**
     * Decodes input string from base64.
     * @param input
     */
    base64Decode(input) {
        return this.b64Decode.decode(input);
    }
    /**
     * Generates PKCE codes used in Authorization Code Flow.
     */
    async generatePkceCodes() {
        return this.pkceGenerator.generateCodes();
    }
    /**
     * Generates a keypair, stores it and returns a thumbprint
     * @param request
     */
    async getPublicKeyThumbprint(request) {
        const publicKeyThumbMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.CryptoOptsGetPublicKeyThumbprint, request.correlationId);
        // Generate Keypair
        const keyPair = await this.browserCrypto.generateKeyPair(CryptoOps.EXTRACTABLE, CryptoOps.POP_KEY_USAGES);
        // Generate Thumbprint for Public Key
        const publicKeyJwk = await this.browserCrypto.exportJwk(keyPair.publicKey);
        const pubKeyThumprintObj = {
            e: publicKeyJwk.e,
            kty: publicKeyJwk.kty,
            n: publicKeyJwk.n,
        };
        const publicJwkString = BrowserStringUtils.getSortedObjectString(pubKeyThumprintObj);
        const publicJwkHash = await this.hashString(publicJwkString);
        // Generate Thumbprint for Private Key
        const privateKeyJwk = await this.browserCrypto.exportJwk(keyPair.privateKey);
        // Re-import private key to make it unextractable
        const unextractablePrivateKey = await this.browserCrypto.importJwk(privateKeyJwk, false, ["sign"]);
        // Store Keypair data in keystore
        await this.cache.asymmetricKeys.setItem(publicJwkHash, {
            privateKey: unextractablePrivateKey,
            publicKey: keyPair.publicKey,
            requestMethod: request.resourceRequestMethod,
            requestUri: request.resourceRequestUri,
        });
        if (publicKeyThumbMeasurement) {
            publicKeyThumbMeasurement.end({
                success: true,
            });
        }
        return publicJwkHash;
    }
    /**
     * Removes cryptographic keypair from key store matching the keyId passed in
     * @param kid
     */
    async removeTokenBindingKey(kid) {
        await this.cache.asymmetricKeys.removeItem(kid);
        const keyFound = await this.cache.asymmetricKeys.containsKey(kid);
        return !keyFound;
    }
    /**
     * Removes all cryptographic keys from IndexedDB storage
     */
    async clearKeystore() {
        return await this.cache.clear();
    }
    /**
     * Signs the given object as a jwt payload with private key retrieved by given kid.
     * @param payload
     * @param kid
     */
    async signJwt(payload, kid, correlationId) {
        const signJwtMeasurement = this.performanceClient?.startMeasurement(PerformanceEvents.CryptoOptsSignJwt, correlationId);
        const cachedKeyPair = await this.cache.asymmetricKeys.getItem(kid);
        if (!cachedKeyPair) {
            throw BrowserAuthError.createSigningKeyNotFoundInStorageError(kid);
        }
        // Get public key as JWK
        const publicKeyJwk = await this.browserCrypto.exportJwk(cachedKeyPair.publicKey);
        const publicKeyJwkString = BrowserStringUtils.getSortedObjectString(publicKeyJwk);
        // Base64URL encode public key thumbprint with keyId only: BASE64URL({ kid: "FULL_PUBLIC_KEY_HASH" })
        const encodedKeyIdThumbprint = this.b64Encode.urlEncode(JSON.stringify({ kid: kid }));
        // Generate header
        const shrHeader = JoseHeader.getShrHeaderString({
            kid: encodedKeyIdThumbprint,
            alg: publicKeyJwk.alg,
        });
        const encodedShrHeader = this.b64Encode.urlEncode(shrHeader);
        // Generate payload
        payload.cnf = {
            jwk: JSON.parse(publicKeyJwkString),
        };
        const encodedPayload = this.b64Encode.urlEncode(JSON.stringify(payload));
        // Form token string
        const tokenString = `${encodedShrHeader}.${encodedPayload}`;
        // Sign token
        const tokenBuffer = BrowserStringUtils.stringToUtf8Arr(tokenString);
        const signatureBuffer = await this.browserCrypto.sign(cachedKeyPair.privateKey, tokenBuffer);
        const encodedSignature = this.b64Encode.urlEncodeArr(new Uint8Array(signatureBuffer));
        const signedJwt = `${tokenString}.${encodedSignature}`;
        if (signJwtMeasurement) {
            signJwtMeasurement.end({
                success: true,
            });
        }
        return signedJwt;
    }
    /**
     * Returns the SHA-256 hash of an input string
     * @param plainText
     */
    async hashString(plainText) {
        const hashBuffer = await this.browserCrypto.sha256Digest(plainText);
        const hashBytes = new Uint8Array(hashBuffer);
        return this.b64Encode.urlEncodeArr(hashBytes);
    }
}
CryptoOps.POP_KEY_USAGES = ["sign", "verify"];
CryptoOps.EXTRACTABLE = true;

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Warning: This set of exports is purely intended to be used by other MSAL libraries, and should be considered potentially unstable. We strongly discourage using them directly, you do so at your own risk.
 * Breaking changes to these APIs will be shipped under a minor version, instead of a major version.
 */
// Cache Manager

var internals = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BrowserCacheManager: BrowserCacheManager,
    BrowserConstants: BrowserConstants,
    CacheRecord: CacheRecord,
    CryptoOps: CryptoOps,
    EventHandler: EventHandler,
    NativeAuthError: NativeAuthError,
    NativeInteractionClient: NativeInteractionClient,
    NativeMessageHandler: NativeMessageHandler,
    PopupClient: PopupClient,
    RedirectClient: RedirectClient,
    RedirectHandler: RedirectHandler,
    SilentCacheClient: SilentCacheClient,
    SilentIframeClient: SilentIframeClient,
    SilentRefreshClient: SilentRefreshClient,
    StandardInteractionClient: StandardInteractionClient,
    TemporaryCacheKeys: TemporaryCacheKeys
});

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Base class for operating context
 * Operating contexts are contexts in which MSAL.js is being run
 * More than one operating context may be available at a time
 * It's important from a logging and telemetry point of view for us to be able to identify the operating context.
 * For example: Some operating contexts will pre-cache tokens impacting performance telemetry
 */
class BaseOperatingContext {
    constructor(config) {
        /*
         * If loaded in an environment where window is not available,
         * set internal flag to false so that further requests fail.
         * This is to support server-side rendering environments.
         */
        this.browserEnvironment = typeof window !== "undefined";
        this.config = buildConfiguration(config, this.browserEnvironment);
        this.logger = new Logger(this.config.system.loggerOptions, name, version);
        this.available = false;
    }
    /**
     * Return the MSAL config
     * @returns BrowserConfiguration
     */
    getConfig() {
        return this.config;
    }
    /**
     * Returns the MSAL Logger
     * @returns Logger
     */
    getLogger() {
        return this.logger;
    }
    isAvailable() {
        return this.available;
    }
    isBrowserEnvironment() {
        return this.browserEnvironment;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class TeamsAppOperatingContext extends BaseOperatingContext {
    /**
     * Return the module name.  Intended for use with import() to enable dynamic import
     * of the implementation associated with this operating context
     * @returns
     */
    getModuleName() {
        return TeamsAppOperatingContext.MODULE_NAME;
    }
    /**
     * Returns the unique identifier for this operating context
     * @returns string
     */
    getId() {
        return TeamsAppOperatingContext.ID;
    }
    /**
     * Checks whether the operating context is available.
     * Confirms that the code is running a browser rather.  This is required.
     * @returns Promise<boolean> indicating whether this operating context is currently available.
     */
    async initialize() {
        /*
         * TODO: Add implementation to check for presence of inject MetaOSHub JavaScript interface
         * TODO: Make pre-flight token request to ensure that App is eligible to use Nested App Auth
         */
        return false;
    }
}
/*
 * TODO: Once we have determine the bundling code return here to specify the name of the bundle
 * containing the implementation for this operating context
 */
TeamsAppOperatingContext.MODULE_NAME = "";
/**
 * Unique identifier for the operating context
 */
TeamsAppOperatingContext.ID = "TeamsAppOperatingContext";

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class StandardOperatingContext extends BaseOperatingContext {
    /**
     * Return the module name.  Intended for use with import() to enable dynamic import
     * of the implementation associated with this operating context
     * @returns
     */
    getModuleName() {
        return StandardOperatingContext.MODULE_NAME;
    }
    /**
     * Returns the unique identifier for this operating context
     * @returns string
     */
    getId() {
        return StandardOperatingContext.ID;
    }
    /**
     * Checks whether the operating context is available.
     * Confirms that the code is running a browser rather.  This is required.
     * @returns Promise<boolean> indicating whether this operating context is currently available.
     */
    async initialize() {
        this.available = typeof window !== "undefined";
        return this.available;
        /*
         * NOTE: The standard context is available as long as there is a window.  If/when we split out WAM from Browser
         * We can move the current contents of the initialize method to here and verify that the WAM extension is available
         */
    }
}
/*
 * TODO: Once we have determine the bundling code return here to specify the name of the bundle
 * containing the implementation for this operating context
 */
StandardOperatingContext.MODULE_NAME = "";
/**
 * Unique identifier for the operating context
 */
StandardOperatingContext.ID = "StandardOperatingContext";

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class ControllerFactory {
    constructor(config) {
        this.config = config;
        const loggerOptions = {
            loggerCallback: undefined,
            piiLoggingEnabled: false,
            logLevel: undefined,
            correlationId: undefined,
        };
        this.logger = new Logger(loggerOptions, name, version);
    }
    async createController() {
        const standard = new StandardOperatingContext(this.config);
        const metaOS = new TeamsAppOperatingContext(this.config);
        const operatingContexts = [standard.initialize(), metaOS.initialize()];
        return Promise.all(operatingContexts).then(async () => {
            if (metaOS.isAvailable()) {
                /*
                 * pull down metaos module
                 * create associated controller
                 */
                // return await StandardController.createController(standard);
                const controller = await Promise.resolve().then(function () { return StandardController$1; });
                return await controller.StandardController.createController(standard);
            }
            else if (standard.isAvailable()) {
                const controller = await Promise.resolve().then(function () { return StandardController$1; });
                return await controller.StandardController.createController(standard);
            }
            throw new Error("No controller found.");
        });
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Token cache manager
 */
class TokenCache {
    constructor(configuration, storage, logger, cryptoObj) {
        this.isBrowserEnvironment = typeof window !== "undefined";
        this.config = configuration;
        this.storage = storage;
        this.logger = logger;
        this.cryptoObj = cryptoObj;
    }
    // Move getAllAccounts here and cache utility APIs
    /**
     * API to load tokens to msal-browser cache.
     * @param request
     * @param response
     * @param options
     * @returns `AuthenticationResult` for the response that was loaded.
     */
    loadExternalTokens(request, response, options) {
        this.logger.info("TokenCache - loadExternalTokens called");
        if (!response.id_token) {
            throw BrowserAuthError.createUnableToLoadTokenError("Please ensure server response includes id token.");
        }
        const idToken = new AuthToken(response.id_token, this.cryptoObj);
        let cacheRecord;
        let authority;
        let cacheRecordAccount;
        if (request.account) {
            cacheRecordAccount = AccountEntity.createFromAccountInfo(request.account);
            cacheRecord = new CacheRecord(cacheRecordAccount, this.loadIdToken(idToken, cacheRecordAccount.homeAccountId, request.account.environment, request.account.tenantId), this.loadAccessToken(request, response, cacheRecordAccount.homeAccountId, request.account.environment, request.account.tenantId, options), this.loadRefreshToken(request, response, cacheRecordAccount.homeAccountId, request.account.environment));
        }
        else if (request.authority) {
            const authorityUrl = Authority.generateAuthority(request.authority, request.azureCloudOptions);
            const authorityOptions = {
                protocolMode: this.config.auth.protocolMode,
                knownAuthorities: this.config.auth.knownAuthorities,
                cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
                authorityMetadata: this.config.auth.authorityMetadata,
                skipAuthorityMetadataCache: this.config.auth.skipAuthorityMetadataCache,
            };
            authority = new Authority(authorityUrl, this.config.system.networkClient, this.storage, authorityOptions, this.logger);
            // "clientInfo" from options takes precedence over "clientInfo" in response
            if (options.clientInfo) {
                this.logger.trace("TokenCache - homeAccountId from options");
                cacheRecordAccount = this.loadAccount(idToken, authority, options.clientInfo);
                cacheRecord = new CacheRecord(cacheRecordAccount, this.loadIdToken(idToken, cacheRecordAccount.homeAccountId, authority.hostnameAndPort, authority.tenant), this.loadAccessToken(request, response, cacheRecordAccount.homeAccountId, authority.hostnameAndPort, authority.tenant, options), this.loadRefreshToken(request, response, cacheRecordAccount.homeAccountId, authority.hostnameAndPort));
            }
            else if (response.client_info) {
                this.logger.trace("TokenCache - homeAccountId from response");
                cacheRecordAccount = this.loadAccount(idToken, authority, response.client_info);
                cacheRecord = new CacheRecord(cacheRecordAccount, this.loadIdToken(idToken, cacheRecordAccount.homeAccountId, authority.hostnameAndPort, authority.tenant), this.loadAccessToken(request, response, cacheRecordAccount.homeAccountId, authority.hostnameAndPort, authority.tenant, options), this.loadRefreshToken(request, response, cacheRecordAccount.homeAccountId, authority.hostnameAndPort));
            }
            else {
                throw BrowserAuthError.createUnableToLoadTokenError("Please provide clientInfo in the response or options.");
            }
        }
        else {
            throw BrowserAuthError.createUnableToLoadTokenError("Please provide a request with an account or a request with authority.");
        }
        return this.generateAuthenticationResult(request, idToken, cacheRecord, cacheRecordAccount, authority);
    }
    /**
     * Helper function to load account to msal-browser cache
     * @param idToken
     * @param environment
     * @param clientInfo
     * @param authorityType
     * @param requestHomeAccountId
     * @returns `AccountEntity`
     */
    loadAccount(idToken, authority, clientInfo, requestHomeAccountId) {
        let homeAccountId;
        if (requestHomeAccountId) {
            homeAccountId = requestHomeAccountId;
        }
        else if (authority.authorityType !== undefined && clientInfo) {
            homeAccountId = AccountEntity.generateHomeAccountId(clientInfo, authority.authorityType, this.logger, this.cryptoObj, idToken.claims);
        }
        if (!homeAccountId) {
            throw BrowserAuthError.createUnableToLoadTokenError("Unexpected missing homeAccountId");
        }
        const accountEntity = AccountEntity.createAccount({
            homeAccountId,
            idTokenClaims: idToken.claims,
            clientInfo,
            environment: authority.hostnameAndPort,
        }, authority);
        if (this.isBrowserEnvironment) {
            this.logger.verbose("TokenCache - loading account");
            this.storage.setAccount(accountEntity);
            return accountEntity;
        }
        else {
            throw BrowserAuthError.createUnableToLoadTokenError("loadExternalTokens is designed to work in browser environments only.");
        }
    }
    /**
     * Helper function to load id tokens to msal-browser cache
     * @param idToken
     * @param homeAccountId
     * @param environment
     * @param tenantId
     * @returns `IdTokenEntity`
     */
    loadIdToken(idToken, homeAccountId, environment, tenantId) {
        const idTokenEntity = IdTokenEntity.createIdTokenEntity(homeAccountId, environment, idToken.rawToken, this.config.auth.clientId, tenantId);
        if (this.isBrowserEnvironment) {
            this.logger.verbose("TokenCache - loading id token");
            this.storage.setIdTokenCredential(idTokenEntity);
            return idTokenEntity;
        }
        else {
            throw BrowserAuthError.createUnableToLoadTokenError("loadExternalTokens is designed to work in browser environments only.");
        }
    }
    /**
     * Helper function to load access tokens to msal-browser cache
     * @param request
     * @param response
     * @param homeAccountId
     * @param environment
     * @param tenantId
     * @returns `AccessTokenEntity`
     */
    loadAccessToken(request, response, homeAccountId, environment, tenantId, options) {
        if (!response.access_token) {
            this.logger.verbose("TokenCache - No access token provided for caching");
            return null;
        }
        if (!response.expires_in) {
            throw BrowserAuthError.createUnableToLoadTokenError("Please ensure server response includes expires_in value.");
        }
        if (!options.extendedExpiresOn) {
            throw BrowserAuthError.createUnableToLoadTokenError("Please provide an extendedExpiresOn value in the options.");
        }
        const scopes = new ScopeSet(request.scopes).printScopes();
        const expiresOn = options.expiresOn ||
            response.expires_in + new Date().getTime() / 1000;
        const extendedExpiresOn = options.extendedExpiresOn;
        const accessTokenEntity = AccessTokenEntity.createAccessTokenEntity(homeAccountId, environment, response.access_token, this.config.auth.clientId, tenantId, scopes, expiresOn, extendedExpiresOn, this.cryptoObj);
        if (this.isBrowserEnvironment) {
            this.logger.verbose("TokenCache - loading access token");
            this.storage.setAccessTokenCredential(accessTokenEntity);
            return accessTokenEntity;
        }
        else {
            throw BrowserAuthError.createUnableToLoadTokenError("loadExternalTokens is designed to work in browser environments only.");
        }
    }
    /**
     * Helper function to load refresh tokens to msal-browser cache
     * @param request
     * @param response
     * @param homeAccountId
     * @param environment
     * @returns `RefreshTokenEntity`
     */
    loadRefreshToken(request, response, homeAccountId, environment) {
        if (!response.refresh_token) {
            this.logger.verbose("TokenCache - No refresh token provided for caching");
            return null;
        }
        const refreshTokenEntity = RefreshTokenEntity.createRefreshTokenEntity(homeAccountId, environment, response.refresh_token, this.config.auth.clientId);
        if (this.isBrowserEnvironment) {
            this.logger.verbose("TokenCache - loading refresh token");
            this.storage.setRefreshTokenCredential(refreshTokenEntity);
            return refreshTokenEntity;
        }
        else {
            throw BrowserAuthError.createUnableToLoadTokenError("loadExternalTokens is designed to work in browser environments only.");
        }
    }
    /**
     * Helper function to generate an `AuthenticationResult` for the result.
     * @param request
     * @param idTokenObj
     * @param cacheRecord
     * @param authority
     * @returns `AuthenticationResult`
     */
    generateAuthenticationResult(request, idTokenObj, cacheRecord, accountEntity, authority) {
        let accessToken = Constants.EMPTY_STRING;
        let responseScopes = [];
        let expiresOn = null;
        let extExpiresOn;
        if (cacheRecord?.accessToken) {
            accessToken = cacheRecord.accessToken.secret;
            responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
            expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1000);
            extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1000);
        }
        const uid = idTokenObj?.claims.oid ||
            idTokenObj?.claims.sub ||
            Constants.EMPTY_STRING;
        const tid = idTokenObj?.claims.tid || Constants.EMPTY_STRING;
        return {
            authority: authority
                ? authority.canonicalAuthority
                : Constants.EMPTY_STRING,
            uniqueId: uid,
            tenantId: tid,
            scopes: responseScopes,
            account: accountEntity.getAccountInfo(),
            idToken: idTokenObj ? idTokenObj.rawToken : Constants.EMPTY_STRING,
            idTokenClaims: idTokenObj ? idTokenObj.claims : {},
            accessToken: accessToken,
            fromCache: true,
            expiresOn: expiresOn,
            correlationId: request.correlationId || Constants.EMPTY_STRING,
            requestId: Constants.EMPTY_STRING,
            extExpiresOn: extExpiresOn,
            familyId: Constants.EMPTY_STRING,
            tokenType: cacheRecord?.accessToken?.tokenType || Constants.EMPTY_STRING,
            state: Constants.EMPTY_STRING,
            cloudGraphHostName: accountEntity.cloudGraphHostName || Constants.EMPTY_STRING,
            msGraphHost: accountEntity.msGraphHost || Constants.EMPTY_STRING,
            code: undefined,
            fromNativeBroker: false,
        };
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class HybridSpaAuthorizationCodeClient extends AuthorizationCodeClient {
    constructor(config) {
        super(config);
        this.includeRedirectUri = false;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SilentAuthCodeClient extends StandardInteractionClient {
    constructor(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, apiId, performanceClient, nativeMessageHandler, correlationId) {
        super(config, storageImpl, browserCrypto, logger, eventHandler, navigationClient, performanceClient, nativeMessageHandler, correlationId);
        this.apiId = apiId;
    }
    /**
     * Acquires a token silently by redeeming an authorization code against the /token endpoint
     * @param request
     */
    async acquireToken(request) {
        this.logger.trace("SilentAuthCodeClient.acquireToken called");
        // Auth code payload is required
        if (!request.code) {
            throw BrowserAuthError.createAuthCodeRequiredError();
        }
        // Create silent request
        this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientInitializeAuthorizationRequest, request.correlationId);
        const silentRequest = await this.initializeAuthorizationRequest(request, exports.InteractionType.Silent);
        this.browserStorage.updateCacheEntries(silentRequest.state, silentRequest.nonce, silentRequest.authority, silentRequest.loginHint || Constants.EMPTY_STRING, silentRequest.account || null);
        const serverTelemetryManager = this.initializeServerTelemetryManager(this.apiId);
        try {
            // Create auth code request (PKCE not needed)
            const authCodeRequest = {
                ...silentRequest,
                code: request.code,
            };
            // Initialize the client
            this.performanceClient.setPreQueueTime(PerformanceEvents.StandardInteractionClientGetClientConfiguration, request.correlationId);
            const clientConfig = await this.getClientConfiguration(serverTelemetryManager, silentRequest.authority);
            const authClient = new HybridSpaAuthorizationCodeClient(clientConfig);
            this.logger.verbose("Auth code client created");
            // Create silent handler
            const silentHandler = new SilentHandler(authClient, this.browserStorage, authCodeRequest, this.logger, this.config.system, this.performanceClient);
            // Handle auth code parameters from request
            return silentHandler.handleCodeResponseFromServer({
                code: request.code,
                msgraph_host: request.msGraphHost,
                cloud_graph_host_name: request.cloudGraphHostName,
                cloud_instance_host_name: request.cloudInstanceHostName,
            }, silentRequest.state, authClient.authority, this.networkClient, false);
        }
        catch (e) {
            if (e instanceof AuthError) {
                e.setCorrelationId(this.correlationId);
                serverTelemetryManager.cacheFailedRequest(e);
            }
            this.browserStorage.cleanRequestByState(silentRequest.state);
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
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class StandardController {
    /**
     * @constructor
     * Constructor for the PublicClientApplication used to instantiate the PublicClientApplication object
     *
     * Important attributes in the Configuration object for auth are:
     * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
     * - authority: the authority URL for your application.
     * - redirect_uri: the uri of your application registered in the portal.
     *
     * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
     * It is of the form https://login.microsoftonline.com/{Enter_the_Tenant_Info_Here}
     * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
     * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
     * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
     * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
     *
     * In Azure B2C, authority is of the form https://{instance}/tfp/{tenant}/{policyName}/
     * Full B2C functionality will be available in this library in future versions.
     *
     * @param configuration Object for the MSAL PublicClientApplication instance
     */
    constructor(operatingContext) {
        this.atsAsyncMeasurement = undefined;
        this.operatingContext = operatingContext;
        this.isBrowserEnvironment =
            this.operatingContext.isBrowserEnvironment();
        // Set the configuration.
        this.config = operatingContext.getConfig();
        this.initialized = false;
        // Initialize logger
        this.logger = this.operatingContext.getLogger();
        // Initialize the network module class.
        this.networkClient = this.config.system.networkClient;
        // Initialize the navigation client class.
        this.navigationClient = this.config.system.navigationClient;
        // Initialize redirectResponse Map
        this.redirectResponse = new Map();
        // Initial hybrid spa map
        this.hybridAuthCodeResponses = new Map();
        // Initialize performance client
        this.performanceClient = this.config.telemetry.client;
        // Initialize the crypto class.
        this.browserCrypto = this.isBrowserEnvironment
            ? new CryptoOps(this.logger, this.performanceClient)
            : DEFAULT_CRYPTO_IMPLEMENTATION;
        this.eventHandler = new EventHandler(this.logger, this.browserCrypto);
        // Initialize the browser storage class.
        this.browserStorage = this.isBrowserEnvironment
            ? new BrowserCacheManager(this.config.auth.clientId, this.config.cache, this.browserCrypto, this.logger)
            : DEFAULT_BROWSER_CACHE_MANAGER(this.config.auth.clientId, this.logger);
        // initialize in memory storage for native flows
        const nativeCacheOptions = {
            cacheLocation: BrowserCacheLocation.MemoryStorage,
            temporaryCacheLocation: BrowserCacheLocation.MemoryStorage,
            storeAuthStateInCookie: false,
            secureCookies: false,
            cacheMigrationEnabled: false,
            claimsBasedCachingEnabled: false,
        };
        this.nativeInternalStorage = new BrowserCacheManager(this.config.auth.clientId, nativeCacheOptions, this.browserCrypto, this.logger);
        // Initialize the token cache
        this.tokenCache = new TokenCache(this.config, this.browserStorage, this.logger, this.browserCrypto);
        this.activeSilentTokenRequests = new Map();
        // Register listener functions
        this.trackPageVisibility = this.trackPageVisibility.bind(this);
        // Register listener functions
        this.trackPageVisibilityWithMeasurement =
            this.trackPageVisibilityWithMeasurement.bind(this);
    }
    static async createController(operatingContext) {
        const controller = new StandardController(operatingContext);
        controller.initialize();
        return controller;
    }
    trackPageVisibility() {
        if (!this.atsAsyncMeasurement) {
            return;
        }
        this.logger.info("Perf: Visibility change detected");
        this.atsAsyncMeasurement.increment({
            visibilityChangeCount: 1,
        });
    }
    /**
     * Initializer function to perform async startup tasks such as connecting to WAM extension
     */
    async initialize() {
        this.logger.trace("initialize called");
        if (this.initialized) {
            this.logger.info("initialize has already been called, exiting early.");
            return;
        }
        const allowNativeBroker = this.config.system.allowNativeBroker;
        const initMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.InitializeClientApplication);
        this.eventHandler.emitEvent(EventType.INITIALIZE_START);
        if (allowNativeBroker) {
            try {
                this.nativeExtensionProvider =
                    await NativeMessageHandler.createProvider(this.logger, this.config.system.nativeBrokerHandshakeTimeout, this.performanceClient, this.browserCrypto);
            }
            catch (e) {
                this.logger.verbose(e);
            }
        }
        this.initialized = true;
        this.eventHandler.emitEvent(EventType.INITIALIZE_END);
        initMeasurement.end({ allowNativeBroker, success: true });
    }
    // #region Redirect Flow
    /**
     * Event handler function which allows users to fire events after the PublicClientApplication object
     * has loaded during redirect flows. This should be invoked on all page loads involved in redirect
     * auth flows.
     * @param hash Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.
     * @returns Token response or null. If the return value is null, then no auth redirect was detected.
     */
    async handleRedirectPromise(hash) {
        this.logger.verbose("handleRedirectPromise called");
        // Block token acquisition before initialize has been called
        BrowserUtils.blockAPICallsBeforeInitialize(this.initialized);
        let foundServerResponse = hash;
        if (this.config.auth.OIDCOptions?.serverResponseType ===
            ServerResponseType.QUERY) {
            const url = window.location.href;
            foundServerResponse = UrlString.parseQueryServerResponse(url);
        }
        const loggedInAccounts = this.getAllAccounts();
        if (this.isBrowserEnvironment) {
            /**
             * Store the promise on the PublicClientApplication instance if this is the first invocation of handleRedirectPromise,
             * otherwise return the promise from the first invocation. Prevents race conditions when handleRedirectPromise is called
             * several times concurrently.
             */
            const redirectResponseKey = foundServerResponse || Constants.EMPTY_STRING;
            let response = this.redirectResponse.get(redirectResponseKey);
            if (typeof response === "undefined") {
                this.eventHandler.emitEvent(EventType.HANDLE_REDIRECT_START, exports.InteractionType.Redirect);
                this.logger.verbose("handleRedirectPromise has been called for the first time, storing the promise");
                const request = this.browserStorage.getCachedNativeRequest();
                let redirectResponse;
                if (request &&
                    NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeExtensionProvider) &&
                    this.nativeExtensionProvider &&
                    !foundServerResponse) {
                    this.logger.trace("handleRedirectPromise - acquiring token from native platform");
                    const nativeClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.handleRedirectPromise, this.performanceClient, this.nativeExtensionProvider, request.accountId, this.nativeInternalStorage, request.correlationId);
                    redirectResponse = nativeClient.handleRedirectPromise();
                }
                else {
                    this.logger.trace("handleRedirectPromise - acquiring token from web flow");
                    const correlationId = this.browserStorage.getTemporaryCache(TemporaryCacheKeys.CORRELATION_ID, true) || Constants.EMPTY_STRING;
                    const redirectClient = this.createRedirectClient(correlationId);
                    redirectResponse =
                        redirectClient.handleRedirectPromise(foundServerResponse);
                }
                response = redirectResponse
                    .then((result) => {
                    if (result) {
                        // Emit login event if number of accounts change
                        const isLoggingIn = loggedInAccounts.length <
                            this.getAllAccounts().length;
                        if (isLoggingIn) {
                            this.eventHandler.emitEvent(EventType.LOGIN_SUCCESS, exports.InteractionType.Redirect, result);
                            this.logger.verbose("handleRedirectResponse returned result, login success");
                        }
                        else {
                            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_SUCCESS, exports.InteractionType.Redirect, result);
                            this.logger.verbose("handleRedirectResponse returned result, acquire token success");
                        }
                    }
                    this.eventHandler.emitEvent(EventType.HANDLE_REDIRECT_END, exports.InteractionType.Redirect);
                    return result;
                })
                    .catch((e) => {
                    // Emit login event if there is an account
                    if (loggedInAccounts.length > 0) {
                        this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_FAILURE, exports.InteractionType.Redirect, null, e);
                    }
                    else {
                        this.eventHandler.emitEvent(EventType.LOGIN_FAILURE, exports.InteractionType.Redirect, null, e);
                    }
                    this.eventHandler.emitEvent(EventType.HANDLE_REDIRECT_END, exports.InteractionType.Redirect);
                    throw e;
                });
                this.redirectResponse.set(redirectResponseKey, response);
            }
            else {
                this.logger.verbose("handleRedirectPromise has been called previously, returning the result from the first call");
            }
            return response;
        }
        this.logger.verbose("handleRedirectPromise returns null, not browser environment");
        return null;
    }
    /**
     * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
     * the page, so any code that follows this function will not execute.
     *
     * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
     * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
     *
     * @param request
     */
    async acquireTokenRedirect(request) {
        // Preflight request
        const correlationId = this.getRequestCorrelationId(request);
        this.logger.verbose("acquireTokenRedirect called", correlationId);
        this.preflightBrowserEnvironmentCheck(exports.InteractionType.Redirect);
        // If logged in, emit acquire token events
        const isLoggedIn = this.getAllAccounts().length > 0;
        if (isLoggedIn) {
            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_START, exports.InteractionType.Redirect, request);
        }
        else {
            this.eventHandler.emitEvent(EventType.LOGIN_START, exports.InteractionType.Redirect, request);
        }
        let result;
        if (this.nativeExtensionProvider && this.canUseNative(request)) {
            const nativeClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.acquireTokenRedirect, this.performanceClient, this.nativeExtensionProvider, this.getNativeAccountId(request), this.nativeInternalStorage, request.correlationId);
            result = nativeClient
                .acquireTokenRedirect(request)
                .catch((e) => {
                if (e instanceof NativeAuthError && e.isFatal()) {
                    this.nativeExtensionProvider = undefined; // If extension gets uninstalled during session prevent future requests from continuing to attempt
                    const redirectClient = this.createRedirectClient(request.correlationId);
                    return redirectClient.acquireToken(request);
                }
                else if (e instanceof InteractionRequiredAuthError) {
                    this.logger.verbose("acquireTokenRedirect - Resolving interaction required error thrown by native broker by falling back to web flow");
                    const redirectClient = this.createRedirectClient(request.correlationId);
                    return redirectClient.acquireToken(request);
                }
                this.browserStorage.setInteractionInProgress(false);
                throw e;
            });
        }
        else {
            const redirectClient = this.createRedirectClient(request.correlationId);
            result = redirectClient.acquireToken(request);
        }
        return result.catch((e) => {
            // If logged in, emit acquire token events
            if (isLoggedIn) {
                this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_FAILURE, exports.InteractionType.Redirect, null, e);
            }
            else {
                this.eventHandler.emitEvent(EventType.LOGIN_FAILURE, exports.InteractionType.Redirect, null, e);
            }
            throw e;
        });
    }
    // #endregion
    // #region Popup Flow
    /**
     * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
     *
     * @param request
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    acquireTokenPopup(request) {
        const correlationId = this.getRequestCorrelationId(request);
        const atPopupMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.AcquireTokenPopup, correlationId);
        try {
            this.logger.verbose("acquireTokenPopup called", correlationId);
            this.preflightBrowserEnvironmentCheck(exports.InteractionType.Popup);
        }
        catch (e) {
            // Since this function is syncronous we need to reject
            return Promise.reject(e);
        }
        // If logged in, emit acquire token events
        const loggedInAccounts = this.getAllAccounts();
        if (loggedInAccounts.length > 0) {
            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_START, exports.InteractionType.Popup, request);
        }
        else {
            this.eventHandler.emitEvent(EventType.LOGIN_START, exports.InteractionType.Popup, request);
        }
        let result;
        if (this.canUseNative(request)) {
            result = this.acquireTokenNative(request, ApiId.acquireTokenPopup)
                .then((response) => {
                this.browserStorage.setInteractionInProgress(false);
                atPopupMeasurement.end({
                    success: true,
                    isNativeBroker: true,
                    requestId: response.requestId,
                });
                return response;
            })
                .catch((e) => {
                if (e instanceof NativeAuthError && e.isFatal()) {
                    this.nativeExtensionProvider = undefined; // If extension gets uninstalled during session prevent future requests from continuing to attempt
                    const popupClient = this.createPopupClient(request.correlationId);
                    return popupClient.acquireToken(request);
                }
                else if (e instanceof InteractionRequiredAuthError) {
                    this.logger.verbose("acquireTokenPopup - Resolving interaction required error thrown by native broker by falling back to web flow");
                    const popupClient = this.createPopupClient(request.correlationId);
                    return popupClient.acquireToken(request);
                }
                this.browserStorage.setInteractionInProgress(false);
                throw e;
            });
        }
        else {
            const popupClient = this.createPopupClient(request.correlationId);
            result = popupClient.acquireToken(request);
        }
        return result
            .then((result) => {
            /*
             *  If logged in, emit acquire token events
             */
            const isLoggingIn = loggedInAccounts.length < this.getAllAccounts().length;
            if (isLoggingIn) {
                this.eventHandler.emitEvent(EventType.LOGIN_SUCCESS, exports.InteractionType.Popup, result);
            }
            else {
                this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_SUCCESS, exports.InteractionType.Popup, result);
            }
            atPopupMeasurement.add({
                accessTokenSize: result.accessToken.length,
                idTokenSize: result.idToken.length,
            });
            atPopupMeasurement.end({
                success: true,
                requestId: result.requestId,
            });
            return result;
        })
            .catch((e) => {
            if (loggedInAccounts.length > 0) {
                this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_FAILURE, exports.InteractionType.Popup, null, e);
            }
            else {
                this.eventHandler.emitEvent(EventType.LOGIN_FAILURE, exports.InteractionType.Popup, null, e);
            }
            atPopupMeasurement.end({
                errorCode: e.errorCode,
                subErrorCode: e.subError,
                success: false,
            });
            // Since this function is syncronous we need to reject
            return Promise.reject(e);
        });
    }
    trackPageVisibilityWithMeasurement() {
        const measurement = this.ssoSilentMeasurement ||
            this.acquireTokenByCodeAsyncMeasurement;
        if (!measurement) {
            return;
        }
        this.logger.info("Perf: Visibility change detected in ", measurement.event.name);
        measurement.increment({
            visibilityChangeCount: 1,
        });
    }
    // #endregion
    // #region Silent Flow
    /**
     * This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
     * - Any browser using a form of Intelligent Tracking Prevention
     * - If there is not an established session with the service
     *
     * In these cases, the request must be done inside a popup or full frame redirect.
     *
     * For the cases where interaction is required, you cannot send a request with prompt=none.
     *
     * If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
     * you session on the server still exists.
     * @param request {@link SsoSilentRequest}
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    async ssoSilent(request) {
        const correlationId = this.getRequestCorrelationId(request);
        const validRequest = {
            ...request,
            // will be PromptValue.NONE or PromptValue.NO_SESSION
            prompt: request.prompt,
            correlationId: correlationId,
        };
        this.preflightBrowserEnvironmentCheck(exports.InteractionType.Silent);
        this.ssoSilentMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.SsoSilent, correlationId);
        this.ssoSilentMeasurement?.increment({
            visibilityChangeCount: 0,
        });
        document.addEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
        this.logger.verbose("ssoSilent called", correlationId);
        this.eventHandler.emitEvent(EventType.SSO_SILENT_START, exports.InteractionType.Silent, validRequest);
        let result;
        if (this.canUseNative(validRequest)) {
            result = this.acquireTokenNative(validRequest, ApiId.ssoSilent).catch((e) => {
                // If native token acquisition fails for availability reasons fallback to standard flow
                if (e instanceof NativeAuthError && e.isFatal()) {
                    this.nativeExtensionProvider = undefined; // If extension gets uninstalled during session prevent future requests from continuing to attempt
                    const silentIframeClient = this.createSilentIframeClient(validRequest.correlationId);
                    return silentIframeClient.acquireToken(validRequest);
                }
                throw e;
            });
        }
        else {
            const silentIframeClient = this.createSilentIframeClient(validRequest.correlationId);
            result = silentIframeClient.acquireToken(validRequest);
        }
        return result
            .then((response) => {
            this.eventHandler.emitEvent(EventType.SSO_SILENT_SUCCESS, exports.InteractionType.Silent, response);
            this.ssoSilentMeasurement?.add({
                accessTokenSize: response.accessToken.length,
                idTokenSize: response.idToken.length,
            });
            this.ssoSilentMeasurement?.end({
                success: true,
                isNativeBroker: response.fromNativeBroker,
                requestId: response.requestId,
            });
            return response;
        })
            .catch((e) => {
            this.eventHandler.emitEvent(EventType.SSO_SILENT_FAILURE, exports.InteractionType.Silent, null, e);
            this.ssoSilentMeasurement?.end({
                errorCode: e.errorCode,
                subErrorCode: e.subError,
                success: false,
            });
            throw e;
        })
            .finally(() => {
            document.removeEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
        });
    }
    /**
     * This function redeems an authorization code (passed as code) from the eSTS token endpoint.
     * This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
     * This API is not indended for normal authorization code acquisition and redemption.
     *
     * Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
     *
     * @param request {@link AuthorizationCodeRequest}
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    async acquireTokenByCode(request) {
        const correlationId = this.getRequestCorrelationId(request);
        this.preflightBrowserEnvironmentCheck(exports.InteractionType.Silent);
        this.logger.trace("acquireTokenByCode called", correlationId);
        this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_BY_CODE_START, exports.InteractionType.Silent, request);
        const atbcMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.AcquireTokenByCode, request.correlationId);
        try {
            if (request.code && request.nativeAccountId) {
                // Throw error in case server returns both spa_code and spa_accountid in exchange for auth code.
                throw BrowserAuthError.createSpaCodeAndNativeAccountIdPresentError();
            }
            else if (request.code) {
                const hybridAuthCode = request.code;
                let response = this.hybridAuthCodeResponses.get(hybridAuthCode);
                if (!response) {
                    this.logger.verbose("Initiating new acquireTokenByCode request", correlationId);
                    response = this.acquireTokenByCodeAsync({
                        ...request,
                        correlationId,
                    })
                        .then((result) => {
                        this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_BY_CODE_SUCCESS, exports.InteractionType.Silent, result);
                        this.hybridAuthCodeResponses.delete(hybridAuthCode);
                        atbcMeasurement.add({
                            accessTokenSize: result.accessToken.length,
                            idTokenSize: result.idToken.length,
                        });
                        atbcMeasurement.end({
                            success: true,
                            isNativeBroker: result.fromNativeBroker,
                            requestId: result.requestId,
                        });
                        return result;
                    })
                        .catch((error) => {
                        this.hybridAuthCodeResponses.delete(hybridAuthCode);
                        this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_BY_CODE_FAILURE, exports.InteractionType.Silent, null, error);
                        atbcMeasurement.end({
                            errorCode: error.errorCode,
                            subErrorCode: error.subError,
                            success: false,
                        });
                        throw error;
                    });
                    this.hybridAuthCodeResponses.set(hybridAuthCode, response);
                }
                else {
                    this.logger.verbose("Existing acquireTokenByCode request found", request.correlationId);
                    atbcMeasurement.discard();
                }
                return response;
            }
            else if (request.nativeAccountId) {
                if (this.canUseNative(request, request.nativeAccountId)) {
                    return this.acquireTokenNative(request, ApiId.acquireTokenByCode, request.nativeAccountId).catch((e) => {
                        // If native token acquisition fails for availability reasons fallback to standard flow
                        if (e instanceof NativeAuthError && e.isFatal()) {
                            this.nativeExtensionProvider = undefined; // If extension gets uninstalled during session prevent future requests from continuing to attempt
                        }
                        throw e;
                    });
                }
                else {
                    throw BrowserAuthError.createUnableToAcquireTokenFromNativePlatformError();
                }
            }
            else {
                throw BrowserAuthError.createAuthCodeOrNativeAccountIdRequiredError();
            }
        }
        catch (e) {
            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_BY_CODE_FAILURE, exports.InteractionType.Silent, null, e);
            atbcMeasurement.end({
                errorCode: (e instanceof AuthError && e.errorCode) || undefined,
                subErrorCode: (e instanceof AuthError && e.subError) || undefined,
                success: false,
            });
            throw e;
        }
    }
    /**
     * Creates a SilentAuthCodeClient to redeem an authorization code.
     * @param request
     * @returns Result of the operation to redeem the authorization code
     */
    async acquireTokenByCodeAsync(request) {
        this.logger.trace("acquireTokenByCodeAsync called", request.correlationId);
        this.acquireTokenByCodeAsyncMeasurement =
            this.performanceClient.startMeasurement(PerformanceEvents.AcquireTokenByCodeAsync, request.correlationId);
        this.acquireTokenByCodeAsyncMeasurement?.increment({
            visibilityChangeCount: 0,
        });
        document.addEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
        const silentAuthCodeClient = this.createSilentAuthCodeClient(request.correlationId);
        const silentTokenResult = await silentAuthCodeClient
            .acquireToken(request)
            .then((response) => {
            this.acquireTokenByCodeAsyncMeasurement?.end({
                success: true,
                fromCache: response.fromCache,
                isNativeBroker: response.fromNativeBroker,
                requestId: response.requestId,
            });
            return response;
        })
            .catch((tokenRenewalError) => {
            this.acquireTokenByCodeAsyncMeasurement?.end({
                errorCode: tokenRenewalError.errorCode,
                subErrorCode: tokenRenewalError.subError,
                success: false,
            });
            throw tokenRenewalError;
        })
            .finally(() => {
            document.removeEventListener("visibilitychange", this.trackPageVisibilityWithMeasurement);
        });
        return silentTokenResult;
    }
    /**
     * Attempt to acquire an access token from the cache
     * @param silentCacheClient SilentCacheClient
     * @param commonRequest CommonSilentFlowRequest
     * @param silentRequest SilentRequest
     * @returns A promise that, when resolved, returns the access token
     */
    async acquireTokenFromCache(silentCacheClient, commonRequest, silentRequest) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.AcquireTokenFromCache, commonRequest.correlationId);
        switch (silentRequest.cacheLookupPolicy) {
            case CacheLookupPolicy.Default:
            case CacheLookupPolicy.AccessToken:
            case CacheLookupPolicy.AccessTokenAndRefreshToken:
                return silentCacheClient.acquireToken(commonRequest);
            default:
                throw ClientAuthError.createRefreshRequiredError();
        }
    }
    /**
     * Attempt to acquire an access token via a refresh token
     * @param commonRequest CommonSilentFlowRequest
     * @param silentRequest SilentRequest
     * @returns A promise that, when resolved, returns the access token
     */
    async acquireTokenByRefreshToken(commonRequest, silentRequest) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.AcquireTokenByRefreshToken, commonRequest.correlationId);
        switch (silentRequest.cacheLookupPolicy) {
            case CacheLookupPolicy.Default:
            case CacheLookupPolicy.AccessTokenAndRefreshToken:
            case CacheLookupPolicy.RefreshToken:
            case CacheLookupPolicy.RefreshTokenAndNetwork:
                const silentRefreshClient = this.createSilentRefreshClient(commonRequest.correlationId);
                this.performanceClient.setPreQueueTime(PerformanceEvents.SilentRefreshClientAcquireToken, commonRequest.correlationId);
                return silentRefreshClient.acquireToken(commonRequest);
            default:
                throw ClientAuthError.createRefreshRequiredError();
        }
    }
    /**
     * Attempt to acquire an access token via an iframe
     * @param request CommonSilentFlowRequest
     * @returns A promise that, when resolved, returns the access token
     */
    async acquireTokenBySilentIframe(request) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.AcquireTokenBySilentIframe, request.correlationId);
        const silentIframeClient = this.createSilentIframeClient(request.correlationId);
        this.performanceClient.setPreQueueTime(PerformanceEvents.SilentIframeClientAcquireToken, request.correlationId);
        return silentIframeClient.acquireToken(request);
    }
    // #endregion
    // #region Logout
    /**
     * Deprecated logout function. Use logoutRedirect or logoutPopup instead
     * @param logoutRequest
     * @deprecated
     */
    async logout(logoutRequest) {
        const correlationId = this.getRequestCorrelationId(logoutRequest);
        this.logger.warning("logout API is deprecated and will be removed in msal-browser v3.0.0. Use logoutRedirect instead.", correlationId);
        return this.logoutRedirect({
            correlationId,
            ...logoutRequest,
        });
    }
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    async logoutRedirect(logoutRequest) {
        const correlationId = this.getRequestCorrelationId(logoutRequest);
        this.preflightBrowserEnvironmentCheck(exports.InteractionType.Redirect);
        const redirectClient = this.createRedirectClient(correlationId);
        return redirectClient.logout(logoutRequest);
    }
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logoutPopup(logoutRequest) {
        try {
            const correlationId = this.getRequestCorrelationId(logoutRequest);
            this.preflightBrowserEnvironmentCheck(exports.InteractionType.Popup);
            const popupClient = this.createPopupClient(correlationId);
            return popupClient.logout(logoutRequest);
        }
        catch (e) {
            // Since this function is syncronous we need to reject
            return Promise.reject(e);
        }
    }
    // #endregion
    // #region Account APIs
    /**
     * Returns all accounts that MSAL currently has data for.
     * (the account object is created at the time of successful login)
     * or empty array when no accounts are found
     * @returns Array of account objects in cache
     */
    getAllAccounts() {
        this.logger.verbose("getAllAccounts called");
        return this.isBrowserEnvironment
            ? this.browserStorage.getAllAccounts()
            : [];
    }
    /**
     * Returns the signed in account matching username.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found.
     * This API is provided for convenience but getAccountById should be used for best reliability
     * @param username
     * @returns The account object stored in MSAL
     */
    getAccountByUsername(username) {
        this.logger.trace("getAccountByUsername called");
        if (!username) {
            this.logger.warning("getAccountByUsername: No username provided");
            return null;
        }
        const account = this.browserStorage.getAccountInfoFilteredBy({
            username,
        });
        if (account) {
            this.logger.verbose("getAccountByUsername: Account matching username found, returning");
            this.logger.verbosePii(`getAccountByUsername: Returning signed-in accounts matching username: ${username}`);
            return account;
        }
        else {
            this.logger.verbose("getAccountByUsername: No matching account found, returning null");
            return null;
        }
    }
    /**
     * Returns the signed in account matching homeAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param homeAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByHomeId(homeAccountId) {
        this.logger.trace("getAccountByHomeId called");
        if (!homeAccountId) {
            this.logger.warning("getAccountByHomeId: No homeAccountId provided");
            return null;
        }
        const account = this.browserStorage.getAccountInfoFilteredBy({
            homeAccountId,
        });
        if (account) {
            this.logger.verbose("getAccountByHomeId: Account matching homeAccountId found, returning");
            this.logger.verbosePii(`getAccountByHomeId: Returning signed-in accounts matching homeAccountId: ${homeAccountId}`);
            return account;
        }
        else {
            this.logger.verbose("getAccountByHomeId: No matching account found, returning null");
            return null;
        }
    }
    /**
     * Returns the signed in account matching localAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param localAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByLocalId(localAccountId) {
        this.logger.trace("getAccountByLocalId called");
        if (!localAccountId) {
            this.logger.warning("getAccountByLocalId: No localAccountId provided");
            return null;
        }
        const account = this.browserStorage.getAccountInfoFilteredBy({
            localAccountId,
        });
        if (account) {
            this.logger.verbose("getAccountByLocalId: Account matching localAccountId found, returning");
            this.logger.verbosePii(`getAccountByLocalId: Returning signed-in accounts matching localAccountId: ${localAccountId}`);
            return account;
        }
        else {
            this.logger.verbose("getAccountByLocalId: No matching account found, returning null");
            return null;
        }
    }
    /**
     * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
     * @param account
     */
    setActiveAccount(account) {
        this.browserStorage.setActiveAccount(account);
    }
    /**
     * Gets the currently active account
     */
    getActiveAccount() {
        return this.browserStorage.getActiveAccount();
    }
    // #endregion
    /**
     * Hydrates the cache with the tokens from an AuthenticationResult
     * @param result
     * @param request
     * @returns
     */
    async hydrateCache(result, request) {
        this.logger.verbose("hydrateCache called");
        // Account gets saved to browser storage regardless of native or not
        const accountEntity = AccountEntity.createFromAccountInfo(result.account, result.cloudGraphHostName, result.msGraphHost);
        this.browserStorage.setAccount(accountEntity);
        if (result.fromNativeBroker) {
            this.logger.verbose("Response was from native broker, storing in-memory");
            // Tokens from native broker are stored in-memory
            return this.nativeInternalStorage.hydrateCache(result, request);
        }
        else {
            return this.browserStorage.hydrateCache(result, request);
        }
    }
    // #region Helpers
    /**
     * Helper to validate app environment before making an auth request
     *
     * @protected
     * @param {InteractionType} interactionType What kind of interaction is being used
     * @param {boolean} [isAppEmbedded=false] Whether to set interaction in progress temp cache flag
     */
    preflightBrowserEnvironmentCheck(interactionType, isAppEmbedded = false) {
        this.logger.verbose("preflightBrowserEnvironmentCheck started");
        // Block request if not in browser environment
        BrowserUtils.blockNonBrowserEnvironment(this.isBrowserEnvironment);
        // Block redirects if in an iframe
        BrowserUtils.blockRedirectInIframe(interactionType, this.config.system.allowRedirectInIframe);
        // Block auth requests inside a hidden iframe
        BrowserUtils.blockReloadInHiddenIframes();
        // Block redirectUri opened in a popup from calling MSAL APIs
        BrowserUtils.blockAcquireTokenInPopups();
        // Block token acquisition before initialize has been called
        BrowserUtils.blockAPICallsBeforeInitialize(this.initialized);
        // Block redirects if memory storage is enabled but storeAuthStateInCookie is not
        if (interactionType === exports.InteractionType.Redirect &&
            this.config.cache.cacheLocation ===
                BrowserCacheLocation.MemoryStorage &&
            !this.config.cache.storeAuthStateInCookie) {
            throw BrowserConfigurationAuthError.createInMemoryRedirectUnavailableError();
        }
        if (interactionType === exports.InteractionType.Redirect ||
            interactionType === exports.InteractionType.Popup) {
            this.preflightInteractiveRequest(!isAppEmbedded);
        }
    }
    /**
     * Preflight check for interactive requests
     *
     * @protected
     * @param {boolean} setInteractionInProgress Whether to set interaction in progress temp cache flag
     */
    preflightInteractiveRequest(setInteractionInProgress) {
        this.logger.verbose("preflightInteractiveRequest called, validating app environment");
        // block the reload if it occurred inside a hidden iframe
        BrowserUtils.blockReloadInHiddenIframes();
        // Set interaction in progress temporary cache or throw if alread set.
        if (setInteractionInProgress) {
            this.browserStorage.setInteractionInProgress(true);
        }
    }
    /**
     * Acquire a token from native device (e.g. WAM)
     * @param request
     */
    async acquireTokenNative(request, apiId, accountId) {
        this.logger.trace("acquireTokenNative called");
        if (!this.nativeExtensionProvider) {
            throw BrowserAuthError.createNativeConnectionNotEstablishedError();
        }
        const nativeClient = new NativeInteractionClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, apiId, this.performanceClient, this.nativeExtensionProvider, accountId || this.getNativeAccountId(request), this.nativeInternalStorage, request.correlationId);
        return nativeClient.acquireToken(request);
    }
    /**
     * Returns boolean indicating if this request can use the native broker
     * @param request
     */
    canUseNative(request, accountId) {
        this.logger.trace("canUseNative called");
        if (!NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeExtensionProvider, request.authenticationScheme)) {
            this.logger.trace("canUseNative: isNativeAvailable returned false, returning false");
            return false;
        }
        if (request.prompt) {
            switch (request.prompt) {
                case PromptValue.NONE:
                case PromptValue.CONSENT:
                case PromptValue.LOGIN:
                    this.logger.trace("canUseNative: prompt is compatible with native flow");
                    break;
                default:
                    this.logger.trace(`canUseNative: prompt = ${request.prompt} is not compatible with native flow, returning false`);
                    return false;
            }
        }
        if (!accountId && !this.getNativeAccountId(request)) {
            this.logger.trace("canUseNative: nativeAccountId is not available, returning false");
            return false;
        }
        return true;
    }
    /**
     * Get the native accountId from the account
     * @param request
     * @returns
     */
    getNativeAccountId(request) {
        const account = request.account ||
            this.browserStorage.getAccountInfoByHints(request.loginHint, request.sid) ||
            this.getActiveAccount();
        return (account && account.nativeAccountId) || "";
    }
    /**
     * Returns new instance of the Popup Interaction Client
     * @param correlationId
     */
    createPopupClient(correlationId) {
        return new PopupClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Returns new instance of the Redirect Interaction Client
     * @param correlationId
     */
    createRedirectClient(correlationId) {
        return new RedirectClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeInternalStorage, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Returns new instance of the Silent Iframe Interaction Client
     * @param correlationId
     */
    createSilentIframeClient(correlationId) {
        return new SilentIframeClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.ssoSilent, this.performanceClient, this.nativeInternalStorage, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Returns new instance of the Silent Cache Interaction Client
     */
    createSilentCacheClient(correlationId) {
        return new SilentCacheClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Returns new instance of the Silent Refresh Interaction Client
     */
    createSilentRefreshClient(correlationId) {
        return new SilentRefreshClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, this.performanceClient, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Returns new instance of the Silent AuthCode Interaction Client
     */
    createSilentAuthCodeClient(correlationId) {
        return new SilentAuthCodeClient(this.config, this.browserStorage, this.browserCrypto, this.logger, this.eventHandler, this.navigationClient, ApiId.acquireTokenByCode, this.performanceClient, this.nativeExtensionProvider, correlationId);
    }
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback) {
        return this.eventHandler.addEventCallback(callback);
    }
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId) {
        this.eventHandler.removeEventCallback(callbackId);
    }
    /**
     * Registers a callback to receive performance events.
     *
     * @param {PerformanceCallbackFunction} callback
     * @returns {string}
     */
    addPerformanceCallback(callback) {
        return this.performanceClient.addPerformanceCallback(callback);
    }
    /**
     * Removes a callback registered with addPerformanceCallback.
     *
     * @param {string} callbackId
     * @returns {boolean}
     */
    removePerformanceCallback(callbackId) {
        return this.performanceClient.removePerformanceCallback(callbackId);
    }
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents() {
        this.eventHandler.enableAccountStorageEvents();
    }
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents() {
        this.eventHandler.disableAccountStorageEvents();
    }
    /**
     * Gets the token cache for the application.
     */
    getTokenCache() {
        return this.tokenCache;
    }
    /**
     * Returns the logger instance
     */
    getLogger() {
        return this.logger;
    }
    /**
     * Replaces the default logger set in configurations with new Logger with new configurations
     * @param logger Logger instance
     */
    setLogger(logger) {
        this.logger = logger;
    }
    /**
     * Called by wrapper libraries (Angular & React) to set SKU and Version passed down to telemetry, logger, etc.
     * @param sku
     * @param version
     */
    initializeWrapperLibrary(sku, version) {
        // Validate the SKU passed in is one we expect
        this.browserStorage.setWrapperMetadata(sku, version);
    }
    /**
     * Sets navigation client
     * @param navigationClient
     */
    setNavigationClient(navigationClient) {
        this.navigationClient = navigationClient;
    }
    /**
     * Returns the configuration object
     */
    getConfiguration() {
        return this.config;
    }
    /**
     * Returns the performance client
     */
    getPerformanceClient() {
        return this.performanceClient;
    }
    /**
     * Returns the browser storage
     */
    getBrowserStorage() {
        return this.browserStorage;
    }
    /**
     * Returns the native internal storage
     */
    getNativeInternalStorage() {
        return this.nativeInternalStorage;
    }
    /**
     * Returns the instance of interface for crypto functions
     */
    getBrowserCrypto() {
        return this.browserCrypto;
    }
    /**
     * Returns the browser env indicator
     */
    isBrowserEnv() {
        return this.isBrowserEnvironment;
    }
    /**
     * Returns the native message handler
     */
    getNativeExtensionProvider() {
        return this.nativeExtensionProvider;
    }
    /**
     * Sets the native message handler
     * @param provider {?NativeMessageHandler}
     */
    setNativeExtensionProvider(provider) {
        this.nativeExtensionProvider = provider;
    }
    /**
     * Returns the event handler
     */
    getEventHandler() {
        return this.eventHandler;
    }
    /**
     * Returns the navigation client
     */
    getNavigationClient() {
        return this.navigationClient;
    }
    /**
     * Returns the redirect response map
     */
    getRedirectResponse() {
        return this.redirectResponse;
    }
    /**
     * Generates a correlation id for a request if none is provided.
     *
     * @protected
     * @param {?Partial<BaseAuthRequest>} [request]
     * @returns {string}
     */
    getRequestCorrelationId(request) {
        if (request?.correlationId) {
            return request.correlationId;
        }
        if (this.isBrowserEnvironment) {
            return this.browserCrypto.createNewGuid();
        }
        /*
         * Included for fallback for non-browser environments,
         * and to ensure this method always returns a string.
         */
        return Constants.EMPTY_STRING;
    }
    // #endregion
    /**
     * Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
     * any code that follows this function will not execute.
     *
     * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
     * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
     *
     * @param request
     */
    async loginRedirect(request) {
        const correlationId = this.getRequestCorrelationId(request);
        this.logger.verbose("loginRedirect called", correlationId);
        return this.acquireTokenRedirect({
            correlationId,
            ...(request || DEFAULT_REQUEST),
        });
    }
    /**
     * Use when initiating the login process via opening a popup window in the user's browser
     *
     * @param request
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    loginPopup(request) {
        const correlationId = this.getRequestCorrelationId(request);
        this.logger.verbose("loginPopup called", correlationId);
        return this.acquireTokenPopup({
            correlationId,
            ...(request || DEFAULT_REQUEST),
        });
    }
    /**
     * Silently acquire an access token for a given set of scopes. Returns currently processing promise if parallel requests are made.
     *
     * @param {@link (SilentRequest:type)}
     * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    async acquireTokenSilent(request) {
        const correlationId = this.getRequestCorrelationId(request);
        const atsMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.AcquireTokenSilent, correlationId);
        atsMeasurement.add({
            cacheLookupPolicy: request.cacheLookupPolicy,
        });
        this.preflightBrowserEnvironmentCheck(exports.InteractionType.Silent);
        this.logger.verbose("acquireTokenSilent called", correlationId);
        const account = request.account || this.getActiveAccount();
        if (!account) {
            throw BrowserAuthError.createNoAccountError();
        }
        const thumbprint = {
            clientId: this.config.auth.clientId,
            authority: request.authority || Constants.EMPTY_STRING,
            scopes: request.scopes,
            homeAccountIdentifier: account.homeAccountId,
            claims: request.claims,
            authenticationScheme: request.authenticationScheme,
            resourceRequestMethod: request.resourceRequestMethod,
            resourceRequestUri: request.resourceRequestUri,
            shrClaims: request.shrClaims,
            sshKid: request.sshKid,
        };
        const silentRequestKey = JSON.stringify(thumbprint);
        const cachedResponse = this.activeSilentTokenRequests.get(silentRequestKey);
        if (typeof cachedResponse === "undefined") {
            this.logger.verbose("acquireTokenSilent called for the first time, storing active request", correlationId);
            this.performanceClient.setPreQueueTime(PerformanceEvents.AcquireTokenSilentAsync, correlationId);
            const response = this.acquireTokenSilentAsync({
                ...request,
                correlationId,
            }, account)
                .then((result) => {
                this.activeSilentTokenRequests.delete(silentRequestKey);
                atsMeasurement.add({
                    accessTokenSize: result.accessToken.length,
                    idTokenSize: result.idToken.length,
                });
                atsMeasurement.end({
                    success: true,
                    fromCache: result.fromCache,
                    isNativeBroker: result.fromNativeBroker,
                    cacheLookupPolicy: request.cacheLookupPolicy,
                    requestId: result.requestId,
                });
                return result;
            })
                .catch((error) => {
                this.activeSilentTokenRequests.delete(silentRequestKey);
                atsMeasurement.end({
                    errorCode: error.errorCode,
                    subErrorCode: error.subError,
                    success: false,
                });
                throw error;
            });
            this.activeSilentTokenRequests.set(silentRequestKey, response);
            return response;
        }
        else {
            this.logger.verbose("acquireTokenSilent has been called previously, returning the result from the first call", correlationId);
            // Discard measurements for memoized calls, as they are usually only a couple of ms and will artificially deflate metrics
            atsMeasurement.discard();
            return cachedResponse;
        }
    }
    /**
     * Silently acquire an access token for a given set of scopes. Will use cached token if available, otherwise will attempt to acquire a new token from the network via refresh token.
     * @param {@link (SilentRequest:type)}
     * @param {@link (AccountInfo:type)}
     * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse}
     */
    async acquireTokenSilentAsync(request, account) {
        this.performanceClient.addQueueMeasurement(PerformanceEvents.AcquireTokenSilentAsync, request.correlationId);
        this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_START, exports.InteractionType.Silent, request);
        this.atsAsyncMeasurement = this.performanceClient.startMeasurement(PerformanceEvents.AcquireTokenSilentAsync, request.correlationId);
        this.atsAsyncMeasurement?.increment({
            visibilityChangeCount: 0,
        });
        document.addEventListener("visibilitychange", this.trackPageVisibility);
        let result;
        if (NativeMessageHandler.isNativeAvailable(this.config, this.logger, this.nativeExtensionProvider, request.authenticationScheme) &&
            account.nativeAccountId) {
            this.logger.verbose("acquireTokenSilent - attempting to acquire token from native platform");
            const silentRequest = {
                ...request,
                account,
            };
            result = this.acquireTokenNative(silentRequest, ApiId.acquireTokenSilent_silentFlow).catch(async (e) => {
                // If native token acquisition fails for availability reasons fallback to web flow
                if (e instanceof NativeAuthError && e.isFatal()) {
                    this.logger.verbose("acquireTokenSilent - native platform unavailable, falling back to web flow");
                    this.nativeExtensionProvider = undefined; // Prevent future requests from continuing to attempt
                    // Cache will not contain tokens, given that previous WAM requests succeeded. Skip cache and RT renewal and go straight to iframe renewal
                    const silentIframeClient = this.createSilentIframeClient(request.correlationId);
                    return silentIframeClient.acquireToken(request);
                }
                throw e;
            });
        }
        else {
            this.logger.verbose("acquireTokenSilent - attempting to acquire token from web flow");
            const silentCacheClient = this.createSilentCacheClient(request.correlationId);
            this.performanceClient.setPreQueueTime(PerformanceEvents.InitializeSilentRequest, request.correlationId);
            const silentRequest = await silentCacheClient.initializeSilentRequest(request, account);
            const requestWithCLP = {
                ...request,
                // set the request's CacheLookupPolicy to Default if it was not optionally passed in
                cacheLookupPolicy: request.cacheLookupPolicy || CacheLookupPolicy.Default,
            };
            this.performanceClient.setPreQueueTime(PerformanceEvents.AcquireTokenFromCache, silentRequest.correlationId);
            result = this.acquireTokenFromCache(silentCacheClient, silentRequest, requestWithCLP).catch((cacheError) => {
                if (requestWithCLP.cacheLookupPolicy ===
                    CacheLookupPolicy.AccessToken) {
                    throw cacheError;
                }
                // block the reload if it occurred inside a hidden iframe
                BrowserUtils.blockReloadInHiddenIframes();
                this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_NETWORK_START, exports.InteractionType.Silent, silentRequest);
                this.performanceClient.setPreQueueTime(PerformanceEvents.AcquireTokenByRefreshToken, silentRequest.correlationId);
                return this.acquireTokenByRefreshToken(silentRequest, requestWithCLP).catch((refreshTokenError) => {
                    const isServerError = refreshTokenError instanceof ServerError;
                    const isInteractionRequiredError = refreshTokenError instanceof
                        InteractionRequiredAuthError;
                    const isInvalidGrantError = refreshTokenError.errorCode ===
                        BrowserConstants.INVALID_GRANT_ERROR;
                    if ((!isServerError ||
                        !isInvalidGrantError ||
                        isInteractionRequiredError ||
                        requestWithCLP.cacheLookupPolicy ===
                            CacheLookupPolicy.AccessTokenAndRefreshToken ||
                        requestWithCLP.cacheLookupPolicy ===
                            CacheLookupPolicy.RefreshToken) &&
                        requestWithCLP.cacheLookupPolicy !==
                            CacheLookupPolicy.Skip) {
                        throw refreshTokenError;
                    }
                    this.logger.verbose("Refresh token expired/invalid or CacheLookupPolicy is set to Skip, attempting acquire token by iframe.", request.correlationId);
                    this.performanceClient.setPreQueueTime(PerformanceEvents.AcquireTokenBySilentIframe, silentRequest.correlationId);
                    return this.acquireTokenBySilentIframe(silentRequest);
                });
            });
        }
        return result
            .then((response) => {
            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_SUCCESS, exports.InteractionType.Silent, response);
            this.atsAsyncMeasurement?.end({
                success: true,
                fromCache: response.fromCache,
                isNativeBroker: response.fromNativeBroker,
                requestId: response.requestId,
            });
            return response;
        })
            .catch((tokenRenewalError) => {
            this.eventHandler.emitEvent(EventType.ACQUIRE_TOKEN_FAILURE, exports.InteractionType.Silent, null, tokenRenewalError);
            this.atsAsyncMeasurement?.end({
                errorCode: tokenRenewalError.errorCode,
                subErrorCode: tokenRenewalError.subError,
                success: false,
            });
            throw tokenRenewalError;
        })
            .finally(() => {
            document.removeEventListener("visibilitychange", this.trackPageVisibility);
        });
    }
}

var StandardController$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    StandardController: StandardController
});

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * The PublicClientApplication class is the object exposed by the library to perform authentication and authorization functions in Single Page Applications
 * to obtain JWT tokens as described in the OAuth 2.0 Authorization Code Flow with PKCE specification.
 */
class PublicClientApplication {
    static async createPublicClientApplication(configuration) {
        const factory = new ControllerFactory(configuration);
        const controller = await factory.createController();
        const pca = new PublicClientApplication(configuration, controller);
        return pca;
    }
    /**
     * @constructor
     * Constructor for the PublicClientApplication used to instantiate the PublicClientApplication object
     *
     * Important attributes in the Configuration object for auth are:
     * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview
     * - authority: the authority URL for your application.
     * - redirect_uri: the uri of your application registered in the portal.
     *
     * In Azure AD, authority is a URL indicating the Azure active directory that MSAL uses to obtain tokens.
     * It is of the form https://login.microsoftonline.com/{Enter_the_Tenant_Info_Here}
     * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
     * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
     * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
     * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
     *
     * In Azure B2C, authority is of the form https://{instance}/tfp/{tenant}/{policyName}/
     * Full B2C functionality will be available in this library in future versions.
     *
     * @param configuration Object for the MSAL PublicClientApplication instance
     * @param IController Optional parameter to explictly set the controller. (Will be removed when we remove public constructor)
     */
    constructor(configuration, controller) {
        if (controller) {
            this.controller = controller;
        }
        else {
            const standardOperatingContext = new StandardOperatingContext(configuration);
            this.controller = new StandardController(standardOperatingContext);
        }
    }
    /**
     * Initializer function to perform async startup tasks such as connecting to WAM extension
     */
    async initialize() {
        return this.controller.initialize();
    }
    /**
     * Use when you want to obtain an access_token for your API via opening a popup window in the user's browser
     *
     * @param request
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    async acquireTokenPopup(request) {
        return this.controller.acquireTokenPopup(request);
    }
    /**
     * Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
     * the page, so any code that follows this function will not execute.
     *
     * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
     * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
     *
     * @param request
     */
    acquireTokenRedirect(request) {
        return this.controller.acquireTokenRedirect(request);
    }
    /**
     * Silently acquire an access token for a given set of scopes. Returns currently processing promise if parallel requests are made.
     *
     * @param {@link (SilentRequest:type)}
     * @returns {Promise.<AuthenticationResult>} - a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the {@link AuthResponse} object
     */
    acquireTokenSilent(silentRequest) {
        return this.controller.acquireTokenSilent(silentRequest);
    }
    /**
     * This function redeems an authorization code (passed as code) from the eSTS token endpoint.
     * This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
     * This API is not indended for normal authorization code acquisition and redemption.
     *
     * Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
     *
     * @param request {@link AuthorizationCodeRequest}
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    acquireTokenByCode(request) {
        return this.controller.acquireTokenByCode(request);
    }
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback) {
        return this.controller.addEventCallback(callback);
    }
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId) {
        return this.controller.removeEventCallback(callbackId);
    }
    /**
     * Registers a callback to receive performance events.
     *
     * @param {PerformanceCallbackFunction} callback
     * @returns {string}
     */
    addPerformanceCallback(callback) {
        return this.controller.addPerformanceCallback(callback);
    }
    /**
     * Removes a callback registered with addPerformanceCallback.
     *
     * @param {string} callbackId
     * @returns {boolean}
     */
    removePerformanceCallback(callbackId) {
        return this.controller.removePerformanceCallback(callbackId);
    }
    /**
     * Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    enableAccountStorageEvents() {
        this.controller.enableAccountStorageEvents();
    }
    /**
     * Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
     */
    disableAccountStorageEvents() {
        this.controller.disableAccountStorageEvents();
    }
    /**
     * Returns the signed in account matching homeAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param homeAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByHomeId(homeAccountId) {
        return this.controller.getAccountByHomeId(homeAccountId);
    }
    /**
     * Returns the signed in account matching localAccountId.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found
     * @param localAccountId
     * @returns The account object stored in MSAL
     */
    getAccountByLocalId(localId) {
        return this.controller.getAccountByLocalId(localId);
    }
    /**
     * Returns the signed in account matching username.
     * (the account object is created at the time of successful login)
     * or null when no matching account is found.
     * This API is provided for convenience but getAccountById should be used for best reliability
     * @param userName
     * @returns The account object stored in MSAL
     */
    getAccountByUsername(userName) {
        return this.controller.getAccountByUsername(userName);
    }
    /**
     * Returns all accounts that MSAL currently has data for.
     * (the account object is created at the time of successful login)
     * or empty array when no accounts are found
     * @returns Array of account objects in cache
     */
    getAllAccounts() {
        return this.controller.getAllAccounts();
    }
    /**
     * Event handler function which allows users to fire events after the PublicClientApplication object
     * has loaded during redirect flows. This should be invoked on all page loads involved in redirect
     * auth flows.
     * @param hash Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.
     * @returns Token response or null. If the return value is null, then no auth redirect was detected.
     */
    handleRedirectPromise(hash) {
        return this.controller.handleRedirectPromise(hash);
    }
    /**
     * Use when initiating the login process via opening a popup window in the user's browser
     *
     * @param request
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    loginPopup(request) {
        return this.controller.loginPopup(request);
    }
    /**
     * Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
     * any code that follows this function will not execute.
     *
     * IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
     * browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
     *
     * @param request
     */
    loginRedirect(request) {
        return this.controller.loginRedirect(request);
    }
    /**
     * Deprecated logout function. Use logoutRedirect or logoutPopup instead
     * @param logoutRequest
     * @deprecated
     */
    logout(logoutRequest) {
        return this.controller.logout(logoutRequest);
    }
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    logoutRedirect(logoutRequest) {
        return this.controller.logoutRedirect(logoutRequest);
    }
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logoutPopup(logoutRequest) {
        return this.controller.logoutPopup(logoutRequest);
    }
    /**
     * This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
     * - Any browser using a form of Intelligent Tracking Prevention
     * - If there is not an established session with the service
     *
     * In these cases, the request must be done inside a popup or full frame redirect.
     *
     * For the cases where interaction is required, you cannot send a request with prompt=none.
     *
     * If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
     * you session on the server still exists.
     * @param request {@link SsoSilentRequest}
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    ssoSilent(request) {
        return this.controller.ssoSilent(request);
    }
    /**
     * Gets the token cache for the application.
     */
    getTokenCache() {
        return this.controller.getTokenCache();
    }
    /**
     * Returns the logger instance
     */
    getLogger() {
        return this.controller.getLogger();
    }
    /**
     * Replaces the default logger set in configurations with new Logger with new configurations
     * @param logger Logger instance
     */
    setLogger(logger) {
        this.controller.setLogger(logger);
    }
    /**
     * Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.
     * @param account
     */
    setActiveAccount(account) {
        this.controller.setActiveAccount(account);
    }
    /**
     * Gets the currently active account
     */
    getActiveAccount() {
        return this.controller.getActiveAccount();
    }
    /**
     * Called by wrapper libraries (Angular & React) to set SKU and Version passed down to telemetry, logger, etc.
     * @param sku
     * @param version
     */
    initializeWrapperLibrary(sku, version) {
        return this.controller.initializeWrapperLibrary(sku, version);
    }
    /**
     * Sets navigation client
     * @param navigationClient
     */
    setNavigationClient(navigationClient) {
        this.controller.setNavigationClient(navigationClient);
    }
    /**
     * Returns the configuration object
     */
    getConfiguration() {
        return this.controller.getConfiguration();
    }
    /**
     * Hydrates cache with the tokens and account in the AuthenticationResult object
     * @param result
     * @param request - The request object that was used to obtain the AuthenticationResult
     * @returns
     */
    async hydrateCache(result, request) {
        return this.controller.hydrateCache(result, request);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const stubbedPublicClientApplication = {
    initialize: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    acquireTokenPopup: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    acquireTokenRedirect: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    acquireTokenSilent: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    acquireTokenByCode: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    getAllAccounts: () => {
        return [];
    },
    getAccountByHomeId: () => {
        return null;
    },
    getAccountByUsername: () => {
        return null;
    },
    getAccountByLocalId: () => {
        return null;
    },
    handleRedirectPromise: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    loginPopup: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    loginRedirect: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    logout: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    logoutRedirect: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    logoutPopup: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    ssoSilent: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
    addEventCallback: () => {
        return null;
    },
    removeEventCallback: () => {
        return;
    },
    addPerformanceCallback: () => {
        return "";
    },
    removePerformanceCallback: () => {
        return false;
    },
    enableAccountStorageEvents: () => {
        return;
    },
    disableAccountStorageEvents: () => {
        return;
    },
    getTokenCache: () => {
        throw BrowserConfigurationAuthError.createStubPcaInstanceCalledError();
    },
    getLogger: () => {
        throw BrowserConfigurationAuthError.createStubPcaInstanceCalledError();
    },
    setLogger: () => {
        return;
    },
    setActiveAccount: () => {
        return;
    },
    getActiveAccount: () => {
        return null;
    },
    initializeWrapperLibrary: () => {
        return;
    },
    setNavigationClient: () => {
        return;
    },
    getConfiguration: () => {
        throw BrowserConfigurationAuthError.createStubPcaInstanceCalledError();
    },
    hydrateCache: () => {
        return Promise.reject(BrowserConfigurationAuthError.createStubPcaInstanceCalledError());
    },
};

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class EventMessageUtils {
    /**
     * Gets interaction status from event message
     * @param message
     * @param currentStatus
     */
    static getInteractionStatusFromEvent(message, currentStatus) {
        switch (message.eventType) {
            case EventType.LOGIN_START:
                return InteractionStatus.Login;
            case EventType.SSO_SILENT_START:
                return InteractionStatus.SsoSilent;
            case EventType.ACQUIRE_TOKEN_START:
                if (message.interactionType === exports.InteractionType.Redirect ||
                    message.interactionType === exports.InteractionType.Popup) {
                    return InteractionStatus.AcquireToken;
                }
                break;
            case EventType.HANDLE_REDIRECT_START:
                return InteractionStatus.HandleRedirect;
            case EventType.LOGOUT_START:
                return InteractionStatus.Logout;
            case EventType.SSO_SILENT_SUCCESS:
            case EventType.SSO_SILENT_FAILURE:
                if (currentStatus &&
                    currentStatus !== InteractionStatus.SsoSilent) {
                    // Prevent this event from clearing any status other than ssoSilent
                    break;
                }
                return InteractionStatus.None;
            case EventType.LOGOUT_END:
                if (currentStatus &&
                    currentStatus !== InteractionStatus.Logout) {
                    // Prevent this event from clearing any status other than logout
                    break;
                }
                return InteractionStatus.None;
            case EventType.HANDLE_REDIRECT_END:
                if (currentStatus &&
                    currentStatus !== InteractionStatus.HandleRedirect) {
                    // Prevent this event from clearing any status other than handleRedirect
                    break;
                }
                return InteractionStatus.None;
            case EventType.LOGIN_SUCCESS:
            case EventType.LOGIN_FAILURE:
            case EventType.ACQUIRE_TOKEN_SUCCESS:
            case EventType.ACQUIRE_TOKEN_FAILURE:
            case EventType.RESTORE_FROM_BFCACHE:
                if (message.interactionType === exports.InteractionType.Redirect ||
                    message.interactionType === exports.InteractionType.Popup) {
                    if (currentStatus &&
                        currentStatus !== InteractionStatus.Login &&
                        currentStatus !== InteractionStatus.AcquireToken) {
                        // Prevent this event from clearing any status other than login or acquireToken
                        break;
                    }
                    return InteractionStatus.None;
                }
                break;
        }
        return null;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class SignedHttpRequest {
    constructor(shrParameters, shrOptions) {
        const loggerOptions = (shrOptions && shrOptions.loggerOptions) || {};
        this.logger = new Logger(loggerOptions, name, version);
        this.cryptoOps = new CryptoOps(this.logger);
        this.popTokenGenerator = new PopTokenGenerator(this.cryptoOps);
        this.shrParameters = shrParameters;
    }
    /**
     * Generates and caches a keypair for the given request options.
     * @returns Public key digest, which should be sent to the token issuer.
     */
    async generatePublicKeyThumbprint() {
        const { kid } = await this.popTokenGenerator.generateKid(this.shrParameters);
        return kid;
    }
    /**
     * Generates a signed http request for the given payload with the given key.
     * @param payload Payload to sign (e.g. access token)
     * @param publicKeyThumbprint Public key digest (from generatePublicKeyThumbprint API)
     * @param claims Additional claims to include/override in the signed JWT
     * @returns Pop token signed with the corresponding private key
     */
    async signRequest(payload, publicKeyThumbprint, claims) {
        return this.popTokenGenerator.signPayload(payload, publicKeyThumbprint, this.shrParameters, claims);
    }
    /**
     * Removes cached keys from browser for given public key thumbprint
     * @param publicKeyThumbprint Public key digest (from generatePublicKeyThumbprint API)
     * @returns If keys are properly deleted
     */
    async removeKeys(publicKeyThumbprint) {
        return await this.cryptoOps.removeTokenBindingKey(publicKeyThumbprint);
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BrowserPerformanceMeasurement {
    constructor(name, correlationId) {
        this.correlationId = correlationId;
        this.measureName = BrowserPerformanceMeasurement.makeMeasureName(name, correlationId);
        this.startMark = BrowserPerformanceMeasurement.makeStartMark(name, correlationId);
        this.endMark = BrowserPerformanceMeasurement.makeEndMark(name, correlationId);
    }
    static makeMeasureName(name, correlationId) {
        return `msal.measure.${name}.${correlationId}`;
    }
    static makeStartMark(name, correlationId) {
        return `msal.start.${name}.${correlationId}`;
    }
    static makeEndMark(name, correlationId) {
        return `msal.end.${name}.${correlationId}`;
    }
    static supportsBrowserPerformance() {
        return (typeof window !== "undefined" &&
            typeof window.performance !== "undefined" &&
            typeof window.performance.mark === "function" &&
            typeof window.performance.measure === "function" &&
            typeof window.performance.clearMarks === "function" &&
            typeof window.performance.clearMeasures === "function" &&
            typeof window.performance.getEntriesByName === "function");
    }
    /**
     * Flush browser marks and measurements.
     * @param {string} correlationId
     * @param {SubMeasurement} measurements
     */
    static flushMeasurements(correlationId, measurements) {
        if (BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
            try {
                measurements.forEach((measurement) => {
                    const measureName = BrowserPerformanceMeasurement.makeMeasureName(measurement.name, correlationId);
                    const entriesForMeasurement = window.performance.getEntriesByName(measureName, "measure");
                    if (entriesForMeasurement.length > 0) {
                        window.performance.clearMeasures(measureName);
                        window.performance.clearMarks(BrowserPerformanceMeasurement.makeStartMark(measureName, correlationId));
                        window.performance.clearMarks(BrowserPerformanceMeasurement.makeEndMark(measureName, correlationId));
                    }
                });
            }
            catch (e) {
                // Silently catch and return null
            }
        }
    }
    startMeasurement() {
        if (BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
            try {
                window.performance.mark(this.startMark);
            }
            catch (e) {
                // Silently catch
            }
        }
    }
    endMeasurement() {
        if (BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
            try {
                window.performance.mark(this.endMark);
                window.performance.measure(this.measureName, this.startMark, this.endMark);
            }
            catch (e) {
                // Silently catch
            }
        }
    }
    flushMeasurement() {
        if (BrowserPerformanceMeasurement.supportsBrowserPerformance()) {
            try {
                const entriesForMeasurement = window.performance.getEntriesByName(this.measureName, "measure");
                if (entriesForMeasurement.length > 0) {
                    const durationMs = entriesForMeasurement[0].duration;
                    window.performance.clearMeasures(this.measureName);
                    window.performance.clearMarks(this.startMark);
                    window.performance.clearMarks(this.endMark);
                    return durationMs;
                }
            }
            catch (e) {
                // Silently catch and return null
            }
        }
        return null;
    }
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
class BrowserPerformanceClient extends PerformanceClient {
    constructor(configuration, intFields) {
        super(configuration.auth.clientId, configuration.auth.authority || `${Constants.DEFAULT_AUTHORITY}`, new Logger(configuration.system?.loggerOptions || {}, name, version), name, version, configuration.telemetry?.application || {
            appName: "",
            appVersion: "",
        }, intFields);
        this.browserCrypto = new BrowserCrypto(this.logger);
        this.guidGenerator = new GuidGenerator(this.browserCrypto);
    }
    startPerformanceMeasurement(measureName, correlationId) {
        return new BrowserPerformanceMeasurement(measureName, correlationId);
    }
    generateId() {
        return this.guidGenerator.generateGuid();
    }
    getPageVisibility() {
        return document.visibilityState?.toString() || null;
    }
    deleteIncompleteSubMeasurements(inProgressEvent) {
        const rootEvent = this.eventsByCorrelationId.get(inProgressEvent.event.correlationId);
        const isRootEvent = rootEvent && rootEvent.eventId === inProgressEvent.event.eventId;
        const incompleteMeasurements = [];
        if (isRootEvent && rootEvent?.incompleteSubMeasurements) {
            rootEvent.incompleteSubMeasurements.forEach((subMeasurement) => {
                incompleteMeasurements.push({ ...subMeasurement });
            });
        }
        // Clean up remaining marks for incomplete sub-measurements
        if (incompleteMeasurements.length > 0) {
            BrowserPerformanceMeasurement.flushMeasurements(inProgressEvent.event.correlationId, incompleteMeasurements);
        }
    }
    supportsBrowserPerformanceNow() {
        return (typeof window !== "undefined" &&
            typeof window.performance !== "undefined" &&
            typeof window.performance.now === "function");
    }
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     * Also captures browser page visibilityState.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {((event?: Partial<PerformanceEvent>) => PerformanceEvent| null)}
     */
    startMeasurement(measureName, correlationId) {
        // Capture page visibilityState and then invoke start/end measurement
        const startPageVisibility = this.getPageVisibility();
        const inProgressEvent = super.startMeasurement(measureName, correlationId);
        return {
            ...inProgressEvent,
            end: (event) => {
                const res = inProgressEvent.end({
                    startPageVisibility,
                    endPageVisibility: this.getPageVisibility(),
                    ...event,
                });
                this.deleteIncompleteSubMeasurements(inProgressEvent);
                return res;
            },
            discard: () => {
                inProgressEvent.discard();
                this.deleteIncompleteSubMeasurements(inProgressEvent);
                inProgressEvent.measurement.flushMeasurement();
            },
        };
    }
    /**
     * Adds pre-queue time to preQueueTimeByCorrelationId map.
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @returns
     */
    setPreQueueTime(eventName, correlationId) {
        if (!this.supportsBrowserPerformanceNow()) {
            this.logger.trace(`BrowserPerformanceClient: window performance API not available, unable to set telemetry queue time for ${eventName}`);
            return;
        }
        if (!correlationId) {
            this.logger.trace(`BrowserPerformanceClient: correlationId for ${eventName} not provided, unable to set telemetry queue time`);
            return;
        }
        const preQueueEvent = this.preQueueTimeByCorrelationId.get(correlationId);
        /**
         * Manually complete queue measurement if there is an incomplete pre-queue event.
         * Incomplete pre-queue events are instrumentation bugs that should be fixed.
         */
        if (preQueueEvent) {
            this.logger.trace(`BrowserPerformanceClient: Incomplete pre-queue ${preQueueEvent.name} found`, correlationId);
            this.addQueueMeasurement(preQueueEvent.name, correlationId, undefined, true);
        }
        this.preQueueTimeByCorrelationId.set(correlationId, {
            name: eventName,
            time: window.performance.now(),
        });
    }
    /**
     * Calculates and adds queue time measurement for given performance event.
     *
     * @param {PerformanceEvents} eventName
     * @param {?string} correlationId
     * @param {?number} queueTime
     * @param {?boolean} manuallyCompleted - indicator for manually completed queue measurements
     * @returns
     */
    addQueueMeasurement(eventName, correlationId, queueTime, manuallyCompleted) {
        if (!this.supportsBrowserPerformanceNow()) {
            this.logger.trace(`BrowserPerformanceClient: window performance API not available, unable to add queue measurement for ${eventName}`);
            return;
        }
        if (!correlationId) {
            this.logger.trace(`BrowserPerformanceClient: correlationId for ${eventName} not provided, unable to add queue measurement`);
            return;
        }
        const preQueueTime = super.getPreQueueTime(eventName, correlationId);
        if (!preQueueTime) {
            return;
        }
        const currentTime = window.performance.now();
        const resQueueTime = queueTime || super.calculateQueuedTime(preQueueTime, currentTime);
        return super.addQueueMeasurement(eventName, correlationId, resQueueTime, manuallyCompleted);
    }
}

exports.AccountEntity = AccountEntity;
exports.ApiId = ApiId;
exports.AuthError = AuthError;
exports.AuthErrorMessage = AuthErrorMessage;
exports.AuthenticationHeaderParser = AuthenticationHeaderParser;
exports.AuthenticationScheme = AuthenticationScheme;
exports.AzureCloudInstance = AzureCloudInstance;
exports.BrowserAuthError = BrowserAuthError;
exports.BrowserAuthErrorMessage = BrowserAuthErrorMessage;
exports.BrowserCacheLocation = BrowserCacheLocation;
exports.BrowserConfigurationAuthError = BrowserConfigurationAuthError;
exports.BrowserConfigurationAuthErrorMessage = BrowserConfigurationAuthErrorMessage;
exports.BrowserPerformanceClient = BrowserPerformanceClient;
exports.BrowserPerformanceMeasurement = BrowserPerformanceMeasurement;
exports.BrowserUtils = BrowserUtils;
exports.CacheLookupPolicy = CacheLookupPolicy;
exports.ClientAuthError = ClientAuthError;
exports.ClientAuthErrorMessage = ClientAuthErrorMessage;
exports.ClientConfigurationError = ClientConfigurationError;
exports.ClientConfigurationErrorMessage = ClientConfigurationErrorMessage;
exports.DEFAULT_IFRAME_TIMEOUT_MS = DEFAULT_IFRAME_TIMEOUT_MS;
exports.EventMessageUtils = EventMessageUtils;
exports.EventType = EventType;
exports.InteractionRequiredAuthError = InteractionRequiredAuthError;
exports.InteractionRequiredAuthErrorMessage = InteractionRequiredAuthErrorMessage;
exports.InteractionStatus = InteractionStatus;
exports.Logger = Logger;
exports.NavigationClient = NavigationClient;
exports.OIDC_DEFAULT_SCOPES = OIDC_DEFAULT_SCOPES;
exports.PerformanceEvents = PerformanceEvents;
exports.PromptValue = PromptValue;
exports.ProtocolMode = ProtocolMode;
exports.PublicClientApplication = PublicClientApplication;
exports.ServerError = ServerError;
exports.ServerResponseType = ServerResponseType;
exports.SignedHttpRequest = SignedHttpRequest;
exports.StringUtils = StringUtils;
exports.UrlString = UrlString;
exports.WrapperSKU = WrapperSKU;
exports.internals = internals;
exports.stubbedPublicClientApplication = stubbedPublicClientApplication;
exports.version = version;
//# sourceMappingURL=msal-browser.cjs.map