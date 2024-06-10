namespace Api.Features.Bitvavo.Trades;

using System;
using Api.Features.Bitvavo.Models;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Api.Database;
using Api.Database.Models;

public record AuthenticationPayload(
    string Action,
    string Key,
    string Signature,
    string Timestamp
);

class WebSocketClientTrades : WebsocketClientBase
{
    private TradingPlan _plan;
    private IBitvavoContext _database;

    private ILogger<WebSocketClientTrades> _logger;
    //
    public WebSocketClientTrades(IConfiguration config, IBitvavoContext database, TradingPlan plan) : base(config)
    {
        _plan = plan;
        _database = database;
        _logger = LoggerFactory.Create(loggingBuilder => loggingBuilder.AddConsole()).CreateLogger<WebSocketClientTrades>();
    }

    public async Task OpenConnection()
    {
        using (BitvavoWs)
        {
            Uri serviceUri = new Uri("wss://ws.bitvavo.com/v2/");

            try
            {
                await BitvavoWs.ConnectAsync(serviceUri, Cts.Token);

                await Authenticate();

                await AddTickerSubscription($"{_plan.Market}-EUR");

                // listen to events on both sockets
                await Task.WhenAny(ReceiveBitvavoMessages());

            }
            catch (WebSocketException e)
            {
                Console.WriteLine($"WebSocket error: {e.Message}");
            }
            finally
            {
                if (BitvavoWs.State == WebSocketState.Open)
                {
                    await BitvavoWs.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", Cts.Token);
                    Console.WriteLine("WebSocket connection closed");
                }
            }
        }
    }

    public async Task AddTickerSubscription(string market)
    {
        Console.WriteLine($"added ticket for {market}");
        var channel = new Channel("ticker", [market]);
        var payload = new CandlesSubscriptionPayload("subscribe", [channel]);
        await SendMessage(payload, BitvavoWs);
    }


    private async Task HandleTickerEvent(string @event)
    {
        var d = JsonSerializer.Deserialize<TickerEvent>(@event, SerializerOptions);
        if (d?.LastPrice == null)
        {
            // price has not changed. 
            return;
        }
        // check if plan is active
        // if not, stop trading
        var plan = await _database.GetTradingPlanAsync(_plan.Id, Cts.Token);
        if (plan?.active == false)
        {
            _logger.LogWarning("plan was stopped or deleted. stopping trades");
            await CloseConnection();
        }

    }


    public async override Task HandleMessage(string @event, string message)
    {
        switch (@event)
        {
            case "authenticated":
                // do nothing
                break;
            case "ticker":
                await HandleTickerEvent(message);
                break;
            default:
                break;
        }
    }

}

