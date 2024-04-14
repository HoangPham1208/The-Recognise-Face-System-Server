const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:3000");
function setupWebSocketServer(port) {
  ws.on("error", console.error);

  ws.on("open", function open() {
    ws.send("something");
  });

  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });
  setInterval(() => {
    socket.emit("send", "channel-1", "Hello, channel-1!");
  }, 1000);
}
module.exports = setupWebSocketServer;
