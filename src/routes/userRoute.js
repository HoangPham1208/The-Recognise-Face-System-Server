const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authentication')
const userController = require('../controller/userController')
// router.get('/gen-otp', verifyToken, userController.generateOtp)
// router.get('/verify-otp', verifyToken, userController.verifyOtp)
router.post('/update/:id', verifyToken, userController.updateUser)

module.exports = router
