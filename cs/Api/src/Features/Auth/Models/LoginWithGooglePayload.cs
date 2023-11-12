namespace Api.Features.Auth.Models;

public record LoginWithGooglePayload(
    string ClientId,
    string Token
);
