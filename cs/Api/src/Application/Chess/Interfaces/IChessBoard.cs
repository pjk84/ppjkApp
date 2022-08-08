namespace Api.Application.Chess.Interfaces;

public interface IChessboard
{
    List<IChessPiece> Pieces { get; }

    public bool ValidateMove(IChessPiece piece, IChessMove move);
    public bool MoveIsWithinBounds(IChessMove move);

    public void MakeMove(IChessMove move);

    public IChessPiece GetPieceBySquare(int x, int y);

    public void Setup();

}


public interface IChessSquare
{
    public int PositionX { get; set; }
    public int PositionY { get; set; }
}

