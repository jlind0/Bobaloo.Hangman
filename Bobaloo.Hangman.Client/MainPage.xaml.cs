using Bobaloo.Hangman.ViewModels;
using ReactiveUI.Maui;

namespace Bobaloo.Hangman.Client
{
    public partial class MainPage : ReactiveContentPage<MainWindowViewModel>
    {

        public MainPage(MainWindowViewModel vm)
        {
            ViewModel = vm;
            InitializeComponent();
            BindingContext = ViewModel;
        }
    }
}