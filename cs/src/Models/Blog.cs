



using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AutoMapper;

[Table("blog_post")]
public class BlogPost
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(100000)]
    public string Body { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Boolean HasReplies { get; set; } = false;

    [ForeignKey("BlogPost")]
    public Guid? ParentId { get; set; } = null;

    public List<Tag> Tags { get; set; }
}

[Table("tag")]
public class Tag
{
    [Key]
    public Guid Id { get; set; }
    public String Name { get; set; }

    public Guid PostId { get; set; }

    internal BlogPost BlogPost { get; set; }
}



public class BlogPostDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }

    public bool HasReplies { get; set; }

    public Guid? ParentId { get; set; }

    public List<TagDto> Tags { get; set; }
}

public class TagDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PostId { get; set; }

}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<BlogPost, BlogPostDto>();
        CreateMap<Tag, TagDto>();
    }
}
