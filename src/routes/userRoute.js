const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const userController = require("../controller/userController");
const updateAvatarHelper = require("../middleware/updateAvatar");

router.patch(
  "/updateAvatar",
  verifyToken,
  updateAvatarHelper("avatar"),
  userController.updateAvatar
);
router.get("/getAvatar", verifyToken, userController.getAvatar);
router.patch("/changePassword", verifyToken, userController.changePassword);
router.get("/attendanceTrack", verifyToken, userController.getAttendanceTrack);
router.get("/employeeDetails", verifyToken, userController.getEmployeeDetails);
router.post("/sendForm", verifyToken, userController.sendForm);
router.get("/getForm", verifyToken, userController.getForm);
router.get("/getNotification", verifyToken, userController.getNotification);
router.post("/createOtp", verifyToken, userController.createOtp);
router.post("/verifyOtp", verifyToken, userController.verifyOtp);

module.exports = router;
