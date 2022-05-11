

using Microsoft.EntityFrameworkCore;

internal sealed class AppDBContext : DbContext
{
    public DbSet<Post> Posts { get; set; }
    public DbSet<PostRelation> PostRelations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optBuilder) => optBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=password");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var ids = new List<string> {
            "02774989-0e37-4a21-9d96-d239dbb3820f",
            "b85a0821-b0d9-478c-8cad-27dc9291ad9f",
            "87af72af-1f1b-4ba1-848f-b8b154add88d",
        };
        Post[] postsToSeed = new Post[ids.Count];
        PostRelation[] PostRelationsToSeed = new PostRelation[ids.Count - 1];
        for (int i = 0; i <= postsToSeed.Length - 1; i++)
        {
            postsToSeed[i] = new Post
            {
                PostId = new Guid(ids[i]),
                Title = $"post {i}",
                Content = $"content {i}"
            };
            if (i > 0)
            {
                PostRelationsToSeed[i - 1] = new PostRelation
                {
                    PostId = Guid.NewGuid(),
                    ParentId = new Guid(ids[0]),
                    ChildId = new Guid(ids[i])
                };
            }
        }

        modelBuilder.Entity<Post>().HasData(postsToSeed);
        modelBuilder.Entity<PostRelation>().HasData(PostRelationsToSeed);
    }
}