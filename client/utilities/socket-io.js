import io from 'socket.io-client';
import users from '../models/Users';

const socket = io.connect(window.location.origin);

let onJoinCb = () => {};
const setOnJoinCb = ( func ) => onJoinCb = func;
const removeOnJoinCb = () => onJoinCb = () => {};
socket.on('onJoin', (data) => onJoinCb(data));

socket.on('userJoined', (data) => {
  users.addUsers( [data.user] );
});

socket.on('userLeft', (data) => {
  users.removeUser( data.userId );
})

export {
  socket,
  setOnJoinCb,
  removeOnJoinCb,
};
