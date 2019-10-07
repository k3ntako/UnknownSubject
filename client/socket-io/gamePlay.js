import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  socket.on('allPlayersLoaded', () => {
    RoomReducer.Methods.setMyRole(store.dispatch)();
    RoomReducer.Methods.setAllPlayersLoaded(store.dispatch)( true );
  });
}

export default initialize;
