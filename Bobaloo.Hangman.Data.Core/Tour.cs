using System;
using System.Collections.Generic;
using Bobaloo.Hangman.Data.Core;
using NetTopologySuite.Geometries;

namespace Bobaloo.Hangman.Data;

public partial class Tour : Entity<Guid>
{
    public override Guid PrimaryKey { get => TourId; set => TourId = value; }
    public Guid TourId { get; set; }

    public string Name { get; set; } = null!;

    public bool IsPublished { get; set; }

    public decimal Price { get; set; }

    public string Description { get; set; } = null!;

    public byte[]? Thumbnail { get; set; }
    public Point? StartingPoint { get; set; }

    public virtual ICollection<TourLeg> TourLegs { get; set; } = new List<TourLeg>();
}
