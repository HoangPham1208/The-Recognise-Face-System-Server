const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel.js");

const updateUser = async (req, res) => {
  try {
    const { phone_num, address, email, avatar } = req.body;
    const isUpdatedUser = await userModel.updateInfo(
      req.user.id,
      phone_num,
      address,
      email,
      avatar
    );
    res.status(200).json({ status: "ok", message: "Update Successfully" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const changePassword = async (req, res) => {
  try{
    const { password } = req.body;
    hash_password = bcryptjs.hashSync(password, 10);
    const isChanged = await userModel.changePassword(
      req.user.id,
      hash_password
    );
    res.status(200).json({ status: "ok", message: "Changed Successfully" });
  }
  catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

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
    let { description } = req.body;
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

module.exports = {
  updateUser,
  changePassword,
  createOtp,
  verifyOtp,
  getAttendanceTrack,
  getEmployeeDetails,
  sendForm,
  getForm,
};
