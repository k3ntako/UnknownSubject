module.exports = (sessionState, io, socket, rooms) => {
  socket.on('disconnect', function (reason) {
    rooms.removeUser(socket.id);

    io.to(sessionState.roomId).emit('userLeft', { userId: socket.id });
  });
}
