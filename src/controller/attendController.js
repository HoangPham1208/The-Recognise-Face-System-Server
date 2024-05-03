const attendModel = require("../model/attendModel");
const data_process = require("../helper/timeManagement");

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
      "check_in",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const value = myData.value;
    const type = myData.type;
    try {
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
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
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "check_in failed" });
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
      "check_out",
      account_ID,
      attendModel.checkFirstCheckIn
    );
    const date = myData.formattedDate;
    const time = myData.formattedTime;
    const value = myData.value;
    const type = myData.type;
    try {
      const result = await attendModel.check_in_out(
        account_ID,
        device_ID,
        date,
        time,
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
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "check_out failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
