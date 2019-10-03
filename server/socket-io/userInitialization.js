const { Room } = require('../models/Room');

module.exports = (socket, rooms) => {
  socket.on('create', function (data) {
    try{
      const { name } = data;
      if( !name || !name.trim() ) throw new Error("Invalid name");

      //create user
      const user = {
        name: name,
        id: socket.id,
      };
      socket.gameSession.userId = user.id;

      //create room
      const room = rooms.createRoom(user);
      socket.gameSession.roomId = room.id;

      //add user to room
      socket.join(socket.gameSession.roomId);

      //respond to front-end
      socket.emit('onJoin', { success: true, room: room });
    }catch( err ){
      console.error(err.message);
      socket.emit('onJoin', { success: false, message: err.message });
    }
  });

  socket.on('join', function (data) {
    try{
      const { name, roomId } = data;
      socket.gameSession.roomId = Room.validateRoomId(roomId);

      //check if room is available
      if( !rooms.canJoin(socket.gameSession.roomId) ) throw new Error("Room unavailable")

      //create user
      if( !name || !name.trim() ) throw new Error("Invalid name");
      const user = {
        name: name,
        id: socket.id,
      };
      socket.gameSession.userId = user.id;

      //join room
      const room = rooms.joinRoom(socket.gameSession.roomId, user);
      socket.join(socket.gameSession.roomId);

      //respond to front-end
      socket.emit('onJoin', { success: true, room: room });
      socket.broadcast.to(socket.gameSession.roomId).emit('userJoined', { user: user });
    }catch( err ){
      console.error(err.message);
      socket.emit('onJoin', { success: false, message: err.message });
    }
  });
}
