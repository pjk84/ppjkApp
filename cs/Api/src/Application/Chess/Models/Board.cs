
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

    private bool MoveIsWithinBounds(IChessMove move)
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


    private bool ValidateMove(IChessPiece piece, IChessMove move)
    {
        if (piece is null)
        {
            throw new Exception($"square is empty");
        }

        if (piece.Color != HasTurn)
        {
            throw new Exception($"illegal move: piece is not owned by player {HasTurn}");
        }

        //bounds
        if (!MoveIsWithinBounds(move))
        {
            throw new Exception("illegal move: coordinates are outside of bounds");
        }

        var target = GetSquare(move.To);

        if (target.Piece?.Color == piece.Color)
        {
            throw new Exception("illegal move: own piece found at target square");
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
    }
}

