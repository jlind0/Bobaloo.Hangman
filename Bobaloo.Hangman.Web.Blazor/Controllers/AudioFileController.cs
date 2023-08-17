using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bobaloo.Hangman.Web.Authorization;

namespace Bobaloo.Hangman.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AudioController : ControllerBase
    {
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        protected IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> TourLegRepository { get; }
        protected IHttpContextAccessor ContextAccessor { get; }
        public AudioController(IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository, 
            IRepository<HangmanUnitOfWork, TourLegWithBinaryData, Guid> tourLegRepostory, IHttpContextAccessor contextAccessor)
        {
            TourRepository = tourRepository;
            TourLegRepository = tourLegRepostory;
            ContextAccessor = contextAccessor;
        }

        [HttpGet("tours/{tourId}")]
        public async Task<IActionResult> GetTourAudio(Guid tourId, CancellationToken token = default)
        {
            if (ContextAccessor.HttpContext?.User.HasSubscription(tourId) != true)
                return Unauthorized();
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
            {
                if (ContextAccessor.HttpContext?.User.HasSubscription(tourLeg.TourId) != true)
                    return Unauthorized();
                return File(tourLeg.Audio, "audio/mpeg");
            }
            return NotFound();
        }
    }
}
