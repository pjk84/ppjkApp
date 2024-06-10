namespace Api.Features.Bitvavo;

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

abstract class WebsocketClientBase(IConfiguration config)
{
    private readonly string _apiKey = config["Bitvavo:Rest:ApiKey"]!;
    private readonly string _apiSecret = config["Bitvavo:Rest:ApiSecret"]!;
    public CancellationTokenSource Cts = new CancellationTokenSource();
    public ClientWebSocket BitvavoWs = new ClientWebSocket();
    public JsonSerializerOptions SerializerOptions = new JsonSerializerOptions() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };


    public async Task CloseConnection()
    {
        try
        {
            if (BitvavoWs.State == WebSocketState.Open || BitvavoWs.State == WebSocketState.CloseSent)
            {
                await BitvavoWs.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                Console.WriteLine("WebSocket connection closed");
            }
        }
        catch (WebSocketException e)
        {
            Console.WriteLine($"WebSocket error: {e.Message}");
        }
    }


    public virtual async Task SendMessage<T>(T message, WebSocket ws)
    {
        var buffer = GetBuffer(message);
        await ws.SendAsync(buffer, WebSocketMessageType.Text, true, Cts.Token);

    }

    public ArraySegment<byte> GetBuffer<T>(T message)
    {
        byte[] bytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(message, SerializerOptions));
        return new ArraySegment<byte>(bytes);
    }

    public async Task Authenticate()
    {
        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
        var message = timestamp + $"GET/v2/websocket" + "";

        using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_apiSecret)))
        {
            byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            var signature = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            var payload = new AuthenticationPayload("authenticate", _apiKey, signature, timestamp);
            await SendMessage(payload, BitvavoWs);
        }

    }

    public abstract Task HandleMessage(string @event, string message);

    public async Task ReceiveBitvavoMessages()
    {
        const int bufferSize = 1024;
        byte[] buffer = new byte[bufferSize];
        var messageBuilder = new StringBuilder();


        while (BitvavoWs.State == WebSocketState.Open)
        {
            messageBuilder.Clear();
            WebSocketReceiveResult result;
            do
            {
                // construct string from buffer segments when message length exceeds buffer size
                result = await BitvavoWs.ReceiveAsync(new ArraySegment<byte>(buffer), Cts.Token);
                var messageSegment = Encoding.UTF8.GetString(buffer, 0, result.Count);
                messageBuilder.Append(messageSegment);
            } while (!result.EndOfMessage);

            if (result.MessageType == WebSocketMessageType.Close)
            {
                Console.WriteLine("bitvavo initiated close");
                await BitvavoWs.CloseAsync(WebSocketCloseStatus.NormalClosure, "Server closed connection", Cts.Token);
            }
            else
            {
                var message = messageBuilder.ToString();
                var d = JsonSerializer.Deserialize<WebSocketMessage>(message, SerializerOptions);
                await HandleMessage(d!.Event, message);
            }
        }
    }

}

