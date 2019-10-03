module.exports = (sessionState, socket, rooms) => {
  socket.on('changeCount', function (data) {
    try{
      const { characterId, count } = data;
      if( !characterId || !characterId.trim() ) throw new Error("Invalid character ID");
      if( typeof count !== "number" ) throw new Error("Invalid count of characters");

      const room = rooms.getRoom( sessionState.roomId );
      room.changeCount( characterId, count );

      socket.to( sessionState.roomId ).emit('onChangeCount', { success: true, characterId, count });
    }catch( err ){
      console.error(err.message);
      socket.emit('onChangeCount', { success: false, message: err.message });
    }
  });

  // leader emits beginGame
  // server emits beginningGame
  // players emit playerLoaded and wait for others to load
  // server emits allPlayersLoaded once everyone loaded

  socket.on('beginGame', function (data) {
    socket.broadcast.to(sessionState.roomId).emit('beginningGame');
  });

  socket.on('playerLoaded', function (data) {
    const allPlayersLoaded = rooms[ sessionState.roomId ].playerLoaded( sessionState.userId );

    if( allPlayersLoaded ){
      socket.to(sessionState.roomId).emit('allPlayersLoaded');
    }
  });


}
