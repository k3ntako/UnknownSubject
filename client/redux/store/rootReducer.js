import { combineReducers } from 'redux';

import GameReducer from '../reducers/GameReducer';
import RoomReducer from '../reducers/RoomReducer';

const rootReducer = combineReducers({
  game: GameReducer,
  room: RoomReducer,
});

export default rootReducer;
