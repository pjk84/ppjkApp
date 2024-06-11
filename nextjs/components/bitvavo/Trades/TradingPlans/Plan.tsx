import { useState } from "react";
import { TableCell } from "../../../../styles/table";
import apiClient from "../../../../api/client";

const TradingPlan = (props: {
  details: TradingPlan;
  index: number;
  getTradingPlans: Function;
}) => {
  const [ws, setWebSocket] = useState<WebSocket | null>(null);
  const getCell = (value: any, index: number, key: string, color?: string) => (
    <TableCell color={color} key={`${key}-{${value}}`} index={index}>
      {value}
    </TableCell>
  );

  const deletePlan = (planId: string) => {
    apiClient()
      .del(`/bitvavo/trading-plan/${planId}`)
      .then(() => {
        props.getTradingPlans();
      });
  };

  const toggleWebsocket = async (planId: string) => {
    if (ws) {
      apiClient()
        .get(`/bitvavo/ws/trading-plan/${planId}/listen`)
        .then(() => {
          props.getTradingPlans();
        });
      ws?.close();
      setWebSocket(null);
    } else {
      console.log("dingdong!!!!");
      const ws = new WebSocket(
        `ws://localhost:5002/bitvavo/ws/trading-plan/${planId}/listen`
      );
      ws.onopen = () => {
        console.log("bingbong");
        // ws.send(
        //   JSON.stringify({
        //     event: "add_ticker_subscriptions",
        //     markets: portfolio?.assets.map((a) => a.market),
        //   })
        // );
      };
      ws.onclose = () => {
        console.log("closing!!!!");
        // apiClient()
        //   .get(`/bitvavo/ws/trading-plan/${planId}/listen`)
        //   .then(() => {
        //     props.getTradingPlans();
        //   });
      };
      ws.onmessage = (event) => {
        console.log("closing!!!!");
        // const { type, message } = JSON.parse(event.data);
        // if (type == "ticker") {
        //   const m = message as TickerMessage;
        //   var p = GetUpdatedPortfolio(m);
        //   p!.fetchedAt = m.time;
        //   dispatch({
        //     type: actions.SET_BITVAVO_PORTFOLIO,
        //     portfolio: p,
        //   });
        // }
        // if (type == "ticker24h") {
        //   const m = message as Ticker24hMessage[];
        //   var p = GetUpdatedPortfolio24h(m);
        //   dispatch({
        //     type: actions.SET_BITVAVO_PORTFOLIO,
        //     portfolio: p,
        //   });
        // }
      };
      setWebSocket(ws);
    }
  };

  return (
    <>
      {[
        getCell(
          <div
            onClick={() => toggleWebsocket(props.details.id)}
            style={{ cursor: "pointer", opacity: ws ? 1 : 0.25 }}
          >
            🟢
          </div>,
          props.index,
          "listen"
        ),
        getCell(props.details.market, props.index, "market"),
        getCell(props.details.amount, props.index, "amount"),
        getCell(props.details.createdAt, props.index, "created_at"),
        getCell(
          <div
            style={{ cursor: "pointer" }}
            onClick={() => deletePlan(props.details.id)}
          >
            ❌
          </div>,
          props.index,
          "delete"
        ),
      ]}
    </>
  );
};

export default TradingPlan;
