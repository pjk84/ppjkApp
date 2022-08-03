
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Application.Entities;

namespace Api.Application.Entities.Blog;
[Table("blog_post")]
public class BlogPost : EntityBase
{
    [Key]

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(100000)]
    public string Body { get; set; } = string.Empty;


    public Boolean HasReplies { get; set; } = false;

    [ForeignKey("BlogPost")]
    public Guid? ParentId { get; set; } = null;

    public List<Tag> Tags { get; set; }
}


