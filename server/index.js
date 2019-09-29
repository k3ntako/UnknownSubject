require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Rooms } = require('./models/Rooms');
const { Room } = require('./models/Room');

// Express Set-up
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Game Set-up
const rooms = new Rooms(); // Replace with Redis?

// Socket.IO
require('./socket-io')(io, rooms);

// Express Middleware
app.use(bodyParser.json())
app.use('/', express.static( path.join(__dirname, '..', 'public') ));

// API
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Front-End
app.get('*', (req, res) => {
  if( !res.headersSent ){
    res.set({ 'Content-Type': 'text/html' })
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

// Error Handling
app.use(function (err, req, res, next){
  let statusCode = err.statusCode || err.code;
  if( typeof(statusCode) !== 'number' || statusCode < 100 ){
    statusCode = 500;
  }
if( statusCode === 500 ){
    console.error(err);
  }
if( !res.headersSent ){
    res.status(statusCode);
    res.json({ error: err.message });
  }
});


server.listen( process.env.PORT || 3000, function() {
  console.log('Server started at port 3000');
});
