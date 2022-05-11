
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "my api", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(swaggerUiOptions =>
{
    swaggerUiOptions.DocumentTitle = "ppjk api";
    swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "ppjk api");
    swaggerUiOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
// app.MapGet("/posts", async () => await PostRepository.GetPosts()).WithTags("get all posts");
// app.MapGet("/post/{postId}", async (Guid postId) =>
// {
//     Post post = await PostRepository.GetPost(postId);
//     List<Post> relations = await PostRepository.GetRelations(postId);

//     if (post != null)
//     {
//         return Results.Ok(post);
//     }
//     return Results.BadRequest();
// }).WithTags("get one post");
// app.MapPost("/post", async (string title, string content, string parentId) =>
// {
//     bool res = await PostRepository.createPost(title, content, parentId);
//     if (res)
//     {
//         return Results.Ok("post created");
//     }
//     return Results.BadRequest();
// }).WithTags("create a single post");

app.Run();
