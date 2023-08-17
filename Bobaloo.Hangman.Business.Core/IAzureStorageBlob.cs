using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Business.Core
{
    public interface IAzureStorageBlob
    {
        Task<byte[]?> GetBlob(Guid id, CancellationToken token = default);
        Task UploadBlob(Guid id, byte[] data, CancellationToken token = default);
    }
}
