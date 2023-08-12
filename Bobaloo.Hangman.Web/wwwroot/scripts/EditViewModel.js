var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../lib/knockout/build/types/knockout", "./TTSHubClient"], function (require, exports, ko, TTSHubClient_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EditViewModel = void 0;
    ko = __importStar(ko);
    class EditViewModel {
        constructor() {
            this.tourId = $("#Tour_TourId").val();
            this.Hub = new TTSHubClient_1.TTSHub();
            this.Hub.init().then(() => {
                if (this.Hub.connection !== undefined) {
                    this.Hub.connection.on("recievePoll", (resp) => {
                        this.pollNotices.push(resp);
                    });
                }
                ;
            });
            this.ttsText = ko.observable();
            this.selectedTTSModel = ko.observable();
            this.pollNotices = ko.observableArray();
        }
        submitRequest() {
            var _a;
            (_a = this.Hub.connection) === null || _a === void 0 ? void 0 : _a.invoke("SubmitTTSForTour", this.tourId, this.ttsText(), this.selectedTTSModel());
        }
        appendAudio(url) {
            fetch("/api/Audio/Tours/" + this.tourId, {
                method: "POST",
                body: url
            }).then(resp => alert(resp.statusText));
        }
    }
    exports.EditViewModel = EditViewModel;
    ko.applyBindings(new EditViewModel(), $("#TTSEditor")[0]);
});
