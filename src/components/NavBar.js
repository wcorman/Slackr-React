import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';
import logo from './logosvg2.svg'
import logoUnderline from './logo_underline.png'

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  }

  return (
    <main>
      <div className='logo' style={{'float':'left'}}>
      <img src ={logo} height='60' alt="Slackr Logo"/>
      <br/>
      <img className="underline" src ={logoUnderline} height='19' style={{
        position: 'absolute',
        left: '16px',
        top: '47px',
        zIndex: -1,
        }}/>

      </div>
    <nav className="NavBar" style={{height:'45px'}}>

      <NavLink className='navLinks' exact to="/">Landing Page</NavLink>
      <NavLink className='navLinks' exact to="/slacks">Slacks</NavLink>
      <NavLink className='navLinks' exact to="/trends">Trends</NavLink>
      {
        user ? (
          [ <span className='navLinks' key="1">Hello, {user.first_name}</span>
          , <a className='navLinks' key="2" href="/" onClick={handleSignOut}>Sign Out</a>
          ]
        ) : (
          <div>
          <NavLink className='navLinks' style={{
            marginRight:"13px"
          }} exact to="/sign_in">Sign In</NavLink>

          <NavLink className='navLinks' exact to="/sign_up">Sign Up</NavLink>
          </div>
        )
      }
      <CurrentDateTime />
    </nav>
  </main>
  )
}

export default NavBar;
