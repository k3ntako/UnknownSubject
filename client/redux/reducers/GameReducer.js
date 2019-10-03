const Types = {
  UPDATE_CHAR_COUNTS: 'UPDATE_CHAR_COUNTS',
};

const initialState = {
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
