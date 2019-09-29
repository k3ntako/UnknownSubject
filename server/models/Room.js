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

  joinRoom(user){
    if( !user || !user.id ) throw new Error("Invalid user");
    this.users.push(user);
  }

  changeCount( characterId, count ){
    this.charList[characterId];
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
