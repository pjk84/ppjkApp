import { useEffect, useState } from "react";
import {
  Component,
  ComponentHeader,
  FlexBox,
} from "../../../styles/containers";
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
  const orders = useSelector((state: RootState) => state.bitvavo.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders && !isLoading) {
      GetOrders();
    }
  });
  const GetCell = (value: any, index: number, key: string, color?: string) => (
    <TableCell color={color} key={`${key}-{${value}}`} index={index}>
      {value}
    </TableCell>
  );

  var GetOrders = async () => {
    setIsLoading(true);
    apiClient()
      .get<Portfolio>("/bitvavo/orders")
      .then((res: any) => {
        setIsLoading(false);
        dispatch({
          type: bitvavoActions.SET_ORDERS,
          orders: res,
        });
      });
  };

  const main = (
    <FlexBox gapSize={25}>
      {isLoading ? (
        <Loader text="loading orders..." type="round" />
      ) : (
        <FlexBox column gapSize={10}>
          <table>
            <tbody>
              <tr>
                {["market", "order type", "status", "created at", "price"].map(
                  (h) => (
                    <TableHeader key={`header-${h}`}>{h}</TableHeader>
                  )
                )}
              </tr>
              {[...(orders || [])].map((order, i) => (
                <tr key={`order-row-${i}`}>
                  {[
                    GetCell(order.market, i, "market"),
                    GetCell(order.orderType, i, "order_type"),
                    GetCell(
                      order.status,
                      i,
                      "status",
                      order.status === "Rejected"
                        ? "red"
                        : order.status === "Filled"
                        ? "green"
                        : undefined
                    ),
                    GetCell(order.createdAt, i, "created_at"),
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

  return (
    <FlexBox column>
      <ComponentHeader>Trading orders</ComponentHeader>
      <Component>{main}</Component>
    </FlexBox>
  );
};

export default Orders;

export type Order = {
  market: string;
  createdAt: string;
  status: string;
  orderType: string;
  price: number;
};
