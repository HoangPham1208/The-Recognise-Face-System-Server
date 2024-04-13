// const generateOtp = async (req, res, next) => {
//   if (req.user.id != req.params.id)
//     return res.status(401).json({status: 'error',message: 'You can only generate your otp!'})
//   try {
//     const otp = Math.floor(1000 + Math.random() * 9000)

//   } catch (error) {
//     return res.status(500).json({ status: 'error', message: error.message })
//   }
// }

// const verifyOtp = async (req, res, next) => {
//   try {
//     const { phoneNumber, enterOtp } = req.body
//     const storedOtp = await client.get(phoneNumber)
//     if (!storedOtp) {
//       return res.status(404).json({ status: 'error', message: 'Expired OTP' })
//     }
//     const isValidOtp = enterOtp === storedOtp
//     if (!isValidOtp) {
//       return res.status(401).json({ status: 'error', message: 'Invalid Otp' })
//     }
//     return res.status(200).json({ status: 'ok', message: 'Valid Otp' })
//   } catch (error) {
//     next(error)
//   }
// }
const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res
      .status(401)
      .json({ status: 'error', message: 'You can only update your account' })
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
  } catch (err) {
    return res.status(500).json({ status: 'error', message: 'err.message' })
  }
}

// module.exports = { generateOtp, verifyOtp }
