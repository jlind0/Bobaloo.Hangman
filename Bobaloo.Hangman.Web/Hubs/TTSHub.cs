using Bobaloo.Hangman.TTS;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks.Dataflow;

namespace Bobaloo.Hangman.Web.Hubs
{
    public class TTSHub : Hub
    {
        protected ITTSCleint TTSClient { get; }
        public TTSHub(ITTSCleint tTSClient)
        {
            TTSClient = tTSClient;

        }

        public override async Task OnConnectedAsync()
        {
            await TTSClient.Login(Context.ConnectionAborted);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await TTSClient.Logout(Context.ConnectionAborted);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubmitTTS(string text, string model)
        {
            var block = await TTSClient.SubmitRequest(text, model, Context.ConnectionAborted);
            block.LinkTo(new ActionBlock<InferencePollResponse>(async resp =>
            {
                await Clients.Caller.SendAsync("recievePoll", resp, Context.ConnectionAborted);
            }));
            await block.Completion;
        }
    }
}
