var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.json('login')
});
router.get('/register', function(req,res,next){
    res.json('logout')
});
module.exports = router;
