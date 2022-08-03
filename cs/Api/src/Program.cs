

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.WebHost.ConfigureKestrel(opts =>
{
    opts.ListenAnyIP(5002);
});

var startup = new Startup();
startup.ConfigureServices(builder.Services);


var app = builder.Build();
app.UseCors();

app.UseSwagger();
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

app.UseAuthentication();
app.UsePathBase(new PathString("/api/dotnet/"));
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();
