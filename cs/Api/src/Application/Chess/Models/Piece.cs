
using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;
public class Piece : IChessPiece
{
    public int Id { get; init; }
    public PieceType Type { get; init; }
    public Color Color { get; init; }

    private IChessMove[] Moves { get; } = { };

    public Piece(int id, Color color, PieceType type)
    {
        Id = id;
        Color = color;
        Type = type;
    }

    public bool ValidateMove(IChessMove move, IChessSquare target)
    {
        var isDiagonal = (move.From.File != move.To.File) && (move.From.Rank != move.To.Rank);
        var moveHeight = Math.Abs(move.To.Rank - move.From.Rank);
        var moveWidth = Math.Abs(move.To.File - move.From.File);
        switch (Type)
        {
            case PieceType.P:
                if (move.From.Rank == 1)
                {
                    if (moveHeight > 2 || moveWidth > 2)
                    {
                        throw new Exception($"move size exceeds max of 2");
                    }
                    if (isDiagonal && target.Piece is null)
                    {
                        throw new Exception("non-attacking diagonal move not allowed");
                    }
                    if (!isDiagonal && moveWidth > 0)
                    {
                        throw new Exception("sideways move not allowed");
                    }
                    if (Color == Color.B)
                    {
                        if (move.To.Rank > move.From.Rank)
                        {
                            throw new Exception("rearward move not allowed");
                        }
                    }
                    if (Color == Color.W)
                    {
                        if (move.To.Rank < move.From.Rank)
                        {
                            throw new Exception("rearward move not allowed");
                        }
                    }
                    // double opening move
                    if (moveHeight == 2)
                    {
                        if (Moves.Length > 0)
                        {
                            throw new Exception("double move only allowed as first move");
                        }
                    }
                }
                break;
            case PieceType.R:
                if (isDiagonal)
                {
                    throw new Exception("diagonal move not allowed");
                }
                break;
            default:
                break;
        }
        return true;
    }

}

