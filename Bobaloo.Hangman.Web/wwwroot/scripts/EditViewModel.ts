/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../lib/knockout/build/types/knockout.d.ts" />


namespace Bobaloo.ViewModels {
    export class EditViewModel {

        public ttsText: ko.Observable<string | undefined>;
        public ttsAppend: ko.Observable<boolean>;
        public selectedTTSModel: ko.Observable<string | undefined>;
        public pollNotices: ko.ObservableArray<Bobaloo.SignalR.InferencePollResponse>;
        public tourId: string | undefined | number | string[];
        private Hub: Bobaloo.SignalR.TTSHub;
        constructor() {
            this.tourId = $("#Tour_TourId").val();
            this.Hub = new Bobaloo.SignalR.TTSHub();
            this.Hub.init().then(() => {
                if (this.Hub.connection !== undefined) {
                    this.Hub.connection.on("recievePoll", (resp: Bobaloo.SignalR.InferencePollResponse) => {
                        this.pollNotices.push(resp);
                    });
                };
            });
            this.ttsAppend = ko.observable<boolean>(false);
            this.ttsText = ko.observable<string>();
            this.selectedTTSModel = ko.observable<string>();
            this.pollNotices = ko.observableArray<Bobaloo.SignalR.InferencePollResponse>();
        }
        public submitRequest() {
            this.Hub.connection?.invoke("SubmitTTSForTour", this.tourId, this.ttsText(), this.selectedTTSModel(), this.ttsAppend());
        }
    }

}
ko.applyBindings(new Bobaloo.ViewModels.EditViewModel(), $("#TTSEditor")[0]);