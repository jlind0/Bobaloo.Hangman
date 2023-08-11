"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
var connection = new exports['signalR'].HubConnectionBuilder().withUrl('https://localhost:7083/hubs/tts').build();
connection.start().then(function () {
    $("#btnAddTTS").click(function () {
        connection.invoke("SubmitTTS", $("#txtTTS").val(), $("#ddlModel").val());
    });
    connection.on("recievePoll", function (resp) {
        $("#polls").append($("<li>").text(JSON.stringify(resp)));
    });
});
