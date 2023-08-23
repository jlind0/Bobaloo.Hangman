using Bobaloo.Hangman.Client.Dispatcher;
using Bobaloo.Hangman.ViewModels;
using CommunityToolkit.Maui.Views;
using ReactiveUI;
using ReactiveUI.Maui;
using System.Reactive;
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
                ViewModel.PlayFile.RegisterHandler(interaction =>
                {
                    soundPlayer.Source = FileMediaSource.FromFile(
                        Path.Join(FileSystem.CacheDirectory, interaction.Input));
                    soundPlayer.Play();
                    interaction.SetOutput(Unit.Default);
                }).DisposeWith(d);
            });
            vm.DispatcherService = new MauiDispatcher(Dispatcher);
            InitializeComponent();
            BindingContext = ViewModel;
            
        }
    }
}