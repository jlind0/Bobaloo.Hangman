using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Security.AccessControl;

namespace Bobaloo.Hangman.Web.Pages.Tours
{
    public class EditTourModel : PageModel
    {
        private readonly IRepository<HangmanUnitOfWork, Tour, Guid> _toursRepository;
        private readonly IRepository<HangmanUnitOfWork, VoiceActor, int> _voiceActorRepository;
        public EditTourModel(IRepository<HangmanUnitOfWork, Tour, Guid> toursRepository, IRepository<HangmanUnitOfWork, VoiceActor, int> voiceActorRepository)
        {
            _toursRepository = toursRepository;
            _voiceActorRepository = voiceActorRepository;
        }
        [BindProperty]
        public Tour Tour { get; set; } = null!;
        [BindProperty]
        public double? Latitude { get; set; }
        [BindProperty]
        public double? Longitude { get; set; }

        public IEnumerable<SelectListItem> VoiceActors { get; set; } = null!;
        public async Task<IActionResult> OnGetAsync(Guid? id, CancellationToken token = default)
        {
            if (id == null)
                return NotFound();
            Tour = await _toursRepository.GetByID(id.Value, token: token) ?? throw new InvalidDataException();
            VoiceActors = (await _voiceActorRepository.Get(token: token))
                .Select(c => new SelectListItem(c.Name, c.FakeYouModelName));
            if (Tour.StartingPoint != null)
            {
                Latitude = Tour.StartingPoint.X;
                Longitude = Tour.StartingPoint.Y;
            }
            return Page();
        }
        public async Task<IActionResult> OnPostAsync(CancellationToken token = default)
        {
            if (Tour == null)
                return NotFound();
            if (Latitude != null && Longitude != null)
                Tour.StartingPoint = new NetTopologySuite.Geometries.Point(Latitude.Value, Longitude.Value)
                {
                    SRID = 4326
                };
            await _toursRepository.Update(Tour, token: token);
            return Page();
        }
    }
}
