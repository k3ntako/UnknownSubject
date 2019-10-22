import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  socket.on('nextStage', (data) => {
    RoomReducer.Methods.setCurrentStage(store.dispatch)(data.currentStage, data.allPlayersSynced);
  });
}

export default initialize;
