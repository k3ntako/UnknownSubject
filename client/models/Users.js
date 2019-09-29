class Users{
  constructor(){
    this.users = [];
    this.onUpdate = () => {};
  }

  addUsers( newUsers ){
    this.users = this.users.concat(newUsers);
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
