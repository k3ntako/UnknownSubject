module.exports = (io, users, rooms) => {
  io.on('connection', function (socket) {
    socket.on('create', function (data) {
      const { name } = data;
      const user = users.addUser(name, socket.id); //create user if valid
      if( user ){
        const room = rooms.createRoom(user);
        users.addUserToRoom(user.id, room.id);

        socket.join(room.id);

        socket.emit('onJoin', { success: true, users: [ user ], roomId: room.id });
      }else{
        socket.emit('onJoin', { success: false, message: "Both a name and Room ID are required" });
      }
    });

    socket.on('join', function (data) {
      const { name, roomId } = data;
      const roomIdTrimmed = roomId && roomId.trim();
      if( !!(roomIdTrimmed && roomIdTrimmed.length !== 6) ){
        return socket.emit('onJoin', { success: false, message: "Invalid room id" });
      }

      if( !rooms.canJoin(roomIdTrimmed) ){
        return socket.emit('onJoin', { success: false, message: "Unable to join room" });
      }

      const user = users.addUser(name, socket.id, roomIdTrimmed); //create user if valid
      if( !user ){
        return socket.emit('onJoin', { success: false, message: "Unable to create user" });
      }

      const room = rooms.joinRoom(roomIdTrimmed, user);
      socket.join(roomIdTrimmed);

      socket.emit('onJoin', { success: true, socketId: socket.id, users: room.users, roomId: roomIdTrimmed });
      socket.broadcast.to(roomIdTrimmed).emit('userJoined', { user: user });
    });
  });
}
