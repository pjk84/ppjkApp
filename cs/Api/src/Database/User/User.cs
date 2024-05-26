using Api.Database.Models;
using Api.Features.Bitvavo;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
namespace Api.Database;

public class UserContext : IUserContext
{
    private readonly IMongoCollection<User> _users;

    public UserContext(
        IOptions<ApiDatabaseSettings> settings)
    {
        var mongoClient = new MongoClient(
            settings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase("ApiDatabase");

        _users = mongoDatabase.GetCollection<User>("User");
    }

    public async Task<List<User>> GetAsync() =>
        await _users.Find(_ => true).ToListAsync();
    public async Task<User?> GetByEmailAsync(string email) =>
        await _users.Find(u => u.Email == email).FirstOrDefaultAsync();
    public async Task<User?> GetAsync(string id) =>
        await _users.Find(u => u.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User user) =>
        await _users.InsertOneAsync(user);

    public async Task UpdateAsync(string id, User user) =>
        await _users.ReplaceOneAsync(u => u.Id == id, user);

    public async Task RemoveAsync(string id) =>
        await _users.DeleteOneAsync(u => u.Id == id);
}