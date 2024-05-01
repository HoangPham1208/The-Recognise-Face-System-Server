const { token } = require('morgan')
const authModel = require('../model/authModel')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
module.exports = {
  login: async (req, res) => {
    const { account_name, password } = req.body
    if (!account_name || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'account name or password is missing',
      })
    }
    try {
      const account = await authModel.getUser(account_name)
      if (!account) {
        return res.status(401).json({ status: 'Authentication failed' })
      }
      // const isValidPassword = await bcryptjs.compareSync(
      //   password,
      //   account.password
      // )
      // if (!isValidPassword) {
      //   return res.status(401).json({ status: 'Authentication failed' })
      // }
      const isManager = await authModel.isManager(account.ID)
      const role = isManager ? 'manager' : 'staff'
      const token = jwt.sign({ id: account.ID }, process.env.SECRET_TOKEN)
      console.log(token)
      console.log(account.ID)
      const { password, ID, face_model, ...tem } = account
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json({ status: 'ok', message: tem, position: role })
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message })
    }
  },
}
