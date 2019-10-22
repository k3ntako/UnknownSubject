module.exports = (io, socket, rooms) => {
  socket.on('stageDone', function (data) {
    const room = rooms.rooms[socket.gameSession.roomId];
    if (!room) throw new Error("Room doesn't exist");
    
    const [currentStage, allPlayersSynced] = room.nextStage(socket.gameSession.userId, data.stageFinished);

    io.in(socket.gameSession.roomId).emit('nextStage', { currentStage, allPlayersSynced });
  });
}
