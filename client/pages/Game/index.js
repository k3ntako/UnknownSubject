import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Witness from './Characters/Witness';
import GameLayout from './GameLayout';
import Loading from '../../components/Loading';
import socket from '../../socket-io';
import styles from './index.css';
import { CHARACTER_LIST } from '../../models/CharacterList';
import NonOrderAffecting from '../../utilities/gamePlay/NonOrderAffecting';


class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      myCharacter: null,
      message: null,
      timerFinished: false,
      hasEmitted: false, // has socket.emit('playerLoaded') been emitted
    };
    this.timeLeft = 0;
    this.timer = null;
  }

  static getDerivedStateFromProps(props, state){    
    const { myRole, roles, myId } = props;
    const myCharacter = state.myCharacter;
    
    if (!myCharacter && myRole ){
      const myCharacter = CHARACTER_LIST[myRole];

      const message = NonOrderAffecting(myRole, roles, myId)
      return { message, myCharacter };
    }

    return null;
  }

  componentDidMount(){
    if (!this.state.hasEmitted && this.state.myCharacter) {
      this.setState({ hasEmitted: true }, this.playerLoaded)
    }
  }

  componentDidUpdate(){
    if (!this.state.hasEmitted && this.state.myCharacter) {
      this.setState({ hasEmitted: true }, this.playerLoaded)
    }
  }

  playerLoaded(){
    socket.emit('playerLoaded');
    this.startTimer();
  }

  startTimer = () => {
    this.timeLeft = 15;
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.forceUpdate();        
      if (this.timeLeft < 0) {
        clearInterval(this.timer);
        this.setState({ timerFinished: true });
      }
    }, 1000);
  }

  onDone = () => {    
    socket.emit('done');
  }

  render(){
    const { myCharacter, timerFinished, message, hasEmitted } = this.state;
    const { users, unassignedRoles, allPlayersLoaded } = this.props;      
    
    if (!myCharacter /*|| timerFinished*/ || !allPlayersLoaded || !hasEmitted){
      return <Loading />;
    }

    let content = null;
    console.log(myCharacter);
    
    if( myCharacter.id === "witness" ){
      content = <Witness users={users} unassignedRoles={unassignedRoles} myCharacter={myCharacter} onDone={this.onDone} />
    }

    return <GameLayout
      timeLeft={this.timeLeft && this.timeLeft + 1}
      message={message}
      myCharacterName={myCharacter.name}>
      {content}
    </GameLayout>
  }
}


const mapStateToProps = function(state){
  return {
    allPlayersLoaded: state.room.allPlayersLoaded,
    myId: state.room.myId,
    myRole: state.room.myRole,
    roles: state.room.roles,
    characterList: state.game.characterList,
    users: state.room.users,
    unassignedRoles: state.room.unassignedRoles,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(GamePage)
);
