const { Room } = require('../models/Room');
const defaultUser = ( id, name ) => ({ // function removes reference
  id: id,
  name: name,
  role: null,
});

module.exports = (io, socket, rooms) => {
  socket.on('create', function (data) {
    try{
      const { name } = data;
      if( !name || !name.trim() ) throw new Error("Invalid name");

      socket.gameSession.userId = socket.id;

      //create room
      const room = rooms.createRoom( defaultUser(socket.id, name) );
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
      const newUser = defaultUser(socket.id, name);
      socket.gameSession.userId = socket.id;

      //join room
      const room = rooms.joinRoom(socket.gameSession.roomId, newUser);
      socket.join(socket.gameSession.roomId);

      //respond to front-end
      socket.emit('onJoin', { success: true, room: room });
      socket.to(socket.gameSession.roomId).emit('userJoined', { user: newUser });
    }catch( err ){
      console.error(err.message);
      socket.emit('onJoin', { success: false, message: err.message });
    }
  });
}
