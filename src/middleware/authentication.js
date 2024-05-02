const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  try {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      req.user = user
      next()
    })
  } catch (err) {
    return res
      .status(403)
      .json({ error: 'Forbidden', msg: "Don't have permission" })
  }
}

module.exports = verifyToken
