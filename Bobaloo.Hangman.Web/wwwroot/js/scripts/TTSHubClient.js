"use strict";
/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
var Bobaloo;
(function (Bobaloo) {
    var SignalR;
    (function (SignalR) {
        var TTSHub = /** @class */ (function () {
            function TTSHub() {
            }
            TTSHub.prototype.init = function () {
                this.connection = new exports['signalR'].HubConnectionBuilder().withUrl('/hubs/tts').build();
                if (this.connection !== undefined)
                    return this.connection.start();
                throw new Error("SignalR not loaded");
            };
            return TTSHub;
        }());
        SignalR.TTSHub = TTSHub;
    })(SignalR = Bobaloo.SignalR || (Bobaloo.SignalR = {}));
})(Bobaloo || (Bobaloo = {}));
