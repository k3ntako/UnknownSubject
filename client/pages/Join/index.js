import React, { Component } from 'react';

import styles from './index.css';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      room: "",
    }

    this.onNameChange = this.onChange.bind(this, "name");
    this.onRoomChange = this.onChange.bind(this, "room");
  }

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  }

  render(){
    const { name, room } = this.state;
    return <div className={styles.joinPage}>
      <div className={styles.form}>
        <input type="text" value={name} onChange={this.onNameChange} placeholder="Your name"/>
        <input type="text" value={room} onChange={this.onRoomChange} placeholder="Room code"/>
        <button>Join!</button>
      </div>
    </div>
  }
}
