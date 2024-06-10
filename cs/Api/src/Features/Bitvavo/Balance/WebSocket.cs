namespace Api.Features.Bitvavo.Balance;

using System;
using Api.Features.Bitvavo.Models;
using System.Net.WebSockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public record AuthenticationPayload(
    string Action,
    string Key,
    string Signature,
    string Timestamp
);

class WebSocketClient : WebsocketClientBase
{
    private WebSocket _ws;
    public WebSocketClient(WebSocket ws, IConfiguration config) : base(config)
    {
        _ws = ws;
    }

    public async override Task OpenConnection()
    {
        using (BitvavoWs)
        {
            Uri serviceUri = new Uri("wss://ws.bitvavo.com/v2/");

            try
            {
                await BitvavoWs.ConnectAsync(serviceUri, Cts.Token);

                await Authenticate();

                // listen to events on both sockets
                await Task.WhenAny(ReceiveClientMessages(), ReceiveBitvavoMessages());

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

    private async Task SendMessage<T>(T message, bool forward = false)
    {
        var buffer = GetBuffer(message);
        if (forward)
        {
            // send message to bitvavo
            await BitvavoWs.SendAsync(buffer, WebSocketMessageType.Text, true, Cts.Token);
        }
        else
        {
            // send message back to client
            await _ws.SendAsync(buffer, WebSocketMessageType.Text, true, Cts.Token);
        }
    }
    private ArraySegment<byte> GetBuffer<T>(T message)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message, SerializerOptions));
        return new ArraySegment<byte>(bytes);
    }

    private async Task AddTickerSubscription(string[] markets)
    {
        var channel = new Channel("ticker", markets);
        var payload = new CandlesSubscriptionPayload("subscribe", [channel]);
        await SendMessage(payload, true);
    }

    private async Task AddTicker24Subscription(string[] markets)
    {
        var channel = new Channel("ticker24h", markets);
        var payload = new CandlesSubscriptionPayload("subscribe", [channel]);
        await SendMessage(payload, true);
    }

    private async Task HandleTickerEvent(string @event)
    {
        var d = JsonSerializer.Deserialize<TickerEvent>(@event, SerializerOptions);
        if (d?.LastPrice == null)
        {
            // price has not changed. 
            return;
        }
        var view = new WebSocketTickerView<TickerEvent>(
            "ticker", new(d.Market, d.LastPrice, DateTime.Now.ToString("hh:mm:ss")));
        await SendMessage(view);
    }
    private async Task HandleTicker24hEvent(string @event)
    {
        var d = JsonSerializer.Deserialize<Ticker24hEvent>(@event, SerializerOptions);
        if (d == null)
        {
            return;
        }
        var view = new WebSocketTickerView<BitVavo24hPrice[]>("ticker24h", d.Data);
        await SendMessage(view);
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
            case "ticker24h":
                await HandleTicker24hEvent(message);
                break;
            case "add_ticker_subscriptions":
                // do nothing
                var payload = JsonSerializer.Deserialize<AddTickerSubscriptionPayload>(message, SerializerOptions);
                var markets = payload!.Markets.Select(market => $"{market}-EUR").ToArray();
                await AddTickerSubscription(markets);
                await AddTicker24Subscription(markets);
                break;
            default:
                break;
        }
    }

    private async Task ReceiveClientMessages()
    {
        byte[] buffer = new byte[1024];

        while (_ws.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await _ws.ReceiveAsync(new ArraySegment<byte>(buffer), Cts.Token);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("client initiated close");
                await _ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", Cts.Token);
            }
            else
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var d = JsonSerializer.Deserialize<WebSocketMessage>(message, SerializerOptions);
                await HandleMessage(d!.Event, message);
            }
        }
    }
}

