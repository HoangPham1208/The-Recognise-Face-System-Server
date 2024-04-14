const WebSocket = require('ws')

const ws = new WebSocket("ws://localhost:3000");
function setupWebSocketServer(port) {
  ws.on("error", console.error);

  ws.on("open", function open() {
    ws.send("something");
  });

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
}
module.exports = setupWebSocketServer;
