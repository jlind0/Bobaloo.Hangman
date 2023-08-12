import { CommonEndSessionRequest, IPerformanceClient, Logger, ICrypto } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { EndSessionPopupRequest } from "../request/EndSessionPopupRequest";
import { PopupRequest } from "../request/PopupRequest";
import { NativeMessageHandler } from "../broker/nativeBroker/NativeMessageHandler";
import { INavigationClient } from "../navigation/INavigationClient";
import { EventHandler } from "../event/EventHandler";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { BrowserConfiguration } from "../config/Configuration";
import { InteractionParams } from "../interaction_handler/InteractionHandler";
import { PopupWindowAttributes } from "../request/PopupWindowAttributes";
import { AuthenticationResult } from "../response/AuthenticationResult";
export type PopupParams = InteractionParams & {
    popup?: Window | null;
    popupName: string;
    popupWindowAttributes: PopupWindowAttributes;
};
export declare class PopupClient extends StandardInteractionClient {
    private currentWindow;
    protected nativeStorage: BrowserCacheManager;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, performanceClient: IPerformanceClient, nativeStorageImpl: BrowserCacheManager, nativeMessageHandler?: NativeMessageHandler, correlationId?: string);
    /**
     * Acquires tokens by opening a popup window to the /authorize endpoint of the authority
     * @param request
     */
    acquireToken(request: PopupRequest): Promise<AuthenticationResult>;
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logout(logoutRequest?: EndSessionPopupRequest): Promise<void>;
    /**
     * Helper which obtains an access_token for your API via opening a popup window in the user's browser
     * @param validRequest
     * @param popupName
     * @param popup
     * @param popupWindowAttributes
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    protected acquireTokenPopupAsync(request: PopupRequest, popupName: string, popupWindowAttributes: PopupWindowAttributes, popup?: Window | null): Promise<AuthenticationResult>;
    /**
     *
     * @param validRequest
     * @param popupName
     * @param requestAuthority
     * @param popup
     * @param mainWindowRedirectUri
     * @param popupWindowAttributes
     */
    protected logoutPopupAsync(validRequest: CommonEndSessionRequest, popupName: string, popupWindowAttributes: PopupWindowAttributes, requestAuthority?: string, popup?: Window | null, mainWindowRedirectUri?: string): Promise<void>;
    /**
     * Opens a popup window with given request Url.
     * @param requestUrl
     */
    initiateAuthRequest(requestUrl: string, params: PopupParams): Window;
    /**
     * Monitors a window until it loads a url with the same origin.
     * @param popupWindow - window that is being monitored
     * @param timeout - timeout for processing hash once popup is redirected back to application
     */
    monitorPopupForHash(popupWindow: Window): Promise<string>;
    /**
     * Waits for user interaction in logout popup window
     * @param popupWindow
     * @returns
     */
    waitForLogoutPopup(popupWindow: Window): Promise<void>;
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
    openPopup(urlNavigate: string, popupParams: PopupParams): Window;
    /**
     * Helper function to set popup window dimensions and position
     * @param urlNavigate
     * @param popupName
     * @param popupWindowAttributes
     * @returns
     */
    openSizedPopup(urlNavigate: string, popupName: string, popupWindowAttributes: PopupWindowAttributes): Window | null;
    /**
     * Event callback to unload main window.
     */
    unloadWindow(e: Event): void;
    /**
     * Closes popup, removes any state vars created during popup calls.
     * @param popupWindow
     */
    cleanPopup(popupWindow?: Window): void;
    /**
     * Generates the name for the popup based on the client id and request
     * @param clientId
     * @param request
     */
    generatePopupName(scopes: Array<string>, authority: string): string;
    /**
     * Generates the name for the popup based on the client id and request for logouts
     * @param clientId
     * @param request
     */
    generateLogoutPopupName(request: CommonEndSessionRequest): string;
    /**
     * Extracts the server response from the popup window
     */
    extractServerResponseStringFromPopup(popupWindow: Window, href: string): string;
}
//# sourceMappingURL=PopupClient.d.ts.map