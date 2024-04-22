const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const userController = require("../controller/userController");
// router.get('/gen-otp', verifyToken, userController.generateOtp)
// router.get('/verify-otp', verifyToken, userController.verifyOtp)
router.post("/update", verifyToken, userController.updateUser);
router.get("/attendanceTrack", verifyToken, userController.getAttendanceTrack);
router.get("/employeeDetails", verifyToken, userController.getEmployeeDetails);
router.post("/sendForm", verifyToken, userController.sendForm);
router.get("/getForm",verifyToken,userController.getForm);
router.post("/respondForm", verifyToken, userController.respondForm);

module.exports = router;
