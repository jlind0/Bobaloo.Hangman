/// <reference path="../../node_modules/@microsoft/signalr/dist/esm/browser-index.d.ts" />
/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
declare var exports: any;
namespace Bobaloo.SignalR {
    export class TTSHub {
        public connection?: signalR.HubConnection;
        constructor() { }
        public init(): Promise<void> {
            this.connection = new exports['signalR'].HubConnectionBuilder().withUrl('/hubs/tts').build();
            if (this.connection !== undefined)
                return this.connection.start();
            throw new Error("SignalR not loaded");
    }
}
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
}