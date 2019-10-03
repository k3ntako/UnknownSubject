module.exports = (io, rooms) => {
  io.on('connect', function (socket) {
    socket.gameSession = {
      roomId: null,
      userId: null,
    }

    require('./userInitialization')(io, socket, rooms);
    require('./userDisconnection')(io, socket, rooms);
    require('./gameSetup')(io, socket, rooms);
  });
}
