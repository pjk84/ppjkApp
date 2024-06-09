import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../styles/buttons";
import { actions, bitvavoActions } from "../../../state/actiontypes";
import { RootState } from "../../../state";
import { useState } from "react";

const WebsocketControl = () => {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.bitvavo.websocket);
  const portfolio = useSelector((state: RootState) => state.bitvavo.portfolio);
  const ws = useSelector((state: RootState) => state.bitvavo.websocket);
  const endpoint = "bitvavo/portfolio";

  const GetUpdatedPortfolio = (m: TickerMessage) => {
    var market = m.market.replace("-EUR", "");
    portfolio?.assets.map((a) => {
      if (a.market != market) {
        return a;
      }
      var lastPrice = parseFloat(m.lastPrice);
      let { available, amountSpent } = a;
      const newValue = available * lastPrice;
      const newResult = newValue - amountSpent;
      const roi = ((newValue - amountSpent) / amountSpent) * 100;
      a.price = roundTwoDecimalPlaces(lastPrice);
      a.value = roundTwoDecimalPlaces(newValue);
      a.result = roundTwoDecimalPlaces(newResult);
      a.returnOnInvestment =
        amountSpent === 0 ? 100 : roundTwoDecimalPlaces(roi);
    });
    return portfolio;
  };

  const GetUpdatedPortfolio24h = (m: Ticker24hMessage[]) => {
    portfolio?.assets.map((a) => {
      const price24h = m.find(
        (m) => m.market.replace("-EUR", "") == a.market
      )?.open;
      if (!price24h) {
        // market noton message
        return a;
      }
      const p = parseFloat(price24h);
      a.price24h = roundTwoDecimalPlaces(p);
      a.priceAction24h = roundTwoDecimalPlaces(((a.price - p) / p) * 100);
    });
    return portfolio;
  };

  const roundTwoDecimalPlaces = (n: number) => Math.round(n * 100) / 100;

  const setWebsocket = (ws?: WebSocket) => {
    dispatch({
      type: bitvavoActions.SET_WEBSOCKET,
      webSocket: ws,
    });
  };

  const toggleWebsocket = async () => {
    if (active) {
      ws?.close();
      setWebsocket();
    } else {
      const ws = new WebSocket(`ws://localhost:5002/ws/bitvavo/portfolio`);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            event: "add_ticker_subscriptions",
            markets: portfolio?.assets.map((a) => a.market),
          })
        );
      };
      ws.onclose = () => {
        dispatch({
          type: bitvavoActions.SET_WEBSOCKET,
          webSocket: undefined,
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
        if (type == "ticker24h") {
          const m = message as Ticker24hMessage[];
          var p = GetUpdatedPortfolio24h(m);
          dispatch({
            type: actions.SET_BITVAVO_PORTFOLIO,
            portfolio: p,
          });
        }
      };
      setWebsocket(ws);
    }
  };

  return (
    <Toggle border={true} color="blue" active={!!ws} onClick={toggleWebsocket}>
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

type Ticker24hMessage = {
  market: string;
  open: string;
};
