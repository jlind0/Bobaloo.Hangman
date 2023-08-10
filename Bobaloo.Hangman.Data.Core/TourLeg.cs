using System;
using System.Collections.Generic;
using Bobaloo.Hangman.Data.Core;
using NetTopologySuite.Geometries;

namespace Bobaloo.Hangman.Data;

public partial class TourLeg : Entity<Guid>
{
    public override Guid PrimaryKey { get => TourLegId; set => TourLegId = value; }
    public Guid TourLegId { get; set; }

    public Guid TourId { get; set; }

    public string Name { get; set; } = null!;

    public string Text { get; set; } = null!;

    public byte[]? Audio { get; set; }

    public long Sequence { get; set; }
    public Point Waypoint { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
