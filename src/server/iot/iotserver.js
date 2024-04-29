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
module.exports.openDoor = openDoor;

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

var Router = require("../../routes/index_iot");
Router(app);

app.listen(process.env.IOT_PORT, () => {
  console.log(`Our server is running on port ${process.env.IOT_PORT}`);
});
