
using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;
public class Game : IChessGame
{
    public IChessboard Board { get; init; }
    public bool IsPlaying { get; private set; }
    public Game()
    {
        // load board from cache.. 

        // or create new one
        // Board = new Board(new[] { new Piece(0, ChessPieceType.P, ChessPieceColor.B, new int[] { 0, 0 }) });
        Board = new Board(null);

    }

    public void MakeMove(IChessMove move)
    {
        Board.MakeMove(move);
    }

    public void Quit()
    {
        IsPlaying = false;
    }
}