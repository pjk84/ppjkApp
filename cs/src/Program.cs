

using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var startup = new Startup();
startup.ConfigureServices(builder.Services);

builder.Services.AddDbContext<AppDBContext>(ctx =>
{
    var connString = builder.Configuration.GetConnectionString("default");
    ctx.UseNpgsql(connString)
    .UseSnakeCaseNamingConvention();
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3001")
            .AllowCredentials()
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "my api", Version = "v1" });
});

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.

app.UseSwaggerUI(swaggerUiOptions =>
{
    swaggerUiOptions.DocumentTitle = "ppjk api";
    swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "ppjk api");
    swaggerUiOptions.RoutePrefix = string.Empty;
});

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

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
app.UsePathBase(new PathString("/api/dotnet/"));
app.UseRouting();
app.Run();
