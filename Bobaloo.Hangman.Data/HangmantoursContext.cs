using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Bobaloo.Hangman.Data;

public partial class HangmantoursContext : DbContext
{
    public virtual DbSet<Tour> Tours { get; set; }

    public virtual DbSet<TourLeg> TourLegs { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tour>(entity =>
        {
            entity.Property(e => e.TourId).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(1000);
            entity.Property(e => e.Price).HasColumnType("money");
        });

        modelBuilder.Entity<TourLeg>(entity =>
        {
            entity.HasIndex(e => new { e.TourId, e.Sequence }, "IX_TourLegs").IsUnique();

            entity.Property(e => e.TourLegId).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(1000);

            entity.HasOne(d => d.Tour).WithMany(p => p.TourLegs)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourLegs_Tours");
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
