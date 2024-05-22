namespace Api.Features.Bitvavo;

public record BitvavoAssetView(
    string Market,
    double Available,
    double Price,
    double Price24h,
    double priceAction24h,
    double Value,
    double AmountSpent,
    BitvavoTransactionHistoryView[] TransactionHistory,
    double Result,
    double ReturnOnInvestment
);

public record BitvavoPortfolioView(
    List<BitvavoAssetView> Assets,
    string FetchedAt,
    double TotalValue,
    double TotalResult,
    double TotalSpent,
    double TotalReturnOnInvestment
);

public record BitvavoTransactionHistoryView(string Date, double AmountSpent, double Fees);