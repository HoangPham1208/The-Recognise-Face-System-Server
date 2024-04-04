var route_1 = require('./route_1')

function router(app) {
    app.use('/api/route_1',route_1)
    // app.get('*', function (req, res) { 
    //     res.send("404 - not found")
    // })
}

module.exports = router;
