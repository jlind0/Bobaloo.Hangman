using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Client
{
    public interface IAudioProxy
    {
        Task<byte[]?> GetIntroAudio(Guid tourId, CancellationToken token = default);
        Task<byte[]?> GetTourLegAudio(Guid tourLegId, CancellationToken token = default);
    }
    public class AudioProxy : IAudioProxy
    {
        protected IHttpClientFactory ClientFactory { get; }
        public AudioProxy(IHttpClientFactory clientFactory)
        {
            ClientFactory = clientFactory;
        }
        public async Task<byte[]?> GetIntroAudio(Guid tourId, CancellationToken token = default)
        {
            using(var client = await ClientFactory.Create(token))
            {
                var url = $"audio/tours/{tourId}";
                var resp = await client.GetAsync(url, token);
                if(resp.IsSuccessStatusCode)
                {
                    using (var stream = resp.Content.ReadAsStream(token))
                    {
                        using (var ms = new MemoryStream())
                        {
                            await stream.CopyToAsync(ms, token);
                            return ms.ToArray();
                        }
                    }
                }
            }
            return null;
        }

        public async Task<byte[]?> GetTourLegAudio(Guid tourLegId, CancellationToken token = default)
        {
            using (var client = await ClientFactory.Create(token))
            {
                var url = $"audio/tours/legs/{tourLegId}";
                var resp = await client.GetAsync(url, token);
                if (resp.IsSuccessStatusCode)
                {
                    using (var stream = resp.Content.ReadAsStream(token))
                    {
                        using (var ms = new MemoryStream())
                        {
                            await stream.CopyToAsync(ms, token);
                            return ms.ToArray();
                        }
                    }
                }
            }
            return null;
        }
    }
}
