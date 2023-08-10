using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Identity.Web;
using System.Net;
using Microsoft.Graph;
using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;

namespace Bobaloo.Hangman.Web.Pages
{
    [AuthorizeForScopes(ScopeKeySection = "MicrosoftGraph:Scopes")]
    public class IndexModel : PageModel
    {
        private readonly GraphServiceClient _graphServiceClient;
        private readonly ILogger<IndexModel> _logger;
        private readonly IRepository<HangmanUnitOfWork, Tour, Guid> _toursRepository;
        public IEnumerable<Tour> Tours { get; set; }
        public IndexModel(ILogger<IndexModel> logger, GraphServiceClient graphServiceClient,
            IRepository<HangmanUnitOfWork, Tour, Guid> toursRepository)
        {
            _logger = logger;
            _graphServiceClient = graphServiceClient;
            _toursRepository = toursRepository;
        }

        public async Task OnGet(CancellationToken token = default)
        {
            Tours = await _toursRepository.Get(token: token);
            var user = await _graphServiceClient.Me.Request().GetAsync();;
            ViewData["GraphApiResult"] = user.DisplayName;;

        }
    }
}