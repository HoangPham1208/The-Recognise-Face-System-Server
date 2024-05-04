var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
const formidable = require('express-formidable');


require('dotenv').config();

var Router = require("../../routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../../public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route in routes
Router(app);

// SSE
const verifyToken = require('../../middleware/authentication')
const { createSession } = require("better-sse");
const sessions = {}
module.exports.sessions = sessions;

app.get("/sse", verifyToken, async (req, res) => {
  const session = await createSession(req, res);
  const clientId = req.user.id
  sessions[clientId] = session
  session.push(clientId)
});

// Crontab setup
const {runCron} = require("./cron")
runCron()

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Our server is running on port ${process.env.SERVER_PORT}`);
});
