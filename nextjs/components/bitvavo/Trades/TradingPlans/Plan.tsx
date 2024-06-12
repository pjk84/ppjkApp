import { useState } from "react";
import { TableCell } from "../../../../styles/table";
import apiClient from "../../../../api/client";
import { useDispatch } from "react-redux";
import { bitvavoActions } from "../../../../state/actiontypes";

const TradingPlan = (props: {
  details: TradingPlan;
  index: number;
  getTradingPlans: Function;
}) => {
  const dispatch = useDispatch();
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
      console.log("closing!!!!");
      ws?.close();
      setWebSocket(null);
    } else {
      const ws = new WebSocket(
        `ws://localhost:5002/bitvavo/ws/trading-plan/${planId}/listen`
      );

      ws.onmessage = (message) => {
        const d = JSON.parse(message.data) as TradingLog;
        console.log(d);
        dispatch({
          type: bitvavoActions.ADD_TRADING_LOG,
          log: d,
        });
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
