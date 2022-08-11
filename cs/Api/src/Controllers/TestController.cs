
using Microsoft.AspNetCore.Mvc;
using Api.Application.Interfaces;
using System.Text.Json;


namespace Api.Controllers;


public interface IPerson
{
    string _name { set; get; }
    int _age { set; get; }
}

public record struct Person(string name, int age) { }

public record class Person2(string name, int age);


[ApiController]
[Route("controller")]
public class TestController : ControllerBase
{
    private readonly IConfiguration _config;

    private readonly IOpenWeatherApi _openWeatherApi;

    private readonly IIpApi _ipApi;

    public TestController(IConfiguration config)
    {
    }

    [HttpGet]
    [Route("~/test")]
    public string test()
    {
        var t = "ABCDEFGH";
        Console.WriteLine("A1"[1]);
        // var game = new Chess(null);

        return "";
    }

    // public IEnumerable<IEnumerable<string>> ChunkBy(IEnumerable<string> source, int size){

    //     return Sour

    // }

}

