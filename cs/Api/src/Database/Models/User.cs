using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Database.Models;

public record User(
    string Email,
    DateTime LastLoginAt,
    DateTime LastUpdatedAt,
    DateTime CreatedAt)
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;
}