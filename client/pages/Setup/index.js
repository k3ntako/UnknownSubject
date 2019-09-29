import React, { Component } from 'react';
import CharacterCards from './CharacterCards';

import users from './../../models/Users';
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

  componentDidMount(){
    users.setOnUpdateCb(this.forceUpdate.bind(this));
  }

  componentWillUnmount(){
    users.removeOnUpdateCb();
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
    const namesArr = users.users.map(user => user.name);
    const names = namesArr.join(", ")

    return <div className={"section"}>
      <h1 className={styles.title}>Unknown Subject</h1>
      <div className={styles.roomId}>Room Code: <b>{this.state.roomId}</b></div>
      <div className={styles.roomId}>
        Players: { names }
      </div>
      <CharacterCards
        charList={this.state.charList}
        onPlus={this.onPlus}
        onMinus={this.onMinus} />
    </div>
  }
}
