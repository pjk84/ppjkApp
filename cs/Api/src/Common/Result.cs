namespace Api.Common.Result;

// The result class emitted by handlers used in controllers
public class Result
{
    public bool Success { get; }

    public ApiError? Error { get; }

    public Result(bool success, ApiError? error)
    {
        Success = success;
        Error = error;
    }

    public static Result Ok() => new(true, null);
    public static Result<T> Ok<T>(T value) => new(true, value, null);
    public static Result Failed(ApiError? err = null) => new(false, err);
    public static Result<T> Failed<T>(ApiError? err = null) => new(false, default!, err);
}

public class Result<T> : Result
{
    public T Value { get; }
    public Result(bool success, T value, ApiError? error) : base(success, error) => Value = value;
}

public record ApiError(
    string Message,
    string? ErrorCode = null
);