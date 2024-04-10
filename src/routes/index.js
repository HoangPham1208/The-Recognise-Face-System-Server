var authRoute = require('./authRoute')
var testAuth = require('./testAuth')

function router(app) {
    app.use('/auth',authRoute);
    app.use('/test',testAuth);
}

module.exports = router;
