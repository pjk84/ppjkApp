const websocketClient = (endpoint: string) => {
  const close = (ws: WebSocket) => ws.close();
  let ws: WebSocket;
  const open = () => {
    ws = new WebSocket(`ws://localhost:5002/ws/${endpoint}`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log("received ebsocket message", event.data);
    };

    return ws;
  };

  return {
    close,
    open,
  };
};

export default websocketClient;
