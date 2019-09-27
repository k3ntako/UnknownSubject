require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { models, sequelize } = require('./models');

// Express Set-up
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Socket.IO
io.on('connection', function (socket) {
  socket.on('join', function (data) {
    const { name, room } = data;
    if( name && name.trim() && room && room.trim() ){
      socket.emit('onJoin', { success: true, socketId: socket.id });
    }else{
      socket.emit('onJoin', { success: false, message: "Both a name and Room ID are required" });
    }
  });
});

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

// Connect to db and start server
// REMOVE FORCE BEFORE DEPLOYING
// ADD MIGRARTIONS AS REPLACEMENT
const dropDatabaseOnStart = true;
sequelize.sync({ force: dropDatabaseOnStart }).then(async () => {
  server.listen( process.env.PORT || 3000, function() {
    console.log('Server started at port 3000');
  });
});
