module.exports = (io, socket, rooms) => {
  socket.on('disconnect', function (reason) {
    rooms.removeUser(socket.gameSession.roomId, socket.id);

    io.to(socket.gameSession.roomId).emit('userLeft', { userId: socket.id });

    socket.gameSession.userId = null;
    socket.gameSession.roomId = null;
  });
}
