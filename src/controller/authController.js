const authModel = require("../model/authModel");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ status: "failed", message: "Username or password is missing" });
    }
    try {
      const result = await authModel.login(username, password);
      if (result) res.status(200).json({ status: "OK"});
      else res.status(401).json({status: "Unauthorized"});
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};
