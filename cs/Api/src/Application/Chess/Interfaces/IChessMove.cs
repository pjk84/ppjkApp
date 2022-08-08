namespace Api.Application.Chess.Interfaces;

public interface IChessMove
{

    public int Id { get; init; } // the id of the piece

    public IChessSquare From { get; set; }
    public IChessSquare To { get; set; }

}