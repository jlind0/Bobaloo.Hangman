using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Business.Core
{
    public interface ITourBusiness
    {
        Task UpdateIntroAudio(Guid tourId, string text, string voice, string? style = null, CancellationToken token = default);
    }
}
