
using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;
public class Piece : IChessPiece
{
    public int Id { get; init; }
    public PieceType Type { get; init; }
    public Color Color { get; init; }

    public Piece(int id, Color color, PieceType type)
    {
        Id = id;
        Color = color;
        Type = type;
    }


    public void SetPosition(int[] newPosition)
    {
        // Position = newPosition;

    }

    public bool IsValidMove(IChessMove move)
    {
        return true;
    }

}

