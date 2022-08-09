using Api.Application.Chess.Interfaces;

namespace Api.Application.Chess.Models;

public record Move : IChessMove
{

    public int Id { get; init; }

    public IChessSquare From { get; set; }
    public IChessSquare To { get; set; }

    public Move(IChessSquare from, IChessSquare to)
    {
        From = from;
        To = to;
    }
}