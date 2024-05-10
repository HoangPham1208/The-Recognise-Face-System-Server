var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// IoT Mqtt setup
const { setup } = require("../../helper/iot_mqtt");
setup()
  .then(() => {
    console.log("Setup completed successfully");
  })
  .catch((error) => {
    console.error("Error running setup:", error);
  });
// exports to use

// AI setup
app.use(express.static(path.join(__dirname, "../../../public")));
app.use("/models", express.static(path.join(__dirname, "../../../models")));
app.use(
  "/labeled_images",
  express.static(path.join(__dirname, "../../../labeled_images"))
);

// sendFile will go here
app.get("/checkin", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../public/views/checkin.html"));
});
app.get("/checkout", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../public/views/checkout.html"));
});

const fs = require("fs");
app.get("/labeled", function (req, res) {
  let directoryPath = "./labeled_images/";
  res.json({
    name_list: fs
      .readdirSync(directoryPath, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => item.name),
  });
});

// SSE
const verifyToken = require("../../middleware/authentication");
// const { createSession } = require("better-sse");
const sessions = {};
module.exports.sessions = sessions;

// app.get("/sse", async (req, res) => {
//   const session = await createSession(req, res);
//   const clientId = req.user.id;
//   sessions[clientId] = session;
//   setInterval(() => {
//     if (sessions[clientId])
//       if (session[clientId].isConnected) session.push(1);
//       else delete sessions[clientId];
//   }, 1000);
// });

function eventsHandler(request, response, next) {
  let id = request.user.id;
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(
    "Hello from SSE server, connected successfully!"
  )}\n\n`;

  response.write(data);

  sessions[id] = response;

  request.on("close", () => {
    console.log(`User ${id} Connection closed`);
    delete sessions[id];
  });
}

app.get("/sse", verifyToken, eventsHandler);

app.get("/index", function (req, res) {
  res.sendFile(path.join(__dirname, "../../../public/views/index.html"));
});

// Crontab setup
const { runCron } = require("./cron");
runCron();

var Router = require("../../routes/index_iot");
Router(app);

app.listen(process.env.IOT_PORT, () => {
  console.log(`Our server is running on port ${process.env.IOT_PORT}`);
});
