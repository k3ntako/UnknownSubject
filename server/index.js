require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Users } = require('./models/Users');
const { Games } = require('./models/Games');
const { Game } = require('./models/Game');

// Express Set-up
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Game Set-up
const users = new Users();
const games = new Games();

// Socket.IO
io.on('connection', function (socket) {
  socket.on('create', function (data) {
    const { name } = data;
    const user = users.addUser(name, socket.id); //create user if valid
    if( user ){
      const roomId = games.createGame(user.id);
      users.addUserToRoom(user.id, roomId);
      socket.emit('onJoin', { success: true, socketId: socket.id, userId: user.id, roomId });
    }else{
      socket.emit('onJoin', { success: false, message: "Both a name and Room ID are required" });
    }
  });

  socket.on('join', function (data) {
    const { name, roomId } = data;
    if( !!(roomId && roomId.trim().length !== 6) ){
      return socket.emit('onJoin', { success: false, message: "Invalid room id" });
    }

    if( !games.canJoin(roomId.trim()) ){
      return socket.emit('onJoin', { success: false, message: "Unable to join room" });
    }

    const user = users.addUser(name, socket.id, roomId); //create user if valid
    if( !user ){
      return socket.emit('onJoin', { success: false, message: "Unable to create user" });
    }

    games.joinGame(roomId.trim(), user.id);

    socket.emit('onJoin', { success: true, socketId: socket.id, userId: user.id, roomId });
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


server.listen( process.env.PORT || 3000, function() {
  console.log('Server started at port 3000');
});
