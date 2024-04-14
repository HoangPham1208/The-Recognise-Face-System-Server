var express = require('express')
var router = express.Router()
var verifyToken = require('../middleware/authentication')

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'))
})
module.exports = router
