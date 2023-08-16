using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Core
{
    public class User : Entity<string>
    {
        public string UserId { get; set; } = null!;
        public string GivenName { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; }
        public bool IsAdmin { get; set; }

        public override string PrimaryKey { get => UserId; set => UserId = value; }
    }
}
