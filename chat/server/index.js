const WebSocket = require("ws");
const express = require("express");

const PORT = process.env.PORT || 3000;
const path = require("path");

const server = express()
  .use(express.static(path.join(__dirname, "..", "build")))
  .use(express.static("public"))
  .use((req, res) =>
    res.sendFile(path.join(__dirname, "..", "build", "index.html"))
  )
  .listen(PORT, () => console.log(`Listening onn ${PORT}`));

const wss = new WebSocket.Server({ server });

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
