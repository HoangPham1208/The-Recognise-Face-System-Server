var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/authentication')

/* GET home page. */
router.get('/', verifyToken, function(req,res){
    res.json('u pass the doorrr')
});
module.exports = router;
