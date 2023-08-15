using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bobaloo.Hangman.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AudioController : ControllerBase
    {
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        protected IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> TourLegRepository { get; }
        public AudioController(IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository, 
            IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> tourLegRepostory)
        {
            TourRepository = tourRepository;
            TourLegRepository = tourLegRepostory;
        }

        [HttpGet("tours/{tourId}")]
        public async Task<IActionResult> GetTourAudio(Guid tourId, CancellationToken token = default)
        {
            var tour = await TourRepository.GetByID(tourId, token: token);
            if(tour != null && tour.IntroductionAudio != null)
                return File(tour.IntroductionAudio, "audio/mpeg");
            return NotFound();
        }
        [HttpGet("tours/legs/{tourLegId}")]
        public async Task<IActionResult> GetTourLegAudio(Guid tourLegId, CancellationToken token = default)
        {
            var tourLeg = await TourLegRepository.GetByID(tourLegId, token: token);
            if (tourLeg != null && tourLeg.Audio != null)
                return File(tourLeg.Audio, "audio/mpeg");
            return NotFound();
        }
    }
}
