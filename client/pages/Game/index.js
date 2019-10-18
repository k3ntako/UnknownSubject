import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import Cards from './Cards';
import socket from '../../socket-io';
import styles from './index.css';
import { CHARACTER_LIST } from '../../models/CharacterList';
import { runInThisContext } from 'vm';

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
    };
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

      // if user is witness
      if( myRole === "witness" ){
        const message = "Go look at two unassigned cards, or one card of another player.";
        return this.setState({ message });
      }

      // if user is murderer, twin, or lawyer
      let roleText = "other " + myRole;
      let users = [];

      if( myRole === "murderer" || myRole === "twin" ){
        users = roles[myRole].filter(user => user.id !== myId); //same role as user
      }else if( myRole === "lawyer" ){
        roleText = "murderer"
        users = roles.murders;
      }

      if( !users.length ){
        const message = `There is no ${roleText}.`;
        return this.setState({ message });
      }

      const names = users.map(user => user.name).join(", ");

      const isPlural = users.length !== 1;
      roleText += isPlural ? "s are" : " is";

      const message = `The ${roleText} ${names}`;
      this.setState({ message });
    }
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

  render(){
    const { myCharacter, assignedSelected, unassignedSelected, selectAssignedMax, selectUnassignedMax } = this.state;
    const { users, unassignedRoles, myRole } = this.props;        

    if (!myRole || !myCharacter ){
      return <div>
        Loading...
      </div>
    }
    
    

    return <div className={"section"}>
      <h1 className={styles.title}>Unknown Subject</h1>
      <h3 className={styles.title}>Your Role: {myCharacter.name}</h3>
      <Cards
        assignedSelected={assignedSelected}
        unassignedSelected={unassignedSelected}
        selectAssignedMax={selectAssignedMax}
        selectUnassignedMax={selectUnassignedMax}
        users={users}
        unassignedRoles={unassignedRoles}
        onCardClick={this.onCardClick}/>
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
