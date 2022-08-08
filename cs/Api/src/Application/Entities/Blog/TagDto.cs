
namespace Api.Application.Entities.Blog;
using Api.Application.Entities;

public record TagDto
{
    public Guid Id { get; }
    public string Name { get; }
    public string PostId { get; }

}



