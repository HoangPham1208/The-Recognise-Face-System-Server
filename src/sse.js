var express = require('express');
var router = express.Router();

router.get('/progress',(req,res) => {
    res.set("Content-Type","text/event-stream")
    let progress = 0
    res.write('hello')
});

module.exports = router