
using Api.Application.Chess.Interfaces;


namespace Api.Application.Chess.Models;
public class Chess
{

    public IChessboard Board { get; init; }
    public bool IsPlaying { get; private set; }
    public Chess(string squares)
    {

        Board = new Board(squares);

    }

    public string MakeMove(IChessMove move)
    {
        var (err, squares) = Board.MakeMove(move);
        // cache squares
        var errMsg = err is null ? null : $"illegal move: {err}";
        return $"{Board.PrintBoard()}\n {errMsg}";
    }

    public void Quit()
    {
        IsPlaying = false;
    }
}