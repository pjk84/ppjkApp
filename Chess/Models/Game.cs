
using Chess.Interfaces;
using System.Text.Json;

namespace Chess.Models;




public class Game : IChessGame
{

    private int _activeColor = 0;
    private int _playerColor;

    private bool _withAi = false;

    private int _presentation = 1;

    private bool _enemyChecked = false;
    private Board _board;
    public bool IsPlaying { get; private set; }

    public List<Turn> Turns { get; private set; } = new List<Turn> { };
    public Game()
    {
        _board = NewBoard();
        IsPlaying = true;
        _playerColor = 0;
    }

    public void Restart()
    {
        Turns = new List<Turn> { };
        _board = NewBoard();
        _activeColor = 0;
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
                _board = new Board(JsonSerializer.Serialize(saveGame.Squares));
                _activeColor = saveGame.ActiveColor;
                Turns = saveGame.Turns;
            }
        }
    }

    public void SaveGame(string fileName)
    {
        var saveGame = new SaveGame(_board.Squares, Turns, _activeColor);
        File.WriteAllText($"games/{fileName}.json", JsonSerializer.Serialize(saveGame));

    }

    public void Undo()
    {
        if (Turns.Count == 0)
        {
            throw new Exception("no moves found");
        }
        // revert last move
        var lastTurn = Turns.Last();
        var parsed = ParseMove(lastTurn.Move);
        parsed.Revert();
        _board.MakeMove(parsed.From, parsed.To, parsed.From.Piece!);
        if (lastTurn.Capture is not null)
        {
            // get the square at which the piece was captured
            var square = _board.GetSquareByAddress(lastTurn.Move.Substring(3));

            // re-populate square with piece
            square.Update(lastTurn.Capture);
        }
        Turns.RemoveAt(Turns.Count() - 1);
        SwitchTurns();
    }

    // parse string presentation 'A1:A2' to move
    public IChessMove ParseMove(string move)
    {
        if (move.Length != 5)
        {
            throw new MoveParseError();
        }
        string[] addresses = move.Split("-");
        if (addresses.Length != 2)
        {
            throw new MoveParseError();
        }
        return new Move(_board.GetSquareByAddress(addresses[0]), _board.GetSquareByAddress(addresses[1]));
    }

    public string PrintBoard(string? msg)
    {
        if (msg is not null)
        {
            msg = "-- " + msg;
        }
        return $"\n\n{_board.PrintBoard(_activeColor, _presentation)}\n\n{msg}";
    }

    public string PrintTurns()
    {
        var s = "\nmoves:\n";
        string? capture = null;
        foreach (var turn in Turns)
        {
            capture = turn.Capture is not null ? $" x {turn.Capture.Type}" : null;
            s += $"{(turn.Piece.Color == 0 ? "w" : "b")}{turn.Piece.Type} {turn.Move} {capture}\n";
        }
        return s;
    }

    public void SwitchTurns()
    {
        _activeColor = 1 - _activeColor;
        if (!_withAi)
        {
            _playerColor = 1 - _playerColor;
        }
    }

    public void MakeMoveAi()
    {
        // computer move
    }

    // check if king at either side is checked
    // if active side king is checked the move is reverted.
    public void Check()
    {
        var check = _board.EvaluateCheck();
        var playerChecked = check[_activeColor];
        var enemyChecked = check[1 - _activeColor];
        if (playerChecked is not null)
        {
            var kingAddress = _board.Kings[_activeColor].Address;
            Undo();
            throw new Exception($"K at {kingAddress} checked by {playerChecked.Piece!.Type} at {playerChecked.Address}");
        }
        if (enemyChecked is not null)
        {
            _enemyChecked = true;
        }
        else
        {
            _enemyChecked = false;
        }
    }

    public string? MakeMove(string move)
    {
        string? err = null;
        string? msg = null;
        try
        {
            IChessMove? parsed = null;
            try
            {
                parsed = ParseMove(move);
                var piece = parsed.From.Piece!;
                var capture = parsed.To.Piece;
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
                        capture = blocker;
                        e.Square.Update(null);
                    }
                    // castling
                    if (e.Mover.Type == PieceType.R && blocker.Type == PieceType.K)
                    {
                        // ..
                    }
                }
                _board.MakeMove(parsed.From, parsed.To, parsed.From.Piece!);
                Turns.Add(new Turn(move, piece, capture));

                Check();

                if (_enemyChecked)
                {
                    msg = $"enemy king is checked at {_board.Kings[1 - _activeColor].Address}";
                }

                SwitchTurns();

            }
            catch (MoveParseError)
            {
                return "invalid move format. Move must be formatted as <from>:<to>. Example: a2-a3\n";
            }
            catch (AddressParseError e)
            {
                return $"invalid address '{e.Address}'\n";
            }

        }
        catch (Exception e)
        {
            err = $"{e.Message}\n";
        }
        return err is null ? msg : $"illegal move: {err}";
    }

    public void Quit()
    {
        IsPlaying = false;
    }
}


public record struct SaveGame(Square[][] Squares, List<Turn> Turns, int ActiveColor) { }



