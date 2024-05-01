const bcryptjs = require('bcryptjs')
const managerModel = require('../model/managerModel.js')
const authModel = require('../model/authModel.js')

const updateFaceModel = async (req, res) => {
  try {
    const update = await managerModel.updateFaceModel(
      req.user.id,
      req.params.id
    )
    if (!update) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' })
    }
    return res
      .status(200)
      .json({ status: 'ok', message: 'Update successfully' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

const updateEmployee = async (req, res) => {
  try {
    const { employee_ID, name, email, phone, working_days, position } = req.body
    const update = await managerModel.updateEmployee(
      req.user.id,
      employee_ID,
      name,
      email,
      phone,
      working_days,
      position
    )
    if (!update) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' })
    }
    return res
      .status(200)
      .json({ status: 'ok', message: 'Update successfully' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

const getForm = async (req, res) => {
  try {
    const form = await managerModel.getForm(req.user.id)
    if (!form) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' })
    }
    return res.status(200).json({ status: 'ok', message: form })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

const respondForm = async (req, res) => {
  try {
    let { description, status, form_id } = req.body
    let date_time = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    })
    let formatted_date_time = new Date(date_time)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    if (!description) description = ''
    const form = await managerModel.sendForm(
      req.user.id,
      formatted_date_time,
      description,
      status,
      form_id
    )
    if (!form) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized' })
    }
    return res.status(200).json({ status: 'ok', message: 'Successful!' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}
const register = async (req, res) => {
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
    if (isRegistered)
      return res.status(409).json({ status: 'Account is already registered' })

    const hashPassword = bcryptjs.hashSync(password, 10)
    console.log(req.user.id)
    const result = await authModel.register(
      req.user.id,
      account_name,
      hashPassword
    )
    if (result) {
      return res.status(200).json({ status: 'Register successfully' })
    } else
      return res
        .status(401)
        .json({ status: 'Authentication failed', message: result.message })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports = {
  updateFaceModel,
  updateEmployee,
  getForm,
  respondForm,
  register,
}
