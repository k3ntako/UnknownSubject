import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ReRouter from './ReRouter';
import Routes from './Routes';

class App extends Component {
  render () {
    return <Router>
      <Provider store={store}>
        <ReRouter>
          <Routes />
        </ReRouter>
      </Provider>
    </Router>
  }
}
render(<App/>, document.getElementById('app'));
