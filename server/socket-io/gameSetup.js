module.exports = (io, socket, rooms) => {
  socket.on('changeCount', function (data) {
    try{
      const { characterId, count } = data;
      if( !characterId || !characterId.trim() ) throw new Error("Invalid character ID");
      if( typeof count !== "number" ) throw new Error("Invalid count of characters");

      const room = rooms.getRoom( socket.gameSession.roomId );
      room.changeCount( characterId, count );

      socket.to( socket.gameSession.roomId ).emit('onChangeCount', { success: true, characterId, count });
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
    socket.to(socket.gameSession.roomId).emit('beginningGame');
  });

  socket.on('playerLoaded', function (data) {
    let allPlayersLoaded = false;
    if( rooms.rooms[ socket.gameSession.roomId ] ){
      allPlayersLoaded = rooms.rooms[ socket.gameSession.roomId ].playerLoaded( socket.gameSession.userId );
    }else{
      console.error("Room doesn't exist");
    }

    if( allPlayersLoaded ){
      io.in(socket.gameSession.roomId).emit('allPlayersLoaded');
    }
  });


}
