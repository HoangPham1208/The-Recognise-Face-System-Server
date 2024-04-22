const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const managerController = require("../controller/managerController");


router.patch("/updateFaceModel", verifyToken, managerController.updateFaceModel);
router.put("/updateEmployee", verifyToken, managerController.updateEmployee);
router.get("/getForm", verifyToken, managerController.getForm);
router.post("/respondForm", verifyToken, managerController.respondForm);

module.exports = router;
