namespace Api.Application.Chess.Interfaces;

public interface IChessGame
{

    public bool IsPlaying { get; }

    public string PrintBoard(string? msg);

    public string? MakeMove(string move);

    public void Quit();
}
