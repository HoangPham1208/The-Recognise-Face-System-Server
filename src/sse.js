var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var Router = require("./routes/index");
var { sse, setFlag } = require("./sse");
// var myIoT = require('./iot_mqtt')
var app = express();
// myIoT.setup() // setup MQTT and IoT connect to backend

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route in routes
Router(app);
app.use(sse);
//---------------------------------------------------------------------------------------

app.get("/flag", (req, res) => {
  setFlag()
});

const port = 3001;

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
