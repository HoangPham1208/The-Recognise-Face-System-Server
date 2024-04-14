const path = require('path')
module.exports = {
  iotSocket: (app) => {
    const server = require("http").Server(app);
    const io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:3002", // iot server
        methods: ["GET", "POST"],
      },
    });
    app.get("/socket", function (req, res) {
        res.sendFile(path.join(__dirname, "../../../public/views/socket.html"));
      });
      
    server.listen(3003, () => {
      console.log("Listening on http://localhost:3003");
    });

    io.on("connection", (socket) => {
      console.log("Client connected", socket.id);

      socket.on("subscribe", (channel) => {
        console.log(`Subscribing to channel: ${channel}`);
        socket.join(channel);
      });

      socket.on("unsubscribe", (channel) => {
        console.log(`Unsubscribing from channel: ${channel}`);
        socket.leave(channel);
      });
      socket.on("hello", (arg) => {
        console.log("Nhan du lieu tu channel: ", arg); // world
      });
    });
    setInterval(() => {
      io.to("example-channel").emit("message", "Hello from channel 1!");
      io.to("channel2").emit("message", "Hello from channel 2!");
    }, 1000);
  },
};
