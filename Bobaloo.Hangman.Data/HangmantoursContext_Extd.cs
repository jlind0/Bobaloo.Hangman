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
        => optionsBuilder.UseSqlServer(Configuration["HangmanToursConnectionString"]);


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tour>(entity =>
        {
            entity.Property(e => e.StartingPoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
        });

        modelBuilder.Entity<TourLeg>(entity =>
        {
            entity.Property(e => e.Waypoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
        });
    }
}
