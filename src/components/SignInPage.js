import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SlackIndexPage from "./SlackIndexPage";
import { Token } from '../lib/requests';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormErrors from './FormErrors';

class SignInPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: []
    };
    this.createToken = this.createToken.bind(this);
  }

  createToken (event) {
    event.preventDefault();

    const { onSignIn = () => {} } = this.props;
    const formData = new FormData(event.currentTarget);

    Token
      .create({
        email: formData.get('email'),
        password: formData.get('password')
      })
      .then(data => {
        if (!data.error) {
          localStorage.setItem('jwt', data.jwt);
          onSignIn()
          // .history is only available on props
          // because this component is rendered by a
          // route component.
          // (i.e. <Route route="/sign_in" component={SignInPage} />)
          window.location.href = 'http://localhost:3001/slacks'
        } else {
          this.setState({
            errors: [{
              message: 'Invalid username and/or password!'
            }]
          })
        }
      })
  }

  render () {
    const { errors } = this.state;

    return (
      <main
        className="SignInPage"
        style={{margin: '0 1rem', marginRight:'20px'}}
      >
        {
          errors.map(
            (e, i) => <div className="alert" key={i}>{e.message}</div>
          )
        }
        <form onSubmit={this.createToken}>
          <div>
            <label style={{color:'black'}} htmlFor='email'>Email</label> <br />
            <input style={{color:'black', width:'50%', minWidth:'205px'}} type='email' id='email' name='email'/>
          </div>
          <br/>
          <div>
            <label style={{color:'black'}} htmlFor='password'>Password</label> <br />
            <input style={{color:'black', width:'50%', minWidth:'205px'}} type='password' id='password' name='password' />
          </div>
          <br/>

          <div>
            <MuiThemeProvider>
            <RaisedButton label="Sign In" primary={true} style={{color:'black'}} type='submit' value='Sign In'>
            </RaisedButton>
            </MuiThemeProvider>
          </div>
        </form>
      </main>
    )
  }
}

export default SignInPage;
