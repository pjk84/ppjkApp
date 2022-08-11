using Api.Application.Chess.Models;

#nullable enable
namespace Api.Application.Chess.Interfaces;

public interface IChessboard
{
    public Square[][] Squares { get; }
    public string MakeMove(IChessMove move);
    public void ValidateMove(IChessMove move);

    public string PrintBoard();

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

