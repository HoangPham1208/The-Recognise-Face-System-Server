const bcryptjs = require("bcryptjs");
const managerModel = require("../model/managerModel.js");
const { isManager } = require("../model/authModel.js");

const updateFaceModel = async (req, res) => {
  try {
    const check = await isManager(req.user.id);
    if (!check)
      return res.status(403).json({ status: "error", message: "Unauthorized" });

    const update = await managerModel.updateFaceModel(
      req.user.id,
      req.params.id
    );
    if (!update) {
      return res.status(404).json({ status: "error", message: "SomeThingWrong" });
    }
    return res
      .status(200)
      .json({ status: "ok", message: "Update successfully" });
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
      req.user.id,
      employee_ID,
      name,
      email,
      phone,
      working_days,
      position
    );
    if (!update) {
      return res.status(404).json({ status: "error", message: "SomeThingWrong" });
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
      return res.status(404).json({ status: "empty", message: "SomeThingWrong" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getEmployeeData = async (req, res) => {
  try {
    const employee_ID = req.query.id
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

module.exports = {
  updateFaceModel,
  updateEmployee,
  getForm,
  respondForm,
  getEmployeeData,
};
