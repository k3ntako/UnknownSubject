import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import socket from './utilities/socket-io';


class ReRouter extends Component{
  constructor(props){
    super(props);
    this.state = {
      completed: false,
    };
  }

  componentDidMount(){
    const pathname = this.props.location.pathname;
    if( !pathname.includes('/start') && !socket.id ){
      this.props.history.push('/join');
    }
  }

  render(){
    return this.props.children;
  }
}

export default withRouter(ReRouter);
