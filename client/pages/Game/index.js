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
    };
  }

  componentDidMount(){
    socket.emit('playerLoaded');
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
    const { selected } = this.state;
    const { users, unassignedRoles } = this.props;

    return <div className={"section"}>
      <h1 className={styles.title}>Game</h1>
      <Cards
        selected={selected}
        users={users}
        unassignedRoles={unassignedRoles}
        onCardClick={this.onCardClick}/>
      <OverlayMessage />
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
