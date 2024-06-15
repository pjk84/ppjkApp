namespace Api.Features.Bitvavo.Trades;

using System;
using Api.Features.Bitvavo.Models;
using System.Net.WebSockets;
using System.Threading.Tasks;
using Api.Database;
using Api.Database.Models;
using Api.Features.Bitvavo.Views;
using System.Numerics;
using System.Globalization;

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
    private WebSocket? _ws;
    private ILogger<WebSocketClientTrades> _logger;

    private Order[] _orders = [];
    //
    public WebSocketClientTrades(
        IConfiguration config,
        IBitvavoContext database,
        TradingPlan plan,
        WebSocket? ws = null) : base(config, ws)
    {
        _plan = plan;
        _ws = ws;
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

                await AddTickerSubscription();

                // listen to events on both sockets
                await Task.WhenAny(ReceiveBitvavoMessages(), ReceiveClientMessages());

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

    public async Task AddTickerSubscription()
    {
        var market = $"{_plan.Market}-EUR";
        var channel = new Channel("ticker", [market]);
        var payload = new CandlesSubscriptionAction("subscribe", [channel]);
        await SendMessage(payload, BitvavoWs);
    }

    private async Task GetOrders()
    {
        var market = $"{_plan.Market}-EUR";
        var payload = new GetOrdersAction("privateGetOrders", market);
        await SendMessage(payload, BitvavoWs);
    }

    private void SetOrders(string message)
    {
        Console.WriteLine(message);
        var d = JsonSerializer.Deserialize<GetOrdersResponse>(message, SerializerOptions);
        if (d == null)
        {
            return;
        }
        _orders = d.Response;
    }


    private async Task HandleTickerEvent(string message)
    {
        var d = JsonSerializer.Deserialize<TickerEvent>(message, SerializerOptions);
        if (d?.LastPrice == null)
        {
            // price has not changed. 
            return;
        }

        // check if plan is active
        // if not, stop trading
        var plan = await _database.GetTradingPlanAsync(_plan.Id, Cts.Token);
        if (plan == null)
        {
            _logger.LogWarning("plan was stopped or deleted. stopping trades");
            await CloseConnection();
            return;
        }
        if (plan.Listening && _ws == null)
        {
            _logger.LogWarning("closing websocket because ");
            await CloseConnection();
            return;
        }
        // feed price to trading stratagy

        if (plan.Listening)
        {
            var time = DateTime.UtcNow.ToString("hh:mm:ss");
            var action = await HandlePrice(double.Parse(d.LastPrice, CultureInfo.InvariantCulture));
            var view = new TradingActionView(
                Guid.NewGuid().ToString(),
                plan.Market,
                d.LastPrice,
                time,
                action
            );

            if (_ws != null)
            {
                // send action message to client for logging
                await SendMessage(view, _ws);
            }
        }
    }

    private async Task CreateOrder(OrderSide side)
    {
        _logger.LogInformation("$creating new order of type {Side} for market {Market} at price", side, _plan.Market);

        // flip planaction
        await _database.UpdateTradingPlanAsync(
            _plan with { Action = side == OrderSide.Buy ? "sell" : "buy" },
             Cts.Token
        );
    }

    private async Task<string> HandlePrice(double price)
    {
        var lastOrder = _orders.OrderBy(o => o.Updated).Last();
        // var lastOrder = BitvavoWs.SendAsync
        if (price > _plan.SellAt && _plan.Action is "buy" or null)
        {
            // sell if the last order was buy
            await CreateOrder(OrderSide.Sell);
            return $"createdd new sell order at {price}";
        }
        if (price < _plan.BuyAt && _plan.Action is "sell" or null)
        {
            // buy if last order was sell
            await CreateOrder(OrderSide.Buy);
            return $"ccreated new buy order at {price}";
        }
        // do nothing
        return "did nothing";
    }


    public async override Task HandleMessage(string @event, string message)
    {
        switch (@event)
        {
            case "authenticate":
                // once authenticated, start by getting current orders
                await GetOrders();
                break;
            case "privateGetOrders":
                SetOrders(message);
                break;
            case "privateCreateOrder":

            case "ticker":
                await HandleTickerEvent(message);
                break;
            default:
                break;
        }
    }

}



