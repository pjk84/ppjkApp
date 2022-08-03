
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Api.Application.Entities;

namespace Api.Application.Entities.Blog;
[Table("tag")]
public class Tag : EntityBase
{
    [Key]
    public String Name { get; set; }

    public Guid PostId { get; set; }

    internal BlogPost BlogPost { get; set; }
}
