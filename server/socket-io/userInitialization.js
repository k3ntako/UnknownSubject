const { Room } = require('../models/Room');

module.exports = (sessionState, socket, rooms) => {
  socket.on('create', function (data) {
    try{
      const { name } = data;
      if( !name || !name.trim() ) throw new Error("Invalid name");

      //create user
      const user = {
        name: name,
        id: socket.id,
      };

      //create room
      const room = rooms.createRoom(user);
      sessionState.roomId = room.id;

      //add user to room
      socket.join(sessionState.roomId);

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
      sessionState.roomId = Room.validateRoomId(roomId);

      //check if room is available
      if( !rooms.canJoin(sessionState.roomId) ) throw new Error("Room unavailable")

      //create user
      if( !name || !name.trim() ) throw new Error("Invalid name");
      const user = {
        name: name,
        id: socket.id,
      };

      //join room
      const room = rooms.joinRoom(sessionState.roomId, user);
      socket.join(sessionState.roomId);

      //respond to front-end
      socket.emit('onJoin', { success: true, room: room });
      socket.broadcast.to(sessionState.roomId).emit('userJoined', { user: user });
    }catch( err ){
      console.error(err.message);
      socket.emit('onJoin', { success: false, message: err.message });
    }
  });
}
