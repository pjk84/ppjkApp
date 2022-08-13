using Chess.Models;

#nullable enable
namespace Chess.Interfaces;

public interface IChessboard
{
    public Square[][] Squares { get; }

    public King[] Kings { get; }

    public void MakeMove(IChessSquare from, IChessSquare to, Piece piece);
    public void ValidateMove(IChessMove move, int activeColor);

    public string Serialize();

    public IChessSquare GetSquareByAddress(string address);

    public string PrintBoard(int activeColor, int presentation);
    public (int color, Square square)? EvaluateCheck();


}


public interface IChessSquare
{
    public int Rank { get; init; }
    public int File { get; init; }

    public string Address { get; init; }

    public int Color { get; init; }

    public Piece? Piece { get; }

    public void Update(Piece? piece);

}

