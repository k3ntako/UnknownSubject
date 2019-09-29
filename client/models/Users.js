class Users{
  constructor(){
    this.users = [];
    this.onUpdate = () => {};
  }

  addUsers( newUsers ){
    this.users = this.users.concat(newUsers);
    this.onUpdate();
  }

  removeUser( id ){
    let user;
    for(let i = 0; i < this.users.length; i++){
      if (this.users[i].id === id) {
        user = this.users.splice(i, 1)[0];
        break;
      }
    }

    this.onUpdate();
  }

  // TODO: Use Redux!
  setOnUpdateCb( func ){
    this.onUpdate = func;
  }

  removeOnUpdateCb(){
    this.onUpdate = () => {};
  }

}

let users = new Users;
export default users;
