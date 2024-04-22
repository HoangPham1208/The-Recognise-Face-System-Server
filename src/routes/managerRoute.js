const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const managerController = require("../controller/managerController");
// router.get('/gen-otp', verifyToken, userController.generateOtp)
// router.get('/verify-otp', verifyToken, userController.verifyOtp)
router.get("/getForm",verifyToken, managerController.getForm);
router.post("/respondForm", verifyToken, managerController.respondForm);

module.exports = router;
