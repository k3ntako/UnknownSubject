import RoomReducer from '../redux/reducers/RoomReducer';
import store from '../redux/store';

let onJoinCb = (d) => { console.error("No onJoinCb set", d) };
const setOnJoinCb = ( func ) => onJoinCb = func;
const removeOnJoinCb = () => onJoinCb = (d) => { console.error("No onJoinCb set", d) };

const initialize = ( socket ) => {
  const addUsers = (users) => RoomReducer.Methods.addUsers(store.dispatch)(users);

  socket.on('onJoin', (data) => onJoinCb(data));

  socket.on('userJoined', (data) => {
    addUsers( [ data.user ] );
  });
}

export default initialize;
export {
  setOnJoinCb,
  removeOnJoinCb,
}
