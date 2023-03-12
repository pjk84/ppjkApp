using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
namespace Api.Application.Models;

public record AddressQuery
{
    [FromQuery(Name = "country")]
    public string country { get; init; }
    [FromQuery(Name = "postcode")]
    public string postal_code { get; init; }
    [FromQuery(Name = "city")]
    public string city { get; init; }
    [FromQuery(Name = "street")]
    public string street { get; init; }

}

public readonly record struct AddressDetails(string Country, string Postcode, string City, string Street);