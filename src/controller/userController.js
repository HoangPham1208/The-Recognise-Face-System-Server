const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel.js");

const updateUser = async (req, res) => {
  req.params.id = parseInt(req.params.id);
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ status: "error", message: "You can only update your account!" });
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const isUpdatedUser = await userModel.updateInfo(
      req.user.id,
      req.body.password,
      req.body.phone_num,
      req.body.address,
      req.body.avatar
    );
    const updatedUser = await getUser(req.user.id);
    if (!updateUser) {
      return res
        .status(404)
        .json({ status: "error", message: "Not found user!" });
    }
    const { password, ...rest } = updatedUser;
    res.status(200).json({ status: "ok", message: rest });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const createOtp = async (req, res) => {
  req.params.id = parseInt(req.params.id);
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ status: "error", message: "You can only create your otp!" });
  }
  try {
    const newOtp = await userModel.createOtp(req.params.id);
    setTimeout(async () => {
      await deleteOtp(req.params.id);
    }, 60);
    return res.status(200).json({ status: "ok", message: newOtp });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const verifyOtp = async (req, res) => {
  req.params.id = parseInt(req.params.id);
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ status: "error", message: "You can only create your otp!" });
  }
  try {
    const otp = await userModel.getOtp(req.params.id);
    if (!otp) {
      return res
        .status(404)
        .json({ status: "error", message: "Not found Otp!" });
    }
    if (otp != req.body.otp) {
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
      return res.status(404).json({ status: "error", message: "" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
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
        .json({ status: "error", message: "Not found Otp!" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const announcements = await userModel.getAnnouncement(req.user.id);
    if (!announcements) {
      return res
        .status(404)
        .json({ status: "error", message: "Not found Otp!" });
    }
    return res.status(200).json({ status: "ok", message: "Successful!" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = {
  updateUser,
  createOtp,
  verifyOtp,
  getAttendanceTrack,
  getEmployeeDetails,
  getAnnouncement,
};
