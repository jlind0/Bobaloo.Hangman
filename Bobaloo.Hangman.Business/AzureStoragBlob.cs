using Bobaloo.Hangman.Business.Core;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Specialized;
using Azure.Storage.Blobs.Models;

namespace Bobaloo.Hangman.Business
{
    public class AzureStorageBlob : IAzureStorageBlob
    {
        protected string ConnectionString { get; }
        protected string ContainerName { get; }
        public AzureStorageBlob(IConfiguration config)
        {
            ConnectionString = config["AzureBlob:ConnectionString"] ?? throw new InvalidDataException();
            ContainerName = config["AzureBlob:Container"] ?? throw new InvalidDataException();
        }
        public async Task<byte[]?> GetBlob(Guid id, CancellationToken token = default)
        {
            var blobClient = CreateClient(id);
            if (await blobClient.ExistsAsync(token))
            {
                using (BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync())
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        await blobDownloadInfo.Content.CopyToAsync(memoryStream);
                        return memoryStream.ToArray();
                    }
                }
            }
            return null;
           
        }

        public async Task UploadBlob(Guid id, byte[] data, CancellationToken token = default)
        {
            var blobClient = CreateClient(id);
            using (var stream = new MemoryStream(data))
            {
                await blobClient.UploadAsync(stream, overwrite: true);
            }
        }
        protected BlobClient CreateClient(Guid id)
        {
            var blobServiceClient = new BlobServiceClient(ConnectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(ContainerName);
            return blobContainerClient.GetBlobClient(id.ToString());
        }
    }
}
