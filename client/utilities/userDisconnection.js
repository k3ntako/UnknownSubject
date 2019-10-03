import GameReducer from '../redux/reducers/GameReducer';
import store from '../redux/store';

const initialize = ( socket ) => {
  const removeUser = (userId) => GameReducer.Methods.removeUser(store.dispatch)(userId);

  socket.on('userLeft', (data) => {
    removeUser( data.userId );
  });
}

export default initialize;
