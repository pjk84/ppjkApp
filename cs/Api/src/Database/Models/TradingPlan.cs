using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Database.Models;

public record TradingPlan(
    DateTime CreatedAt,
    string Market,
    double BuyAt,
    double SellAt,
    int Amount,
    bool Listening,
    string? Action = null
)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;
};
