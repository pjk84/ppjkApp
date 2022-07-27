using AutoMapper;
using dotenv.net;
using System.Collections;

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


        services.AddMvc();

    }
}