var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var bodyParser = require('body-parser')

var Router = require('./routes/index')

var app = express()

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

const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../../public/views/index.html'))
})

server.listen(3001, () => {
  console.log('Listening on http://localhost:3001')
})

io.on('connection', (socket) => {
  console.log('Client connected')

  socket.on('subscribe', (channel) => {
    console.log(`Subscribing to channel: ${channel}`)
    socket.join(channel)
  })

  socket.on('unsubscribe', (channel) => {
    console.log(`Unsubscribing from channel: ${channel}`)
    socket.leave(channel)
  })

  socket.on('send', (message) => {
    console.log(`Sent message: ${message} into channel1`)
    io.to('channel1').emit('recieve', message)
  })
  socket.on('recieve', (message) => {
    console.log('received message:', message)
  })
})

// setInterval(() => {
//   io.to('channel1').emit('message', 'Hello from channel 1!')
//   io.to('channel2').emit('message', 'Hello from channel 2!')
// }, 1000)

const port = 3000

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`)
})
