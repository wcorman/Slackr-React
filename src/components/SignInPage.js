import React, { Component } from 'react';
import ReactDOM from "react-dom";
import SlackIndexPage from "./SlackIndexPage";
import { Token } from '../lib/requests';

class SignInPage extends Component {
  constructor (props) {
    super(props);

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
        }
      })
  }

  render () {
    return (
      <main
        className="SignInPage"
        style={{margin: '0 1rem'}}
      >
        <form onSubmit={this.createToken}>
          <div>
            <label style={{color:'black'}} htmlFor='email'>Email</label> <br />
            <input type='email' id='email' name='email'/>
          </div>

          <div>
            <label style={{color:'black'}} htmlFor='password'>Password</label> <br />
            <input style={{color:'black'}} type='password' id='password' name='password' />
          </div>
          <br/>

          <div>
            <input style={{color:'black'}} type='submit' value='Sign In'/>
          </div>
        </form>
      </main>
    )
  }
}

export default SignInPage;
