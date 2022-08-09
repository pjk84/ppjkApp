
using Api.Application.Chess.Interfaces;
using System.Text.Json;
namespace Api.Application.Chess.Models;

public class Board : IChessboard
{

    public Color HasTurn { get; private set; } = Color.W;
    public Square[][] Squares { get; private set; }

    public Board(List<Square> squares)
    {

        if (squares is null)
        {
            Setup();
        }
        else
        {
            // continue previous game
            // Squares = squares;
        }
    }


    public void Setup()
    {
        using (StreamReader r = new StreamReader("src/Application/Chess/positions.json"))
        {
            string board = r.ReadToEnd();
            // add starting positions
            var squares = JsonSerializer.Deserialize<List<Square>>(board, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });

            foreach (int rank in Enumerable.Range(2, 4))
            {
                foreach (int file in Enumerable.Range(0, 8))
                {
                    var s = new Square(rank, file, null);
                    squares.Add(s);
                }
            }
            // convert to array for ease of access (by rasterized index)
            Squares = squares.OrderBy(n => n.File).ThenBy(n => n.Rank).Chunk(8).ToArray();
        }
    }

    public string PrintBoard()
    {
        var s = "";

        return s;
    }

    public bool MoveIsWithinBounds(IChessMove move)
    {
        if (!Enumerable.Range(0, 7).Contains(move.To.Rank))
        {
            return false;
        }
        if (!Enumerable.Range(0, 7).Contains(move.To.File))
        {
            return false;
        }
        return true;
    }

    public IChessPiece GetPieceBySquare(IChessSquare square)
    {
        var s = Squares[square.File][square.Rank];
        if (s.Piece != null)
        {
            return s.Piece;
        }
        return null;
    }

    public bool ValidateMove(IChessPiece piece, IChessMove move)
    {
        if (piece is null)
        {
            throw new Exception($"square is empty");
        }

        if (piece.Color != HasTurn)
        {
            throw new Exception($"illegal move: piece is not owned by player {HasTurn}");
        }

        if (!MoveIsWithinBounds(move))
        {
            throw new Exception("illegal move: coordinates are outside of bounds");
        }

        var pieceAtTargetSquare = GetPieceBySquare(move.To);

        if (pieceAtTargetSquare?.Color == piece.Color)
        {
            throw new Exception("illegal move: own piece found at target square");
        }


        if (!piece.IsValidMove(move))
        {
            throw new Exception("illegal move for piece");
        }

        return true;
    }

    public Square GetSquare(IChessSquare square)
    {
        return Squares[square.File][Squares.Rank];
    }

    public void MakeMove(IChessMove move)
    {
        var square = GetSquare(move.From);

        Console.WriteLine(square);
        Console.WriteLine(square.Piece.Type);

        ValidateMove(square.Piece, move);

        HasTurn = HasTurn == Color.W ? Color.B : Color.W;

    }
}


public record Square : IChessSquare
{

    public int Rank { get; set; }
    public int File { get; set; }

    public Piece Piece { get; set; } = null;

    public Square(int rank, int file, Piece piece)
    {
        Rank = rank;
        File = file;
        Piece = piece;
    }
}
