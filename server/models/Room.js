const generateUUID_V4 = (a) => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateUUID_V4);

class Room {
  constructor(id, creator){
    this.id = id;
    this.creatorId = creator.id;
    this.users = [ creator ];
    this.userIds = [ creator.id ];
    this.loadedUsers = [];
    this.characterList = {
      citizen: 0,
      grandparent: 0,
      identity_thief: 0,
      lookout: 0,
      murderer: 0,
      night_owl: 0,
      scientist: 0,
      twin: 0,
      witness: 0,
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
    this.characterList[characterId] = count;
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

  assignRoles(){
    const roles = [];
    const resultingRoles = {
      assigned: {},
      unassigned: null,
    }

    for( let role in this.characterList ){
      for( let i = 0; i < this.characterList[role]; i++ ){
        roles.push(role);
      }
    }

    this.users.forEach(user => {
      const rand = Math.floor( Math.random() * roles.length );
      const role = roles.splice(rand, 1)[0];
      user.role = role;
      resultingRoles.assigned[ user.id ] = role;
    });



    resultingRoles.unassigned = roles.map(role => ({
      id: generateUUID_V4(),
      role: role,
    }));
    return resultingRoles;
  }

  roleCount(){
    return Object.values(this.characterList).reduce((acc, count) => acc + count)
  }

  validRoles(){
    return this.roleCount() === this.users.length + 3; //add more validations
  }

  playerLoaded(id){
    if( !this.loadedUsers.includes(id)){
      this.loadedUsers.push(id);
    }

    return this.loadedUsers.length === this.users.length;
  }
}


module.exports = { Room };
