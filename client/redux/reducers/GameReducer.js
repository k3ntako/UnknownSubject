import { CHARACTER_IDS } from '../../models/CharacterList';
const initialCharacterList = {};
CHARACTER_IDS.forEach( id => initialCharacterList[id] = 0 );

const Types = {
  UPDATE_CHAR_COUNTS: 'UPDATE_CHAR_COUNTS',
};

const initialState = {
  characterList: initialCharacterList,
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
