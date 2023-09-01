using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Client;
using Bobaloo.Hangman.Data.Core;
using DynamicData;
using DynamicData.Binding;
using Microsoft.Extensions.Configuration;
using ReactiveUI;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Bobaloo.Hangman.ViewModels
{
    public abstract class RepositoryViewModel<TEntity, TKey, TViewModel> : ReactiveObject
        where TEntity : Entity<TKey>, new()
        where TViewModel: class
    {
        protected IRepositoryClient<TEntity, TKey> Repository { get; }
        public ObservableCollection<TViewModel> Data { get; } = new ObservableCollection<TViewModel>();
        public ReactiveCommand<Unit, Unit> Load { get; }
        public ReactiveCommand<int, Unit> LoadPage { get; }
        private bool isLoading = false;
        public bool IsLoading
        {
            get => isLoading;
            set => this.RaiseAndSetIfChanged(ref isLoading, value);
        }
        private int count = 0;
        public int Count
        {
            get => count;
            set => this.RaiseAndSetIfChanged(ref count, value);
        }
        private int pageSize = 10;
        public int PageSize
        {
            get => pageSize;
            set => this.RaiseAndSetIfChanged(ref pageSize, value);
        }
        private int page = 1;
        public int Page
        {
            get => page;
            set => this.RaiseAndSetIfChanged(ref page, value);
        }
        public MainWindowViewModel Parent { get; }
        protected IConfiguration Config { get; }
        public RepositoryViewModel(IRepositoryClient<TEntity, TKey> repository, MainWindowViewModel parent, IConfiguration config)
        {
            Repository = repository;
            Parent = parent;
            Load = ReactiveCommand.CreateFromTask(DoLoad);
            LoadPage = ReactiveCommand.CreateFromTask<int>(DoLoadPage);
            Config = config;
        }
        protected virtual async Task DoLoad(CancellationToken token = default)
        {
            if (Parent.IsLoggedIn)
            {
                try
                {
                    Data.Clear();
                    var data = await Repository.GetAll(new Pager()
                    {
                        Page = Page,
                        Size = PageSize
                    }, token: token);
                    if (data != null)
                    {
                        Data.AddRange(data.Entities.Select(FromEntity));
                        Count = data.Count ?? 0;
                        Page = data.Page ?? 1;
                    }
                }
                catch (Exception ex)
                {
                    await Parent.Alert.Handle(ex.Message).GetAwaiter();
                }
            }
        }
        protected virtual async Task DoLoadPage(int page, CancellationToken token = default)
        {
            Page = page;
            await DoLoad(token);
        }
        protected abstract TViewModel FromEntity(TEntity entity);
    }
    public class ToursViewModel : RepositoryViewModel<Tour, Guid, TourViewModel>
    {
        protected IAudioProxy AudioProxy { get; }
        public ToursViewModel(IRepositoryClient<Tour, Guid> repository, 
            MainWindowViewModel parent, IConfiguration config, IAudioProxy audioProxy) 
            : base(repository, parent, config)
        {
            AudioProxy = audioProxy;
        }

        protected override TourViewModel FromEntity(Tour entity)
        {
            return new TourViewModel(entity, Config, this, AudioProxy);
        }
    }
    public class FileSaverOptions
    {
        public string FileName { get; set; } = null!;
        public byte[] Data { get; set; } = null!;
    }
    public class TourViewModel : ReactiveObject
    {
        private readonly Interaction<FileSaverOptions, bool> _saveFile;
        private readonly Interaction<string, bool> _doesFileExist;
        
        public Interaction<FileSaverOptions, bool> SaveFile { get => _saveFile; }
        public Interaction<string, bool> DoesFileExist { get => _doesFileExist; }
        
        private readonly Tour _tour;
        public Guid TourId { get => _tour.TourId; } 
        public string Name { get => _tour.Name;} 
        public string Description { get => _tour.Description; }
        public byte[]? Thumbnail { get => _tour.Thumbnail; }
        public ToursViewModel ToursVM { get; }
        protected IConfiguration Config { get; }
        protected IAudioProxy AudioProxy { get; }
        public ReactiveCommand<Unit, Unit> PlayIntroAudio { get; }
        public ReactiveCommand<Unit, Unit> PauseIntroAudio { get; }
        public ReactiveCommand<Unit, Unit> ContinueIntroAudio { get; }
        protected string FileName { get; }
        private PlayerState playerState = PlayerState.Stopped;
        public PlayerState TourPlayerState
        {
            get => playerState;
            set => this.RaiseAndSetIfChanged(ref playerState, value);
        }
        public TourViewModel(Tour tour, IConfiguration config, ToursViewModel toursVM, IAudioProxy audioProxy)
        {
            
            _tour = tour;
            ToursVM = toursVM;
            Config = config;
            AudioProxy = audioProxy;
            _saveFile = new Interaction<FileSaverOptions, bool>();
            _doesFileExist = new Interaction<string, bool>();
            FileName = $"introaudio{TourId}.mp3";
            PlayIntroAudio = ReactiveCommand.CreateFromTask(DoFetchIntroAudio);
            PauseIntroAudio = ReactiveCommand.CreateFromTask(DoPauseIntroAudio);
            ContinueIntroAudio = ReactiveCommand.CreateFromTask(DoContinueIntroAudio);
            ToursVM.Parent.WhenPropertyChanged(p => p.PlayerState).Subscribe(v =>
            {
                if (ToursVM.Parent.CurrentPlayFile == FileName)
                    TourPlayerState = v.Value;
                else
                    TourPlayerState = PlayerState.Stopped;
            });
            ToursVM.Parent.WhenPropertyChanged(p => p.CurrentPlayFile).Subscribe(v =>
            {
                if (v.Value != FileName)
                    TourPlayerState = PlayerState.Stopped;
            });
        }
        protected async Task DoContinueIntroAudio(CancellationToken token = default)
        {
            TourPlayerState = PlayerState.Playing;
            await ToursVM.Parent.ChangePlayerState.Handle(PlayerState.Playing).GetAwaiter();
        }
        protected async Task DoPauseIntroAudio(CancellationToken token = default)
        {
            TourPlayerState = PlayerState.Paused;
            await ToursVM.Parent.ChangePlayerState.Handle(PlayerState.Paused).GetAwaiter();
        }
        protected async Task DoFetchIntroAudio(CancellationToken token = default)
        {
            try
            {
                if (!await DoesFileExist.Handle(FileName).GetAwaiter())
                {
                    var data = await AudioProxy.GetIntroAudio(TourId, token);
                    if (data != null)
                        await SaveFile.Handle(new FileSaverOptions()
                        {
                            FileName = FileName,
                            Data = data
                        }).GetAwaiter();
                }
                ToursVM.Parent.CurrentPlayFile = FileName;
                TourPlayerState = PlayerState.Playing;
                await ToursVM.Parent.PlayFile.Handle(FileName).GetAwaiter();
            }
            catch(Exception ex)
            {
                await ToursVM.Parent.Alert.Handle(ex.Message).GetAwaiter();
            }
        }
    }
}
