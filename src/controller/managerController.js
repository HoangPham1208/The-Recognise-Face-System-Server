const fs = require("fs");
const path = require("path");
const managerModel = require("../model/managerModel.js");
const { isManager } = require("../model/authModel.js");

const updateFaceModel = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    if (!req.params.id)
      return res
        .status(404)
        .json({ status: "error", message: "No id provided" });
    const update = await managerModel.updateFaceModel(req.params.id);
    if (!update) {
      return res
        .status(404)
        .json({ status: "error", message: "SomeThingWrong" });
    }
    return res
      .status(200)
      .json({ status: "ok", message: "Update successfully" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getFaceModelList = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });

    const model = await managerModel.getFaceModelList(req.params.id);
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
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getFaceModel = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    const model_path = req.query.model_path
    if (!path)
      return res.status(404).json({ status: "error", message: "No path provided" });
    const model = path.join(__dirname, "../../", model_path);
    return res.status(200).sendFile(model);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });

    const { employee_ID, name, email, phone, working_days, position } =
      req.body;
    const update = await managerModel.updateEmployee(
      employee_ID,
      name,
      email,
      phone,
      working_days,
      position
    );
    if (!update) {
      return res
        .status(404)
        .json({ status: "error", message: "SomeThingWrong" });
    }
    return res
      .status(200)
      .json({ status: "ok", message: "Update successfully" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getForm = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });

    const form = await managerModel.getForm(req.user.id);
    if (!form) {
      return res.status(403).json({ status: "empty", message: "No form" });
    }
    return res.status(200).json({ status: "ok", message: form });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const respondForm = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });

    let { description, status, form_ID } = req.body;
    let date_time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    let formatted_date_time = new Date(date_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (!description) description = "";
    const form = await managerModel.respondForm(
      form_ID,
      req.user.id,
      status,
      formatted_date_time,
      description
    );
    if (!form) {
      return res
        .status(404)
        .json({ status: "empty", message: "SomeThingWrong" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getEmployeeData = async (req, res) => {
  try {
    const employee_ID = req.query.id;
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    const employees = await managerModel.getEmployeeData(employee_ID);
    if (!employees) {
      return res
        .status(404)
        .json({ status: "empty", message: "No employee data" });
    }
    return res.status(200).json({ status: "ok", message: employees });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getAllAttendanceTrack = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    const employees = await managerModel.getAllAttendanceTrack();
    if (!employees) {
      return res
        .status(404)
        .json({ status: "empty", message: "No employee data" });
    }
    return res.status(200).json({ status: "ok", message: employees });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  updateFaceModel,
  getFaceModelList,
  getFaceModel,
  updateEmployee,
  getForm,
  respondForm,
  getEmployeeData,
  getAllAttendanceTrack
};
