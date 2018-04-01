import React from 'react';
import { User } from '../lib/requests';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormErrors from './FormErrors';
import { NavLink } from 'react-router-dom';
import logo from './logosvg.svg'
import logoUnderline from './logo_underline.png'

function SignUpPage(props) {
  const { onSignUp = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    User.create({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation')
    }).then(data => {
      if (!data.error) {
        const jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        onSignUp();
        props.history.push('/slacks');
      }
    });
  }

  return (
  <main>
    <div className='logo' style={{}}>
    <img src ={logo} height='60' alt="Slackr Logo"/>
    <br/>
    <img className="underline" src ={logoUnderline} height='19' style={{
      position: 'absolute',
      left: '16px',
      top: '47px',
      zIndex: -1,
      }}/>
    </div>
    <div
      className="SignInPage centered"
      style={{margin: '0 1rem', width:'40vw', borderRadius:'20px', padding:'25px', top: "43%"
    }}
      >

      <h2 style={{
        color:'white'
      }}>Sign Up</h2>
      <br/>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <br/>
          <input className="signUpInput" name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <br/>
          <input className="signUpInput"  name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br/>
          <input className="signUpInput" type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br/>
          <input className="signUpInput" type="password" name="password" id="password" />
        </div>
        <div>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <br/>
          <input className="signUpInput" type="password" name="password_confirmation" id="password_confirmation" />
        </div>
        <br/>
        <MuiThemeProvider>
          <RaisedButton label="Sign Up" primary={true} style={{color:'black', width:'25%', marginBottom:'15px'}} type="submit" value="Sign Up" />
        </MuiThemeProvider>
        <br/>
        <NavLink style={{color:'#15fbff', fontSize:'16px', fontFamily:'Roboto'}} className='' exact to="/"><i>Already have an account?</i></NavLink>

      </form>
    </div>
  </main>
  );
}

export default SignUpPage;
