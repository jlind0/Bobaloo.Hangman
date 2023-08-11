/// <reference path="../wwwroot/lib/microsoft/signalr/src/index.ts" />
/// <reference path="../node_modules/@types/jquery/index.d.ts" />
$(() => {
    var connection = new signalR.HubConnectionBuilder().withUrl('/hubs/tts').build();
    $("#btnAddTTS").click(() => {
        connection.invoke("SubmitTTS", $("#txtTTS").val(), $("#ddlModel").val());
    });
    connection.on("RecievePoll", function (resp) {
        $("#polls").append($("<li>").text(JSON.stringify(resp)));
    });
    connection.start();
});
export {};
