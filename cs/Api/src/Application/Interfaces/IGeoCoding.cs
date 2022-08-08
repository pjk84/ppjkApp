
namespace Api.Application.Interfaces;
public interface IGeoCoding
{
    Task<string> GetCoordsByAddress(string address);
}