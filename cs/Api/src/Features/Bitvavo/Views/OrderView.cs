namespace Api.Features.Bitvavo.Views;

public record OrderView(string OrderType, string Market, string Status, string CreatedAt, double Price);