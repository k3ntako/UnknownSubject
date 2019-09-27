import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import socket from '../../utilities/socket-io';
import styles from './index.css';

class Join extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      room: "",
      joining: false,
      shake: false,
    }

    this.onNameChange = this.onChange.bind(this, "name");
    this.onRoomChange = this.onChange.bind(this, "room");
    this._nameInput = null;
    this._roomInput = null;
  }

  componentDidMount(){
    socket.on('onJoin', (data) => {
      if( data.success ){
        this.props.history.push('/home');
      }else{
        console.error("Failed to join session") //add error banner
      }
    });
  }

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  }

  onSubmit = () => {
    if( this.valid() ){
      this.setState({ joining: true }, this.join);
    }else{
      this.setState({ shake: true }, () => setTimeout(this.stopShake, 1000));
    }
  }

  stopShake = () => {
    this.setState({ shake: false });
  }

  join = () => {
    const  { name, room } = this.state;
    socket.emit('join', {
      name: name.trim(),
      room: room.trim(),
    });
  }

  valid(){
    const { name, room, joining } = this.state;

    return !joining && !!(name && name.trim()) && !!(room && room.trim());
  }

  nameKeyPress = (e) => {
    if( e.key.toLowerCase() === 'enter'){
      this._roomInput.focus()
    }
  }

  roomKeyPress = (e) => {
    if( e.shiftKey && e.key.toLowerCase() === 'enter'){
      this._nameInput.focus()
    }else if( e.key.toLowerCase() === 'enter'){
      this.onSubmit();
    }
  }

  render(){
    const { name, room, shake } = this.state;
    const nameShakeClass = shake && !name.trim() ? styles.shake : "";
    const roomShakeClass = shake && !room.trim() ? styles.shake : "";

    return <div className={styles.joinPage}>
      <div className={styles.form}>
        <input
          ref={ref => this._nameInput = ref}
          type="text"
          className={nameShakeClass}
          value={name}
          onChange={this.onNameChange}
          placeholder="Your name"
          onKeyPress={this.nameKeyPress} />
        <input
          ref={ref => this._roomInput = ref}
          className={roomShakeClass}
          type="text"
          value={room}
          onChange={this.onRoomChange}
          placeholder="Room code"
          onKeyPress={this.roomKeyPress} />
        <button disabled={!this.valid()} onClick={this.onSubmit}>Join!</button>
      </div>
    </div>
  }
}

export default withRouter(Join);
