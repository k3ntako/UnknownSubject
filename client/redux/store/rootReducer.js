import { combineReducers } from 'redux';

import RoomReducer from '../reducers/RoomReducer';

const rootReducer = combineReducers({
  room: RoomReducer,
});

export default rootReducer;
