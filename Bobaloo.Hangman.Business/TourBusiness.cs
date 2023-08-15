using Bobaloo.Hangman.Business.Core;
using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.TTS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Business
{
    public class TourBusiness : ITourBusiness
    {
        protected IAzureTTS TTS { get; }
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        public TourBusiness(IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository, IAzureTTS tts)
        {
            TourRepository = tourRepository;
            TTS = tts;
        }

        public async Task UpdateIntroAudio(Guid tourId, string text, string voice, string? style = null, CancellationToken token = default)
        {
            var tour = await TourRepository.GetByID(tourId, token: token);
            if (tour != null)
            {
                tour.IntroductionAudio = await TTS.GenerateSpeech(text, voice, style, token);
                await TourRepository.Update(tour);
            }
        }
    }
}
