using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Identity.Client;
using ReactiveUI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Bobaloo.Hangman.ViewModels
{
    public class MainWindowViewModel : ReactiveObject
    {
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
        public ICommand Login { get; }
        protected string ApiScope { get; }
        protected ILogger Logger { get; }
        public MainWindowViewModel(IConfiguration config, IPublicClientApplication clientApplication, ILogger<MainWindowViewModel> logger)
        {
            alert = new Interaction<string, bool>();
            ClientApplication = clientApplication;
            Logger = logger;
            Login = ReactiveCommand.CreateFromTask(DoLogin);
            ApiScope = config["MicrosoftGraph:Scopes"] ?? throw new InvalidDataException();
        }
        public async Task DoLogin(CancellationToken token = default)
        {
            try
            {
                var result = await ClientApplication.AcquireTokenInteractive(new string[] { ApiScope })
                            .WithPrompt(Prompt.SelectAccount).ExecuteAsync(token);
                IsLoggedIn = true;
            }
            catch(Exception ex)
            {
                await Alert.Handle(ex.StackTrace ?? "No stack trace").GetAwaiter();
                Logger.LogError(ex, ex.Message);
            }
        }
    }
}
