import io from 'socket.io-client';
import store from '../redux/store';
import GameReducer from '../redux/reducers/GameReducer';
const addUsers = (users) => GameReducer.Methods.addUsers(store.dispatch)(users);
const removeUser = (userId) => GameReducer.Methods.removeUser(store.dispatch)(userId);
const updateOneCharCount = (characterId, count) => GameReducer.Methods.updateOneCharCount(store.dispatch)(characterId, count);

const socket = io.connect(window.location.origin);

let onJoinCb = (d) => { console.error("No onJoinCb set", d) };
const setOnJoinCb = ( func ) => onJoinCb = func;
const removeOnJoinCb = () => onJoinCb = (d) => { console.error("No onJoinCb set", d) };
socket.on('onJoin', (data) => onJoinCb(data));

socket.on('userJoined', (data) => {
  addUsers( [ data.user ] );
});

socket.on('userLeft', (data) => {
  removeUser( data.userId );
});

socket.on('onChangeCount', (data) => updateOneCharCount(data.characterId, data.count));

export {
  socket,
  setOnJoinCb,
  removeOnJoinCb,
};
