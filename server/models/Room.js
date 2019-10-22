const generateUUID_V4 = (a) => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateUUID_V4);

class Room {
  constructor(id, creator){
    this.id = id;
    this.creatorId = creator.id;
    this.users = [ creator ];
    this.userIds = [ creator.id ];
    this.currentStage = "0=gameSetup";
    this.stages = ["0=gameSetup", "1=nonOrderAffecting"];
    this.characterList = {
      citizen: 0,
      grandparent: 0,
      identityThief: 0,
      lawyer: 0,
      murderer: 0,
      nightOwl: 0,
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

  setStages(){
    ["thief", "scientist", "grandparent", "nightOwl"].forEach((id, idx) => {
      // determines the stages that will be required based on which characters were selected
      // idx + 2 because, stage 0 and 1 are "0=gameSetup", "1=nonOrderAffecting"
      if(this.characterList[id] > 0){
        this.stages.push(`${idx + 2}=${id}`);
      }
    });

    const lastStage = this.stages[this.stages.length - 1]
    if (characterList.witness && lastStage.includes("=nonOrderAffecting") ){
      // witness usually will view their card during the stage after nonOrderAffecting
      // however, if there are no stages following it, a stage for the witness must be added
      this.stages.push("witness");
    }

    this.stages.push("1000=done");

    return this.stages;
  }

  nextStage(playerId, stageFinished){
    const stageFinishedIdx = this.stages.indexOf(stageFinished);

    if(stageFinished === this.currentStage){
      // if stageFinished is equal to currentStage, move server onto next stage
      this.currentStage = this.stages[stageFinishedIdx + 1];
    }else if (this.stages[stageFinishedIdx + 1] !== this.currentStage){
      // stageFinished is not equal to current stage (because of if statement above)
      // stageFinished should be the stage previous to currentStage
      throw new Error("Stage finished sent by client is not the one prior to current stage on server");
    }

    const me = this.users.find(user => user.id === playerId);
    
    me.stage = this.currentStage;

    const allPlayersSynced = !this.users.some(user => user.stage !== this.currentStage);
    return [this.currentStage, allPlayersSynced];
  }

  roleCount(){
    return Object.values(this.characterList).reduce((acc, count) => acc + count)
  }

  validRoles(){
    return this.roleCount() === this.users.length + 3; //add more validations
  }
}


module.exports = { Room };
