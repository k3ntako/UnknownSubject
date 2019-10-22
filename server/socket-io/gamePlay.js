module.exports = (io, socket, rooms) => {
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

  socket.on('stageDone', function () {
    const room = rooms.rooms[socket.gameSession.roomId];
    const currentStage = room.nextStage();
    
    io.in(socket.gameSession.roomId).emit('nextStage', { currentStage });
  });
}
