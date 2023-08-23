using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Client;
using DynamicData;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using ReactiveUI;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Bobaloo.Hangman.ViewModels
{
    public class MainWindowViewModel : ReactiveObject
    {
        private readonly Interaction<string, Unit> _playFile;
        public Interaction<string, Unit> PlayFile { get => _playFile; }
        private readonly Interaction<string, bool> alert;
        public Interaction<string, bool> Alert => alert;
        public IDispatcherService DispatcherService { get; set; } = null!;
        protected IPublicClientApplication ClientApplication { get; }
        private bool isLoggedIn = false;
        public bool IsLoggedIn
        {
            get => isLoggedIn;
            set => this.RaiseAndSetIfChanged(ref isLoggedIn, value);
        }
        private bool isLoading = false;
        public bool IsLoading
        {
            get => isLoading;
            set => this.RaiseAndSetIfChanged(ref isLoading, value);
        }
        public ReactiveCommand<Unit, Unit> Login { get; }
        public ReactiveCommand<Unit, Unit> Load { get; }
        protected string ApiScope { get; }
        protected ILogger Logger { get; }
        protected IRepositoryClient<Tour, Guid> TourClient { get; }
        public ToursViewModel Tours { get; }
        protected IAudioProxy AudioProxy { get; }
        public MainWindowViewModel(IConfiguration config, IPublicClientApplication clientApplication, 
            ILogger<MainWindowViewModel> logger, IRepositoryClient<Tour, Guid> tourClient, IAudioProxy audioProxy)
        {
            AudioProxy = audioProxy;
            alert = new Interaction<string, bool>();
            ClientApplication = clientApplication;
            Logger = logger;
            Login = ReactiveCommand.CreateFromTask(DoLogin);
            ApiScope = config["MicrosoftGraph:Scopes"] ?? throw new InvalidDataException();
            TourClient = tourClient;
            Load = ReactiveCommand.CreateFromTask(DoLoad);
            Tours = new ToursViewModel(tourClient, this, config, AudioProxy);
            _playFile = new Interaction<string, Unit>();
        }
        protected async Task DoLoad(CancellationToken token = default)
        {
            try
            {
                IsLoading = true;
                await Tours.Load.Execute().GetAwaiter();
            }
            catch(Exception ex)
            {
                await Alert.Handle(ex.Message).GetAwaiter();
            }
            finally
            {
                IsLoading = false;
            }
        }
        protected async Task DoLogin(CancellationToken token = default)
        {
            try
            {
                var result = await ClientApplication.AcquireTokenInteractive(new string[] { ApiScope })
                            .WithPrompt(Prompt.SelectAccount).ExecuteAsync(token);
                IsLoggedIn = !string.IsNullOrEmpty(result.AccessToken);
                await DoLoad(token);
            }
            catch(Exception ex)
            {
                await Alert.Handle(ex.Message).GetAwaiter();
                Logger.LogError(ex, ex.Message);
            }
        }
    }
}
