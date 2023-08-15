using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.TTS;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;
using System.Threading.Tasks.Dataflow;

namespace Bobaloo.Hangman.Web.Hubs
{
    public class TTSHub : Hub
    {
        protected ITTSCleint TTSClient { get; }
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        protected IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> TourLegRepository { get; }
        protected IGoogleStorageClient GoogleStoargeClient { get; }
        public TTSHub(ITTSCleint tTSClient, IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository, 
            IGoogleStorageClient googleStorageClient, IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> tourLegRepository)
        {
            TTSClient = tTSClient;
            TourRepository = tourRepository;
            GoogleStoargeClient = googleStorageClient;
            TourLegRepository = tourLegRepository;

        }

        public override async Task OnConnectedAsync()
        {
            await TTSClient.Login(Context.ConnectionAborted);
            await base.OnConnectedAsync();
        }
        public async Task SubmitTTSForTourLeg(Guid tourLegId, string model)
        {
            var leg = await TourLegRepository.GetByID(tourLegId, token: Context.ConnectionAborted);
            if(leg != null)
            {
                var block = await TTSClient.SubmitRequest(leg.Text, model, Context.ConnectionAborted);
                var actionBlock = new ActionBlock<InferencePollResponse>(async resp =>
                {
                    if (resp.state.maybe_public_bucket_wav_audio_path != null)
                    {
                        leg.Audio = await GoogleStoargeClient.FetchAudio(resp.state.maybe_public_bucket_wav_audio_path, Context.ConnectionAborted);
                        await TourLegRepository.Update(leg, token: Context.ConnectionAborted);
                    }
                    await Clients.Caller.SendAsync("recievePoll", resp, Context.ConnectionAborted);
                });
                block.LinkTo(actionBlock);
                await block.Completion;
                actionBlock.Complete();
                await actionBlock.Completion;
            }
        }
        public async Task SubmitTTSForTour(Guid tourId, string text, string model, bool append = false, bool replace = false)
        {
            var block = await TTSClient.SubmitRequest(text, model, Context.ConnectionAborted);
            var actionBlock = new ActionBlock<InferencePollResponse>(async resp =>
            {
                if (resp.state.maybe_public_bucket_wav_audio_path != null)
                {
                    var tour = await TourRepository.GetByID(tourId, token: Context.ConnectionAborted);
                    if (tour != null)
                    {
                        bool update = false;
                        if (append && tour.IntroductionAudio != null)
                        {
                            tour.IntroductionAudio = await GoogleStoargeClient.CombineAudio(
                                resp.state.maybe_public_bucket_wav_audio_path,
                                tour.IntroductionAudio, Context.ConnectionAborted);
                            update = true;
                        }
                        else if (tour.IntroductionAudio == null || replace)
                        {
                            tour.IntroductionAudio = await GoogleStoargeClient.FetchAudio(
                                resp.state.maybe_public_bucket_wav_audio_path, Context.ConnectionAborted);
                            update = true;
                        }
                        if(update)
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
