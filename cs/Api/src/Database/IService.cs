using Api.Database.Models;
namespace Api.Database;

public interface IUserService
{
    public Task<List<User>> GetAsync();
    public Task<User?> GetAsync(string id);
    public Task<User?> GetByEmailAsync(string email);
    public Task CreateAsync(User user);
    public Task UpdateAsync(string id, User user);
    public Task RemoveAsync(string id);
}