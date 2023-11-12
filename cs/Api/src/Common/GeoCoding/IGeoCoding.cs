
namespace Api.Common.GeoCoding;
public interface IGeoCoding
{
    Task<string?> GetCoordsByAddress(string address);
}