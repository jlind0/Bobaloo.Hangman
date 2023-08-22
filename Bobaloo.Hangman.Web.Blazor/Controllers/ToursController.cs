using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Web.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SkiaSharp;

namespace Bobaloo.Hangman.Web.Blazor.Controllers
{
    public class TourController : RepositoryController<HangmanUnitOfWork, Tour, Guid>
    {
        public TourController(IRepository<HangmanUnitOfWork, Tour, Guid> repository) : base(repository)
        {
        }
        public override Task Delete(Guid id, CancellationToken token = default)
        {
            if (HttpContext.User.IsAdmin())
                return base.Delete(id, token);
            else
                throw new UnauthorizedAccessException();
        }
        public override Task<Tour> Add([FromBody] Tour entity, CancellationToken token = default)
        {
            if (!HttpContext.User.IsAdmin())
                throw new UnauthorizedAccessException();
            return base.Add(entity, token);
        }
        public override Task<Tour> Update([FromBody] Tour entity, CancellationToken token = default)
        {
            if (!HttpContext.User.IsAdmin())
                throw new UnauthorizedAccessException();
            return base.Update(entity, token);
        }
        [HttpPost("thumbnail/{id}")]
        public async Task<IActionResult> UploadThumbnail([FromRoute] Guid id, [FromForm] IFormFile file, CancellationToken token = default)
        {
            if (!HttpContext.User.IsAdmin())
                return Unauthorized();
            var tour = await Repository.GetByID(id, token: token);
            if (tour == null)
                return NotFound();
            
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms, token);
                using (SKBitmap sourceBitmap = SKBitmap.Decode(ms.ToArray()))
            {
                    using (SKData compressedData = sourceBitmap.Encode(SKEncodedImageFormat.Jpeg, 100))
                    {
                        tour.Thumbnail = compressedData.ToArray();
                    }
                }
            }
            await Repository.Update(tour);
            return Ok();
        }
    }
}
