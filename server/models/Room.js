class Room {
  constructor(id, creator){
    this.id = id;
    this.creatorId = creator.id;
    this.users = [ creator ];
    this.charList = {
      citizen: 0,
      jury_member: 0,
      witness: 0,
      bail_bondsman: 0,
      robber: 0,
      bob: 0,
    };
  }

  static validateRoomId( newRoomId ){
    if( typeof newRoomId !== 'string' || !newRoomId.trim() ) throw new Error("Invalid room code");
    if( newRoomId.trim().length !== 6 ) throw new Error("Room codes should be 6 characters long");
    if( !newRoomId.match(/^([A-Fa-f0-9]{6})$/) ) throw new Error("Room codes should only consist 0 to 9 and a to f (hex color code)");

    newRoomId.trim().toLowerCase();
    return newRoomId;
  }

  joinRoom(user){
    if( !user || !user.id ) throw new Error("Invalid user");
    this.users.push(user);
  }

  changeCount( characterId, count ){
    this.charList[characterId] = count;
  }

  removeUser(id){
    let user;

    for(let i = 0; i < this.users.length; i++){
      if (this.users[i].id === id) {
        user = this.users.splice(i, 1)[0];
        break;
      }
    }

    return user;
  }

}


module.exports = { Room };
