
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.WebHost.ConfigureKestrel(opts =>
{
    opts.ListenAnyIP(5002);
});

var startup = new Startup();
startup.ConfigureServices(builder.Services);

builder.Services.AddHttpClient<OpenWeatherApi>();
builder.Services.AddHttpClient<IpApi>();

//auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    Environment.GetEnvironmentVariable("JWT_SECRET_KEY")
                )
            )
        };
    });

builder.Services.AddDbContext<AppDBContext>(ctx =>
{
    var connString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opts =>
{
    opts.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "",
    });

    opts.OperationFilter<SecurityRequirementsOperationFilter>();
    opts.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "my api", Version = "v1" });
});

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
