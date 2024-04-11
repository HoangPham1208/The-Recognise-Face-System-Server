var express = require("express");
var sse = express.Router();

var flag = true;

sse.get("/progress", (req, res) => {
  res.set("Content-Type", "text/event-stream");
  let progress = 0;
  setInterval(() => {
    // runs every 2 seconds
    res.write(String(flag));
  }, 2000);
});
function setFlag(){
    flag = !flag
}

module.exports = { sse, setFlag };
