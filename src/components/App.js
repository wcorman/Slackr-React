import React, {Component} from 'react';

import jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import SlackIndexPage from './SlackIndexPage';
import SignUpPage from './SignUpPage';
import LandingPage from './LandingPage';
import Trends from './Trends';
import NavBar from './NavBar';
import AuthRoute from './AuthRoute';
import { UnauthRoute } from 'react-router-auth'


class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      user: null,
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  };
  componentWillMount () {
    this.signIn();
  }

  signIn () {
    const jwt =  localStorage.getItem('jwt');

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }

  isSignedIn () {
    // !! to convert this.state.user into a boolean.
    return !!this.state.user;
  }

  render () {
    const { user } = this.state;
    const { slack } = this.state;

    return (
      <Router>
        <div className="App">
          <NavBar
            user={user}
            slack={slack}
            onSignOut={this.signOut}
          />
          {/*
            When wrapping routes inside of a Switch component,
            only the first Route that matches will be rendered.
          */}
          <Switch>
            <AuthRoute
              user={user}
              isAuthenticated={this.isSignedIn()}
              exact
              path="/home"
              component={SlackIndexPage}
              redirectTo="/home"

            />

            <UnauthRoute
              exact
              path="/"
              component={LandingPage}
              redirectTo="/home"
              authenticated={this.state.user}
            />

            <AuthRoute
              user={user}
              isAuthenticated={this.isSignedIn()}
              exact
              path="/trends"
              component={Trends}
            />

            <Route
              path="/sign_up"
              render={props => <SignUpPage {...props} onSignUp={this.signIn} />}
            />
          </Switch>

        </div>
      </Router>
    )
  }
}

export default App;
