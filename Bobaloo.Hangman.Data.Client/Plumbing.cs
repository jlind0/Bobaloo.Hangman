using Bobaloo.Hangman.Data.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using System.Net.Http.Json;
using System.Text.Json;
using AuthenticationHeaderValue = System.Net.Http.Headers.AuthenticationHeaderValue;
using MediaTypeWithQualityHeaderValue = System.Net.Http.Headers.MediaTypeWithQualityHeaderValue;

namespace Bobaloo.Hangman.Data.Client
{
    public interface IRepositoryClient<TKey>
    {
        Task Delete(TKey id, CancellationToken token = default);
    }
    public interface IHttpClientFactory
    {
        Task<HttpClient> Create(CancellationToken token = default);
    }
    public struct OrderBy
    {
        public string ColumnName { get; set; }
        public bool IsDsc { get; set; }
    }
    public class RepositoryHttpClientFactory : IHttpClientFactory
    {
        protected Uri BaseUri { get; }
        protected IPublicClientApplication ClientApplication { get; }
        protected string ApiScope { get; }
        protected string SignInSignOutPolicy { get; }
        public RepositoryHttpClientFactory(IConfiguration config, IPublicClientApplication clientApplication)
        {
            BaseUri = new Uri(config["Hangman:APIBaseUri"] ?? throw new InvalidDataException());
            ClientApplication = clientApplication;
            ApiScope = config["MicrosoftGraph:Scopes"] ?? throw new InvalidDataException();
            SignInSignOutPolicy = config["AzureAD:SignUpSignInPolicyId"] ?? throw new InvalidDataException();
        }
        public async Task<HttpClient> Create(CancellationToken token = default)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = BaseUri;
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var accounts = (await ClientApplication.GetAccountsAsync(SignInSignOutPolicy)).ToList();
            var result = await ClientApplication.AcquireTokenSilent(new string[] { ApiScope }, accounts.First()).ExecuteAsync();
            if (string.IsNullOrWhiteSpace(result.AccessToken))
                throw new InvalidProgramException();
            client.DefaultRequestHeaders.Authorization =
                            new AuthenticationHeaderValue("Bearer", result.AccessToken);
            return client;
        }
    }
    public interface IRepositoryClient<TEntity, TKey> : IRepositoryClient<TKey>
        where TEntity : Entity<TKey>, new()
    {
        Task<TEntity?> Get(TKey id, IEnumerable<EntityProperty>? props = null, CancellationToken token = default);
        Task<TEntity> Add(TEntity entity, CancellationToken token = default);
        Task<TEntity> Update(TEntity entity, CancellationToken token = default);
        Task<RepositoryResultSet<TEntity, TKey>?> GetAll(Pager page,
            IEnumerable<OrderBy>? orderBy = null, IEnumerable<EntityProperty>? props = null, CancellationToken token = default);
    }
    public class RepositoryClient<TEntity, TKey> : IRepositoryClient<TEntity, TKey>
        where TEntity : Entity<TKey>, new()
    {
        protected IHttpClientFactory ClientFactory { get; }
        public RepositoryClient(IHttpClientFactory httpClientFactory)
        {

            ClientFactory = httpClientFactory;

        }

        public virtual async Task<TEntity> Add(TEntity entity, CancellationToken token = default)
        {
            using (var client = await ClientFactory.Create())
            {
                var repositoryName = typeof(TEntity).Name.ToLower();
                var url = $"{repositoryName}/";
                var response = await client.PostAsJsonAsync(url, entity, GetSerializerOptions(), token);
                if (response.IsSuccessStatusCode)
                    entity = (await response.Content.ReadFromJsonAsync<TEntity>(GetSerializerOptions(), token)) ?? throw new InvalidDataException();
            }
            return entity;
        }

        public virtual async Task Delete(TKey id, CancellationToken token = default)
        {
            using (var client = await ClientFactory.Create())
            {
                var repositoryName = typeof(TEntity).Name.ToLower();
                var url = $"{repositoryName}/{id}";
                await client.DeleteAsync(url, token);
            }
        }


        public virtual async Task<TEntity?> Get(TKey id, IEnumerable<EntityProperty>? props = null, CancellationToken token = default)
        {
            TEntity? entity = null;
            using (var client = await ClientFactory.Create())
            {
                var repositoryName = typeof(TEntity).Name.ToLower();
                var url = $"{repositoryName}/{id}";
                if (props != null)
                    url += "/props=" + string.Join(",", props.Select(c => c.Name + ":" + (c.IsCollection ? "col" : "ref")));
                var response = await client.GetAsync(url, token);
                if (response.IsSuccessStatusCode)
                    entity = await response.Content.ReadFromJsonAsync<TEntity>(GetSerializerOptions(), token);
            }
            return entity;
        }
        protected virtual JsonSerializerOptions GetSerializerOptions()
        {
            JsonSerializerOptions options = new JsonSerializerOptions();
            options.Converters.Clear();
            options.Converters.Add(new NetTopologySuite.IO.Converters.GeoJsonConverterFactory());
            options.PropertyNameCaseInsensitive = true;
            return options;
        }
        public virtual async Task<RepositoryResultSet<TEntity, TKey>?> GetAll(Pager page,
            IEnumerable<OrderBy>? orderBy = null, IEnumerable<EntityProperty>? props = null, CancellationToken token = default)
        {
            RepositoryResultSet<TEntity, TKey>? result = null;
            using (var client = await ClientFactory.Create())
            {
                var repositoryName = typeof(TEntity).Name.ToLower();
                var url = $"{repositoryName}/results/{page.Page}/size={page.Size}";
                if (orderBy != null)
                    url += "/sort=" + string.Join(",", orderBy.Select(c => $"{c.ColumnName}:{(c.IsDsc ? "dsc" : "asc")}"));
                if (props != null)
                    url += "/props=" + string.Join(",", props.Select(c => c.Name + ":" + (c.IsCollection ? "col" : "ref")));
                HttpResponseMessage response = await client.GetAsync(url, token);
                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadFromJsonAsync<RepositoryResultSet<TEntity, TKey>>(GetSerializerOptions(), token);
                }
            }
            return result;
        }

        public virtual async Task<TEntity> Update(TEntity entity, CancellationToken token = default)
        {
            using (var client = await ClientFactory.Create())
            {
                var repositoryName = typeof(TEntity).Name.ToLower();
                var url = $"{repositoryName}/";
                var response = await client.PutAsJsonAsync(url, entity, GetSerializerOptions(), token);
                if (response.IsSuccessStatusCode)
                    entity = (await response.Content.ReadFromJsonAsync<TEntity>(GetSerializerOptions(), token)) ?? throw new InvalidDataException();
            }
            return entity;
        }

    }
}
