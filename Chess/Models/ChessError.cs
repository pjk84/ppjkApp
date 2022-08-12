
using Chess.Interfaces;


class CollisionError : Exception, ICollisonError
{
    public IChessPiece Mover { get; init; }
    public IChessSquare Square { get; init; }
    public CollisionError(string message, IChessPiece mover, IChessSquare square) : base(message)
    {
        Mover = mover;
        Square = square;
    }
}

class ParseError : Exception, IParseError
{
    public ParseType Type { get; init; }
    public ParseError(ParseType type, string? message)
    {
        Type = type;
    }
}


class AddressError : Exception
{
    public string Address { get; init; }
    public AddressError(string address, string? message) : base(message)
    {
        Address = address;
    }
}