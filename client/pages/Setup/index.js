import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';
import CharacterCards from './CharacterCards';

import socket, { setOnCharListChangeCb } from '../../utilities/socket-io';
import styles from './index.css';

class SetupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomId: props.match.params.roomId, //TODO: verify that the room exists
    };
    this.onPlus = this.onChangeCount.bind(this, 1);
    this.onMinus = this.onChangeCount.bind(this, -1);
  }

  onChangeCount = ( delta, characterId ) => {
    const newCount = this.props.characterList[ characterId ] + delta;
    this.props.updateOneCharCount(characterId, newCount);

    socket.emit('changeCount', {
      characterId: characterId,
      count: newCount,
    });
  }

  render(){
    const namesArr = this.props.users.map(user => user.name);
    const names = namesArr.join(", ")

    return <div className={"section"}>
      <h1 className={styles.title}>Unknown Subject</h1>
      <div className={styles.roomId}>Room Code: <b>{this.state.roomId}</b></div>
      <div className={styles.roomId}>
        Players: { names }
      </div>
      <CharacterCards
        characterList={this.props.characterList}
        onPlus={this.onPlus}
        onMinus={this.onMinus} />
      <div className={styles.beginButtonWrapper}>
        <button onClick={this.begin}>Begin!</button>
      </div>
    </div>
  }
}


const mapStateToProps = function(state){
  return {
    characterList: state.game.characterList,
    users: state.game.users,
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
  )(SetupPage)
);
