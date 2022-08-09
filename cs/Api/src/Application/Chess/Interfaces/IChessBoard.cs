using Api.Application.Chess.Models;

namespace Api.Application.Chess.Interfaces;

public interface IChessboard
{

    Square[][] Squares { get; }

    public Dictionary<string, string> Pieces { get; init; } // piece representations

    public Color HasTurn { get; }

    public bool ValidateMove(IChessPiece piece, IChessMove move);
    public bool MoveIsWithinBounds(IChessMove move);

    public (string err, string squares) MakeMove(IChessMove move);

    public string PrintBoard();

    public string Serialize();



}


public interface IChessSquare
{
    public int Rank { get; init; }
    public int File { get; init; }

    public Color Color { get; init; }

    public Piece Piece { get; }

}

