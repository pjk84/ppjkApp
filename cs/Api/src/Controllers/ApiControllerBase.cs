
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControlerBase : ControllerBase
{
    private ISender _mediator = null!;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();

}