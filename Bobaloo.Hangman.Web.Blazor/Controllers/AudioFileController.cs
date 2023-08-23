using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bobaloo.Hangman.Web.Authorization;
using Bobaloo.Hangman.Business.Core;
using Microsoft.Identity.Web.Resource;

namespace Bobaloo.Hangman.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class AudioController : ControllerBase
    {
        protected ITourBusiness TourBusiness { get; }
        protected ITourLegBusiness TourLegBusiness { get; }
        
        protected ITourLegRepository<HangmanUnitOfWork> TourLegRepository { get; }
        protected IHttpContextAccessor ContextAccessor { get; }
        public AudioController(ITourBusiness tourBusiness, ITourLegBusiness tourLegBusiness, ITourLegRepository<HangmanUnitOfWork> tourLegRepository, IHttpContextAccessor contextAccessor)
        {
            TourBusiness = tourBusiness;
            TourLegBusiness = tourLegBusiness;
            ContextAccessor = contextAccessor;
            TourLegRepository = tourLegRepository;
        }

        [HttpGet("tours/{tourId}")]
        public async Task<IActionResult> GetTourAudio(Guid tourId, CancellationToken token = default)
        {
            var tourData = await TourBusiness.GetIntroAudio(tourId, token);
            if(tourData != null)
                return File(tourData, "audio/mpeg");
            return NotFound();
        }
        [HttpGet("tours/legs/{tourLegId}")]
        public async Task<IActionResult> GetTourLegAudio(Guid tourLegId, CancellationToken token = default)
        {
            var tourLeg = await TourLegRepository.GetByID(tourLegId, token: token);
            if (tourLeg != null)
            {
                if (ContextAccessor.HttpContext?.User.HasSubscription(tourLeg.TourId) != true)
                    return Unauthorized();
                var legData = await TourLegBusiness.GetAudio(tourLeg.TourLegId, token);
                if(legData != null)
                    return File(legData, "audio/mpeg");
            }
            return NotFound();
        }
    }
}
