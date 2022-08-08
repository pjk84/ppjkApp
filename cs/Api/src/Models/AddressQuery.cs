using Microsoft.AspNetCore.Mvc;

namespace Api.Application.Models;

public record AddressQuery
{
    [FromQuery(Name = "country")]
    public string Country { get; init; }
    [FromQuery(Name = "postcode")]
    public string Postcode { get; init; }
    [FromQuery(Name = "city")]
    public string City { get; init; }
    [FromQuery(Name = "street")]
    public string Street { get; init; }

}

public readonly record struct AddressDetails(string Country, string Postcode, string City, string Street);