class Room {
  constructor(roomId, creatorId){
    this.roomId = roomId;
    this.creatorId = creatorId;
    this.users = [creatorId];
    this.charList = {
      citizen: 0,
      jury_member: 0,
      witness: 0,
      bail_bondsman: 0,
      robber: 0,
      bob: 0,
    };
  }

  joinRoom(id){
    this.users.push(id);
  }

  leaveRoom(id){
    let users;

    for(let i = 0; i < this.users.length; i++){
      if (this.users[i].id === id) {
        user = this.users.splice(i, 1)[0];
      }
    }

    return user;
  }

}


module.exports = { Room };
