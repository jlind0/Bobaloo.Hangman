using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
namespace Bobaloo.Hangman.Data;


public partial class HangmantoursContext : DbContext
{
    protected IConfiguration Configuration;
    public HangmantoursContext(IConfiguration config)
    {
        Configuration = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(Configuration["HangmanToursConnectionString"], x => x.UseNetTopologySuite());


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tour>(entity =>
        {
            entity.Property(e => e.StartingPoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
            entity.Ignore(e => e.PrimaryKey);
            entity.ToTable("Tours", "dbo");
        });
        modelBuilder.Entity<TourWithBinaryData>(entity =>
        {
            entity.Property(e => e.StartingPoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
            entity.Ignore(e => e.PrimaryKey);
            entity.ToTable("Tours");
        });
        modelBuilder.Entity<TourLeg>(entity =>
        {
            entity.Property(e => e.Waypoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
            entity.Ignore(e => e.PrimaryKey);
        });
        modelBuilder.Entity<VoiceActor>(entity =>
        {
            entity.Ignore(e => e.PrimaryKey);
        });
    }
}
