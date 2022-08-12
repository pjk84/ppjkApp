
using Chess.Interfaces;
using System.Text.Json;

namespace Chess.Models;




public class Game : IChessGame
{

    private Color _activeColor = Color.W;
    private Board _board;
    public bool IsPlaying { get; private set; }

    private List<string> _moves = new List<string> { };  // <from>:<to>:<capture_id>
    public Game()
    {
        _board = NewBoard();
        IsPlaying = true;
    }

    public void Restart()
    {
        _moves = new List<string> { };
        _board = NewBoard();
        _activeColor = Color.W;
    }

    private Board NewBoard()
    {
        {
            using (StreamReader r = new StreamReader("test.json"))
            {
                return new Board(r.ReadToEnd());
            }
        }
    }

    public void LoadGame(string fileName)
    {
        {
            using (StreamReader r = new StreamReader($"games/{fileName}.json"))
            {
                var saveGame = JsonSerializer.Deserialize<SaveGame>(r.ReadToEnd(), new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                _board = new Board(JsonSerializer.Serialize(saveGame.squares));
                _activeColor = saveGame.activeColor;
                _moves = saveGame.moves;
            }
        }
    }

    public void SaveGame(string fileName)
    {
        var saveGame = new SaveGame(_board.Squares, _moves, _activeColor);
        File.WriteAllText($"games/{fileName}.json", JsonSerializer.Serialize(saveGame));

    }

    public void Undo()
    {
        if (_moves.Count == 0)
        {
            throw new Exception("no moves found");
        }
        // revert last move
        var lastMove = _moves.Last();
        var parsed = ParseMove(lastMove.Substring(0, 5));
        parsed.Revert();
        _board.MakeMove(parsed);
        if (lastMove.Length > 5)
        {
            // has capture. revive captured piece
            var capture = lastMove.Substring(6);

            // deserialize capture
            var d = JsonSerializer.Deserialize<Capture>(capture);

            // get the square at which the piece was captured
            var square = _board.GetSquareByAddress(d.Address);

            // re-populate square with piece
            square.Update(d.Piece);
        }
        _moves.RemoveAt(_moves.Count() - 1);
        SwitchTurns();
    }

    // parse string presentation 'A1:A2' to move
    public IChessMove ParseMove(string move)
    {
        if (move.Length != 5)
        {
            throw new ParseError(ParseType.Move, null);
        }
        string[] addresses = move.Split(":");
        if (addresses.Length != 2)
        {
            throw new ParseError(ParseType.Move, null);
        }
        return new Move(_board.GetSquareByAddress(addresses[0]), _board.GetSquareByAddress(addresses[1]));
    }

    public string PrintBoard(string? msg)
    {
        if (msg is not null)
        {
            msg = "-- " + msg;
        }
        return $"\n\n{_board.PrintBoard(_activeColor)}\n\n{msg}";
    }

    public void SwitchTurns()
    {
        _activeColor = _activeColor == Color.W ? Color.B : Color.W;
    }

    public void MakeMoveAi()
    {
        // computer move
    }


    public string? MakeMove(string move)
    {
        string err = null!;
        try
        {
            Capture? capture = null;
            IChessMove? parsed = null;
            try
            {
                parsed = ParseMove(move);
                if (parsed.To.Piece is not null)
                {
                    capture = new Capture(parsed.To.Piece, parsed.To.Address);
                }
                try
                {
                    _board.ValidateMove(parsed, _activeColor);

                }

                catch (CollisionError e)
                {
                    var blocker = e.Square.Piece!;
                    // en passant move.
                    if (e.Mover.Type == PieceType.P)
                    {
                        capture = new Capture(blocker, e.Square.Address);
                        e.Square.Update(null);
                    }
                    // castling
                    if (e.Mover.Type == PieceType.R && blocker.Type == PieceType.K)
                    {
                        // ..
                    }
                }
                if (capture is not null)
                {
                    // capture
                    move += $":{JsonSerializer.Serialize(capture)}";
                }
                _board.MakeMove(parsed);
                _moves.Add(move);


                SwitchTurns();

            }
            catch (ParseError e)
            {
                if (e.Type == ParseType.Move)
                {
                    return "invalid move format. Move must be formatted as <from>:<to>. Example: a2-a3\n";
                }
            }
            catch (AddressError e)
            {
                return $"address '{e.Address}' in move {move} is invalid: {e.Message}\n";
            }

        }
        catch (Exception e)
        {
            err = $"{e.Message}\n";
        }
        return err is null ? null : $"illegal move: {err}";
    }

    public void Quit()
    {
        IsPlaying = false;
    }
}


public record struct SaveGame(Square[][] squares, List<string> moves, Color activeColor) { }



