import { CHARACTER_IDS } from '../../models/CharacterList';

const Types = {
  ADD_USERS: 'ADD_USERS',
  REMOVE_USER: 'REMOVE_USER',
  SET_MY_ID: 'SET_MY_ID',
  SET_MY_ROLE: 'SET_MY_ROLE',
  SET_ROLES: 'SET_ROLES',
  SET_ALL_PLAYERS_LOADED: 'SET_ALL_PLAYERS_LOADED',
};

const initialRoles = () => {
  const initialRolesObj = {};
  CHARACTER_IDS.forEach(id => initialRolesObj[id] = []);
  return initialRolesObj;
}

const initialState = {
  myId: null,
  myRole: null,
  roles: initialRoles(),
  users: [],
  unassignedRoles: [],
  allPlayersLoaded: false,
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
    case Types.SET_MY_ROLE:
      const me = state.users.find(user => user.id === state.myId);
      return Object.assign({}, state, {
        myRole: me.role,
      });
    case Types.SET_ROLES:
      const newRoles = initialRoles(); //remove reference
      const newUsers = state.users.concat().map(user => { //concat remove reference
        const roleId = action.roles.assigned[ user.id ];
        user.role = roleId;
        newRoles[roleId].push( user )
        return user;
      });

      return Object.assign({}, state, {
        users: newUsers,
        roles: newRoles,
        unassignedRoles: action.roles.unassigned
      });
    case Types.SET_ALL_PLAYERS_LOADED:
      return Object.assign({}, state, {
        allPlayersLoaded: action.allPlayersLoaded,
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
  setMyRole: (dispatch) => {
    return () => {
      dispatch({
        type: RoomReducer.Types.SET_MY_ROLE,
      });
    }
  },
  setRoles: (dispatch) => {
    return ( roles ) => {
      dispatch({
        type: RoomReducer.Types.SET_ROLES,
        roles: roles,
      });
    }
  },
  setAllPlayersLoaded: (dispatch) => {
    return ( allPlayersLoaded ) => {
      dispatch({
        type: RoomReducer.Types.SET_ALL_PLAYERS_LOADED,
        allPlayersLoaded: allPlayersLoaded,
      });
    }
  },
}

export default RoomReducer;
