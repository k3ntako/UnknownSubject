class Game{
  constructor(){
    this.charList = {
      citizen: 0,
      jury_member: 0,
      witness: 0,
      bail_bondsman: 0,
      robber: 0,
      bob: 0,
    }
    this.users = [];
    this.onUpdate = () => {};
  }

  onCharListChange( newCharList ){
    this.charList = Object.assign(this.charList, newCharList);
    this.onUpdate();
  }

  onChangeCount(id, count){
    this.charList[id] = count;
    this.onUpdate();
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

let game = new Game;
export default game;
