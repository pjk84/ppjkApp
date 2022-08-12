
using Chess.Interfaces;
using System.Text.Json;
namespace Chess.Models;


public class Board : IChessboard
{
    public Square[][] Squares { get; private set; }

    public King[] _kings = { new King(Color.W, false, "e2"), new King(Color.B, false, "e8") };
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

    public string Serialize()
    {
        return JsonSerializer.Serialize(Squares);
    }

    public IChessSquare GetSquareByAddress(string address)
    {
        var files = "abcdefgh";
        if (address.Length != 2)
        {
            throw new AddressError(address, "address not of expected length 2");
        }
        var file = files.IndexOf(address[0]);
        if (file == -1)
        {
            throw new AddressError(address, $"file '{address[0]}' is not a valid file");
        }
        // var rank = Convert.ToInt32(address[1].ToString());
        int.TryParse(address[1].ToString(), out int rank);
        if (!Enumerable.Range(1, 8).Contains(rank))
        {
            throw new AddressError(address, $"'{address[1]}' is not a valid rank");
        }
        return Squares[rank - 1][file];
    }

    public string PrintBoard(Color activeColor)
    {
        var s = "";
        var i = 0;
        foreach (var rank in Squares.Reverse())
        {
            if (i == 0)
            {

                s += $"  ┏━━━┯━━━┯━━━┯━━━┯━━━┯━━━┯━━━┯━━━┓ {(activeColor == Color.B ? "<-" : null)} \n";
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
                s += $"  ┗━━━┷━━━┷━━━┷━━━┷━━━┷━━━┷━━━┷━━━┛ {(activeColor == Color.W ? "<-" : null)}\n";
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

    public bool IsChecked(Color color)
    {
        var i = (int)color;
        bool check = false;


        return check;
    }


    public void ValidateMove(IChessMove move, Color activeColor)
    {

        if (move.From.Piece is null)
        {
            throw new Exception($"square is empty");
        }

        if (move.From.Piece.Color != activeColor)
        {
            throw new Exception($"piece at {move.From.Address} is not owned by player {activeColor}");
        }

        //bounds
        MoveIsWithinBounds(move.To);


        move.From.Piece.ValidateMove(move, move.To.Piece);

        CheckCollision(move);

        if (move.To.Piece?.Color == activeColor)
        {
            throw new Exception("own piece found at target square");
        }
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
            foreach (var square in squares)
            {
                if (square.Piece is not null)
                {
                    throw new CollisionError($"blocked by {square.Piece.Color.ToString().ToLower()}{square.Piece.Type} at {square.Address}", move.From.Piece!, square);
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



    public void MakeMove(IChessMove move)
    {

        move.To.Update(move.From.Piece);

        move.From.Update(null);

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



public record King
{
    public Color Color { get; init; }

    public string Address { get; set; }

    public bool Checked { get; set; }
    public King(Color color, bool isChecked, string address)
    {
        Color = color;
        Checked = isChecked;
        Address = address;
    }
}