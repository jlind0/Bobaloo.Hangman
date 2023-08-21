using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.ViewModels
{
    public interface IDispatcherService
    {
        Task Dispatch(Action action);
    }
}
