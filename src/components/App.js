import React, { Component } from 'react';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Home from './Home';
import '../scss/app.scss';

const history = createHistory();


class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div className="app-container">
          <Route exact path="/" component={Home} />
      </div>
      </Router>
    );
  }
}

export default App;
