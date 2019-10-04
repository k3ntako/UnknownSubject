import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  const removeUser = (userId) => RoomReducer.Methods.removeUser(store.dispatch)(userId);

  socket.on('userLeft', (data) => {
    removeUser( data.userId );
  });
}

export default initialize;
