import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RoomReducer from '../../redux/reducers/RoomReducer';
import CharacterCards from './CharacterCards';

import socket, { setOnBeginningGameCb, removeOnBeginningGameCb } from '../../socket-io';
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

  componentDidMount(){
    setOnBeginningGameCb(this.onBeginningGame);
  }

  componentWillUnmount(){
    removeOnBeginningGameCb();
  }

  onChangeCount = ( delta, characterId ) => {
    const newCount = this.props.characterList[ characterId ] + delta;
    this.props.updateOneCharCount(characterId, newCount);

    socket.emit('changeCount', {
      characterId: characterId,
      count: newCount,
    });
  }

  begin = () => {
    socket.emit('beginGame');
  }

  onBeginningGame = () => {
    this.props.history.push(`/room/${this.state.roomId}/game`);
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
    characterList: state.room.characterList,
    users: state.room.users,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    updateOneCharCount: RoomReducer.Methods.updateOneCharCount(dispatch),
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SetupPage)
);
