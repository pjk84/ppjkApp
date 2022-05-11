

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

internal class Post
{
    [Key]
    public Guid PostId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(100000)]
    public string Content { get; set; } = string.Empty;

    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

}

internal class PostRelation
{
    [Key]
    public Guid PostId { get; set; }

    [ForeignKey("Post")]
    public Guid ParentId { get; set; }
    [ForeignKey("Post")]
    public Guid ChildId { get; set; }
}
