import GameReducer from '../redux/reducers/GameReducer';
import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

let onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };
const setOnBeginningGameCb = ( func ) => onBeginningGameCb = func;
const removeOnBeginningGameCb = () => onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };

const initialize = ( socket ) => {
  socket.on('onChangeCount', (data) => {
    GameReducer.Methods.updateOneCharCount(store.dispatch)(data.characterId, data.count);
  });

  socket.on('beginningGame', (data) => {
    RoomReducer.Methods.setRoles(store.dispatch)( data.roles );
    onBeginningGameCb();
  });
}

export default initialize;
export {
  setOnBeginningGameCb,
  removeOnBeginningGameCb,
}
