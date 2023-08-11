"use strict";
/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../lib/knockout/build/types/knockout.d.ts" />
var Bobaloo;
(function (Bobaloo) {
    var ViewModels;
    (function (ViewModels) {
        var EditViewModel = /** @class */ (function () {
            function EditViewModel() {
                var _this = this;
                this.tourId = $("#Tour_TourId").val();
                this.Hub = new Bobaloo.SignalR.TTSHub();
                this.Hub.init().then(function () {
                    if (_this.Hub.connection !== undefined) {
                        _this.Hub.connection.on("recievePoll", function (resp) {
                            _this.pollNotices.push(resp);
                        });
                    }
                    ;
                });
                this.ttsAppend = ko.observable(false);
                this.ttsText = ko.observable();
                this.selectedTTSModel = ko.observable();
                this.pollNotices = ko.observableArray();
            }
            EditViewModel.prototype.submitRequest = function () {
                var _a;
                (_a = this.Hub.connection) === null || _a === void 0 ? void 0 : _a.invoke("SubmitTTSForTour", this.tourId, this.ttsText(), this.selectedTTSModel(), this.ttsAppend());
            };
            return EditViewModel;
        }());
        ViewModels.EditViewModel = EditViewModel;
    })(ViewModels = Bobaloo.ViewModels || (Bobaloo.ViewModels = {}));
})(Bobaloo || (Bobaloo = {}));
ko.applyBindings(new Bobaloo.ViewModels.EditViewModel(), $("#TTSEditor")[0]);
