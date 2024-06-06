import { useDispatch, useSelector } from "react-redux";
import { Toggle } from "../../../styles/buttons";
import { actions } from "../../../state/actiontypes";
import { RootState } from "../../../state";
import websocketClient from "../../../api/websocket";
import { useState } from "react";
import { FlexBox } from "../../../styles/containers";

const WebsocketControl = () => {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.bitvavo.websocket);
  const [ws, setws] = useState<WebSocket | null>(null);
  const endpoint = "bitvavo/portfolio";

  const toggleWebsocket = () => {
    if (active) {
      websocketClient(endpoint).close(ws!);
      setws(null);
    } else {
      const ws = websocketClient(endpoint).open();
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
