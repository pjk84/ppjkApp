


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var env = builder.Environment.EnvironmentName;
Console.WriteLine($"environment is: {env}");

var startup = new Startup();


IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile($"appsettings.{env}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();


startup.ConfigureServices(builder.Services, config);

var app = builder.Build();
app.UseCors();

app.UseSwagger();
app.UseSwaggerUI(opts =>
{
    opts.DocumentTitle = "ppjk api";
    opts.SwaggerEndpoint("/swagger/v1/swagger.json", "ppjk api");
    opts.RoutePrefix = string.Empty;
});

app.UsePathBase(new PathString("/api/v1"));

if (env != "Local")
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
