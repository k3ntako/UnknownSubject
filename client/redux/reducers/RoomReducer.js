import { CHARACTER_IDS } from '../../models/CharacterList';
const initialCharacterList = {};
CHARACTER_IDS.forEach(id => initialCharacterList[id] = 0);

const Types = {
  ADD_USERS: 'ADD_USERS',
  REMOVE_USER: 'REMOVE_USER',
  SET_MY_ID: 'SET_MY_ID',
  SET_MY_ROLE: 'SET_MY_ROLE',
  SET_ROLES_AND_STAGES: 'SET_ROLES_AND_STAGES',
  SET_ALL_PLAYERS_SYNCED: 'SET_ALL_PLAYERS_SYNCED',
  UPDATE_CHAR_COUNTS: 'UPDATE_CHAR_COUNTS',
  SET_CURRENT_STAGE: 'SET_CURRENT_STAGE',
};

const initialRoles = () => {
  const initialRolesObj = {};
  CHARACTER_IDS.forEach(id => initialRolesObj[id] = []);
  return initialRolesObj;
}

const initialState = {
  myId: null,
  currentStage: "0=gameSetup",
  stages: [],
  characterList: initialCharacterList,
  myRole: null,
  roles: initialRoles(),
  users: [],
  unassignedRoles: [],
  allPlayersSynced: false,
};

//Reducer
const RoomReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.ADD_USERS:
      return Object.assign({}, state, {
        users: state.users.concat(action.users),
      });
    case Types.REMOVE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.userId),
      });
    case Types.SET_MY_ID:
      return Object.assign({}, state, {
        myId: action.myId,
      });
    case Types.SET_ROLES_AND_STAGES:
      const newRoles = initialRoles(); //remove reference
      let me = null;
      const newUsers = state.users.concat().map(user => { //concat remove reference
        const newUser = Object.assign({}, user);
        const roleId = action.roles.assigned[ newUser.id ];
        newUser.role = roleId;
        newRoles[roleId].push( newUser )

        if(newUser.id === state.myId) me = newUser;

        return newUser;
      });

      return Object.assign({}, state, {
        myRole: me.role,
        users: newUsers,
        roles: newRoles,
        unassignedRoles: action.roles.unassigned,
        stages: action.stages,
        allPlayersSynced: action.allPlayersSynced,
      });
    case Types.SET_ALL_PLAYERS_SYNCED:
      return Object.assign({}, state, {
        allPlayersSynced: action.allPlayersSynced,
      });
    case Types.UPDATE_CHAR_COUNTS:
      const newCharList = Object.assign({}, state.characterList, action.characterList);
      return Object.assign({}, state, {
        characterList: newCharList,
      });
    case Types.SET_CURRENT_STAGE:
      return Object.assign({}, state, {
        currentStage: action.currentStage,
        allPlayersSynced: action.allPlayersSynced,
      });
    default:
      return state;
  }
}

RoomReducer.Types = Types;

RoomReducer.Methods = {
  addUsers: (dispatch) => {
    return ( users ) => {
      dispatch({
        type: RoomReducer.Types.ADD_USERS,
        users: users,
      });
    }
  },
  removeUser: (dispatch) => {
    return ( userId ) => {
      dispatch({
        type: RoomReducer.Types.REMOVE_USER,
        userId: userId,
      });
    }
  },
  setMyId: (dispatch) => {
    return ( myId ) => {
      dispatch({
        type: RoomReducer.Types.SET_MY_ID,
        myId: myId,
      });
    }
  },
  setRolesAndStages: (dispatch) => {
    return (roles, stages, currentStage, allPlayersSynced) => { 
      dispatch({
        type: RoomReducer.Types.SET_ROLES_AND_STAGES,
        roles: roles,
        stages: stages,
        currentStage: currentStage,
        allPlayersSynced: allPlayersSynced,
      });
    }
  },
  setAllPlayersSynced: (dispatch) => {
    return ( allPlayersSynced ) => {
      dispatch({
        type: RoomReducer.Types.SET_ALL_PLAYERS_SYNCED,
        allPlayersSynced: allPlayersSynced,
      });
    }
  },
  updateOneCharCount: (dispatch) => {
    return (characterId, count) => {
      return dispatch({
        type: Types.UPDATE_CHAR_COUNTS,
        characterList: {
          [characterId]: count,
        },
      })
    }
  },
  updateCharCounts: (dispatch) => {
    return (characterList) => {
      return dispatch({
        type: Types.UPDATE_CHAR_COUNTS,
        characterList: characterList,
      })
    }
  },
  setCurrentStage: (dispatch) => {
    return (currentStage, allPlayersSynced) => {
      return dispatch({
        type: Types.SET_CURRENT_STAGE,
        currentStage: currentStage,
        allPlayersSynced: allPlayersSynced
      })
    }
  },
}

export default RoomReducer;
