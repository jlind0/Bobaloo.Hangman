/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
export var Bobaloo;
(function (Bobaloo) {
    var SignalR;
    (function (SignalR) {
        class TTSHub {
            constructor() { }
            init() {
                this.connection = new exports['signalR'].HubConnectionBuilder().withUrl('/hubs/tts').build();
                if (this.connection !== undefined)
                    return this.connection.start();
                throw new Error("SignalR not loaded");
            }
        }
        SignalR.TTSHub = TTSHub;
    })(SignalR = Bobaloo.SignalR || (Bobaloo.SignalR = {}));
})(Bobaloo || (Bobaloo = {}));
