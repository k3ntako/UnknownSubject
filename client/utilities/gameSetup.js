import GameReducer from '../redux/reducers/GameReducer';
import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

let onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };
const setOnBeginningGameCb = ( func ) => onBeginningGameCb = func;
const removeOnBeginningGameCb = () => onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };

const initialize = ( socket ) => {
  socket.on('onChangeCount', (data) => {
    GameReducer.Methods.updateOneCharCount(store.dispatch)(characterId, count);
  });

  socket.on('beginningGame', (data) => onBeginningGameCb());
  socket.on('allPlayersLoaded', (data) => {
    RoomReducer.Methods.setAllPlayersLoaded(store.dispatch)( true );
  });

}

export default initialize;
export {
  setOnBeginningGameCb,
  removeOnBeginningGameCb,
}

// leader emits beginGame
// server emits beginningGame
// players emit playerLoaded and wait for others to load
// server emits allPlayersLoaded once everyone loaded
