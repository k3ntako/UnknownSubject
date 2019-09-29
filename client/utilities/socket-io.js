import io from 'socket.io-client';
import game from '../models/Game';

const socket = io.connect(window.location.origin);

let onJoinCb = (d) => { console.error("No onJoinCb set", d) };
const setOnJoinCb = ( func ) => onJoinCb = func;
const removeOnJoinCb = () => onJoinCb = (d) => { console.error("No onJoinCb set", d) };
socket.on('onJoin', (data) => onJoinCb(data));

socket.on('userJoined', (data) => {
  game.addUsers( [data.user] );
});

socket.on('userLeft', (data) => {
  game.removeUser( data.userId );
});

socket.on('onChangeCount', (data) => game.onChangeCount(data.characterId, data.count));

export {
  socket,
  setOnJoinCb,
  removeOnJoinCb,
};
