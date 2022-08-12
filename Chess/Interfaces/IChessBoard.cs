using Chess.Models;

#nullable enable
namespace Chess.Interfaces;

public interface IChessboard
{
    public Square[][] Squares { get; }
    public void MakeMove(IChessMove move);
    public void ValidateMove(IChessMove move, Color activeColor);

    public string Serialize();

    public IChessSquare GetSquareByAddress(string address);

    public string PrintBoard(Color activeColor);
    public bool IsChecked(Color activeColor);


}


public interface IChessSquare
{
    public int Rank { get; init; }
    public int File { get; init; }

    public string Address { get; init; }

    public Color Color { get; init; }

    public Piece? Piece { get; }

    public void Update(Piece? piece);

}

