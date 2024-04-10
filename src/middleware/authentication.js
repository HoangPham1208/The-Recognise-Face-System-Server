const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    jwt.verify(token, process.env.SECRET_TOKEN);
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Forbidden", msg: "Don't have permission" });
  }
}

module.exports = verifyToken ;
