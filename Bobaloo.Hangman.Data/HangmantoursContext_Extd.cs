using System;
using System.Collections.Generic;
using Bobaloo.Hangman.Data.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NetTopologySuite.Geometries;
namespace Bobaloo.Hangman.Data;


public partial class HangmantoursContext : DbContext
{
    protected IConfiguration Configuration;
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Subscription> Subscriptions { get; set; }
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
            entity.ToTable("Tours");
        });
        modelBuilder.Entity<TourLeg>(entity =>
        {
            entity.Property(e => e.Waypoint)
                .HasColumnType("geography")
                .HasConversion(v => v, v => v);
            entity.Ignore(e => e.PrimaryKey);
        });
        modelBuilder.Entity<User>(entity =>
        {
            entity.Ignore(e => e.PrimaryKey);
        });
        modelBuilder.Entity<Subscription>(entity =>
        {
            entity.Property(e => e.SubscriptionId).HasDefaultValueSql("(newid())");
            entity.HasOne(d => d.User).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Subscriptions_Users");
            entity.HasOne(d => d.Tour).WithMany(p => p.Subscriptions)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Subscriptions_Tours");
            entity.Ignore(e => e.PrimaryKey);
        });
    }
}
