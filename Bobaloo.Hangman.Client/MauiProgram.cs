﻿using System.Reflection;
using Microsoft.Extensions.Configuration;
using Telerik.Maui.Controls.Compatibility;
using Microsoft.Identity.Client;
using Bobaloo.Hangman.ViewModels;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]

namespace Bobaloo.Hangman.Client
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseTelerik()
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });
            var a = Assembly.GetExecutingAssembly();
            using (var stream = a.GetManifestResourceStream("Bobaloo.Hangman.Client.appsettings.json"))
            {

                builder.Configuration.AddJsonStream(stream);
            }
            builder.Services.AddSingleton(provider =>
            {
                return PublicClientApplicationBuilder.Create(builder.Configuration["AzureAD:ClientId"])
                .WithB2CAuthority(builder.Configuration["AzureAD:Authority"])
                .WithRedirectUri(builder.Configuration["AzureAD:RedirectURI"]) // needed only for the system browser
                .Build();

            });
            builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
            builder.Services.AddScoped<MainWindowViewModel>();
            builder.Services.AddTransient<MainPage>();
            return builder.Build();
        }
    }
}