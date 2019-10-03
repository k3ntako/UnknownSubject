import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GameReducer from '../../redux/reducers/GameReducer';

import socket, { setOnJoinCb, removeOnJoinCb } from '../../utilities/socket-io';
import styles from './index.css';

class StartPage extends Component {
  constructor(props){
    super(props);
    const name = props.location.state && props.location.state.name || "";
    this.state = {
      isCreatingNewGame: props.location.pathname === '/create',
      name,
      roomId: "",
      requestSent: false,
      shake: false,
    }

    this.onNameChange = this.onChange.bind(this, "name");
    this.onRoomChange = this.onChange.bind(this, "roomId");
    this._nameInput = null;
    this._roomInput = null;
  }

  componentDidMount(){
    setOnJoinCb( this.onJoin );
  }

  componentWillUnmount(){
    removeOnJoinCb();
  }

  onJoin = ( data ) =>{
    if( data.success ){
      this.props.addUsers(data.room.users);
      this.props.updateCharCounts(data.room.charList);
      this.props.history.push(`/room/${data.room.id}/setup`);
    }else{
      console.error("Failed to join session", data.message) //add error banner
    }
  }

  onChange = (field, e) => {
    this.setState({ [field]: e.target.value });
  }

  onSubmit = () => {
    const submitFunc = this.state.isCreatingNewGame ? this.create : this.join;
    if( this.valid() ){
      this.setState({ requestSent: true }, submitFunc);
    }else{
      this.setState({ shake: true }, () => setTimeout(this.stopShake, 1000));
    }
  }

  stopShake = () => {
    this.setState({ shake: false });
  }

  join = () => {
    const  { name, roomId } = this.state;
    socket.emit('join', {
      name: name.trim(),
      roomId: roomId.trim(),
    });
  }

  create = () => {
    const  { name } = this.state;
    socket.emit('create', {
      name: name.trim(),
    });
  }

  valid(){
    const { isCreatingNewGame, name, roomId, requestSent } = this.state;

    if( isCreatingNewGame ){
      return !requestSent && !!(name && name.trim());
    }else{
      return !requestSent && !!(name && name.trim()) && !!(roomId && roomId.trim());
    }

  }

  nameKeyPress = (e) => {
    if( this.state.isCreatingNewGame && e.key.toLowerCase() === 'enter' ){
      this.onSubmit();
    }else if( e.key.toLowerCase() === 'enter' ){
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
    const { isCreatingNewGame, name, roomId, shake } = this.state;
    const nameShakeClass = shake && !name.trim() ? styles.shake : "";
    const roomShakeClass = shake && !roomId.trim() ? styles.shake : "";

    return <div className={styles.joinPage}>
      <div className={styles.form}>
        <div>
          <h1>Unknown Subjects</h1>
          <input
            ref={ref => this._nameInput = ref}
            type="text"
            className={nameShakeClass}
            value={name}
            onChange={this.onNameChange}
            placeholder="Your name"
            onKeyPress={this.nameKeyPress} />
          { !isCreatingNewGame && <input
            ref={ref => this._roomInput = ref}
            className={roomShakeClass}
            type="text"
            value={roomId}
            onChange={this.onRoomChange}
            placeholder="Room code"
            onKeyPress={this.roomKeyPress} /> }

          <button disabled={!this.valid()} onClick={this.onSubmit}>
            { isCreatingNewGame ? "Create!" : "Join!" }
          </button>

          { !isCreatingNewGame && <div className={styles.bottomLink}>
            <p>First one here?</p>
            <Link to={{
              pathname: "/create",
              state: { name: this.state.name },
            }}>
              Create a game!
            </Link>
          </div> }
          { isCreatingNewGame && <div className={styles.bottomLink}>
            <p>Have a room code?</p>
            <Link to={{
              pathname: "/join",
              state: { name: this.state.name },
            }}>
              Join an existing game here!
            </Link>
          </div> }
        </div>
      </div>
    </div>
  }
}


const mapDispatchToProps = function(dispatch){
  return {
    addUsers: GameReducer.Methods.addUsers(dispatch),
    updateCharCounts: GameReducer.Methods.updateCharCounts(dispatch),
  };
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(StartPage)
);
