
using Api.Application.Chess.Interfaces;
using System.Text.Json;
namespace Api.Application.Chess.Models;


public class Board : IChessboard
{

    public Color HasTurn { get; private set; } = Color.W;
    public Square[][] Squares { get; private set; }
    public Dictionary<string, string> Pieces { get; init; } // piece representations
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


        if (squares is null)
        {
            using (StreamReader r = new StreamReader("src/Application/Chess/start.json"))
            {
                squares = r.ReadToEnd();
            }
        }

        Squares = Deserialize(squares);
    }

    private Square[][] Deserialize(string squares)
    {
        return JsonSerializer.Deserialize<Square[][]>(squares, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
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

    private void MoveIsWithinBounds(IChessMove move)
    {
        var isInBounds = true;
        if (!Enumerable.Range(0, 7).Contains(move.To.Rank))
        {
            isInBounds = false;
        }
        if (!Enumerable.Range(0, 7).Contains(move.To.File))
        {
            isInBounds = false;
        }
        if (!isInBounds)
        {
            throw new Exception("out of bounds");
        }
    }


    private bool ValidateMove(IChessPiece piece, IChessMove move)
    {
        if (piece is null)
        {
            throw new Exception($"square is empty");
        }

        if (piece.Color != HasTurn)
        {
            throw new Exception($"piece is not owned by player {HasTurn}");
        }

        //bounds
        MoveIsWithinBounds(move);

        var target = GetSquare(move.To);

        if (target.Piece?.Color == piece.Color)
        {
            throw new Exception("own piece found at target square");
        }

        piece.ValidateMove(move, target);

        // collisions
        CheckCollision(move);


        return true;
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
        Console.WriteLine(JsonSerializer.Serialize(squares));
        if (move.Type == MoveType.Straight)
        {
            foreach (var s in squares)
            {
                if (s.Piece is not null)
                {
                    throw new Exception($"collision detected at {s.Address}");
                }
            }
        }
    }

    // return single array of squares by move direction
    private Square[] Slice(IChessMove move)
    {
        var transposed = Enumerable.Empty<Square>();
        int[] range = { };
        if (move.Type == MoveType.Diagonal)
        {
            foreach (var i in Enumerable.Range(0, 8))
            {
                transposed = transposed.Append(Squares[move.From.File][i]);
            }
        }
        if (move.From.File != move.To.File)
        {
            range = new[] { move.From.File, move.To.File };
            Array.Sort(range);
            // horizontal move. no transposition needed
            transposed = Squares[move.From.Rank];
        }
        else
        {
            // vertical move
            range = new[] { move.From.Rank, move.To.Rank };
            foreach (var i in Enumerable.Range(0, 8))
            {
                var s = Squares[i][move.From.File];
                transposed = transposed.Append(s);
            }
        }
        return transposed.Take((range[0] + 1)..range[1]).ToArray();
    }



    public (string err, string squares) MakeMove(IChessMove move)
    {
        var from = GetSquare(move.From);

        string err = null;
        try
        {
            ValidateMove(from.Piece, move);
            HasTurn = HasTurn == Color.W ? Color.B : Color.W;
            var to = GetSquare(move.To);
            to.Update(from.Piece);
            from.Update(null);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            err = $"{e.Message}\n";
        }

        return (err, Serialize());


    }
}


public record Square : IChessSquare
{

    public int Rank { get; init; }
    public int File { get; init; }
    public Color Color { get; init; }

    public string Address { get; init; } // string representation of square

    public Piece Piece { get; private set; } = null;

    public void Update(Piece piece)
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

