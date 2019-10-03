import io from 'socket.io-client';

const socket = io.connect(window.location.origin);

import initializeUserInitialization from './userInitialization';
initializeUserInitialization( socket );

import initializeUserDisconnection from './userDisconnection';
initializeUserDisconnection( socket );

import initializeGameSetup from './gameSetup';
initializeGameSetup( socket );


export default socket;

export { setOnJoinCb, removeOnJoinCb } from './userInitialization';
