
using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;

public class Board : IChessboard
{

    public List<IChessPiece> Pieces { get; private set; }

    public Board(List<IChessPiece> pieces)
    {
        if (pieces is null)
        {
            Setup();
        }
        else
        {
            // continue previous game
            Pieces = pieces;
        }
    }

    public void Setup()
    {
        // // set up board with start positions
        // List<Pawn> pawns = new List<Pawn>{
        //     new Pawn(0, ChessPieceColor.B, 1, 7),
        //     new Pawn(0, ChessPieceColor.B, 2, 7),
        //     new Pawn(0, ChessPieceColor.B, 3, 7),
        //     new Pawn(0, ChessPieceColor.B, 4, 7),
        //     new Pawn(0, ChessPieceColor.B, 5, 7),
        //     new Pawn(0, ChessPieceColor.B, 6, 7),
        //     new Pawn(0, ChessPieceColor.B, 7, 7),
        //     new Pawn(0, ChessPieceColor.B, 8, 7),
        //     new Pawn(0, ChessPieceColor.W, 1, 2),
        //     new Pawn(0, ChessPieceColor.W, 2, 2),
        //     new Pawn(0, ChessPieceColor.W, 3, 2),
        //     new Pawn(0, ChessPieceColor.W, 4, 2),
        //     new Pawn(0, ChessPieceColor.W, 5, 2),
        //     new Pawn(0, ChessPieceColor.W, 6, 2),
        //     new Pawn(0, ChessPieceColor.W, 7, 2),
        //     new Pawn(0, ChessPieceColor.W, 8, 2),
        //     };
    }

    public bool MoveIsWithinBounds(IChessMove move)
    {
        if (!Enumerable.Range(1, 8).Contains(move.To.PositionX))
        {
            return false;
        }
        if (!Enumerable.Range(1, 8).Contains(move.To.PositionY))
        {
            return false;
        }
        return true;
    }

    public IChessPiece GetPieceBySquare(int x, int y)
    {
        var piece = Pieces.Find(p => p.PositionX == x && p.PositionY == y);
        if (piece != null)
        {
            return piece;
        }
        return null;
    }

    public bool ValidateMove(IChessPiece piece, IChessMove move)
    {

        if (!MoveIsWithinBounds(move))
        {
            throw new Exception("Move coordinates are invalid");
        }

        if (piece is null)
        {
            throw new Exception($"Piece {move.Id} does not exist");
        }

        var pieceAtTargetSquare = GetPieceBySquare(move.To.PositionX, move.To.PositionY);

        if (pieceAtTargetSquare.Color == piece.Color)
        {
            throw new Exception("own piece already at location");
        }


        if (!piece.IsValidMove(move))
        {
            throw new Exception("illegal move for piece");
        }


        return true;
    }

    public void MakeMove(IChessMove move)
    {
        var piece = Pieces.Find(p => p.PositionX == move.From.PositionX && p.PositionY == move.From.PositionY);
        ValidateMove(piece, move);


    }
}

