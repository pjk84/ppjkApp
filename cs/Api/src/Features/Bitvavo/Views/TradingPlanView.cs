namespace Api.Features.Bitvavo.Views;

public record tradingPlanView(string Id, string CreatedAt, double BuyAt, double SellAt, string Market, int Amount);