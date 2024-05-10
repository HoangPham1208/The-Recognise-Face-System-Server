const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel.js");
const path = require("path");
const speakeasy = require("speakeasy");

const updateAvatar = async (req, res) => {
  try {
    const id = req.user.id;
    const avatar_path = process.env.IMAGES_PATH_AVATAR + id + ".jpg";
    const isUpdatedUser = await userModel.updateAvatar(id, avatar_path);
    res.status(200).json({ status: "ok", message: "Update Successfully" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getAvatar = async (req, res) => {
  try {
    const id = req.user.id;
    const avatar = await userModel.getAvatar(id);
    if (!avatar) {
      return res
        .status(404)
        .json({ status: "Empty", message: "Don't have anything" });
    }
    const avatar_path = path.join(__dirname, "../../", avatar);
    return res.status(200).sendFile(avatar_path);
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    hash_password = bcryptjs.hashSync(password, 10);
    const isChanged = await userModel.changePassword(
      req.user.id,
      hash_password
    );
    res.status(200).json({ status: "ok", message: "Changed Successfully" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const SPEAKEASY_CONFIG = {
  step: 100,
  digits: 4,
  window: 6,
  length: 20,
  encoding: "base32",
};

const createOtp = async (req, res) => {
  try {
    const id = req.user.id;
    const newOtp = speakeasy.totp({
      secret: process.env.OTP_SECRET,
      step: SPEAKEASY_CONFIG.step,
      digits: SPEAKEASY_CONFIG.digits,
      encoding: SPEAKEASY_CONFIG.encoding,
    });
    return res.status(200).json({ status: "ok", message: newOtp });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const id = req.user.id;
    const otp = req.body.otp;
    if (!otp) {
      return res
        .status(404)
        .json({ status: "error", message: "Not found Otp!" });
    }
    const isValidOtp = speakeasy.totp.verify({
      secret: process.env.OTP_SECRET,
      token: otp,
      step: SPEAKEASY_CONFIG.step,
      digits: SPEAKEASY_CONFIG.digits,
      encoding: SPEAKEASY_CONFIG.encoding,
    });
    if (!isValidOtp) {
      return res.status(403).json({ status: "error", message: "Invalid otp!" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// PENDING controller
const getAttendanceTrack = async (req, res) => {
  try {
    const attendanceTrack = await userModel.getAttendanceTrack(req.user.id);
    if (!attendanceTrack) {
      return res
        .status(404)
        .json({ status: "Empty", message: "Not tracking in this account" });
    }
    return res.status(200).json({ status: "ok", result: attendanceTrack });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const employeeDetails = await userModel.getEmployeeDetails(req.user.id);
    if (!employeeDetails) {
      return res
        .status(404)
        .json({ status: "Empty", message: "Not found data" });
    }
    return res.status(200).json({ status: "ok", message: employeeDetails });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const sendForm = async (req, res) => {
  try {
    let { type, description } = req.body;
    let date_time = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
    let formatted_date_time = new Date(date_time)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (!description) description = "";
    const form = await userModel.sendForm(
      req.user.id,
      type,
      formatted_date_time,
      description
    );
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getForm = async (req, res) => {
  try {
    const form = await userModel.getForm(req.user.id);
    if (!form) {
      return res
        .status(404)
        .json({ status: "Empty", message: "Don't have anything" });
    }
    return res.status(200).json({ status: "ok", message: form });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getNotification = async (req, res) => {
  try {
    const noti = await userModel.getNotification(req.user.id);
    if (!noti) {
      return res
        .status(404)
        .json({ status: "Empty", message: "Don't have anything" });
    }
    return res.status(200).json({ status: "ok", message: noti });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  updateAvatar,
  changePassword,
  createOtp,
  verifyOtp,
  getAttendanceTrack,
  getEmployeeDetails,
  sendForm,
  getForm,
  getNotification,
  getAvatar,
};
