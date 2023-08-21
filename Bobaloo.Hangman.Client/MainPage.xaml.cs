using Bobaloo.Hangman.Client.Dispatcher;
using Bobaloo.Hangman.ViewModels;
using ReactiveUI;
using ReactiveUI.Maui;
using System.Reactive.Disposables;

namespace Bobaloo.Hangman.Client
{
    public partial class MainPage : ReactiveContentPage<MainWindowViewModel>
    {

        public MainPage(MainWindowViewModel vm)
        {
            ViewModel = vm;
            this.WhenActivated(d =>
            {
                ViewModel.Alert.RegisterHandler(async interaction =>
                {
                    await DisplayAlert("Alert", interaction.Input, "OK");
                    interaction.SetOutput(true);
                }).DisposeWith(d);
            });
            vm.DispatcherService = new MauiDispatcher(Dispatcher);
            InitializeComponent();
            BindingContext = ViewModel;
            
        }
    }
}