using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using NetTopologySuite.Geometries;

namespace Bobaloo.Hangman.Web.Pages.Tours
{
    public class AddTourModel : PageModel
    {
        [BindProperty]
        public double? Latitude { get; set; }
        [BindProperty]
        public double? Longitude { get; set; }
        private readonly IRepository<HangmanUnitOfWork, Tour, Guid> _toursRepository;
        [BindProperty]
        public Tour Tour { get; set; } = null!;
        public AddTourModel(IRepository<HangmanUnitOfWork, Tour, Guid> toursRepository)
        {
            _toursRepository = toursRepository;
        }

        public IActionResult OnGet()
        {
            Tour = new Tour();
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(CancellationToken token = default)
        {
            if (!ModelState.IsValid)
                return Page();
            if (Latitude != null && Longitude != null)
                Tour.StartingPoint = new Point(Latitude.Value, Longitude.Value)
                {
                    SRID = 4326
                };
            await _toursRepository.Add(Tour, token: token);
            return Redirect($"~/Tours/Edit/{Tour.TourId}");
        }
    }
}
