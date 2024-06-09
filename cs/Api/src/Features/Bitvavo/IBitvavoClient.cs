using Api.Features.Bitvavo.Models;
namespace Api.Features.Bitvavo;

public interface IBitvavoClient
{
    Task<BitvavoBalance[]> GetBalanceAsync(CancellationToken ct);
    Task<BitVavoMarketPrice?> GetMarketPriceAsync(string market, CancellationToken ct);
    Task<BitVavo24hPrice?> Get24hPriceAsync(string market, CancellationToken ct);
    Task<BitvavoTransactionHistory?> GetTransactionHistoryAsync(CancellationToken ct);
    Task<Order[]> GetOrdersAsync(CancellationToken ct);
}