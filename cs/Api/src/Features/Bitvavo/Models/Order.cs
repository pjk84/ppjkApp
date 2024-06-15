using System.Text.Json.Serialization;

namespace Api.Features.Bitvavo.Models;

public record Order(
    string OrderId,
    string Market,
    long Created,
    long Updated,
    OrderFill[] Fills,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] OrderStatus Status,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] OrderType OrderType,
    [property: JsonConverter(typeof(JsonStringEnumConverter))] OrderSide Side,
    string? FilledAmount
);

public record OrderFill(string Price);

public enum OrderStatus
{
    New,
    AwaitingTriggered,
    Canceled,
    Rejected,
    Filled,
    Expired
}

public enum OrderType
{
    Limit,
    Market
}

public enum OrderSide
{
    Buy, Sell
}