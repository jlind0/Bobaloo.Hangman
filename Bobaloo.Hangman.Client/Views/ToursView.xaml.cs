using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.ViewModels;
using CommunityToolkit.Maui.Storage;
using ReactiveUI;
using ReactiveUI.Maui;

namespace Bobaloo.Hangman.Client.Views;

public partial class ToursView : ReactiveContentView<ToursViewModel>
{
	public ToursView()
	{
		InitializeComponent();
	}

}