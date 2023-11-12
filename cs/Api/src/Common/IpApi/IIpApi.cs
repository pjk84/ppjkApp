
namespace Api.Common.IpApi;
public interface IIpApi
{
    Task<IpApiResponse?> GetCoordsByIp(string clientIp);
}