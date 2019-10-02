const { Room } = require('./Room');
const chars = '0123456789abcdef';

class Rooms {
  constructor(){
    this.rooms = {};
    this.roomIds = [];
  }

  // TODO: write tests for this
  generateRoomId(){
    let roomId = "";
    let isValid = false;
    let count = 0;
    while( !isValid && count < 600 ){
      roomId += chars[ Math.floor( Math.random() * 16 ) ];
      isValid = roomId.length === 6 && !this.roomIds.includes(roomId);
      if(!isValid && roomId.length >= 6) roomId = "";
      count++;
    }

    console.log(count);

    return roomId;
  }

  createRoom(creator){
    if( !creator || !creator.id ) throw new Error("Invalid creator");

    const roomId = this.generateRoomId();
    const newRoom = new Room(roomId, creator);
    this.rooms[roomId] = newRoom;
    this.roomIds.push(roomId);
    return newRoom;
  }

  // finishRoom(roomId){
  //   if( !this.roomIds.includes(roomId) ) return null;
  //   this.rooms.filter(room => room.roomId !== roomId );
  //   this.roomIds.filter(id => id !== roomId );
  // }

  getRoom(roomId){
    return this.rooms[roomId];
  }

  canJoin(roomId){
    return !!this.rooms[roomId];
  }

  joinRoom(roomId, user){
    let room = this.rooms[roomId];
    room.joinRoom(user);

    return room;
  }

  removeUser( roomId, id ){
    if( roomId && id ){
      this.rooms[roomId].removeUser(id);
    }
  }
}


module.exports = { Rooms };
