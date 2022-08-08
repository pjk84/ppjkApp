namespace Api.Application.Chess.Interfaces;

public interface IChessGame
{

    public IChessboard Board { get; init; }

    public bool IsPlaying { get; }

    public void MakeMove(IChessMove move);

    public void Quit();
}
