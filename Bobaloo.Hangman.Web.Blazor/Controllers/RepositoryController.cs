using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.Web.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web.Resource;
using Newtonsoft.Json.Serialization;

namespace Bobaloo.Hangman.Web.Blazor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public abstract class RepositoryController<TUnitofWork, TEntity, TKey> : ControllerBase
        where TEntity : Entity<TKey>, new()
        where TUnitofWork: UnitOfWork
    {
        
        protected IRepository<TUnitofWork, TEntity, TKey> Repository { get; }
        public RepositoryController(IRepository<TUnitofWork, TEntity, TKey> repository)
        {
            Repository = repository;
        }
        [HttpGet("results/{page}/size={pageSize}")]
        [HttpGet("results/{page}/size={pageSize}/sort={orderBy}")]
        [HttpGet("results/{page}/size={pageSize}/sort={orderBy}/props={includes}")]
        [HttpGet("results/{page}/size={pageSize}/props={includes}")]
        public virtual async Task<RepositoryResultSet<TEntity, TKey>> Results(int page, int pageSize, string? orderBy = null, string? includes = null, CancellationToken token = default)
        {

            using (var uow = Repository.CreateUnitOfWork())
            {
                int count = await Repository.Count(uow, token: token);
                Pager pager = new Pager()
                {
                    Page = page,
                    Size = pageSize
                };
                Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderClause = null;
                if (orderBy != null)
                {
                    var orderData = orderBy.Split(',').Select(x => x.Split(':')).Select(x => new { ColumnName = x[0], Dsc = x[1].ToLower() == "dsc" });
                    var orderFirst = orderData.First();
                    var orderSecond = orderData.Skip(1).First();
                    orderClause = orderFirst.Dsc ? q => q.OrderByDescending(e => EF.Property<object>(e, orderFirst.ColumnName)) :
                        q => q.OrderBy(e => EF.Property<object>(e, orderFirst.ColumnName));
                    foreach (var od in orderData.Skip(1))
                    {

                    }

                }
                List<EntityProperty> props = new List<EntityProperty>();
                if (includes != null)
                {
                    foreach (var include in includes.Split(','))
                    {
                        var i = include.Split(':');
                        props.Add(new EntityProperty(i[0], i[1].ToLower() == "col"));
                    }
                }
                var data = await Repository.Get(uow, pager, properites:
                    includes != null ? props : null,
                    orderBy: orderClause, token: token);
                return data;
            }

        }

        [HttpGet("{id}")]
        [HttpGet("{id}/props={includes}")]
        public virtual Task<TEntity?> Get(TKey id, string? includes = null, CancellationToken token = default)
        {
            List<EntityProperty> props = new List<EntityProperty>();
            if (includes != null)
            {
                foreach (var include in includes.Split(','))
                {
                    var i = include.Split(':');
                    props.Add(new EntityProperty(i[0], i[1].ToLower() == "col"));
                }
            }
            return Repository.GetByID(id, properites: props, token: token);
        }
        [HttpPost]
        public virtual async Task<TEntity> Add([FromBody] TEntity entity, CancellationToken token = default)
        {
            await Repository.Add(entity, token: token);
            return entity;
        }
        [HttpPut]
        public virtual async Task<TEntity> Update([FromBody] TEntity entity, CancellationToken token = default)
        {
            await Repository.Update(entity, token: token);
            return entity;
        }
        [HttpDelete("{id}")]
        public virtual Task Delete(TKey id, CancellationToken token = default)
        {
            return Repository.Delete(id, token: token);
        }

    }
    
}
