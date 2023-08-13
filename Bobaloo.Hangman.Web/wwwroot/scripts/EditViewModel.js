/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../lib/knockout/build/types/knockout.d.ts" />
import * as TTS from './TTSHubClient.js';
export var Bobaloo;
(function (Bobaloo) {
    var ViewModels;
    (function (ViewModels) {
        class EditViewModel {
            constructor() {
                this.tourId = $("#Tour_TourId").val();
                this.Hub = new TTS.Bobaloo.SignalR.TTSHub();
                this.Hub.init().then(() => {
                    if (this.Hub.connection !== undefined) {
                        this.Hub.connection.on("recievePoll", (resp) => {
                            this.pollNotices.push(resp);
                        });
                    }
                    ;
                });
                this.ttsAppend = ko.observable(false);
                this.ttsText = ko.observable();
                this.selectedTTSModel = ko.observable();
                this.pollNotices = ko.observableArray();
            }
            submitRequest() {
                var _a;
                (_a = this.Hub.connection) === null || _a === void 0 ? void 0 : _a.invoke("SubmitTTSForTour", this.tourId, this.ttsText(), this.selectedTTSModel(), this.ttsAppend());
            }
        }
        ViewModels.EditViewModel = EditViewModel;
    })(ViewModels = Bobaloo.ViewModels || (Bobaloo.ViewModels = {}));
})(Bobaloo || (Bobaloo = {}));
ko.applyBindings(new Bobaloo.ViewModels.EditViewModel(), $("#TTSEditor")[0]);
