using Api.Database.Models;
namespace Api.Database;

public interface IBitvavoContext
{
    Task CreateSnapshotAsync(BitvavoPortfolioSnapshot snapshot);
    Task CreateTradingPlanAsync(string market, int amount, CancellationToken ct);
    Task<List<TradingPlan>> GetTradingPlansAsync(CancellationToken ct);
    Task DeleteTradingPlanAsync(string planId, CancellationToken ct);
    Task<List<BitvavoPortfolioSnapshot>> GetSnapshotsAsync();
    Task<bool> HasSnapshotForTodayAsync(DateTime today);

}