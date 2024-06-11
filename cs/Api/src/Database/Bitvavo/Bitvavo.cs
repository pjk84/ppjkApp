using Api.Database.Models;
using Api.Features.Bitvavo;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace Api.Database;

public class BitvavoContext : IBitvavoContext
{
    private readonly IMongoCollection<BitvavoPortfolioSnapshot> _bitvavoBalanceSnapshots;
    private readonly IMongoCollection<TradingPlan> _tradingPlans;

    public BitvavoContext(
        IOptions<ApiDatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(
            settings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase("ApiDatabase");

        _bitvavoBalanceSnapshots = mongoDatabase.GetCollection<BitvavoPortfolioSnapshot>("BitvavoBalanceHistory");
        _tradingPlans = mongoDatabase.GetCollection<TradingPlan>("TradingPlans");
    }

    public async Task<List<BitvavoPortfolioSnapshot>> GetSnapshotsAsync() =>
        await _bitvavoBalanceSnapshots.Find(_ => true).ToListAsync();
    public async Task<bool> HasSnapshotForTodayAsync(DateTime today)
    {
        var res = await _bitvavoBalanceSnapshots.Find(s => s.Date == DateTime.Today).ToListAsync();
        return res.Any();
    }
    public async Task<TradingPlan> CreateTradingPlanAsync(string market, int amount, CancellationToken ct)
    {
        var plan = new TradingPlan(Market: market, Amount: amount, CreatedAt: DateTime.Now, Listening: false);
        await _tradingPlans.InsertOneAsync(plan, cancellationToken: ct);
        return plan;
    }
    public async Task UpdateTradingPlanAsync(TradingPlan plan, CancellationToken ct) =>
        await _tradingPlans.ReplaceOneAsync(p => p.Id == plan.Id, plan, cancellationToken: ct);

    public async Task CreateSnapshotAsync(BitvavoPortfolioSnapshot snapshot) =>
        await _bitvavoBalanceSnapshots.InsertOneAsync(snapshot);
    public async Task DeleteTradingPlanAsync(string planId, CancellationToken ct) =>
        await _tradingPlans.DeleteOneAsync(plan => plan.Id == planId, ct);
    public async Task<List<TradingPlan>> GetTradingPlansAsync(CancellationToken ct) =>
        await _tradingPlans.Find(_ => true).ToListAsync(ct);
    public async Task<TradingPlan?> GetTradingPlanAsync(string planId, CancellationToken ct) =>
        await _tradingPlans.Find(p => p.Id == planId).FirstOrDefaultAsync();


}