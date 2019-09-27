const { Game } = require('./Game');
const chars = '0123456789abcdef';

class Games {
  constructor(){
    this.games = [];
    this.roomIds = [];
  }

  generateRoomId(){
    let roomId = "";
    let isValid = false;
    let count = 0;
    while( !isValid && count < 600 ){
      roomId += chars[Math.floor(Math.random()*16)];
      isValid = roomId.length === 6 && !this.roomIds.includes(roomId);
      if(!isValid && roomId.length >= 6) roomId = "";
      count++;
    }

    console.log(count);

    return roomId;
  }

  createGame(creatorId){
    const roomId = this.generateRoomId();
    const newGame = new Game(roomId, creatorId);
    this.games.push(newGame);
    this.roomIds.push(roomId);
    return roomId;
  }

  finishGame(roomId){
    if( !this.roomIds.includes(roomId) ) return null;
    this.games.filter(game => game.roomId !== roomId );
    this.roomIds.filter(id => id !== roomId );
  }

  getGame(roomId){
    return this.games.find(game => game.roomId === roomId);
  }

  canJoin(roomId){
    return !!this.games.find(game => game.roomId === roomId);
  }

  joinGame(roomId, userId){
    let game = this.games.find(game => game.roomId === roomId);
    game.joinGame(userId);
  }
}


module.exports = { Games };
