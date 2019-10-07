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
  // server emits beginningGame (along with roles)
  // players emit playerLoaded and wait for others to load
  // server emits allPlayersLoaded once everyone loaded

  socket.on('beginGame', function (data) {
    try {
      const room = rooms.rooms[ socket.gameSession.roomId ];

      // validate set up
      if( !room.validRoles() ){
        throw new Error("Not enough roles")
      };

      // TODO: verify unknown subject is one of them
      // TODO: put maximums on certain characters

      //asign roles
      const roles = room.assignRoles();


      io.in(socket.gameSession.roomId).emit('beginningGame', { roles: roles });
    } catch (e) {
      console.error(e);
      io.in(socket.gameSession.roomId).emit('error', { message: e.message });
    }
  });

  


}
