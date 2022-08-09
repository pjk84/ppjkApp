namespace Api.Application.Chess.Interfaces;

public interface IChessPiece
{
    public int Id { get; init; }
    // public ChessPieceType Type { get; init; }
    public Color Color { get; init; }

    public PieceType Type { get; init; }

    public bool IsValidMove(IChessMove move);
}


public enum PieceType
{
    P, // Pawn
    K, // King
    Q, //Queen
    N, // Knight
    R, // Rook
    B, //Bishop

}

public enum Color
{
    W,
    B
}
