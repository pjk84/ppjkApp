using Api.Database.Models;
namespace Api.Database;

public interface IBitvavoContext
{
    Task CreateSnapshotAsync(BitvavoPortfolioSnapshot snapshot);
    Task<List<BitvavoPortfolioSnapshot>> GetSnapshotsAsync();
    Task<bool> HasSnapshotForTodayAsync(DateTime today);

}