const attendModel = require("../model/attendModel");
const time_config = require("../config/dbconfig.json");

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
    var device_ID, date, time, value, type
    try {
      const result = await attendModel.check_in(account_ID, device_ID, date, time, value, type);
      if (result) {
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
    var device_ID, date, time, value, type
    try {
      const result = await attendModel.check_out(account_ID, device_ID, date, time, value, type);
      if (result) {
        return res.status(200).json({ status: "OK" });
      } else return res.status(401).json({ status: "check_in failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
