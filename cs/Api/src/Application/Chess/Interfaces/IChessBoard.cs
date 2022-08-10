using Api.Application.Chess.Models;

namespace Api.Application.Chess.Interfaces;

public interface IChessboard
{

    public (string err, string squares) MakeMove(IChessMove move);

    public string PrintBoard();

}


public interface IChessSquare
{
    public int Rank { get; init; }
    public int File { get; init; }

    public Color Color { get; init; }

    public Piece Piece { get; }

}

