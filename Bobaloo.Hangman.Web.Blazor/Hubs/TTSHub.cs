using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.TTS;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks.Dataflow;

namespace Bobaloo.Hangman.Web.Hubs
{
    public class TTSHub : Hub
    {
        protected ITTSCleint TTSClient { get; }
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        protected IGoogleStorageClient GoogleStoargeClient { get; }
        public TTSHub(ITTSCleint tTSClient, IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository, IGoogleStorageClient googleStorageClient)
        {
            TTSClient = tTSClient;
            TourRepository = tourRepository;
            GoogleStoargeClient = googleStorageClient;

        }

        public override async Task OnConnectedAsync()
        {
            await TTSClient.Login(Context.ConnectionAborted);
            await base.OnConnectedAsync();
        }
        public async Task SubmitTTSForTour(Guid tourId, string text, string model, bool append = false)
        {
            TourWithBinaryData? tour = null;
            if(append)
                tour = await TourRepository.GetByID(tourId, token: Context.ConnectionAborted);

            var block = await TTSClient.SubmitRequest(text, model, Context.ConnectionAborted);
            var actionBlock = new ActionBlock<InferencePollResponse>(async resp =>
            {
                if(resp.state.maybe_public_bucket_wav_audio_path != null)
                {
                    if(tour == null)
                        tour = await TourRepository.GetByID(tourId, token: Context.ConnectionAborted);
                    if (tour != null)
                    {
                        if (append && tour.IntroductionAudio != null)
                            tour.IntroductionAudio = await GoogleStoargeClient.CombineAudio(
                                resp.state.maybe_public_bucket_wav_audio_path,
                                tour.IntroductionAudio, Context.ConnectionAborted);
                        else
                            tour.IntroductionAudio = await GoogleStoargeClient.FetchAudio(
                                resp.state.maybe_public_bucket_wav_audio_path, Context.ConnectionAborted);
                        await TourRepository.Update(tour, token: Context.ConnectionAborted);
                    }
                }
                await Clients.Caller.SendAsync("recievePoll", resp, Context.ConnectionAborted);
            });
            block.LinkTo(actionBlock);
            await block.Completion;
            actionBlock.Complete();
            await actionBlock.Completion;
            
        }
    }
}
