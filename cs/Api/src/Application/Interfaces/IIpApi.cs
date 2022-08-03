
namespace Api.Application.Interfaces;
public interface IIpApi
{
    Task<IpApiResponse> getLocation(string key);
}