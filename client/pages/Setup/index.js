import React, { Component } from 'react';
import CharacterCards from './CharacterCards';

import styles from './index.css';

export default class SetupPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomId: props.match.params.roomId, //TODO: verify that the room exists
      charList : {
        citizen: 0,
        jury_member: 0,
        witness: 0,
        bail_bondsman: 0,
        robber: 0,
        bob: 0,
      },
    };
  }

  onPlus = ( id ) => {
    const newCharList = Object.assign({}, this.state.charList);
    newCharList[id]++
    this.setState({ charList: newCharList });
  }

  onMinus = ( id ) => {
    const newCharList = Object.assign({}, this.state.charList);
    newCharList[id]--
    this.setState({ charList: newCharList });
  }

  render(){
    return <div className={"section"}>
      <h1 className={styles.title}>Unknown Subject</h1>
      <span className={styles.roomId}>Room Code: <b>{this.state.roomId}</b></span>
      <CharacterCards
        charList={this.state.charList}
        onPlus={this.onPlus}
        onMinus={this.onMinus} />
    </div>
  }
}
