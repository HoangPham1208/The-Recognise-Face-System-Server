var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var bodyParser = require('body-parser')

var Router = require('./routes/index')

var app = express()
const socketio = require('socket.io')
const server = app.listen(1337, () => {
  console.log('Server running!')
})
const ioo = socketio(server)

ioo.on('connection', (socket) => {
  console.log('New connection')
})
// const io = require('socket.io-client')
// const io = require('socket.io-client')
// const socket = io('http://localhost:1337/')

// on the connection

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Route in routes
// Router(app)
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'))
})

const port = 3000

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`)
})
