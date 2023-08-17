using Bobaloo.Hangman.Data.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data
{
    public class TourLegRepository : Repository<TourLeg, Guid>, ITourLegRepository<HangmanUnitOfWork>
    {
        public TourLegRepository(IContextFactory contextFactory) : base(contextFactory)
        {
        }

        public async Task<RepositoryResultSet<TourLeg, Guid>> GetForTour(Guid tourId, HangmanUnitOfWork? work = null, Pager? page = null, Expression<Func<TourLeg, bool>>? filter = null, Func<IQueryable<TourLeg>, IOrderedQueryable<TourLeg>>? orderBy = null, IEnumerable<EntityProperty>? properites = null, CancellationToken token = default)
        {
            RepositoryResultSet<TourLeg, Guid> results = new RepositoryResultSet<TourLeg, Guid>();
            bool hasWork = work != null;
            work ??= new HangmanUnitOfWork(ContextFactory);
            try
            {
                await Use(async (w, t) =>
                {
                    IQueryable<TourLeg> query = w.Context.TourLegs.Where(c => c.TourId == tourId);
                    await HydrateResultsSet(results, query, w, t, page, filter, orderBy, properites);
                }, work, token);
            }
            finally
            {
                if (!hasWork)
                    work.Dispose();
            }
            return results;
        }
    }
}
