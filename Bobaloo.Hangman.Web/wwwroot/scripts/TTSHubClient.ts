/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
declare var exports: any;
var connection: signalR.HubConnection = new exports['signalR'].HubConnectionBuilder().withUrl('https://localhost:7083/hubs/tts').build();
connection.start().then(() => {
    
    $("#btnAddTTS").click(() => {
        connection.invoke("SubmitTTS", $("#txtTTS").val(), $("#ddlModel").val());
    });
    connection.on("recievePoll", (resp: InferencePollResponse) => {
        $("#polls").append($("<li>").text(JSON.stringify(resp)));
    });
});
export interface InferencePollResponse {
    success: boolean;
    state: InferrenceState
    }
export interface InferrenceState {
    job_token: string;
    status: string;
    maybe_extra_status_description: string;
    attempt_count: number;

    maybe_public_bucket_wav_audio_path: string;
    model_token: string;
    tts_model_type: string;
    title: string;
    raw_inference_text: string;
    created_at: string;
    updated_at: string;
    }