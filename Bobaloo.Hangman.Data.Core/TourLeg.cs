using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Bobaloo.Hangman.Data.Core;
using NetTopologySuite.Geometries;

namespace Bobaloo.Hangman.Data;

public partial class TourLeg : Entity<Guid>
{
    public override Guid PrimaryKey { get => TourLegId; set => TourLegId = value; }
    public Guid TourLegId { get; set; }

    public Guid TourId { get; set; }
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Text { get; set; } = null!;
    [Required]
    public long Sequence { get; set; }
    public Point? Waypoint { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
public class TourLegWithBinaryData : TourLeg
{
    public byte[]? Audio { get; set; }
}
