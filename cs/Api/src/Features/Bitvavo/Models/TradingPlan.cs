namespace Api.Features.Bitvavo.Models;


public record CreateTradingPlanPayload(string Market, int Amount, double BuyAt, double SellAt);