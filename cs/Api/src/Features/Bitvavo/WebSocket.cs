namespace Api.Features.Bitvavo;

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.WebSockets;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

public record AuthenticationPayload(
    string Action,
    string Key,
    string Signature,
    string Timestamp
);

class WebsocketClient(WebSocket websocket, IConfiguration config)
{
    private readonly string _apiKey = config["Bitvavo:Rest:ApiKey"]!;
    private readonly string _apiSecret = config["Bitvavo:Rest:ApiSecret"]!;
    private CancellationTokenSource cts = new CancellationTokenSource();
    private ClientWebSocket _bitvavoWebSocket = new ClientWebSocket();
    private JsonSerializerOptions _serializerOptions = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public async Task OpenConnection()
    {
        using (_bitvavoWebSocket)
        {
            Uri serviceUri = new Uri("wss://ws.bitvavo.com/v2/");

            try
            {
                await _bitvavoWebSocket.ConnectAsync(serviceUri, cts.Token);

                await Authenticate();

                await AddTickerSubscription(["BTC-EUR"]);
                await AddTicker24Subscription(["BTC-EUR"]);

                // listen to events on both sockets
                await Task.WhenAny(ReceiveClientMessages(), ReceiveBitvavoMessages());

            }
            catch (WebSocketException e)
            {
                Console.WriteLine($"WebSocket error: {e.Message}");
            }
            finally
            {
                if (_bitvavoWebSocket.State == WebSocketState.Open)
                {
                    await _bitvavoWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", cts.Token);
                    Console.WriteLine("WebSocket connection closed");
                }
            }
        }
    }

    public async Task CloseConnection()
    {
        try
        {
            if (_bitvavoWebSocket.State == WebSocketState.Open || _bitvavoWebSocket.State == WebSocketState.CloseSent)
            {
                await _bitvavoWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                Console.WriteLine("WebSocket connection closed");
            }
        }
        catch (WebSocketException e)
        {
            Console.WriteLine($"WebSocket error: {e.Message}");
        }
    }


    private async Task SendMessage<T>(T message, bool forward = false)
    {
        var buffer = GetBuffer(message);
        if (forward)
        {
            // send message to bitvavo
            await _bitvavoWebSocket.SendAsync(buffer, WebSocketMessageType.Text, true, cts.Token);
        }
        else
        {
            // send message back to client
            await websocket.SendAsync(buffer, WebSocketMessageType.Text, true, cts.Token);
        }
    }
    private ArraySegment<byte> GetBuffer<T>(T message)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message, _serializerOptions));
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


    private async Task Authenticate()
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
        var message = timestamp + $"GET/v2/websocket" + "";

        using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_apiSecret)))
        {
            byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            var signature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            var payload = new AuthenticationPayload("authenticate", _apiKey, signature, timestamp);
            await SendMessage(payload, true);
        }

    }

    private async Task HandleTickerEvent(string @event)
    {
        var d = JsonSerializer.Deserialize<TickerEvent>(@event, _serializerOptions);
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
        // var d = JsonSerializer.Deserialize<Ticker24hEvent>(@event, _serializerOptions);
        // if (d == null)
        // {
        //     return;
        // }
        // var view = new WebSocketTickerView<Ticker24hEvent>("ticker24h", d);
        // await SendMessage(view);
    }

    private async Task ReceiveBitvavoMessages()
    {
        byte[] buffer = new byte[1024];


        while (_bitvavoWebSocket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await _bitvavoWebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("bitvavo initiated close");
                await _bitvavoWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", cts.Token);
            }
            else
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                var d = JsonSerializer.Deserialize<WebSocketMessage>(message, _serializerOptions);
                Console.WriteLine(message);
                switch (d?.Event)
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
                    default:
                        break;
                }
            }
        }
    }


    private async Task ReceiveClientMessages()
    {
        byte[] buffer = new byte[1024];

        while (websocket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await websocket.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("client initiated close");
                await websocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", cts.Token);
            }
            else
            {
                var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
                Console.WriteLine(message);
                //
            }
        }
    }
}

