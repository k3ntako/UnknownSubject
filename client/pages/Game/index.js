import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import socket from '../../utilities/socket-io';
import styles from './index.css';

class GamePage extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    socket.emit('playerLoaded');
  }

  render(){
    return <div className={"section"}>
      <h1 className={styles.title}>Game</h1>
      { `${this.props.allPlayersLoaded}` }
    </div>
  }
}


const mapStateToProps = function(state){
  return {
    allPlayersLoaded: state.room.allPlayersLoaded
    // characterList: state.game.characterList,
    // users: state.room.users,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    updateOneCharCount: GameReducer.Methods.updateOneCharCount(dispatch),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(GamePage)
);
