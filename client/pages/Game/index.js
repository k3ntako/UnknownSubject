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
    } else if (this.props.currentStage === "1000=done"){      
      const roomId = this.props.match.params.roomId;
      this.props.history.push(`/room/${roomId}/done`);
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  playerLoaded(){
    socket.emit('stageDone', {
      stageFinished: this.props.currentStage,
    });
    this.startTimer();
  }

  startTimer = () => {    
    this.timeLeft = 15;
    this.timer = setInterval(() => {      
      this.timeLeft--;
      this.forceUpdate();        
      if (this.timeLeft < 0) {
        this.onDone();
      }
    }, 1000);
  }

  onDone = () => {
    clearInterval(this.timer);
    this.timeLeft = 0;

    socket.emit('stageDone', {
      stageFinished: this.props.currentStage,
    });

    this.setState({ timerFinished: true });
  }

  render(){
    const { myCharacter, timerFinished, message, hasEmitted } = this.state;
    const { users, unassignedRoles, allPlayersSynced } = this.props;      
    
    if (!myCharacter /*|| timerFinished*/ || !allPlayersSynced || !hasEmitted){
      return <Loading />;
    }

    let content = null;
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
    allPlayersSynced: state.room.allPlayersSynced,
    myId: state.room.myId,
    myRole: state.room.myRole,
    roles: state.room.roles,
    users: state.room.users,
    unassignedRoles: state.room.unassignedRoles,
    stages: state.room.stages,
    currentStage: state.room.currentStage,
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(GamePage)
);
