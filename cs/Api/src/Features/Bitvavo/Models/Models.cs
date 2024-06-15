namespace Api.Features.Bitvavo.Models;

public record BitvavoBalance(string Symbol, string Available);

public record BitVavoMarketPrice(string Market, string Price);
public record BitVavo24hPrice(string Market, string Open);

public record BitvavoTransactionItem(
    string TransactionId,
    DateTime ExecutedAt,
    string Type,
    string PriceCurrency,
    string PriceAmount,
    string SentCurrency,
    string SentAmount,
    string ReceivedCurrency,
    string ReceivedAmount,
    string FeesCurrency,
    string FeesAmount,
    string Address
);

public record BitvavoTransactionHistory(
    List<BitvavoTransactionItem> Items,
    int CurrentPage,
    int TotalPages,
    int MaxItems
);


public record AuthenticationDetails(
    string Action,
    string Key,
    string Signature,
    string Timestamp
);


public record WebSocketMessage(string? Event, string? Action);

public record AddTickerSubscriptionPayload(string[] Markets);

public record WebSocketAutenticationResponse(bool Authenticated);

public record CandlesSubscriptionAction(string Action, Channel[] Channels);

public record Channel(string Name, string[] Markets);

public record TickerEvent(string Market, string? LastPrice, string Time);
public record Ticker24hEvent(BitVavo24hPrice[] Data);

public record GetOrdersAction(string Action, string Market);

public record GetOrdersResponse(Order[] Response);