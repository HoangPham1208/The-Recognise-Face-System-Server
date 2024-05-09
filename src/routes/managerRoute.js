const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const updateFaceModel = require("../middleware/updateFaceModel");
const managerController = require("../controller/managerController");

router.patch(
  "/updateFaceModel/:id",
  verifyToken,
  updateFaceModel("file"),
  managerController.updateFaceModel
);
router.get(
  "/getFaceModelList/:id",
  verifyToken,
  managerController.getFaceModelList
);
router.get("/getFaceModel", verifyToken, managerController.getFaceModel);
router.put("/updateEmployee", verifyToken, managerController.updateEmployee);
router.get("/getForm", verifyToken, managerController.getForm);
router.post("/respondForm", verifyToken, managerController.respondForm);
router.get("/getEmployee", verifyToken, managerController.getEmployeeData);
router.get("/getAllAttendanceTrack", verifyToken, managerController.getAllAttendanceTrack)
module.exports = router;
