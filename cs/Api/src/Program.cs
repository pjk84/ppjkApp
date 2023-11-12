

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var env = builder.Environment.EnvironmentName;
Console.WriteLine($"environment is: {env}");

builder.WebHost.ConfigureKestrel(opts =>
{
    opts.ListenAnyIP(5002);
});

var startup = new Startup();


IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile($"appsettings.{env}.json", optional: true)
    .AddEnvironmentVariables()
    .Build();

startup.ConfigureServices(builder.Services, config);

var app = builder.Build();
app.UseCors();

app.UseSwagger();
app.UseSwaggerUI(swaggerUiOptions =>
{
    swaggerUiOptions.DocumentTitle = "ppjk api";
    swaggerUiOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "ppjk api");
    swaggerUiOptions.RoutePrefix = string.Empty;
});

if (env != "Local")
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
