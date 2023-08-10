using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Core
{
    public abstract class Entity<TKey>
    {
        public abstract TKey PrimaryKey { get; set; }
    }
    public class RepositoryResultSet<TEntity, TKey>
        where TEntity : Entity<TKey>, new()
    {
        public IEnumerable<TEntity> Entities { get; set; } = null!;
        public int Count { get; set; }
        public int PageSize { get; set; }
        public int Page { get; set; }


    }
    public struct Pager
    {
        public int Size { get; set; }
        public int Page { get; set; }
    }
}
