let sessionState = {
  roomId: null,
  userId: null,
};

module.exports = (io, rooms) => {
  io.on('connect', function (socket) {
    require('./userInitialization')(sessionState, socket, rooms);
    require('./userDisconnection')(sessionState, io, socket, rooms);
    require('./gameSetup')(sessionState, socket, rooms);
  });
}
