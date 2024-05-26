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
    double TotalReturnOnInvestment,
    bool hasMissingValues
);

public record BitvavoTransactionHistoryView(string Date, double AmountSpent, double Fees);

public record BitvavoPortfolioSnapshotView(int Year, int Month, int DaysInMonth, string MonthName, BitvavoPortfolioSnapshotDayView[] Days);

public record BitvavoPortfolioSnapshotDayView(int Day, double total, BitvavoAssetSnapshotView[] assets);

public record BitvavoAssetSnapshotView(string Market, double Value);