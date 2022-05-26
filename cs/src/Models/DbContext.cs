

using Microsoft.EntityFrameworkCore;

public sealed class AppDBContext : DbContext
{


    public DbSet<BlogPost> Posts { get; set; }
    public DbSet<Tag> Tags { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
        //...
    }
    // protected override void OnConfiguring(DbContextOptionsBuilder optBuilder)
    // {
    // }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tag>()
            .HasOne(s => s.BlogPost)
            .WithMany(s => s.Tags)
            .HasForeignKey(s => s.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}