const Types = {
  ADD_USERS: 'ADD_USERS',
  REMOVE_USER: 'REMOVE_USER',
  SET_ROLES: 'SET_ROLES',
  SET_ALL_PLAYERS_LOADED: 'SET_ALL_PLAYERS_LOADED',
};

const initialState = {
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
    case Types.SET_ROLES:
      const newUsers = state.users.concat().map(user => { //concat remove reference
        user.role = action.roles.assigned[ user.id ];
        return user;
      });

      return Object.assign({}, state, {
        users: newUsers,
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
