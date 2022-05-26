using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;


[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly AppDBContext _db;

    public PostsController(IMapper mapper, AppDBContext context)
    {
        _db = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Route("~/blog/posts")]
    public async Task<List<BlogPostDto>> GetAllPosts()
    {

        // using (var db = new AppDBContext())
        // {
        var allPosts = await _db.Posts.Include(p => p.Tags)
        .OrderByDescending(p => p.CreatedAt)
        .ToListAsync();

        return _mapper.Map<List<BlogPostDto>>(allPosts);
        // }
    }
    [HttpGet]
    [Route("~/tags")]
    public async Task<List<TagDto>> GetAllTags()
    {
        var allTags = await _db.Tags.ToListAsync();
        return _mapper.Map<List<TagDto>>(allTags);
    }
    [HttpGet]
    [Route("~/blog/posts/{title}")]
    public async Task<ActionResult<BlogPostDto>> GetPostByTitle(string title)
    {
        var post = await _db.Posts.Include(p => p.Tags).FirstOrDefaultAsync(post => post.Title == title);
        if (post == null)
        {
            return NotFound();
        }
        return new ObjectResult(_mapper.Map<BlogPostDto>(post));
    }
    [HttpDelete]
    [Route("~/blog/posts/{postId}")]
    public async Task<IActionResult> DeletePostById(Guid postId)
    {
        var Post = await _db.Posts.Where(p => p.Id == postId).FirstAsync();
        _db.Posts.Remove(Post);
        _db.SaveChanges();
        return Ok($"deleted post {postId}");
    }
    [HttpPost]
    [Route("~/blog/posts")]
    public async Task<IActionResult> AddNewPost(BlogPost post)
    {

        await _db.Posts.AddAsync(new BlogPost()
        {
            Title = post.Title,
            Body = post.Body,
            Tags = post.Tags
        });
        _db.SaveChanges();
        return Ok("post created");
    }

}
