namespace Api.Application.Chess.Interfaces;

public interface IChessMove
{
    public IChessSquare From { get; set; }
    public IChessSquare To { get; set; }

}