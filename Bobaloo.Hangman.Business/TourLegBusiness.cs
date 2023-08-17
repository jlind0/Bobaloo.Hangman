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
        protected IRepository<HangmanUnitOfWork, TourLeg, Guid> TourLegRepository { get; }
        protected IAzureStorageBlob StorageBlob { get; }
        protected IAzureTTS TTS { get; }
        public TourLegBusiness(IRepository<HangmanUnitOfWork, TourLeg, Guid> tourLegRepository,
            IAzureTTS tts, IAzureStorageBlob storageBlob)
        {
            TourLegRepository = tourLegRepository;
            TTS = tts;
            StorageBlob = storageBlob;
        }

        public async Task UpdateTourLegAudio(Guid tourLegId, string modelName, string? style = null, CancellationToken token = default)
        {
            var tourLeg = await TourLegRepository.GetByID(tourLegId, token: token);
            if(tourLeg != null) 
            {
               await StorageBlob.UploadBlob(tourLegId, await TTS.GenerateSpeech(tourLeg.Text, modelName, style, token), token);
            }
        }

        public Task<byte[]?> GetAudio(Guid tourLegId, CancellationToken token = default)
        {
            return StorageBlob.GetBlob(tourLegId, token: token);
        }
    }
}
