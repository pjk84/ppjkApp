using System.Net;
using System.Security.Cryptography;
using System.Text;
using Api.Common.ApiClient;
using Api.Common.RedisCache;
using Api.Extensions;
using Api.Features.Bitvavo.Models;

namespace Api.Features.Bitvavo;

public class BitvavoClient : BaseApiClient, IBitvavoClient
{
    private readonly string _apiKey;
    private readonly string _apiSecret;

    public BitvavoClient(HttpClient http, IRedisCache cache, IConfiguration config) : base(http, config, cache)
    {
        _apiKey = _config["Bitvavo:Rest:ApiKey"]!;
        _apiSecret = _config["Bitvavo:Rest:ApiSecret"]!;
        _httpClient.BaseAddress = new Uri(_config["Bitvavo:Rest:BaseUrl"]!);
    }

    public async Task<BitvavoBalance[]> GetBalanceAsync(CancellationToken ct)
    {
        var url = "balance";
        AddAuthHeaders(url);
        var res = await _httpClient.GetAsync(url, ct);
        return res.StatusCode == HttpStatusCode.OK ? await HttpResponseMessageExtensions.DeserializeAsync<BitvavoBalance[]>(res) : [];
    }
    public async Task<Order[]> GetOrdersAsync(CancellationToken ct)
    {
        var url = "orders";
        AddAuthHeaders(url);
        var res = await _httpClient.GetAsync(url, ct);
        return res.StatusCode == HttpStatusCode.OK ? await HttpResponseMessageExtensions.DeserializeAsync<Order[]>(res) : [];
    }

    public async Task<BitVavoMarketPrice?> GetMarketPriceAsync(string market, CancellationToken ct)
    {
        var url = $"ticker/price?market={market}";
        AddAuthHeaders(url);
        var res = await _httpClient.GetAsync(url, ct);
        return res.StatusCode == HttpStatusCode.OK ? await HttpResponseMessageExtensions.DeserializeAsync<BitVavoMarketPrice>(res) : null;
    }

    public async Task<BitVavo24hPrice?> Get24hPriceAsync(string market, CancellationToken ct)
    {
        var url = $"ticker/24h?market={market}";
        AddAuthHeaders(url);
        var res = await _httpClient.GetAsync(url, ct);
        return res.StatusCode == HttpStatusCode.OK ? await HttpResponseMessageExtensions.DeserializeAsync<BitVavo24hPrice>(res) : null;
    }

    public async Task<BitvavoTransactionHistory?> GetTransactionHistoryAsync(CancellationToken ct)
    {
        // fromdate is 01-01-2021
        var url = $"account/history?fromDate=1609372800000&toDate={MakeRequestTimeStamp()}&type=buy";
        AddAuthHeaders(url);
        var res = await _httpClient.GetAsync(url, ct);
        return res.StatusCode == HttpStatusCode.OK ? await HttpResponseMessageExtensions.DeserializeAsync<BitvavoTransactionHistory>(res) : null;
    }

    private void AddAuthHeaders(string url, string method = "GET", string body = "")
    {
        // clear headers of previous request.
        _httpClient.DefaultRequestHeaders.Clear();

        var requestTimeStamp = MakeRequestTimeStamp();
        // add request timestamp
        _httpClient.DefaultRequestHeaders.Add("Bitvavo-Access-Timestamp", requestTimeStamp);
        _httpClient.DefaultRequestHeaders.Add("Bitvavo-Access-Key", _apiKey);

        var message = requestTimeStamp + method + $"/v2/{url}" + body;

        using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_apiSecret)))
        {
            byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            var signature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            _httpClient.DefaultRequestHeaders.Add("Bitvavo-Access-Signature", signature);
        }

    }

    private string MakeRequestTimeStamp() => DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();

}
