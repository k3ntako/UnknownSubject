const { Room } = require('./Room');
const chars = '0123456789abcdef';

class Rooms {
  constructor(){
    this.rooms = [];
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

  createRoom(creatorId){
    const roomId = this.generateRoomId();
    const newRoom = new Room(roomId, creatorId);
    this.rooms.push(newRoom);
    this.roomIds.push(roomId);
    return roomId;
  }

  finishRoom(roomId){
    if( !this.roomIds.includes(roomId) ) return null;
    this.rooms.filter(room => room.roomId !== roomId );
    this.roomIds.filter(id => id !== roomId );
  }

  getRoom(roomId){
    return this.rooms.find(room => room.roomId === roomId);
  }

  canJoin(roomId){
    return !!this.rooms.find(room => room.roomId === roomId);
  }

  joinRoom(roomId, userId){
    let room = this.rooms.find(room => room.roomId === roomId);
    room.joinRoom(userId);
  }
}


module.exports = { Rooms };
