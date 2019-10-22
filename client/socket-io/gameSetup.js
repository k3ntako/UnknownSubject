import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

let onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };
const setOnBeginningGameCb = ( func ) => onBeginningGameCb = func;
const removeOnBeginningGameCb = () => onBeginningGameCb = (d) => { console.error("No onBeginningGameCb set", d) };

const initialize = ( socket ) => {
  socket.on('onChangeCount', (data) => {
    RoomReducer.Methods.updateOneCharCount(store.dispatch)(data.characterId, data.count);
  });

  socket.on('beginningGame', (data) => {
    RoomReducer.Methods.setRolesAndStages(store.dispatch)( data.roles, data.stages, data.currentStage );
    onBeginningGameCb();
  });
}

export default initialize;
export {
  setOnBeginningGameCb,
  removeOnBeginningGameCb,
}
