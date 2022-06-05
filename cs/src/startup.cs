using AutoMapper;
using dotenv.net;

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

        IConfiguration config = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .AddEnvironmentVariables()
        .Build();

        Console.WriteLine(Environment.GetEnvironmentVariable("DATABASE_CONNECTIONP_STRING"));
        Console.WriteLine("ASDSDAS!@#!@#");

        services.AddSingleton(config);

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        services.AddMvc();

    }
}