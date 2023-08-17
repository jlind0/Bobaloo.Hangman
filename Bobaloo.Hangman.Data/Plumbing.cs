using Azure;
using Bobaloo.Hangman.Data.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data
{
    public interface IContextFactory
    {
        HangmantoursContext CreateContext();
    }
    public class ContextFactory : IContextFactory
    {
        protected IConfiguration Config { get; }
        public ContextFactory(IConfiguration config)
        {
            Config = config;
        }

        public HangmantoursContext CreateContext()
        {
            return new HangmantoursContext(Config);
        }
    }
    public class HangmanUnitOfWork : UnitOfWork
    {
        internal HangmantoursContext Context { get; }
        public HangmanUnitOfWork(IContextFactory factory)
        {
            Context = factory.CreateContext();
        }
        public override Task Save(CancellationToken token = default)
        {
            return Context.SaveChangesAsync(token);
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
                Context.Dispose();
            base.Dispose(disposing);
        }
    }
    public class Repository<TEntity, TKey> : IRepository<HangmanUnitOfWork, TEntity, TKey>
       where TEntity : Entity<TKey>, new()
    {
        public virtual HangmanUnitOfWork CreateUnitOfWork()
        {
            return new HangmanUnitOfWork(ContextFactory);
        }
        protected IContextFactory ContextFactory { get; private set; }
        public Repository(IContextFactory contextFactory)
        {
            ContextFactory = contextFactory;
        }
        protected async Task Use(Func<HangmanUnitOfWork, CancellationToken, Task> worker,
            HangmanUnitOfWork? work = null, CancellationToken token = default,
            bool saveChanges = false)
        {
            bool hasWork = work != null;
            work ??= new HangmanUnitOfWork(ContextFactory);
            try
            {
                await worker(work, token);
            }
            finally
            {
                if (!hasWork)
                {
                    if (saveChanges)
                        await work.Save(token);
                    work.Dispose();
                }
            }
        }
        public virtual Task Delete(TKey key, HangmanUnitOfWork? work = null, CancellationToken token = default)
        {
            return Use(async (w, t) =>
            {
                TEntity? entity = await w.Context.FindAsync<TEntity>(key, token);
                if (entity != null)
                    await Delete(entity, w, t);
            }, work, token, true);

        }
        public virtual Task Delete(TEntity entity, HangmanUnitOfWork? work = null, CancellationToken token = default)
        {
            return Use((w, t) =>
            {
                w.Context.Remove(entity);
                return Task.CompletedTask;
            }, work, token, true);
        }
        protected virtual async Task HydrateResultsSet(RepositoryResultSet<TEntity, TKey> results, 
            IQueryable<TEntity> query, 
            HangmanUnitOfWork w,
            CancellationToken t,
            Pager? page = null,
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            IEnumerable<EntityProperty>? properites = null)
        {
            if (filter != null)
            {
                query = query.Where(filter);
            }
            if (properites != null)
            {
                foreach (var propExp in properites.Select(e => e.Name))
                    query = query.Include(propExp);
            }
            if (page != null)
            {
                int skip = page.Value.Size * (page.Value.Page - 1);
                int take = page.Value.Size;
                results.PageSize = page.Value.Size;
                results.Page = page.Value.Page;
                results.Count = await query.CountAsync(t);
                if (orderBy != null)
                    results.Entities = await orderBy(query).Skip(skip).Take(take).ToArrayAsync(t);
                else
                    results.Entities = await query.Skip(skip).Take(take).ToArrayAsync(t);
            }
            else if (orderBy != null)
                results.Entities = await orderBy(query).ToArrayAsync(t);
            else
                results.Entities = await query.ToArrayAsync(t);
        }
        public virtual async Task<RepositoryResultSet<TEntity, TKey>> Get(HangmanUnitOfWork? work = null,
            Pager? page = null,
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            IEnumerable<EntityProperty>? properites = null, CancellationToken token = default)
        {
            RepositoryResultSet<TEntity, TKey> results = new RepositoryResultSet<TEntity, TKey>();
            bool hasWork = work != null;
            work ??= new HangmanUnitOfWork(ContextFactory);
            try
            {
                await Use(async (w, t) =>
                {
                    IQueryable<TEntity> query = w.Context.Set<TEntity>();
                    await HydrateResultsSet(results,query, w, t, page, filter, orderBy, properites);
                }, work, token);
            }
            finally
            {
                if (!hasWork)
                    work.Dispose();
            }
            return results;
        }

        public virtual async Task<TEntity?> GetByID(TKey key, HangmanUnitOfWork? work = null, IEnumerable<EntityProperty>? properites = null, CancellationToken token = default)
        {
            TEntity? entity = null;
            await Use(async (w, t) =>
            {
                entity = await w.Context.FindAsync<TEntity>(key, t);
                if (entity != null && properites != null)
                    foreach (var prop in properites)
                    {

                        if (prop.IsCollection)
                            await w.Context.Entry(entity).Collection(prop.Name).LoadAsync(t);
                        else
                            await w.Context.Entry(entity).Reference(prop.Name).LoadAsync(t);
                    }
            }, work, token);
            return entity;
        }

        public virtual Task Add(TEntity entity, HangmanUnitOfWork? work = null, CancellationToken token = default)
        {
            return Use(async (w, t) =>
            {
                await w.Context.AddAsync(entity, t);
            }, work, token, true);
        }

        public virtual Task Update(TEntity entity, HangmanUnitOfWork? work = null, CancellationToken token = default)
        {
            return Use((w, t) =>
            {
                w.Context.Update(entity);
                return Task.CompletedTask;
            }, work, token, true);
        }

        public virtual async Task<int> Count(HangmanUnitOfWork? work = null,
            Expression<Func<TEntity, bool>>? filter = null,
            CancellationToken token = default)
        {
            int count = 0;
            await Use(async (w, t) =>
            {
                IQueryable<TEntity> query = w.Context.Set<TEntity>();
                if (filter != null)
                    query = query.Where(filter);

                count = await query.CountAsync(t);
            }, work, token);
            return count;
        }

    }
}
