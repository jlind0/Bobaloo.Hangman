using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Business.Core
{
    public interface ITourLegBusiness
    {
        public Task UpdateTourLegAudio(Guid tourLegId, string modelName, string? style = null, CancellationToken token = default);
    }
}
