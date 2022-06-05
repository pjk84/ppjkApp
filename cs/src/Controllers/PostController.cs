using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;


[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly AppDBContext _db;
    private readonly IConfiguration _config;

    public PostsController(IMapper mapper, AppDBContext context, IConfiguration config)
    {
        _config = config;
        _db = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Route("~/blog/posts")]
    public async Task<List<BlogPostDto>> GetAllPosts()
    {
        var allPosts = await _db.Posts.Include(p => p.Tags)
        .OrderByDescending(p => p.CreatedAt)
        .ToListAsync();

        return _mapper.Map<List<BlogPostDto>>(allPosts);
    }
    [HttpGet]
    [Route("~/tags")]
    public async Task<List<TagDto>> GetAllTags()
    {
        var allTags = await _db.Tags.ToListAsync();
        return _mapper.Map<List<TagDto>>(allTags);
    }
    [HttpGet]
    [Authorize]
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
    [Authorize]
    [Route("~/blog/posts/{postId}")]
    public async Task<IActionResult> DeletePostById(Guid postId)
    {
        var Post = await _db.Posts.Where(p => p.Id == postId).FirstAsync();
        _db.Posts.Remove(Post);
        _db.SaveChanges();
        return Ok($"deleted post {postId}");
    }
    [HttpPost]
    [Route("~/blog/post")]
    public async Task<IActionResult> AddNewPost(BlogPost post)
    {

        await _db.Posts.AddAsync(post);
        _db.SaveChanges();
        return Ok("post created");
    }
    [HttpPost]
    [Route("~/login")]
    public ActionResult<string> Login([FromBody] LoginPayload payload)
    {
        bool verified = BCrypt.Net.BCrypt.Verify(_config["PJK_PASSWORD"], payload.Password);
        if (verified)
        {
            return _config["ACCESS_TOKEN"];
        }
        return Unauthorized("password incorrect");
    }

}
