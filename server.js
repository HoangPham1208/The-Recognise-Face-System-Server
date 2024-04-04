var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')

var Router = require('./routes/index');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

Router(app)

app.get('/', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		Connection: 'keep-alive',
		'Cache-Control': 'no-cache',
	});
  let counter = 0;
  // Send a message on connection
  res.write('event: connected\n');
  res.write(`data: You are now subscribed!\n`);
  res.write(`id: ${counter}\n\n`);
  counter += 1;
  // Send a subsequent message every five seconds
  setInterval(() => {
      res.write('event: message\n');
      res.write(`data: ${new Date().toLocaleString()}\n`);
      res.write(`id: ${counter}\n\n`);
      counter += 1;
  }, 500);
  
  // Close the connection when the client disconnects
  req.on('close', () => res.end('OK'))
});



const port = 3001;

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});

