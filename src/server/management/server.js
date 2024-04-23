var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var Router = require("../../routes/index");

var app = express();

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

const port = 4000;
const verifyToken = require("../../middleware/authentication");
// only for test
app.get("/test", verifyToken, function (req, res) {
  console.log(req.user)
  res.json({msg:"hee"})
});
// web socket 

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
