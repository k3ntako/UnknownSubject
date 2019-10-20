import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Cards from './Cards';
import Loading from './Loading';
import socket from '../../socket-io';
import styles from './index.css';
import { CHARACTER_LIST } from '../../models/CharacterList';
import NonOrderAffecting from './NonOrderAffecting';

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      myCharacter: null,
      message: null,
      selectAssignedMax: 0,
      selectUnassignedMax: 0,
      assignedSelected: [],
      unassignedSelected: [],
      timerFinished: false,
    };
    this.timeLeft = 0;
    this.timer = null;
  }

  componentDidMount(){
    socket.emit('playerLoaded');
  }

  componentDidUpdate(prevProps, prevState){
    const { myRole } = this.props;

    if (!this.state.myCharacter && myRole ){
      const myCharacter = CHARACTER_LIST[myRole];

      this.setState({ 
        myCharacter,
        selectAssignedMax: (myCharacter.action && myCharacter.action.select && myCharacter.action.select.selectAssigned) || 0,
        selectUnassignedMax: (myCharacter.action && myCharacter.action.select && myCharacter.action.select.selectUnassigned) || 0,
      });
    }

    if( !prevProps.allPlayersLoaded && this.props.allPlayersLoaded ){
      const { roles, myId } = this.props;
      const message = NonOrderAffecting(myRole, roles, myId)
      this.setState({ message }, this.startTimer);
    }
  }

  startTimer(){
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

  onCardClick = (cardType, id) => { //id can be card id (unassigned cards) or userId (assigned cards)
    const { selectAssignedMax, selectUnassignedMax } = this.state;
    const selectMaxNum = cardType === "assigned" ? selectAssignedMax : selectUnassignedMax;
    if (!selectMaxNum){
      return;
    }

    const key = cardType + "Selected";
    const otherKey = cardType === "assigned" ? "unassignedSelected" : "assignedSelected";
    this.setState((prevState) => {
      // unselect card
      if ( prevState[key].includes(id) ){
        return { [key]: prevState[key].filter(selectedId => selectedId !== id) };
      }

      // select card
      if (this.state[key].length < selectMaxNum){
        return { 
          [key]: prevState[key].concat(id),
          [otherKey]: [],
        };
      }
    });
  }

  onDone = () => {    
    socket.emit('done');
  }

  render(){
    const { myCharacter, assignedSelected, unassignedSelected, selectAssignedMax, selectUnassignedMax, timerFinished, message } = this.state;
    const { users, unassignedRoles, myRole } = this.props;       

    if (!myRole || !myCharacter /*|| timerFinished*/ ){
      return <Loading />;
    }

    return <div className={"section"}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Unknown Subject</h1>
          <div className={styles.role}>Your Role: {myCharacter.name}</div>
        </div>
        <h1>
          {this.timer && (this.timeLeft + 1)}
        </h1>
      </div>
      <div className={styles.instruction}> { message } </div>
      <Cards
        assignedSelected={assignedSelected}
        unassignedSelected={unassignedSelected}
        selectAssignedMax={selectAssignedMax}
        selectUnassignedMax={selectUnassignedMax}
        users={users}
        unassignedRoles={unassignedRoles}
        onCardClick={this.onCardClick}
        onDone={this.onDone}/>
    </div>
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
