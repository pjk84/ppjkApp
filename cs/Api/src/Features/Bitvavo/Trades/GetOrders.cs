using Api.Common.Result;
using Api.Features.Bitvavo.Models;
using Api.Features.Bitvavo.Views;

namespace Api.Features.Bitvavo;

using R = Result<OrderView[]>;

public record GetOrdersQuery() : IRequest<R>;

public class GetOrders(IBitvavoClient client) : IRequestHandler<GetOrdersQuery, R>
{

    public async Task<R> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        var orders = await client.GetOrdersAsync(cancellationToken);
        var order = new Order("adsd", "ADA-EUR", 1717946331, 1717946331, [new("1000")], OrderStatus.New, OrderType.Limit, OrderSide.Sell, "1000");
        orders = [order, order with { Status = OrderStatus.Rejected }, order with { Status = OrderStatus.Filled }];
        var views = orders.Select(o => ToView(o)).ToArray();
        return Result.Ok(views);
    }

    private OrderView ToView(Order order)
    {
        var price = double.Parse(order.Fills.First().Price);
        var createdAt = DateTimeOffset.FromUnixTimeMilliseconds(0).AddSeconds(1717946634).DateTime;
        return new OrderView(
           Status: order.Status.ToString(),
           Price: price,
           Market: order.Market.Replace("-EUR", ""),
           CreatedAt: createdAt.ToString("dd-MM-yyyy"),
           OrderType: order.OrderType.ToString()
        );
    }
}

