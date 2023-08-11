using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Threading.Tasks.Dataflow;
using System.Net.Http.Json;

namespace Bobaloo.Hangman.TTS
{
    public interface ITTSCleint
    {
        Task<bool> Login(CancellationToken token = default);
        Task<bool> Logout(CancellationToken token = default);
        Task<ISourceBlock<InferencePollResponse>> SubmitRequest(string text, string model, CancellationToken token = default);
    }
    public class InferrenceRequest
    {
        public string tts_model_token { get; set; } = null!;
        public Guid uuid_idempotency_token { get; set; } = Guid.NewGuid();
        public string inference_text { get; set; } = null!;
    }
    public class InferrenceResponse
    {
        public bool success { get; set; }
        public string inference_job_token { get; set; } = null!;
    }
    public class InferencePollResponse
    {
        public bool success { get; set; }
        public InferrenceState state { get; set; } = null!;
    }
    public class InferrenceState
    {
        public string job_token { get; set; } = null!;
        public string status { get; set; } = null!;
        public string? maybe_extra_status_description { get; set; }
        public int attempt_count { get; set; } = 0;
        public string? maybe_public_bucket_wav_audio_path { get; set; }
        public string model_token { get; set; } = null!;
        public string tts_model_type { get; set; } = null!;
        public string title { get; set; } = null!;
        public string raw_inference_text { get; set; } = null!;
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
    public class FakeYouClient : ITTSCleint
    {
        private bool disposedValue;

        protected Uri BaseUri { get; }
        protected string UserName { get; }
        protected string Password { get; }
        protected string? Token { get; set; }

        public FakeYouClient(IConfiguration config)
        {
            BaseUri = new Uri(config["FakeYou:BaseUri"] ?? throw new NotImplementedException()) ;
            UserName = config["FakeYou:UserName"] ?? throw new NotImplementedException();
            Password = config["FakeYou:Password"] ?? throw new NotImplementedException();
        }
        protected virtual HttpClient CreateClient()
        {
            var client = new HttpClient()
            {
                BaseAddress = BaseUri
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if(Token != null)
            {
                client.DefaultRequestHeaders.Add("Credentials", "include");
                client.DefaultRequestHeaders.Add("Cookie", "session=" + Token);
            }
            return client;
        }
        public virtual async Task<bool> Login(CancellationToken token = default)
        {

            using(var client = CreateClient())
            {
                var payload = new StringContent("{\"username_or_email\": \"" + UserName + "\", \"password\": \"" + Password + "\"}", Encoding.UTF8, "application/json");
                var resp = await client.PostAsync("/login", payload, token);
                if (resp.IsSuccessStatusCode)
                {
                    if(resp.Headers.TryGetValues("Set-Cookie", out var values))
                        this.Token = values.Select(v => v.Split(';')[0].Split('='))
                            .Single(v => v[0] == "session")[1];
                    return true;
                }
            }
            return false;
        }
       

        public virtual async Task<bool> Logout(CancellationToken token = default)
        {
            if (Token == null)
                return false;
            using (var client = CreateClient())
            {
                await client.PostAsync("/logout", null, token);
                Token = null;
                return true;
            }
        }

        public virtual async Task<ISourceBlock<InferencePollResponse>> SubmitRequest(string text, string model, CancellationToken token = default)
        {
            text = text.Trim();
            BroadcastBlock<InferencePollResponse> block = new BroadcastBlock<InferencePollResponse>(p => p, new DataflowBlockOptions()
            {
                CancellationToken = token
            });
            InferrenceResponse? response = null;
            using (var client = CreateClient())
            {
                var resp = await client.PostAsJsonAsync("/tts/inference", new InferrenceRequest()
                {
                    inference_text = text,
                    tts_model_token = model
                }, token);
                if (!resp.IsSuccessStatusCode)
                    throw new InvalidOperationException();
                response = await resp.Content.ReadFromJsonAsync<InferrenceResponse>(cancellationToken: token) ?? throw new InvalidOperationException();
            }
            _ = Task.Factory.StartNew(async () =>
            {

                InferencePollResponse? pollResponse = null;
                do
                {
                    using (var client = CreateClient())
                    {
                        var resp = await client.GetAsync($"/tts/job/{response.inference_job_token}", token);
                        if (!resp.IsSuccessStatusCode)
                            throw new InvalidOperationException();
                        pollResponse = await resp.Content.ReadFromJsonAsync<InferencePollResponse>(cancellationToken: token) ?? throw new InvalidOperationException();
                        block.Post(pollResponse);
                    }
                    if(!pollResponse.state.status.Contains("complete"))
                        await Task.Delay(10000, token);
                }
                while (!pollResponse.state.status.Contains("complete"));
                block.Complete();
            }, token);
            return block;
        }
    }
}
