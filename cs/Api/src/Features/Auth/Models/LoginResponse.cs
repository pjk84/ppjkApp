namespace Api.Features.Auth.Models;

public record LoginResponse(
    string Identity,
    string Token
);