
using Microsoft.AspNetCore.Mvc;
using Api.Application.Interfaces;
using System.Text.Json;

using Api.Application.Chess.Models;
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
    public int? test()
    {
        using (StreamReader r = new StreamReader("src/Application/Chess/data.json"))
        {
            string d = r.ReadToEnd();
            Console.WriteLine(d);

            var x = JsonSerializer.Deserialize<List<Piece>>(d);
            Console.WriteLine(x[0].Type);
        }
        // Person z = new("Joe", 25);
        // var (a, b) = z;
        // var myArray = new[] { 1, 2, 3 };
        // Person x = new("Joe", 25);
        // Person y = new("Joe", 25);


        // Console.WriteLine(x == y);
        // Struct1 myStruct = new("A", "B");
        // var (value, value2) = myStruct;

        // var test = new List<string> { "a", "b", "c", "d", "e", "f" };
        // var z = test.Take(1..3);
        // Console.WriteLine(JsonSerializer.Serialize(z));
        // var chunks = test.Chunk(3);

        return 1;
    }

    // public IEnumerable<IEnumerable<string>> ChunkBy(IEnumerable<string> source, int size){

    //     return Sour

    // }

}
