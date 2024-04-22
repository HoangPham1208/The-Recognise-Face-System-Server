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
        return res.status(401).json({ status: 'Authentication failed' });
      }
      // const isValidPassword = await bcryptjs.compareSync(
      //   password,
      //   account.password
      // )
      // if (!isValidPassword) {
      //   return res.status(401).json({ status: 'Authentication failed' })
      // }
      const token = jwt.sign({ id: account.ID }, process.env.SECRET_TOKEN)
      const { password: pass, ...tem } = account
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json({ status: 'ok', message: tem })
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message })
    }
  },
  register: async (req, res) => {
    const { account_name, password } = req.body
    if (!account_name || !password) {
      return res.status(400).json({
        status: 'failed',
        message: 'account name or password is missing',
      })
    }
    try {
      // check account first
      const isRegistered = await authModel.getUser(account_name)
      if (isRegistered) return res.status(409).json({status: 'Account is already registered'})
      const hashPassword = bcryptjs.hashSync(password, 10)
      const result = await authModel.register(account_name, hashPassword)
      if (result) {
        return res.status(200).json({ status: 'Register successfully' })
      } else return res.status(401).json({ status: 'Authentication failed' })
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message })
    }
  },
}
