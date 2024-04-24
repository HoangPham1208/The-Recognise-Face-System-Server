var attendRoute = require('./attendRoute')

function router(app) {
  app.use('/attend', attendRoute)
}

module.exports = router
