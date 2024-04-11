const { token } = require("morgan");
const authModel = require("../model/authModel");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { account_name, password } = req.body;
    if (!account_name || !password) {
      return res.status(400).json({
        status: "failed",
        message: "account name or password is missing",
      });
    }
    try {
      const result = await authModel.login(account_name, password);
      if (result) {
        return res.status(200).json({ status: "OK", auth_token: result });
      } else return res.status(401).json({ status: "Authentication failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
  register: async (req, res) => {
    const { account_name, password } = req.body;
    if (!account_name || !password) {
      return res.status(400).json({
        status: "failed",
        message: "account name or password is missing",
      });
    }
    try {
      const result = await authModel.register(account_name, password);
      if (result) {
        return res.status(200).json({ status: "Register successfully" });
      } else return res.status(401).json({ status: "Authentication failed" });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },
};
