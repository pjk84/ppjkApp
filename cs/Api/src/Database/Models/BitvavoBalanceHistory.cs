using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Database.Models;

public record BitvavoPortfolioSnapshot(
    DateTime Date,
    double total,
    BitvavoAssetSnapshot[] Assets
)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;
};

public record BitvavoAssetSnapshot(string Market, double Value);