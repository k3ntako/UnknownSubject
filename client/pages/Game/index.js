import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import Cards from './Cards';
import socket from '../../socket-io';
import styles from './index.css';

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: [],
      myRole: null,
      message: null,
    };
  }

  componentDidMount(){
    socket.emit('playerLoaded');
  }

  componentDidUpdate(prevProps, prevState){
    if( !prevProps.allPlayersLoaded && this.props.allPlayersLoaded ){
      const { myRole, roles, myId } = this.props;

      // if user is witness
      if( myRole === "witness" ){
        const message = "Go look at two unassigned cards, or one card of another player.";
        return this.setState({ message });
      }

      // if user is murderer, twin, or lookout
      let roleText = "other " + myRole;
      let users = [];

      if( myRole === "murderer" || myRole === "twin" ){
        users = roles[myRole].filter(user => user.id !== myId); //same role as user
      }else if( myRole === "lookout" ){
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

  onCardClick = ( userId ) => {
    this.setState((prevState) => {
      if( prevState.selected.includes(userId) ){
        return { selected: prevState.selected.filter(id => id !== userId) }; // unselect
      }else{
        return { selected: prevState.selected.concat(userId) }; // select
      }
    });
  }

  render(){
    const { selected, message } = this.state;
    const { users, unassignedRoles } = this.props;

    return <div className={"section"}>
      <h1 className={styles.title}>Game</h1>
      <Cards
        selected={selected}
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
