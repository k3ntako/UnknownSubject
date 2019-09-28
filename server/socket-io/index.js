module.exports = (io, users, rooms) => {
  io.on('connection', function (socket) {
    socket.on('create', function (data) {
      const { name } = data;
      const user = users.addUser(name, socket.id); //create user if valid
      if( user ){
        const roomId = rooms.createRoom(user.id);
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

      if( !rooms.canJoin(roomId.trim()) ){
        return socket.emit('onJoin', { success: false, message: "Unable to join room" });
      }

      const user = users.addUser(name, socket.id, roomId); //create user if valid
      if( !user ){
        return socket.emit('onJoin', { success: false, message: "Unable to create user" });
      }

      rooms.joinRoom(roomId.trim(), user.id);

      socket.emit('onJoin', { success: true, socketId: socket.id, userId: user.id, roomId });
    });
  });
}
