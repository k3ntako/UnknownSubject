const Types = {
  ADD_USERS: 'ADD_USERS',
  REMOVE_USER: 'REMOVE_USER',
  UPDATE_CHAR_COUNTS: 'UPDATE_CHAR_COUNTS',
};

const initialState = {
  users: [],
  characterList: {
    citizen: 0,
    jury_member: 0,
    witness: 0,
    bail_bondsman: 0,
    robber: 0,
    bob: 0,
  },
};

//Reducer
const GameReducer = (state = initialState, action) => {
  switch(action.type) {
    case Types.ADD_USERS:
      return Object.assign({}, state, {
        users: state.users.concat(action.users),
      });
    case Types.REMOVE_USER:
      return Object.assign({}, state, {
        users: state.users.filter(user => user.id !== action.userId),
      });
    case Types.UPDATE_CHAR_COUNTS:
      const newCharList = Object.assign({}, state.characterList, action.characterList);
      return Object.assign({}, state, {
        characterList: newCharList,
      });
    default:
      return state;
  }
}

GameReducer.Types = Types;

GameReducer.Methods = {
  addUsers: (dispatch) => {
    return ( users ) => {
      dispatch({
        type: GameReducer.Types.ADD_USERS,
        users: users,
      });
    }
  },
  removeUser: (dispatch) => {
    return ( userId ) => {
      dispatch({
        type: GameReducer.Types.REMOVE_USER,
        userId: userId,
      });
    }
  },
  updateOneCharCount: (dispatch) => {
    return ( characterId, count ) => {
      return dispatch({
        type: Types.UPDATE_CHAR_COUNTS,
        characterList: {
          [ characterId ]: count,
        },
      })
    }
  },
  updateCharCounts: (dispatch) => {
    return ( characterList ) => {
      return dispatch({
        type: Types.UPDATE_CHAR_COUNTS,
        characterList: characterList,
      })
    }
  },
}

export default GameReducer;
