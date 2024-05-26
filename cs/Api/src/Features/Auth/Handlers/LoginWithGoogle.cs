using Api.Common.Result;
using Api.Database;
using Api.Database.Models;
using Api.Features.Auth.Models;
using Google.Apis.Auth;

namespace Api.Features.Auth.Handlers;

using R = Result<LoginResponse>;

public record LoginWithGoogleQuery(LoginWithGooglePayload Payload) : IRequest<R>;

public class LoginWithGoogleHandler(IConfiguration config, IUserContext userContext) : IRequestHandler<LoginWithGoogleQuery, R>
{

    public async Task<R> Handle(LoginWithGoogleQuery request, CancellationToken cancellationToken)
    {
        var res = await GoogleJsonWebSignature.ValidateAsync(request.Payload.Token);

        var user = await userContext.GetByEmailAsync(res.Email);
        // 
        if (user == null)
        {
            if (res.Email == "ppjk84@gmail.com")
            {
                await userContext.CreateAsync(new User(Email: "ppjk84@gmail.com", DateTime.UtcNow, DateTime.UtcNow, DateTime.UtcNow));
            }
            return Result.Failed<LoginResponse>(new ApiError("unauthorized"));
        }

        await userContext.UpdateAsync(user.Id, user with { LastLoginAt = DateTime.UtcNow });

        return Result.Ok(new LoginResponse(Token: config["Auth:AccessToken"]!, Identity: res.Email));

    }
}