const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on("connection", (ws) => {
  console.log("user connected");
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "SEND_MESSAGE":
        broadcast(
          {
            type: "SEND_MESSAGE",
            from: data.payload.from,
            message: data.payload.message,
          },
          ws
        );
        break;
      default:
        break;
    }
  });
  ws.on("close", () => {
    console.log("user disconnected");
  });
});
