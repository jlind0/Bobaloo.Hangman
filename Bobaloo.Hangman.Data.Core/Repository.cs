using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Core
{
    
    public abstract class UnitOfWork : IDisposable
    {
        private bool disposedValue;

        public abstract Task Save(CancellationToken token = default);

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {

                disposedValue = true;
            }
        }
        

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
    public interface IRepository<TUnitOfWork>
        where TUnitOfWork: UnitOfWork
    {
        TUnitOfWork CreateUnitOfWork();
        

    }
    public interface IIRepository<TUnitOfWork, in TEntity, TKey> : IRepository<TUnitOfWork>
        where TEntity : Entity<TKey>, new()
        where TUnitOfWork: UnitOfWork
    {
        Task Delete(TKey id, TUnitOfWork? work = null, CancellationToken token = default);
        Task Delete(TEntity entity, TUnitOfWork? work = null, CancellationToken token = default);
        Task Add(TEntity entity, TUnitOfWork? work = null, CancellationToken token = default);
        Task Update(TEntity entity, TUnitOfWork? work = null, CancellationToken token = default);
    }
    public struct EntityProperty
    {
        public string Name { get; }
        public bool IsCollection { get; }
        public EntityProperty(string name, bool isCollection = false)
        {
            Name = name;
            IsCollection = isCollection;
        }
    }
    public interface IRepository<TUnitOfWork, TEntity, TKey> : IIRepository<TUnitOfWork, TEntity, TKey>
        where TEntity : Entity<TKey>, new()
        where TUnitOfWork : UnitOfWork
    {
        Task<IEnumerable<TEntity>> Get(TUnitOfWork? work = null,
            Pager? page = null,
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            IEnumerable<EntityProperty>? properites = null,
            CancellationToken token = default);
        Task<int> Count(TUnitOfWork? work = null,
            Expression<Func<TEntity, bool>>? filter = null,
            CancellationToken token = default);
        Task<TEntity?> GetByID(TKey key, TUnitOfWork? work = null,
            IEnumerable<EntityProperty>? properites = null, CancellationToken token = default);

    }
}
