namespace Bobaloo.Hangman.Client
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            this.MainPage = new AppShell();
        }
    }
}