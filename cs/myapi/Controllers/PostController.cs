using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace myapi.Controllers;

[ApiController]
[Route("[controller]")]
public class PostController : ControllerBase
{
    [HttpGet]
    internal async Task<IActionResult> Get()
    {
        using (var db = new AppDBContext())
        {
            var allPosts = await db.Posts.ToListAsync();
            return Ok(allPosts);
        }
    }
    internal async static Task<Post> GetPost(Guid postId)
    {
        using (var db = new AppDBContext())
        {
            return await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
        }
    }
    internal async static Task<bool> createPost(string title, string content, string parentId)
    {
        try
        {

            using (var db = new AppDBContext())
            {
                // create post
                var post = new Post { Title = title, Content = content };
                await db.AddAsync(post);
                // create relation
                if (parentId != null)
                {
                    var pId = new Guid(parentId);
                    PostRelation relation = new PostRelation { ParentId = pId, ChildId = post.PostId };
                    await db.PostRelations.AddAsync(relation);
                }
                return await db.SaveChangesAsync() >= 1;
            }

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
}
