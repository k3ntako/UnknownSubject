import { combineReducers } from 'redux';

import GameReducer from '../reducers/GameReducer';

const rootReducer = combineReducers({
  game: GameReducer
});

export default rootReducer;
