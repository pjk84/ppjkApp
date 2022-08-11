
using Api.Application.Chess.Interfaces;
using System.Text.Json;

namespace Api.Application.Chess.Models;
public class Chess : IChessGame
{

    private IChessboard _board { get; init; }
    public bool IsPlaying { get; private set; }

    private List<string> _moves = new List<string> { };
    public Chess()
    {
        IsPlaying = true;
        {
            using (StreamReader r = new StreamReader("start.json"))
            {
                _board = new Board(r.ReadToEnd());
            }
        }

    }

    public void LoadGame()
    {

    }

    public string Undo()
    {
        if (_moves.Count == 0)
        {
            throw new Exception("no moves found");
        }
        // revert last move
        var lastMove = _moves.Last();
        var parsed = ParseMove(lastMove);
        var from = parsed.From;
        var to = parsed.To;
        parsed.From = to;
        parsed.To = from;
        _board.MakeMove(parsed);
        _moves.RemoveAt(_moves.Count() - 1);
        return _board.PrintBoard();
    }

    // parse string presentation 'A1:A2' to move
    public IChessMove ParseMove(string move)
    {
        move = move.ToUpper();
        var files = "ABCDEFGH";
        string[] addresses = move.Split(":");
        if (addresses.Length != 2)
        {
            throw new Exception("invalid square address");
        }
        int[][] coords = { };
        foreach (var address in addresses)
        {
            var file = files.IndexOf(address[0]);
            int.TryParse(address[1].ToString(), out int rank);
            var x = new[] { file, rank - 1 };
            coords = coords.Append(x).ToArray();
        }
        return new Move(_board.Squares[coords[0][1]][coords[0][0]], _board.Squares[coords[1][1]][coords[1][0]]);
    }

    public string PrintBoard(string? msg)
    {
        return $"{_board.PrintBoard()}\n\n {msg}";
    }

    public string? MakeMove(string move)
    {
        string err = null!;
        try
        {
            var parsed = ParseMove(move);
            _board.ValidateMove(parsed);
            _board.MakeMove(parsed);
            _moves.Add(move);
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