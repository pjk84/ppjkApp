namespace Api.Application.Entities.Blog;
using Api.Application.Entities;

public class BlogPostDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }

    public bool HasReplies { get; set; }

    public Guid? ParentId { get; set; }

    public List<TagDto> Tags { get; set; }
}

