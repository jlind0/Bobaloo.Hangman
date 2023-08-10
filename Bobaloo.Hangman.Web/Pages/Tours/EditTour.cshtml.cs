using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.AccessControl;

namespace Bobaloo.Hangman.Web.Pages.Tours
{
    public class EditTourModel : PageModel
    {
        private readonly IRepository<HangmanUnitOfWork, Tour, Guid> _toursRepository;
        public EditTourModel(IRepository<HangmanUnitOfWork, Tour, Guid> toursRepository)
        {
            _toursRepository = toursRepository;
        }
        [BindProperty]
        public Tour? Tour { get; set; }
        [BindProperty]
        public double? Latitude { get; set; }
        [BindProperty]
        public double? Longitude { get; set; }
        public async Task<IActionResult> OnGetAsync(Guid? id, CancellationToken token = default)
        {
            if (id == null)
                return NotFound();
            Tour = await _toursRepository.GetByID(id.Value, token: token);

            if (Tour == null)
                return NotFound();
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
            if (Latitude != null & Longitude != null)
                Tour.StartingPoint = new NetTopologySuite.Geometries.Point(Latitude.Value, Longitude.Value)
                {
                    SRID = 4326
                };
            await _toursRepository.Update(Tour, token: token);
            return Page();
        }
    }
}
