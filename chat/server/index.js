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
