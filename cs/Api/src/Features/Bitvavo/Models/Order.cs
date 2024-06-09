namespace Api.Features.Bitvavo.Models;

public record Order(
    string OrderId,
    string Market,
    int Created,
    int Updated,
    OrderStatus Status,
    string Price,
    OrderType OrderType,
    string? FilledAmount
);

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