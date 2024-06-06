namespace Api.Features.Bitvavo;

using System;
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


    private async Task SendMessage<T>(T message)
    {
        var buffer = GetBuffer(message);
        await _bitvavoWebSocket.SendAsync(buffer, WebSocketMessageType.Text, true, cts.Token);
    }
    private ArraySegment<byte> GetBuffer<T>(T message)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message, _serializerOptions));
        return new ArraySegment<byte>(bytes);
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
            await SendMessage(payload);
        }

    }

    private async Task ReceiveBitvavoMessages()
    {
        byte[] buffer = new byte[1024];


        while (_bitvavoWebSocket.State == WebSocketState.Open)
        {
            WebSocketReceiveResult result = await _bitvavoWebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), cts.Token);
            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("Server initiated close");
                await _bitvavoWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", cts.Token);
            }
            else
            {
                // send message back to client
                await websocket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
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
                Console.WriteLine("Server initiated close");
                await websocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", cts.Token);
            }
            else
            {
                //
            }
        }
    }
}

