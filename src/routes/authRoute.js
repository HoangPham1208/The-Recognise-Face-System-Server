var express = require("express");
var router = express.Router();
var authController = require("../controller/authController");
const verifyToken = require("../middleware/authentication");

/* GET home page. */
router.post("/login", authController.login);
router.post("/register", authController.register);
module.exports = router;
