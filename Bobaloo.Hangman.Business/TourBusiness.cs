using Bobaloo.Hangman.Business.Core;
using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.TTS;
using Microsoft.Extensions.Configuration;
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
        protected IRepository<HangmanUnitOfWork, Tour, Guid> TourRepository { get; }
        protected IAzureStorageBlob StorageBlob { get; }
        public TourBusiness(IRepository<HangmanUnitOfWork, Tour, Guid> tourRepository, 
            IAzureTTS tts,
            IAzureStorageBlob storageBlob)
        {
            TourRepository = tourRepository;
            TTS = tts;
            StorageBlob = storageBlob;
        }
        
        public async Task UpdateIntroAudio(Guid tourId, string text, string voice, string? style = null, CancellationToken token = default)
        {
            var tour = await TourRepository.GetByID(tourId, token: token);
            if (tour != null)
            {
                await StorageBlob.UploadBlob(tourId, await TTS.GenerateSpeech(text, voice, style, token), token);
            }
        }

        public Task<byte[]?> GetIntroAudio(Guid tourId, CancellationToken token = default)
        {
            return StorageBlob.GetBlob(tourId, token);
        }

    }
}
