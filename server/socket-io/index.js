module.exports = (io, rooms) => {
  io.on('connect', function (socket) {
    socket.gameSession = {
      roomId: null,
      userId: null,
    }

    require('./userInitialization')(socket, rooms);
    require('./userDisconnection')(io, socket, rooms);
    require('./gameSetup')(socket, rooms);
  });
}
