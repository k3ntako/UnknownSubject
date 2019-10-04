module.exports = (io, rooms) => {
  io.on('connect', function (socket) {
    socket.gameSession = {
      roomId: null,
      userId: null, // this is the same as socket.id, but this may be changed to be something more permanent
    }

    require('./userInitialization')(io, socket, rooms);
    require('./userDisconnection')(io, socket, rooms);
    require('./gameSetup')(io, socket, rooms);
  });
}
