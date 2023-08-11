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
    public class AudioFileController : ControllerBase
    {
        protected IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> TourRepository { get; }
        public AudioFileController(IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid> tourRepository)
        {
            TourRepository = tourRepository;
        }

        [HttpGet("Tours/{tourId}")]
        public async Task<IActionResult> GetTourAudio(Guid tourId, CancellationToken token = default)
        {
            var tour = await TourRepository.GetByID(tourId, token: token);
            if(tour != null && tour.IntroductionAudio != null)
                return File(tour.IntroductionAudio, "audio/mpeg");
            return NotFound();
        }
    }
}
