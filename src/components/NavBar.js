import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  }

  return (
    <nav className="NavBar" style={{height:'50px'}}>
      <img src="./s-logo.png" style={{height:'42%'}} alt=""/>
      <NavLink exact to="/slacks">Slacks</NavLink>
      <NavLink exact to="/trends">Trends</NavLink>
      {
        user ? (
          [ <span key="1">Hello, {user.first_name}</span>
          , <a key="2" href="/sign_out" onClick={handleSignOut}>Sign Out</a>
          ]
        ) : (
          <div>
          <NavLink style={{
            marginRight:"13px"
          }} exact to="/sign_in">Sign In</NavLink>

          <NavLink exact to="/sign_up">Sign Up</NavLink>
          </div>
        )
      }
      <CurrentDateTime />
    </nav>
  )
}

export default NavBar;
