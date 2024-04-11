var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var Router = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//---------------------------------------------------------------------------------------
// Route in routes
Router(app);
//---------------------------------------------------------------------------------------
// IoT Mqtt setup
// const { setup } = require("./iot_mqtt");
// setup()
//   .then(() => {
//     console.log("Setup completed successfully");
//   })
//   .catch((error) => {
//     console.error("Error running setup:", error);
//   });
//---------------------------------------------------------------------------------------

const port = 3001;

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
