
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

class MoveParseError : Exception { }


class AddressParseError : Exception
{
    public string Address { get; init; }
    public AddressParseError(string address)
    {
        Address = address;
    }
}
