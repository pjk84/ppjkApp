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

