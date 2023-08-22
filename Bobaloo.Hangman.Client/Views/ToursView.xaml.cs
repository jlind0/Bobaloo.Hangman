using Bobaloo.Hangman.Data;

namespace Bobaloo.Hangman.Client.Views;

public partial class ToursView : ContentView
{
	public ToursView()
	{
		InitializeComponent();
	}

    private void Image_Loaded(object sender, EventArgs e)
    {
		var img = (Image)sender;
		var thumbnail = ((Tour)img.BindingContext).Thumbnail;
		if(thumbnail != null)
			img.Source = ImageSource.FromStream(() => new MemoryStream(thumbnail));
    }
}