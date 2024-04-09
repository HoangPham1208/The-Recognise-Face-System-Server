var express = require('express');
var router = express.Router();
var authController = require('../controller/authController')

/* GET home page. */
router.post('/login', authController.login)
router.get('/register', function(req,res,next){
    res.json('logout')
});
module.exports = router;
