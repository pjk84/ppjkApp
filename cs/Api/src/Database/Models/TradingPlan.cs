using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Database.Models;

public record TradingPlan(
    DateTime CreatedAt,
    string Market,
    int Amount,
    bool active
)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;
};
