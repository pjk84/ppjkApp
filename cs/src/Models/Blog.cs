



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
    public Guid id { get; set; }
    public string title { get; set; }
    public string body { get; set; }

    public bool has_replies { get; set; }

    public Guid? parent_id { get; set; }

    public List<TagDto> tags { get; set; }
}

public class TagDto
{
    public Guid id { get; set; }
    public string name { get; set; }
    public string post_id { get; set; }

}

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<BlogPost, BlogPostDto>();
        CreateMap<Tag, TagDto>();
    }
}