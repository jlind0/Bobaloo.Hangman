using Bobaloo.Hangman.ViewModels;
using CommunityToolkit.Maui.Storage;
using CommunityToolkit.Maui.Views;
using ReactiveUI;
using ReactiveUI.Maui;
using System.Reactive;
using System.Reactive.Disposables;
using System.Reactive.Linq;

namespace Bobaloo.Hangman.Client.Views;

public partial class TourView : ReactiveContentView<TourViewModel>
{
	public TourView()
	{
        this.Loaded += TourView_Loaded;
        this.Unloaded += TourView_Unloaded;
        InitializeComponent();
		
	}

    private void TourView_Unloaded(object sender, EventArgs e)
    {
        Disposables.Dispose();
        this.Loaded -= TourView_Loaded;
        this.Unloaded -= TourView_Unloaded;
    }

    protected CompositeDisposable Disposables { get; } = new CompositeDisposable();
    private void TourView_Loaded(object sender, EventArgs e)
    {
        ViewModel.DoesFileExist.RegisterHandler(async interaction =>
        {
            interaction.SetOutput(
                await FileSystem.AppPackageFileExistsAsync(
                    Path.Join(FileSystem.CacheDirectory, interaction.Input)));
        }).DisposeWith(Disposables);
        
        ViewModel.SaveFile.RegisterHandler(async interaction =>
        {
            using(var fs = new FileStream(Path.Join(FileSystem.CacheDirectory, interaction.Input.FileName), FileMode.Create, FileAccess.Write))
            {
                await fs.WriteAsync(interaction.Input.Data, 0, interaction.Input.Data.Length);
            }
            interaction.SetOutput(true);
        }).DisposeWith(Disposables);
    }
    
}