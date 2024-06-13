using Api.Database.Models;
namespace Api.Database;

public interface IBitvavoContext
{
    Task CreateSnapshotAsync(BitvavoPortfolioSnapshot snapshot);
    Task<TradingPlan> CreateTradingPlanAsync(string market, int amount, double buyAt, double sellAt, CancellationToken ct);
    Task UpdateTradingPlanAsync(TradingPlan plan, CancellationToken ct);
    Task<List<TradingPlan>> GetTradingPlansAsync(CancellationToken ct);
    Task<TradingPlan?> GetTradingPlanAsync(string planId, CancellationToken ct = default);
    Task DeleteTradingPlanAsync(string planId, CancellationToken ct);
    Task<List<BitvavoPortfolioSnapshot>> GetSnapshotsAsync();
    Task<bool> HasSnapshotForTodayAsync(DateTime today);

}