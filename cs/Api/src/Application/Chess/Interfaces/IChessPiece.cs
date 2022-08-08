namespace Api.Application.Chess.Interfaces;

public interface IChessPiece
{
    public int Id { get; init; }
    // public ChessPieceType Type { get; init; }
    public ChessPieceColor Color { get; init; }
    public int PositionX { get; }  // the horizontal position A-H
    public int PositionY { get; } // the vertical position 1-8

    void SetPosition(int[] position);

    public bool IsValidMove(IChessMove move);
}


public enum ChessPieceType
{
    K, // King
    Q, //Queen
    N, // Knight
    R, // Rook
    B, //Bishop
    P // Pawn

}

public enum ChessPieceColor
{
    W,
    B
}
