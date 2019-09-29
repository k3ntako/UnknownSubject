const generateUUID_V4 = (a) => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateUUID_V4);

class Users {
  constructor(){
    this.users = [];
  }

  addUser(name, socketId, roomId = null){
    if( !name || !name.trim() ){
      console.error("Invalid name");
      return null;
    }else if( !socketId ){
      console.error("Invalid socket ID");
      return null;
    }

    let user = {
      name, socketId, roomId, id: generateUUID_V4(),
    };
    this.users.push(user);
    return user;
  }

  // removeUser(id){
  //   let user;
  //
  //   for(let i = 0; i < this.users.length; i++){
  //     if (this.users[i].id === id) {
  //       user = this.users.splice(i, 1)[0];
  //     }
  //   }
  //
  //   return user;
  // }

  addUserToRoom(userId, roomId){
    this.users.forEach(user => {
      if( user.id === userId ){
        user.roomId = roomId;
      }
    })
  }

  // getUser(id){
  //   return this.users.filter(user => user.id === id)[0];
  // }
  //
  // getUserList(roomId){
  //   let users = this.users.filter(user => user.roomId === roomId);
  //   return users.map(user => user.name);
  // }
}


module.exports = { Users };
