import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  socket.on('allPlayersLoaded', () => {
    RoomReducer.Methods.setAllPlayersLoaded(store.dispatch)( true );
  });

  socket.on('nextStage', (data) => {
    RoomReducer.Methods.setCurrentStage(store.dispatch)(data.currentStage);
  });
}

export default initialize;
