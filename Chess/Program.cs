using Api.Application.Chess.Models;
using System.Linq;
using Api.Application.Chess.Interfaces;
class Demo
{
    static void Main()
    {
        string? val = null;
        IChessGame game = new Chess();
        Console.WriteLine(game.PrintBoard(null));
        while (game.IsPlaying)
        {
            if (val is null)
            {
                Console.Write("press N for new game, press L to load game: ");
                val = Console.ReadLine();
                if (val is not null)
                {
                    val = val.ToUpper();
                }
                if (val != "N" && val != "L")
                {
                    Console.WriteLine($"input '{val}' not allowed.");
                    val = null;
                    continue;
                }
            }
            if (val == "L")
            {
                // load game
            }
            Console.Write("make a move: ");
            string? move = Console.ReadLine();
            if (move is null)
            {
                continue;
            }
            var err = game.MakeMove(move);
            Console.WriteLine(game.PrintBoard(err));
        }

    }
}