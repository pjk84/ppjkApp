using Chess.Models;
namespace Chess.Interfaces;

public interface IChessGame
{

    public bool IsPlaying { get; }

    public string PrintBoard(string? msg);

    public void SaveGame(string fileName);
    public void LoadGame(string fileName);

    public string? MakeMove(string move);

    public void Undo();

    public void Restart();

    public void Quit();
}


public interface ISaveGame
{
    public Board Board { get; init; }

    public List<string> Moves { get; init; }

    public Color ActiveColor { get; init; }

}