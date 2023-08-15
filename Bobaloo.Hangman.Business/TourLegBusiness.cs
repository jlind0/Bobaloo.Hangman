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
    public class TourLegBusiness : ITourLegBusiness
    {
        protected IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> TourLegsRepository { get; }
        protected IAzureTTS TTS { get; }
        public TourLegBusiness(IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> tourLegsRepository, IAzureTTS tts)
        {
            TourLegsRepository = tourLegsRepository;
            TTS = tts;
        }

        public async Task UpdateTourLegAudio(Guid tourLegId, string modelName, string? style = null, CancellationToken token = default)
        {
            var tourLeg = await TourLegsRepository.GetByID(tourLegId, token: token);
            if(tourLeg != null) 
            {
                tourLeg.Audio = await TTS.GenerateSpeech(tourLeg.Text, modelName, style, token);
                await TourLegsRepository.Update(tourLeg, token: token);
            }
        }
    }
}
