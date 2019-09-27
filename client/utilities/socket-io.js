import io from 'socket.io-client';
const socket = io.connect(window.location.origin);

export default socket;
