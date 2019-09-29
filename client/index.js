import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReRouter from './ReRouter';
import Routes from './Routes';

class App extends Component {
  render () {
    return <Router>
      <ReRouter>
        <Routes />
      </ReRouter>
    </Router>
  }
}
render(<App/>, document.getElementById('app'));
