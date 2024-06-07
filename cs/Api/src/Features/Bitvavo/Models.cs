namespace Api.Features.Bitvavo;

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



public record WebSocketMessage(string Event);

public record WebSocketAutenticationResponse(bool Authenticated);

public record CandlesSubscriptionPayload(string Action, Channel[] Channels);

public record Channel(string Name, string[] Markets);

public record TickerEvent(string Market, string? LastPrice, string Time);
public record Ticker24hEvent(string Market, BitVavo24hPrice Data);
