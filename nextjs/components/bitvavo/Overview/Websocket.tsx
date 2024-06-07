import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../styles/buttons";
import { actions } from "../../../state/actiontypes";
import { RootState } from "../../../state";
import { useState } from "react";

const WebsocketControl = () => {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.bitvavo.websocket);
  const portfolio = useSelector((state: RootState) => state.bitvavo.portfolio);
  const [ws, setws] = useState<WebSocket | null>(null);
  const endpoint = "bitvavo/portfolio";

  const GetUpdatedPortfolio = (m: TickerMessage) => {
    var market = m.market.replace("-EUR", "");
    portfolio?.assets.map((a) => {
      if (a.market != market) {
        return a;
      }
      let { price, value, result, returnOnInvestment } = a;
      const newValue = value + (price - parseFloat(m.lastPrice));
      const newResult = result + -newValue;
      a.price = parseFloat(m.lastPrice);
      a.value = newValue;
      a.result = newResult;
    });
    return portfolio;
  };

  const toggleWebsocket = async () => {
    if (ws && active) {
      ws.close();
      setws(null);
    } else {
      const ws = new WebSocket(`ws://localhost:5002/ws/bitvavo/portfolio`);
      ws.onopen = () => {};
      ws.onclose = () => {
        dispatch({
          type: actions.TOGGLE_WEBSOCKET,
        });
      };
      ws.onmessage = (event) => {
        const { type, message } = JSON.parse(event.data);
        if (type == "ticker") {
          const m = message as TickerMessage;
          var p = GetUpdatedPortfolio(m);
          p!.fetchedAt = m.time;
          dispatch({
            type: actions.SET_BITVAVO_PORTFOLIO,
            portfolio: p,
          });
        }
      };
      setws(ws);
    }
    dispatch({
      type: actions.TOGGLE_WEBSOCKET,
    });
  };

  return (
    <Toggle
      border={true}
      color="blue"
      active={active}
      onClick={toggleWebsocket}
    >
      {`websocket: ${active ? "on" : "off"}`}
    </Toggle>
  );
};

export default WebsocketControl;

type TickerMessage = {
  market: string;
  lastPrice: string;
  time: string;
};
