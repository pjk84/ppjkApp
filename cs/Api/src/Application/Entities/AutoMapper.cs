using AutoMapper;
using Api.Application.Entities.Blog;


namespace Api.Application.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<BlogPost, BlogPostDto>();
        CreateMap<Tag, TagDto>();
    }
}


