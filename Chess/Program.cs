using Chess.Models;

using Chess.Interfaces;
class Demo
{

    static void Main()
    {
        string? inp = null;
        string? msg = null;
        IChessGame game = new Game();
        void print(string? msg)
        {
            Console.WriteLine(game.PrintBoard(msg));
            msg = null;
        }
        Console.WriteLine(game.PrintBoard(null));
        while (game.IsPlaying)
        {
            Console.Write("make a move: ");
            inp = Console.ReadLine()?.ToLower();
            if (inp is null)
            {
                continue;
            }
            if (inp == "load")
            {
                string[] files = Directory.GetFiles(@"games", "*.json");
                Console.WriteLine("\nfound games: \n");
                foreach (var file in files)
                {
                    var f = file.Replace("games/", "").Replace(".json", "");
                    Console.WriteLine($"- {f}");
                }
                Console.Write($"\nfound {files.Length} savegames. Which game do you want to continue?");
                string? fileName = Console.ReadLine()?.ToLower();
                msg = $"succesfully loadded game {fileName}";
                if (fileName is null)
                {
                    throw new Exception("-- invalid file name");
                }
                try
                {
                    game.LoadGame(fileName);
                }
                catch (Exception e)
                {
                    msg = $"-- could not load game: {e.Message}";
                }
                print(msg);
                continue;
            }
            if (inp == "save")
            {
                Console.Write("enter filename: ");
                string? fileName = Console.ReadLine();
                if (fileName is null)
                {
                    throw new Exception("-- invalid file name");
                }
                game.SaveGame(fileName);
                Console.WriteLine($"-- game saved as '{fileName}'. To load game use command 'load test'.");
                continue;
            }
            if (inp == "quit" || inp == "exit")
            {
                game.Quit();
                return;
            }
            if (inp == "restart" || inp == "reset")
            {
                game.Restart();
                continue;
            }
            if (inp == "undo")
            {
                Console.WriteLine("-- press delete/backspace to undo move. Press enter when done.");
                bool done = false;
                while (!done)
                {
                    var e = Console.ReadKey();
                    if (e.Key == ConsoleKey.Enter)
                    {
                        done = true;
                        continue;
                    }
                    if (e.Key == ConsoleKey.Backspace)
                    {
                        try
                        {
                            game.Undo();

                        }
                        catch
                        {
                            msg = "no moves to undo..";
                            done = true;
                        }
                        print(msg);
                    }
                }
                continue;
            }
            msg = game.MakeMove(inp);
            print(msg);

        }

    }
}