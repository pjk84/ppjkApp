
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Api.Application.Entities;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using System.Collections;
using Api.Common.RedisCache;
using Api.Common.ApiClient;
using Api.Common.GeoCoding;
using Api.Common.IpApi;
using Api.Features.WeatherApi;
using Api.Database;
using Api.Features.Bitvavo;


public class Startup
{
    public void ConfigureServices(IServiceCollection services, IConfiguration config)
    {

        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();

        services.AddSingleton(mapper);

        foreach (DictionaryEntry de in Environment.GetEnvironmentVariables())
        {
            Console.WriteLine($"{de.Key} = {de.Value}");

        }
        services.AddSingleton(config);

        services.AddSingleton<IRedisCache, RedisCache>();
        services.AddSingleton<IIpApi, IpApi>();
        services.AddSingleton<IOpenWeatherApi, OpenWeatherApi>();
        services.AddSingleton<IGeoCoding, GeoCoding>();
        services.AddSingleton<IBitvavoClient, BitvavoClient>();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<Startup>());

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

        // mongoDB
        services.Configure<ApiDatabaseSettings>(config.GetSection("Database"));
        services.AddSingleton<IUserService, UserService>();

        services.AddRouting(options => options.LowercaseUrls = true);

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
                            config["Auth:SecretKey"]
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
            var host = config["Redis:BaseUrl"];
            var password = config["Redis:Password"];
            options.Configuration = $"{host},password={password},abortConnect=false";
            options.InstanceName = "redis";
        });

        //db context
        // services.AddDbContext<AppDBContext>(options =>
        // {
        //     var connString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
        //     options.UseNpgsql(connString)
        //         .UseSnakeCaseNamingConvention();
        // });



        services.AddMvc();

    }
}