module.exports = (sessionState, io, socket, rooms) => {
  socket.on('disconnect', function (reason) {
    rooms.removeUser(sessionState.roomId, socket.id);

    io.to(sessionState.roomId).emit('userLeft', { userId: socket.id });

    sessionState.userId = null;
    sessionState.roomId = null;
  });
}
