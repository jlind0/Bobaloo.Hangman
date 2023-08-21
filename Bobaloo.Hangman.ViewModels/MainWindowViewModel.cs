using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using ReactiveUI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Bobaloo.Hangman.ViewModels
{
    public class MainWindowViewModel : ReactiveObject
    {
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
        public MainWindowViewModel(IConfiguration config, IPublicClientApplication clientApplication)
        {
            ClientApplication = clientApplication;
            Login = ReactiveCommand.CreateFromTask(DoLogin);
            ApiScope = config["MicrosoftGraph:Scopes"] ?? throw new InvalidDataException();
        }
        public async Task DoLogin(CancellationToken token = default)
        {
            
            var result = await ClientApplication.AcquireTokenInteractive(new string[] { ApiScope })
                        .WithPrompt(Prompt.SelectAccount).ExecuteAsync(token)
                        .ConfigureAwait(false);
            await DispatcherService.Dispatch(() => IsLoggedIn = true);
        }
    }
}
