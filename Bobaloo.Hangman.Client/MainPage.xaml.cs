using Bobaloo.Hangman.Client.Dispatcher;
using Bobaloo.Hangman.ViewModels;
using CommunityToolkit.Maui.Core.Primitives;
using CommunityToolkit.Maui.Views;
using DynamicData.Binding;
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
            ViewModel.ScreenWidth = this.Width;
            ViewModel.ScreenHeight = this.Height;
            this.WhenActivated(d =>
            {
                this.WhenPropertyChanged(p => p.Width).Subscribe(p => ViewModel.ScreenWidth = p.Value).DisposeWith(d);
                this.WhenPropertyChanged(p => p.Height).Subscribe(p => ViewModel.ScreenHeight = p.Value).DisposeWith(d);
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
                ViewModel.ChangePlayerState.RegisterHandler(interaction =>
                {
                    switch (interaction.Input)
                    {
                        case PlayerState.Stopped: soundPlayer.Stop(); break;
                        case PlayerState.Paused: soundPlayer.Pause(); break;
                        case PlayerState.Playing: soundPlayer.Play(); break;
                    }
                    interaction.SetOutput(Unit.Default);
                }).DisposeWith(d);
            });
            vm.DispatcherService = new MauiDispatcher(Dispatcher);
            InitializeComponent();
            BindingContext = ViewModel;
            
        }

        private void soundPlayer_MediaEnded(object sender, EventArgs e)
        {
            ViewModel.PlayerState = PlayerState.Stopped;
        }
    }
}