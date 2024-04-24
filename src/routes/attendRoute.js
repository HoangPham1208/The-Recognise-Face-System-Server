var express = require("express");
var router = express.Router();
var attendController = require("../controller/attendController");

/* GET home page. */
router.get("/getAll", attendController.get_all);
router.post("/check-in", attendController.check_in);
router.post("/check-out", attendController.check_out)
module.exports = router;
