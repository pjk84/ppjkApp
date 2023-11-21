using Api.Common.Result;
using Api.Database;
using Api.Database.Models;
using Api.Features.Auth.Models;
using Google.Apis.Auth;

namespace Api.Features.Auth.Handlers;

using R = Result<LoginResponse>;

public record LoginWithGoogleQuery(LoginWithGooglePayload Payload) : IRequest<R>;

public class LoginWithGoogleHandler : IRequestHandler<LoginWithGoogleQuery, R>
{
    private readonly IConfiguration _config;
    private readonly IUserService _userService;
    public LoginWithGoogleHandler(IConfiguration config, IUserService userService)
    {
        _config = config;
        _userService = userService;
    }

    public async Task<R> Handle(LoginWithGoogleQuery request, CancellationToken cancellationToken)
    {
        var res = await GoogleJsonWebSignature.ValidateAsync(request.Payload.Token);

        var user = await _userService.GetByEmailAsync(res.Email);
        // 
        if (user == null)
        {
            if (res.Email == "ppjk84@gmail.com")
            {
                await _userService.CreateAsync(new User(Email: "ppjk84@gmail.com", DateTime.UtcNow, DateTime.UtcNow, DateTime.UtcNow));
            }
            return Result.Failed<LoginResponse>(new ApiError("unauthorized"));
        }

        await _userService.UpdateAsync(user.Id, user with { LastLoginAt = DateTime.UtcNow });

        return Result.Ok(new LoginResponse(Token: _config["Auth:AccessToken"]!, Identity: res.Email));

    }
}