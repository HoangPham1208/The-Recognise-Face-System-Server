var authRoute = require('./authRoute')

function router(app) {
    app.use('/auth',authRoute);
}

module.exports = router;
