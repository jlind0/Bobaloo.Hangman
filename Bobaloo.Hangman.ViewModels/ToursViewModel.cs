using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Client;
using Bobaloo.Hangman.Data.Core;
using DynamicData;
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
    public abstract class RepositoryViewModel<TEntity, TKey> : ReactiveObject
        where TEntity : Entity<TKey>, new()
    {
        protected IRepositoryClient<TEntity, TKey> Repository { get; }
        public ObservableCollection<TEntity> Data { get; } = new ObservableCollection<TEntity>();
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
        protected MainWindowViewModel Parent { get; }
        public RepositoryViewModel(IRepositoryClient<TEntity, TKey> repository, MainWindowViewModel parent)
        {
            Repository = repository;
            Parent = parent;
            Load = ReactiveCommand.CreateFromTask(DoLoad);
            LoadPage = ReactiveCommand.CreateFromTask<int>(DoLoadPage);
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
                        Data.AddRange(data.Entities);
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
    }
    public class ToursViewModel : RepositoryViewModel<Tour, Guid>
    {
        public ToursViewModel(IRepositoryClient<Tour, Guid> repository, MainWindowViewModel parent) 
            : base(repository, parent)
        {
        }
    }
}
