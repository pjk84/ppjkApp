import { useEffect, useState } from "react";
import { StdButton } from "../../../styles/buttons";
import { FlexBox } from "../../../styles/containers";
import { Header1 } from "../../../styles/header";
import { TableCell, TableHeader } from "../../../styles/table";
import Loader from "../../Loaders";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state";
import { bitvavoActions } from "../../../state/actiontypes";
import apiClient from "../../../api/client";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [markets, setMarkets] = useState();
  const orders = useSelector((state: RootState) => state.bitvavo.orders) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders && !isLoading) {
      GetOrders();
    }
  });
  const GetCell = (value: any, index: number, key: string, color?: string) => (
    <TableCell
      color={color}
      animation={"flash"}
      key={`${key}-{${value}}`}
      index={index}
    >
      {value}
    </TableCell>
  );

  var GetOrders = async () => {
    setIsLoading(true);
    apiClient()
      .get<Portfolio>("/bitvavo/orders")
      .then((res) => {
        setIsLoading(false);
        dispatch({
          type: bitvavoActions.SET_ORDERS,
          orders: res,
        });
      });
  };

  if (isLoading) {
    return <Loader text="loading assetes..." type="round" />;
  }

  const v = [...orders, ...[dummy2, dummy]];

  return (
    <FlexBox gapSize={25}>
      {isLoading ? (
        <Loader text="loading orders..." type="round" />
      ) : (
        <FlexBox column gapSize={10}>
          <div>Orders: </div>
          <table>
            <tbody>
              {["market", "order type", "status", "created at", "price"].map(
                (h) => (
                  <TableHeader>{h}</TableHeader>
                )
              )}
              {v.map((order, i) => (
                <tr>
                  {[
                    GetCell(order.market, i, "market"),
                    GetCell(order.orderType, i, "order_type"),
                    GetCell(order.status, i, "status"),
                    GetCell(order.created, i, "created_at"),
                    GetCell(order.price, i, "price"),
                  ]}
                </tr>
              ))}
            </tbody>
          </table>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Orders;

export type Order = {
  orderId: string;
  market: string;
  created: number;
  status: string;
  orderType: string;
  price: string;
};

const dummy: Order = {
  orderId: "abc",
  price: "1000",
  orderType: "market",
  status: "filled",
  created: 12321312,
  market: "BTC-EUR",
};
const dummy2: Order = {
  orderId: "abc",
  price: "1000",
  orderType: "market",
  status: "filled",
  created: 12321312,
  market: "ADA-EUR",
};
