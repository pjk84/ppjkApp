// using Microsoft.EntityFrameworkCore;


// public static class PostRepository
// {

//     internal async static Task<List<Post>> GetPosts()
//     {
//         using (var db = new AppDBContext())
//         {
//             var allPosts = await db.Posts.ToListAsync();
//             foreach (Post post in allPosts)
//             {
//                 while(true){
//                     getPostRelations()
//                 }
//             }
//             async Task<List<Post>> getPostRelations(List<Post> posts)
//             {
//                 foreach (Post post in allPosts)
//                 {
//                     var relations = await GetRelations(post.PostId);
//                 }
//             }
//         }
//     }

//     internal async static Task<Post> GetPost(Guid postId)
//     {
//         using (var db = new AppDBContext())
//         {
//             return await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);

//         }
//     }
//     internal async static Task<List<Post>> GetRelations(Guid postId)
//     {
//         using (var db = new AppDBContext())
//         {
//             var relations = await db.PostRelations.Where(rel => rel.ParentId == postId).ToListAsync();
//             List<Post> posts = null;
//             foreach (PostRelation relation in relations)
//             {
//                 var post = await db.Posts.FirstOrDefaultAsync(post => post.PostId == relation.ChildId);
//                 posts.Append(post);
//             }
//             return posts;
//         }
//     }

//     internal async static Task<bool> createPost(string title, string content, string parentId)
//     {
//         try
//         {

//             using (var db = new AppDBContext())
//             {
//                 // create post
//                 var post = new Post { Title = title, Content = content };
//                 await db.AddAsync(post);
//                 // create relation
//                 if (parentId != null)
//                 {
//                     var pId = new Guid(parentId);
//                     PostRelation relation = new PostRelation { ParentId = pId, ChildId = post.PostId };
//                     await db.PostRelations.AddAsync(relation);
//                 }
//                 return await db.SaveChangesAsync() >= 1;
//             }

//         }
//         catch (Exception e)
//         {
//             Console.WriteLine(e);
//             return false;
//         }
//     }

//     internal async static Task<bool> updatePost(Post post)
//     {
//         try
//         {
//             using (var db = new AppDBContext())
//             {
//                 db.Posts.Update(post);
//                 return await db.SaveChangesAsync() >= 1;
//             }

//         }
//         catch (Exception e)
//         {
//             Console.WriteLine(e);
//             return false;
//         }


//     }
// }