
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Api.Application.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using System.Text;
using dotenv.net;
using System.Collections;
using Api.Application.Interfaces;
using Api.Application.Services;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // env vars
        DotEnv.Load();
        // .... Ignore code before this

        // Auto Mapper Configurations
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        IConfiguration config = new ConfigurationBuilder()
        .AddEnvironmentVariables()
        .Build();

        foreach (DictionaryEntry de in Environment.GetEnvironmentVariables())
        {
            Console.WriteLine($"{de.Key} = {de.Value}");

        }
        services.AddSingleton(config);

        services.AddSingleton<IRedisCache, RedisCache>();
        services.AddSingleton<IIpApi, IpApi>();
        services.AddSingleton<IOpenWeatherApi, OpenWeatherApi>();
        services.AddSingleton<IGeoCoding, GeoCoding>();


        services.AddHttpClient<IBaseApiClient, BaseApiClient>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opts =>
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


        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

        services.AddCors(options =>
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

        services.AddStackExchangeRedisCache(options =>
        {
            var host = Environment.GetEnvironmentVariable("REDIS_HOST_ADDRESS");
            var password = Environment.GetEnvironmentVariable("REDIS_PASSWORD");
            options.Configuration = $"{host},password={password},abortConnect=false";
            options.InstanceName = "redis";
        });

        //db context
        services.AddDbContext<AppDBContext>(options =>
        {
            var connString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
            options.UseNpgsql(connString)
                .UseSnakeCaseNamingConvention();
        });



        services.AddMvc();

    }
}