const bcryptjs = require("bcryptjs");
const managerModel = require("../model/managerModel.js");

const getForm = async (req, res) => {
  try {
    const form = await managerModel.getForm(req.user.id);
    if (!form) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }
    return res.status(200).json({ status: "ok", message: form });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const respondForm = async (req, res) => {
  try {
    let { description, status, form_id } = req.body;
    let date_time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    let formatted_date_time = new Date(date_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (!description) description = "";
    const form = await managerModel.sendForm(
      req.user.id,
      formatted_date_time,
      description,
      status,
      form_id
    );
    if (!form) {
      return res.status(403).json({ status: "error", message: "Unauthorized" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  getForm,
  respondForm,
};