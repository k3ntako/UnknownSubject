import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import Card from './Card';
import socket from '../../socket-io';
import styles from './index.css';

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: [],
    };
  }

  componentDidMount(){
    socket.emit('playerLoaded');
  }

  onCardClick = ( userId ) => {
    this.setState((prevState) => {
      if( prevState.selected.includes(userId) ){
        // unselect
        return { selected: prevState.selected.filter(id => id !== userId) };
      }else{
        // select
        return { selected: prevState.selected.concat(userId) };
      }
    });
  }

  render(){
    const { selected } = this.state;

    return <div className={"section"}>
      <h1 className={styles.title}>Game</h1>
      <div className={styles.cards}>
        { this.props.users.map(user => <Card
          key={user.id}
          id={user.id}
          text={user.name}
          selected={selected}
          onCardClick={this.onCardClick} /> )}
      </div>
      <div className={styles.cards}>
        { this.props.unassignedRoles.map(role => <Card
          key={role.id}
          id={role.id}
          text={role.role}
          selected={selected}
          onCardClick={this.onCardClick} /> )}
      </div>
    </div>
  }
}


const mapStateToProps = function(state){
  return {
    allPlayersLoaded: state.room.allPlayersLoaded,
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
