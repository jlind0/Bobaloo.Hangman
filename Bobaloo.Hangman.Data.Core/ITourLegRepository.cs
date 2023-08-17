using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Core
{
    public interface ITourLegRepository<TUnitOfWork> : IRepository<TUnitOfWork, TourLeg, Guid>
        where TUnitOfWork : UnitOfWork
    {
        Task<RepositoryResultSet<TourLeg, Guid>> GetForTour(Guid tourId, TUnitOfWork? work = null,
            Pager? page = null,
            Expression<Func<TourLeg, bool>>? filter = null,
            Func<IQueryable<TourLeg>, IOrderedQueryable<TourLeg>>? orderBy = null,
            IEnumerable<EntityProperty>? properites = null,
            CancellationToken token = default);
    }
}
