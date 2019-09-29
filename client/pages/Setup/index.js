import React, { Component } from 'react';
import CharacterCards from './CharacterCards';

import { socket, setOnCharListChangeCb } from '../../utilities/socket-io';
import game from './../../models/Game';
import styles from './index.css';

export default class SetupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomId: props.match.params.roomId, //TODO: verify that the room exists
    };
    this.onPlus = this.onChangeCount.bind(this, 1);
    this.onMinus = this.onChangeCount.bind(this, -1);
  }

  componentDidMount(){
    game.setOnUpdateCb(this.forceUpdate.bind(this));
  }

  componentWillUnmount(){
    game.removeOnUpdateCb();
  }

  onChangeCount = ( delta, characterId ) => {
    game.onChangeCount(characterId, game.charList[characterId] + delta);
    socket.emit('changeCount', {
      characterId: characterId,
      count: game.charList[characterId],
    });
  }

  render(){
    const namesArr = game.users.map(user => user.name);
    const names = namesArr.join(", ")

    return <div className={"section"}>
      <h1 className={styles.title}>Unknown Subject</h1>
      <div className={styles.roomId}>Room Code: <b>{this.state.roomId}</b></div>
      <div className={styles.roomId}>
        Players: { names }
      </div>
      <CharacterCards
        charList={game.charList}
        onPlus={this.onPlus}
        onMinus={this.onMinus} />
    </div>
  }
}
