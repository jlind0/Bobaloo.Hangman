/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../lib/knockout/build/types/knockout.d.ts" />

import * as ko from '../lib/knockout/build/types/knockout.js';
import * as TTS from './TTSHubClient.js'

export module Bobaloo.ViewModels {
    export class EditViewModel {

        public ttsText: ko.Observable<string | undefined>;
        public ttsAppend: ko.Observable<boolean>;
        public selectedTTSModel: ko.Observable<string | undefined>;
        public pollNotices: ko.ObservableArray<TTS.Bobaloo.SignalR.InferencePollResponse>;
        public tourId: string | undefined | number | string[];
        private Hub: TTS.Bobaloo.SignalR.TTSHub;
        constructor() {
            this.tourId = $("#Tour_TourId").val();
            this.Hub = new TTS.Bobaloo.SignalR.TTSHub();
            this.Hub.init().then(() => {
                if (this.Hub.connection !== undefined) {
                    this.Hub.connection.on("recievePoll", (resp: TTS.Bobaloo.SignalR.InferencePollResponse) => {
                        this.pollNotices.push(resp);
                    });
                };
            });
            this.ttsAppend = ko.observable<boolean>(false);
            this.ttsText = ko.observable<string>();
            this.selectedTTSModel = ko.observable<string>();
            this.pollNotices = ko.observableArray<TTS.Bobaloo.SignalR.InferencePollResponse>();
        }
        public submitRequest() {
            this.Hub.connection?.invoke("SubmitTTSForTour", this.tourId, this.ttsText(), this.selectedTTSModel(), this.ttsAppend());
        }
    }

}
ko.applyBindings(new Bobaloo.ViewModels.EditViewModel(), $("#TTSEditor")[0]);