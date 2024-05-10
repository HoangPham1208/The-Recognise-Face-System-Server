const attendModel = require("../model/attendModel");
const data_process = require("../helper/timeManagement");
const { sendAnnouncement } = require("../helper/announcement");
const speakeasy = require("speakeasy");
const SPEAKEASY_CONFIG = require("../config/speakeasy.json");
module.exports = {
  get_all: async (req, res) => {
    const data = await attendModel.get_all();
    if (!data) return res.status(404).json({ status: "Empty" });
    res.status(200).json({ status: "OK", message: data });
  },
  check_in: async (req, res) => {
    const { account_ID } = req.body;
    if (!account_ID) {
      return res.status(400).json({
        status: "failed",
        message: "no id provided",
      });
    }
    const device_ID = process.env.CAMERA_CHECK_IN;
    const myData = await data_process(
      "Check_in",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const status_ = myData.status_;
    const value = myData.value;
    const type = myData.type;
    try {
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
        status_,
        value,
        type
      );
      if (result) {
        const send_by = "System";
        await attendModel.addNotification(
          account_ID,
          send_by,
          date,
          time,
          value
        );
        sendAnnouncement(
          account_ID,
          "Check in successfully at " + date + " " + time
        );
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "Check_in failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
  check_out: async (req, res) => {
    const { account_ID } = req.body;
    if (!account_ID) {
      return res.status(400).json({
        status: "failed",
        message: "no id provided",
      });
    }
    const device_ID = process.env.CAMERA_CHECK_OUT;
    const myData = await data_process(
      "Check_out",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const status_ = myData.status_;
    const value = myData.value;
    const type = myData.type;
    try {
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
        status_,
        value,
        type
      );
      if (result) {
        const send_by = "System";
        await attendModel.addNotification(
          account_ID,
          send_by,
          date,
          time,
          value
        );
        sendAnnouncement(
          account_ID,
          "Check out successfully at " + date + " " + time
        );
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "Check_out failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
  check_in_otp: async (req, res) => {
    const account_ID = req.user.id;
    if (!account_ID) {
      return res.status(400).json({
        status: "failed",
        message: "no id provided",
      });
    }
    const device_ID = process.env.CAMERA_CHECK_IN;
    const myData = await data_process(
      "Check_in",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    console.log(myData);
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const status_ = myData.status_;
    const value = myData.value;
    const type = myData.type;
    try {
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
        return res
          .status(403)
          .json({ status: "error", message: "Invalid otp!" });
      }
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
        status_,
        value,
        type
      );
      if (result) {
        const send_by = "System";
        await attendModel.addNotification(
          account_ID,
          send_by,
          date,
          time,
          value
        );
        sendAnnouncement(
          account_ID,
          "Check in successfully at " + date + " " + time
        );
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "Check_in failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
  check_out_otp: async (req, res) => {
    const account_ID = req.user.id;
    if (!account_ID) {
      return res.status(400).json({
        status: "failed",
        message: "no id provided",
      });
    }
    const device_ID = process.env.CAMERA_CHECK_OUT;
    const myData = await data_process(
      "Check_out",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const status_ = myData.status_;
    const value = myData.value;
    const type = myData.type;
    try {
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
        return res
          .status(403)
          .json({ status: "error", message: "Invalid otp!" });
      }
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
        status_,
        value,
        type
      );
      if (result) {
        const send_by = "System";
        await attendModel.addNotification(
          account_ID,
          send_by,
          date,
          time,
          value
        );
        sendAnnouncement(
          account_ID,
          "Check out successfully at " + date + " " + time
        );
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "Check_out failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
