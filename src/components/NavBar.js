import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';

function NavBar (props) {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/slacks/new">New Slack</NavLink>
      <NavLink exact to="/slacks">Slacks</NavLink>
      <CurrentDateTime />
    </nav>
  )
}

export default NavBar;
