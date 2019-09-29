let sessionRoomId = null;
const validateRoomId = ( newRoomId ) => {
  if( typeof newRoomId !== 'string' || !newRoomId.trim() ) throw new Error("Invalid room code");
  if( newRoomId.trim().length !== 6 ) throw new Error("Room codes should be 6 characters long");
  if( !newRoomId.match(/^([A-Fa-f0-9]{6})$/) ) throw new Error("Room codes should only consist 0 to 9 and a to f (hex color code)");

  newRoomId.trim().toLowerCase();
  return newRoomId;
}

module.exports = (io, rooms) => {
  io.on('connect', function (socket) {
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
        sessionRoomId = room.id;

        //add user to room
        socket.join(sessionRoomId);

        //respond to front-end
        socket.emit('onJoin', { success: true, users: [ user ], roomId: sessionRoomId });
      }catch( err ){
        console.error(err.message);
        socket.emit('onJoin', { success: false, message: err.message });
      }
    });

    socket.on('join', function (data) {
      try{
        const { name, roomId } = data;
        sessionRoomId = validateRoomId(roomId);

        //check if room is available
        if( !rooms.canJoin(sessionRoomId) ) throw new Error("Room unavailable")

        //create user
        if( !name || !name.trim() ) throw new Error("Invalid name");
        const user = {
          name: name,
          id: socket.id,
        };

        //join room
        const room = rooms.joinRoom(sessionRoomId, user);
        socket.join(sessionRoomId);

        //respond to front-end
        socket.emit('onJoin', { success: true, users: room.users, roomId: sessionRoomId });
        socket.broadcast.to(sessionRoomId).emit('userJoined', { user: user });
      }catch( err ){
        console.error(err.message);
        socket.emit('onJoin', { success: false, message: err.message });
      }
    });

    socket.on('disconnect', function (data) {
      rooms.removeUser(socket.id);

      io.to(sessionRoomId).emit('userLeft', { userId: socket.id });
    });
  });
}
