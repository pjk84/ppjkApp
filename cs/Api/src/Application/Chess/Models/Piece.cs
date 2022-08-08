
using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;
public class Piece : IChessPiece
{
    public int Id { get; init; }

    public ChessPieceType Type { get; init; }
    // public ChessPieceType Type { get; init; }
    public ChessPieceColor Color { get; init; }

    public int PositionX { get; private set; }
    public int PositionY { get; private set; }

    public Piece(int id, ChessPieceColor color, int positionX, int positionY)
    {
        Id = id;
        Color = color;
        // Type = type;
        PositionX = positionX;
        PositionY = positionY;
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

// public class Rook : Piece
// {
//     public ChessPieceType Type = ChessPieceType.R;
//     public Rook(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // rook validation
//         return true;
//     }
// }

// public class King : Piece
// {
//     public ChessPieceType Type = ChessPieceType.K;
//     public King(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // king validation
//         return true;
//     }
// }

// public class Queen : Piece
// {
//     public ChessPieceType Type = ChessPieceType.Q;
//     public Queen(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // queen validation
//         return true;
//     }
// }

// public class Bishop : Piece
// {
//     public ChessPieceType Type = ChessPieceType.B;
//     public Bishop(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // bishop validation
//         return true;
//     }
// }

// public class Knight : Piece
// {
//     public ChessPieceType Type = ChessPieceType.N;
//     public Knight(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // knight validation
//         return true;
//     }
// }

// public class Pawn : Piece
// {
//     public ChessPieceType Type = ChessPieceType.P;
//     public Pawn(int id, ChessPieceColor color, int positionX, int positionY) : base(id, color, positionX, positionY) { }

//     public override bool IsValidMove(IChessMove move)
//     {
//         // pawn validation
//         return true;
//     }
// }
