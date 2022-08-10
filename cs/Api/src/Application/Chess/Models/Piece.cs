
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

    // pattern and behavior validation
    // Does not account for board level bounds or collisions
    public bool ValidateMove(IChessMove move, IChessSquare target)
    {

        if (move.Type == MoveType.Wild && Type != PieceType.N)
        {
            // wild move. if knight, evaluate on knight case
            throw new Exception("illegal move");
        }
        switch (Type)
        {
            case PieceType.P:

                if (move.Length > 2 || move.Width > 2)
                {
                    throw new Exception($"move size exceeds max allowed size of 2");
                }
                if (move.Type == MoveType.Diagonal)
                {
                    if (move.Width > 1)
                    {
                        throw new Exception("move size exceeds max allowed size of 1");
                    }
                    if (target.Piece is null)
                    {

                        throw new Exception("Pawn may not move diagonally unless attacking");
                    }
                }
                if (move.Type == MoveType.Straight)
                {
                    if (move.Length == 2)
                    {
                        if (Moves.Length > 0)
                        {
                            throw new Exception("Pawn may only advance two squares on the first move");
                        }
                    }
                    if (move.Width > 0)
                    {

                        throw new Exception("Pawn may only advance vertically");
                    }
                    if (target.Piece is not null)
                    {
                        throw new Exception("Pawn may only attack diagonally");
                    }
                }
                if (Color == Color.B)
                {
                    if (move.To.Rank > move.From.Rank)
                    {
                        throw new Exception("Pawn may not move backwards");
                    }
                }
                if (Color == Color.W)
                {
                    if (move.To.Rank < move.From.Rank)
                    {
                        throw new Exception("Pawn may not move backwards");
                    }
                }

                // implement en passant edge case
                break;
            case PieceType.R:
                if (move.Type != MoveType.Straight)
                {
                    throw new Exception("diagonal move not allowed");
                }
                break;
            case PieceType.B:
                if (move.Type != MoveType.Diagonal)
                {
                    throw new Exception("only diagonal move allowed");
                }
                break;
            case PieceType.Q:
                // only wild move not allowed.
                break;
            case PieceType.K:
                // only wild move not allowed.
                if (move.Length > 1 || move.Width > 1)
                {
                    throw new Exception($"move size exceeds max of 1");
                }
                // implement castling
                break;
            case PieceType.N:
                // only wild move not allowed.
                if (move.Type != MoveType.Wild)
                {
                    throw new Exception($"straight or diagonal move not allowed");
                }
                if ((move.Length == 1 || move.Width == 1) && move.Length + move.Width != 3)
                {

                    throw new Exception($"illegal movement pattern");
                }
                // implement castling
                break;
            default:
                break;
        }
        return true;
    }

}

