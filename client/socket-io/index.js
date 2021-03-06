import io from 'socket.io-client';

const socket = io.connect(window.location.origin);

import initializeUserInitialization from './userInitialization';
initializeUserInitialization( socket );
export { setOnJoinCb, removeOnJoinCb } from './userInitialization';

import initializeUserDisconnection from './userDisconnection';
initializeUserDisconnection( socket );

import initializeGameSetup from './gameSetup';
initializeGameSetup( socket );
export { setOnBeginningGameCb, removeOnBeginningGameCb } from './gameSetup';

import initializeGamePlay from './gamePlay';
initializeGamePlay( socket );


export default socket;
