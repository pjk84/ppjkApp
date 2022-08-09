using Api.Application.Chess.Models;

namespace Api.Application.Chess.Interfaces;

public interface IChessboard
{

    Square[][] Squares { get; }

    public Color HasTurn { get; }

    public bool ValidateMove(IChessPiece piece, IChessMove move);
    public bool MoveIsWithinBounds(IChessMove move);

    public void MakeMove(IChessMove move);

    public string PrintBoard();

    public IChessPiece GetPieceBySquare(IChessSquare square);

    public void Setup();

}


public interface IChessSquare
{
    public int Rank { get; set; }
    public int File { get; set; }

    public Piece Piece { get; set; }

}

