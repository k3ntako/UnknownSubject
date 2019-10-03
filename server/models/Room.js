class Room {
  constructor(id, creator){
    this.id = id;
    this.creatorId = creator.id;
    this.users = [ creator ];
    this.userIds = [ creator.id ];
    this.loadedUsers = [];
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
    this.userIds.push(user.id);
  }

  changeCount( characterId, count ){
    this.charList[characterId] = count;
  }

  removeUser(id){
    if( this.creator === id ){
      // TODO: end game for everyone?
    }

    const userExists = this.userIds.includes(id);
    if( userExists ){
      this.users = this.users.filter(user => user.id !== id);
      this.users = this.userIds.filter(userId => userId !== id);
      this.loadedUsers = this.loadedUsers.filter(user => user.id !== id);
    }

    return userExists;

    //old way (TODO: test which is faster)
    //benefit: one less loop
    //drawback: each loop is more expensive
    // let user;
    //
    // for(let i = 0; i < this.users.length; i++){
    //   if (this.users[i].id === id) {
    //     user = this.users.splice(i, 1)[0];
    //     break;
    //   }
    // }
    //
    // if( user ){
    //   this.userIds
    // }

    // return user;
  }

  playerLoaded(id){
    if( !this.loadedUsers.includes(id)){
      this.loadedUsers.push(id);
    }

    return this.loadedUsers.length === this.users.length;
  }


}


module.exports = { Room };
