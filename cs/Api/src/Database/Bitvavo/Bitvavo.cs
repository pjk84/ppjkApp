using Api.Database.Models;
using Api.Features.Bitvavo;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace Api.Database;

public class BitvavoContext : IBitvavoContext
{
    private readonly IMongoCollection<BitvavoPortfolioSnapshot> _bitvavoBalanceSnapshots;

    public BitvavoContext(
        IOptions<ApiDatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(
            settings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase("ApiDatabase");

        _bitvavoBalanceSnapshots = mongoDatabase.GetCollection<BitvavoPortfolioSnapshot>("BitvavoBalanceHistory");
    }

    public async Task<List<BitvavoPortfolioSnapshot>> GetSnapshotsAsync() =>
        await _bitvavoBalanceSnapshots.Find(_ => true).ToListAsync();
    public async Task<bool> HasSnapshotForTodayAsync(DateTime today)
    {
        var res = await _bitvavoBalanceSnapshots.Find(s => s.Date.Day == today.Day).ToListAsync();
        return res.Any();
    }

    public async Task CreateSnapshotAsync(BitvavoPortfolioSnapshot snapshot) =>
        await _bitvavoBalanceSnapshots.InsertOneAsync(snapshot);

}