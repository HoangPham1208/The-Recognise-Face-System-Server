var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
var attendController = require("../controller/attendController");
const { getFaceModelList } = require("../model/managerModel");

/* GET home page. */
router.get("/getAll", attendController.get_all);
router.get("/getModelList/:id", async (req, res) => {
  const model = await getFaceModelList(req.params.id);
  if (!model.face_model) {
    return res
      .status(404)
      .json({ status: "empty", message: "No face model available" });
  }
  const directoryPath = path.join(__dirname, "../../", model.face_model);
  let my_model_images = [];
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    // Send the list of file names as a JSON response
    for (i in files) {
      my_model_images.push(model.face_model + "/" + files[i]);
    }
    return res.status(200).json({ status: "ok", message: my_model_images });
  });
});
router.post("/check-in", attendController.check_in);
router.post("/check-out", attendController.check_out);

module.exports = router;
