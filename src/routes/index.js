var authRoute = require('./authRoute')
var userRoute = require('./userRoute')
function router(app) {
  app.use('/auth', authRoute)
  app.use('/user', userRoute)
}

module.exports = router
