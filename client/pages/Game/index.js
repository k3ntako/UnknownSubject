import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import Card from './Card';
import socket from '../../utilities/socket-io';
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
        return { selected: prevState.selected.filter(id => id !== userId) };
      }else{
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
          user={user}
          selected={selected}
          onCardClick={this.onCardClick} />) }
      </div>
    </div>
  }
}


const mapStateToProps = function(state){
  return {
    allPlayersLoaded: state.room.allPlayersLoaded,
    characterList: state.game.characterList,
    users: state.room.users,
  }
}

// const mapDispatchToProps = function(dispatch){
//   return {
//
//   };
// }

export default withRouter(
  connect(
    mapStateToProps,
    // mapDispatchToProps
    null
  )(GamePage)
);