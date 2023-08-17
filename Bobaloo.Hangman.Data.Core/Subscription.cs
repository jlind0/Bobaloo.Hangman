using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Data.Core
{
    public class Subscription : Entity<Guid>
    {
        public Guid SubscriptionId { get; set; }
        public Guid TourId { get; set; }
        public Tour? Tour { get; set; }
        public string UserId { get; set; } = null!;
        public User? User { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime ValidFrom { get; set; } = DateTime.UtcNow;
        public DateTime ValidTo { get; set; } = DateTime.UtcNow.AddMonths(1);
        public override Guid PrimaryKey { get => SubscriptionId; set => SubscriptionId = value; }
    }
}
