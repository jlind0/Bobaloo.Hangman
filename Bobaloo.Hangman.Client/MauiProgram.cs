using System.Reflection;
using Microsoft.Extensions.Configuration;
using Telerik.Maui.Controls.Compatibility;
using Microsoft.Identity.Client;
using Bobaloo.Hangman.ViewModels;
using Microsoft.Extensions.Logging;
using CommunityToolkit.Maui;
using Bobaloo.Hangman.Data.Client;
using Bobaloo.Hangman.Data;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]

namespace Bobaloo.Hangman.Client
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseTelerik().UseMauiCommunityToolkit().UseMauiCommunityToolkitMediaElement()
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });
#if DEBUG
            builder.Logging.AddDebug();
#endif
            var a = Assembly.GetExecutingAssembly();
            using (var stream = a.GetManifestResourceStream("Bobaloo.Hangman.Client.appsettings.json"))
            {

                builder.Configuration.AddJsonStream(stream);
            }
            builder.Services.AddSingleton(provider =>
            {
                var client = PublicClientApplicationBuilder.Create(builder.Configuration["AzureAD:ClientId"])
                .WithB2CAuthority(builder.Configuration["AzureAD:Authority"])
#if WINDOWS
                .WithRedirectUri(builder.Configuration["AzureAD:RedirectURI"]) // needed only for the system browser
#elif IOS
                .WithRedirectUri(builder.Configuration["AzureAD:iOSRedirectURI"])
                .WithIosKeychainSecurityGroup(builder.Configuration["AzureAD:iOSKeyChainGroup"])
#elif MACCATALYST
                .WithRedirectUri(builder.Configuration["AzureAD:iOSRedirectURI"])
#endif                
                .Build();
                string fileName = Path.Join(FileSystem.CacheDirectory, "msal.token.cache2");
                client.UserTokenCache.SetBeforeAccessAsync(async args =>
                {
                    if (!(await FileSystem.Current.AppPackageFileExistsAsync(fileName)))
                        return;
                    byte[] fileBytes;
                    try
                    {
                        using (var stream = new FileStream(fileName, FileMode.Open))
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await stream.CopyToAsync(memoryStream);
                                fileBytes = memoryStream.ToArray();
                            }
                        }
                        args.TokenCache.DeserializeMsalV3(fileBytes);
                    }
                    catch(Exception ex)
                    {
                        throw;
                    }
                });
                client.UserTokenCache.SetAfterAccessAsync(async args =>
                {
                    if (args.HasStateChanged)
                    {
                        var data = args.TokenCache.SerializeMsalV3();
                        using (var fs = new FileStream(fileName, FileMode.Create, FileAccess.Write))
                        {
                            await fs.WriteAsync(data, 0, data.Length);
                        }
                    }
                });
                return client;

            });
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
            builder.Services.AddSingleton<IHttpClientFactory, RepositoryHttpClientFactory>();
            builder.Services.AddSingleton<IRepositoryClient<Tour, Guid>, RepositoryClient<Tour, Guid>>();
            builder.Services.AddSingleton<IAudioProxy, AudioProxy>();
            builder.Services.AddScoped<MainWindowViewModel>();
            builder.Services.AddTransient<MainPage>();
            return builder.Build();
        }
    }
   
}