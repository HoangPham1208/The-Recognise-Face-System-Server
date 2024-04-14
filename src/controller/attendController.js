const attendModel = require("../model/attendModel");
const time_config = require("../config/dbconfig.json")

module.exports = {
  check_in: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "no id provided",
      });
    }
    try {
      const result = await attendModel.check_in(id);
      if (result) {
        return res.status(200).json({ status: "OK"});
      } else return res.status(401).json({ status: "check_in failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
