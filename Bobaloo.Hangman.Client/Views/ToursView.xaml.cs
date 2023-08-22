namespace Bobaloo.Hangman.Client.Views;

public partial class ToursView : ContentView
{
	public ToursView()
	{
		InitializeComponent();
	}

    private void Image_Loaded(object sender, EventArgs e)
    {
		((Image)sender).Focus();
    }
}