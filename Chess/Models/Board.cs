
using Api.Application.Chess.Interfaces;
using System.Text.Json;
namespace Api.Application.Chess.Models;


public class Board : IChessboard
{

    private Color ActiveColor = Color.W;
    public Square[][] Squares { get; private set; }
    private Dictionary<string, string> Pieces;
    public Board(string squares)
    {

        Pieces = new Dictionary<string, string>{
            {"PB",  "♙"}, // (P)awn (w)hite .. etc
            {"PW",  "♟"},
            {"KB",  "♔"},
            {"KW",  "♚"},
            {"QB",  "♕"},
            {"QW",  "♛"},
            {"NB",  "♘"},
            {"NW",  "♞"},
            {"BB",  "♗"},
            {"BW",  "♝"},
            {"RB",  "♖"},
            {"RW",  "♜"},
        };

        Squares = Deserialize(squares);
    }

    private Square[][] Deserialize(string squares)
    {
        var deserialized = JsonSerializer.Deserialize<Square[][]>(squares, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
        if (deserialized is null)
        {
            throw new Exception("could not deserialize board string representation");
        }
        return deserialized;
    }

    private string Serialize()
    {
        return JsonSerializer.Serialize(Squares);
    }


    public string PrintBoard()
    {
        var s = "";
        var i = 0;
        foreach (var rank in Squares.Reverse())
        {
            if (i == 0)
            {

                s += "  ┏━━━┯━━━┯━━━┯━━━┯━━━┯━━━┯━━━┯━━━┓\n";
            }

            foreach (var square in rank)
            {
                var line = "│";
                if (square.File == 0)
                {
                    s += $"{8 - i} ";
                    line = "┃";
                }
                s += $"{(square.Piece is null ? $"{line}{(square.Color == Color.W ? "╳╳╳" : "   ")}" : $"{line} {Pieces[$"{square.Piece.Type}{square.Piece.Color}"]} ")}";
                // s += $"_{square.Color}_";
                if (square.File == 7)
                {
                    s += "┃\n";
                }

            }
            if (i == 7)
            {
                s += "  ┗━━━┷━━━┷━━━┷━━━┷━━━┷━━━┷━━━┷━━━┛\n";
                s += "    a   b   c   d   e   f   g   h";
            }
            else
            {
                s += "  ┣───┼───┼───┼───┼───┼───┼───┼───┫\n";
            }

            i++;
        }
        return s;
    }

    private void MoveIsWithinBounds(IChessSquare target)
    {
        var isInBounds = true;
        if (!Enumerable.Range(0, 8).Contains(target.Rank))
        {
            isInBounds = false;
        }
        if (!Enumerable.Range(0, 8).Contains(target.File))
        {
            isInBounds = false;
        }
        if (!isInBounds)
        {
            throw new Exception("out of bounds");
        }
    }


    public void ValidateMove(IChessMove move)
    {
        var from = GetSquare(move.From);

        if (from.Piece is null)
        {
            throw new Exception($"square is empty");
        }

        if (from.Piece.Color != ActiveColor)
        {
            throw new Exception($"piece is not owned by player {ActiveColor}");
        }

        //bounds
        MoveIsWithinBounds(move.To);

        var target = GetSquare(move.To);

        from.Piece.ValidateMove(move, target.Piece);

        CheckCollision(move);

        CheckTarget(move, target.Piece);
    }

    private void CheckTarget(IChessMove move, IChessPiece? pieceAtTarget)
    {
        if (pieceAtTarget is null)
        {
            return;
        }
        if (pieceAtTarget.Color == ActiveColor)
        {
            throw new Exception("own piece found at target square");
        }
    }

    public void Capture(IChessPiece piece)
    {

    }


    public Square GetSquare(IChessSquare square)
    {
        var res = Squares[square.Rank][square.File];
        return res;
    }

    private void CheckCollision(IChessMove move)
    {
        if (move.Type == MoveType.Wild)
        {
            // no collision 
            return;
        }
        if (move.Width < 2 && move.Length < 2)
        {
            // move to adjecent square. no collision
            return;
        }
        var squares = Slice(move);
        {
            foreach (var s in squares)
            {
                if (s.Piece is not null)
                {
                    throw new Exception($"blocked by {s.Piece.Type} at {s.Address}");
                }
            }
        }
    }

    // return single array of squares by move direction
    private Square[] Slice(IChessMove move)
    {
        var slice = Enumerable.Empty<Square>();
        int[] range = { };
        if (move.Type == MoveType.Diagonal)
        {
            // create subset of squares by move diagonal
            var minFile = Math.Min(move.From.File, move.To.File);
            var minRank = Math.Min(move.From.Rank, move.To.Rank);
            foreach (var i in Enumerable.Range(minRank, move.Width + 1))
            {

                foreach (var k in Enumerable.Range(minFile, move.Width + 1))
                {

                    var s = Squares[i][k];

                    // eliminate source and destination and squares that are not on the diagonal
                    if (s.Address == move.From.Address || s.Address == move.To.Address)
                    {
                        continue;
                    }
                    if (Math.Abs(s.Rank - move.From.Rank) != Math.Abs(s.File - move.From.File))
                    {
                        continue;
                    }
                    slice = slice.Append(s);

                }
            }
            return slice.ToArray();
        }
        if (move.From.File != move.To.File)
        {
            // horizontal move. no transposition needed
            range = new[] { move.From.File, move.To.File };
            slice = Squares[move.From.Rank];
        }
        else
        {
            // vertical move
            range = new[] { move.From.Rank, move.To.Rank };
            foreach (var i in Enumerable.Range(0, 8))
            {
                var s = Squares[i][move.From.File];
                slice = slice.Append(s);
            }
        }
        return slice.Take((range.Min() + 1)..range.Max()).ToArray();
    }



    public string MakeMove(IChessMove move)
    {
        var from = GetSquare(move.From);
        var to = GetSquare(move.To);

        if (to.Piece is not null)
        {
            // enemy piece at target square
            Capture(to.Piece);
        }

        to.Update(from.Piece);

        from.Update(null);


        ActiveColor = ActiveColor == Color.W ? Color.B : Color.W;

        return Serialize();
    }
}

public record Square : IChessSquare
{

    public int Rank { get; init; }
    public int File { get; init; }
    public Color Color { get; init; }

    public string Address { get; init; } // string representation of square

    public Piece? Piece { get; private set; } = null;

    public void Update(Piece? piece)
    {
        Piece = piece;
    }

    public Square(int file, int rank, Piece piece)
    {

        Rank = rank;
        File = file;
        Piece = piece;
        Color = (file + rank) % 2 == 0 ? Color.B : Color.W;
        var files = "abcdefgh";
        Address = $"{files[file]}{rank + 1}";
    }
}

