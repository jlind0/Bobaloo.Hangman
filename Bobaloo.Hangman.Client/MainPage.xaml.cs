using Bobaloo.Hangman.Client.Dispatcher;
using Bobaloo.Hangman.ViewModels;
using ReactiveUI.Maui;

namespace Bobaloo.Hangman.Client
{
    public partial class MainPage : ReactiveContentPage<MainWindowViewModel>
    {

        public MainPage(MainWindowViewModel vm)
        {
            ViewModel = vm;
            vm.DispatcherService = new MauiDispatcher(Dispatcher);
            InitializeComponent();
            BindingContext = ViewModel;
            
        }
    }
}