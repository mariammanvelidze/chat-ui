const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 });

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};
const users = [];
wss.on("connection", (ws) => {
  users.push(ws);
  // console.log(users);
  console.log("someone connected");
  ws.on("message", (message) => {
    console.log("message sent: ", message);
    const data = JSON.parse(message);
    users.forEach((client) => client.send(JSON.stringify(data)));
    // broadcast(data, ws);
  });
  // ws.on("message", (data) => {
  //   console.log("sentdata: ", data);
  //   ws.send(data.toUpperCase());
  // });
  ws.on("close", () => {
    console.log("someone disconnected");
  });
});
