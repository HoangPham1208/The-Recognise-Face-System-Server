var authRoute = require('./authRoute')
var userRoute = require('./userRoute')
var managerRoute = require('./managerRoute')
function router(app) {
  app.use('/auth', authRoute)
  app.use('/user', userRoute)
  app.use('/manager', managerRoute)
}

module.exports = router
