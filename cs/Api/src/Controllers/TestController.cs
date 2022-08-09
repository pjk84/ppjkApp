
using Microsoft.AspNetCore.Mvc;
using Api.Application.Interfaces;
using System.Text.Json;

using Api.Application.Chess.Models;
using Api.Application.Chess.Interfaces;
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
        var game = new Chess(null);


        // var game2 = new Chess(s);


        try
        {
            // Console.WriteLine(game.Board.Squares[0]);
            var m = game.MakeMove(new Move(new Square(1, 1, null), new Square(2, 2, null)));
            // var game2 = new Chess(m);
            // var p = game2.Board.PrintBoard();
            return m;
        }
        catch (Exception e)
        {
            return e.Message;
        }

    }

    // public IEnumerable<IEnumerable<string>> ChunkBy(IEnumerable<string> source, int size){

    //     return Sour

    // }

}

