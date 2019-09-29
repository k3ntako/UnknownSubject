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
}
