
namespace Api.Application.Interfaces;
public interface IIpApi
{
    Task<IpApiResponse> GetCoordsByIp(string clientIp);
}