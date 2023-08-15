using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;
using NAudio.Lame;
using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Bobaloo.Hangman.TTS
{
    public interface IAzureTTS
    {
        Task<VoiceInfo[]> GetVoices(CancellationToken token = default);
        Task<byte[]> GenerateSpeech(string text, string voiceName, string? style = null, CancellationToken token = default);
    }
    public class AzureTTS : IAzureTTS
    {
        protected string ApiKey { get; }
        protected string Region { get; }
        public AzureTTS(IConfiguration config) 
        {
            ApiKey = config["AzureSpeech:Key"] ?? throw new InvalidDataException();
            Region = config["AzureSpeech:Region"] ?? throw new InvalidDataException();
        }
        protected SpeechConfig GetConfig()
        {
            return SpeechConfig.FromSubscription(ApiKey, Region);
        }
        public async Task<VoiceInfo[]> GetVoices(CancellationToken token = default)
        {
            var config = GetConfig();
            using(var speech = new SpeechSynthesizer(config))
            {
                var result = await speech.GetVoicesAsync("en-US");
                return result.Voices.ToArray();
            }
        }
        public async Task<byte[]> GenerateSpeech(string text, string voiceName, string? style = null, CancellationToken token = default)
        {
            var config = SpeechConfig.FromSubscription(ApiKey, Region);
            config.SpeechSynthesisVoiceName = voiceName;
            using (var speech = new SpeechSynthesizer(config))
            {
                string saml = null; 
                if(!string.IsNullOrWhiteSpace(style))
                    saml = $"<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"https://www.w3.org/2001/mstts\" xml:lang=\"zh-CN\"><voice name=\"{voiceName}\"><mstts:express-as style=\"{style}\" styledegree=\"1\">{text}</mstts:express-as></voice></speak>";
                SpeechSynthesisResult result;
                if(saml != null)
                    result = await speech.SpeakSsmlAsync(saml);
                else 
                    result = await speech.SpeakTextAsync(text);
                if (result.Reason == ResultReason.SynthesizingAudioCompleted)
                {
                    using (var inputMemoryStream = new MemoryStream(result.AudioData))
                    using (var reader = new WaveFileReader(inputMemoryStream))
                    {
                        using (var outputMemoryStream = new MemoryStream())
                        using (var writer = new LameMP3FileWriter(outputMemoryStream, reader.WaveFormat, LAMEPreset.STANDARD))
                        {
                            await reader.CopyToAsync(writer, token);
                            return outputMemoryStream.ToArray();
                        }
                    }
                }
                throw new InvalidOperationException();
            }
        }
    }
}
