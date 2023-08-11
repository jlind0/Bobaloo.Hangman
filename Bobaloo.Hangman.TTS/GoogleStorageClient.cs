using Microsoft.Extensions.Configuration;
using RTools_NTS.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using NAudio.Wave;
using NAudio.Lame;
using System.Security.Cryptography;
using System.Reflection.PortableExecutable;

namespace Bobaloo.Hangman.TTS
{
    public interface IGoogleStorageClient
    {
        Task<byte[]> FetchAudio(string fileName, byte[]? oldData = null, CancellationToken token = default);
    }
    public class GoogleStorageClient : IGoogleStorageClient
    {
        protected string BaseUri { get; }
        public GoogleStorageClient(IConfiguration config) 
        {
            BaseUri = config["GoogleStorage:BaseUri"] ?? throw new InvalidDataException();
        }
        protected virtual HttpClient CreateClient()
        {
            var client = new HttpClient();
            return client;
        }
        public async Task<byte[]> FetchAudio(string fileName, byte[]? oldData = null, CancellationToken token = default)
        {
            byte[] newData;
            using (var ms = new MemoryStream())
            {
                using (var client = CreateClient())
                {
                    using (var stream = await client.GetStreamAsync(BaseUri + fileName, token))
                    {
                        await stream.CopyToAsync(ms);
                    }
                }

                using (var inputMemoryStream = new MemoryStream(ms.ToArray()))
                using (var reader = new WaveFileReader(inputMemoryStream))
                {
                    using (var outputMemoryStream = new MemoryStream())
                    using (var writer = new LameMP3FileWriter(outputMemoryStream, reader.WaveFormat, LAMEPreset.STANDARD))
                    {
                        await reader.CopyToAsync(writer, token);
                        newData = outputMemoryStream.ToArray();
                    }
                }
            }
            if (oldData == null)
                return newData;
            using var msOld = new MemoryStream(oldData);
            using var msNew = new MemoryStream(newData);
            using var mp3Old = new Mp3FileReader(msOld);
            using var mp3New = new Mp3FileReader(msNew);
            using (var outputMemoryStream = new MemoryStream())
            using (var writer = new LameMP3FileWriter(outputMemoryStream, mp3Old.WaveFormat, LAMEPreset.STANDARD))
            {
                await mp3Old.CopyToAsync(writer, token);
                await mp3New.CopyToAsync(writer, token);
                return outputMemoryStream.ToArray();
            }
        }

    }
}
