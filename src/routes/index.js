var authRoute = require('./authRoute')
var testAuth = require('./testAuth')
const userRoute = require('./userRoute')
// const userRoute = require('./userRoute')
function router(app) {
  app.use('/auth', authRoute)
  app.use('/test', testAuth)
  app.use('/user', userRoute)
}

module.exports = router
