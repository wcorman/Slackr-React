import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logosvg.svg'
import logoUnderline from './logo_underline.png'

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
    window.location.href = ('http://localhost:3001/')
  }

  return (
    <main>
      {
        user ? (
          [
            <div>
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
                {/* <div style={{textAlign: 'center'}}>
                  <h3 className='navLinks' key="1">Hello, {user.first_name}</h3>
                </div> */}

                <NavLink className='navLinks' exact to="/slacks">Home</NavLink>
                <NavLink className='navLinks' exact to="/trends">Trends</NavLink>
                <a className='navLinks' key="2" href="/" onClick={handleSignOut}><i>Sign Out</i></a>
              </nav>

            </div>

          ]
          ) : (
<div></div>
          )
        }
      {/* <div className='logo' style={{'float':'left'}}>
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

            <span className='navLinks' key="1">Hello, {user.first_name}</span>
          , <a className='navLinks' key="2" href="/" onClick={handleSignOut}>Sign Out</a>

          <div>
          <NavLink className='navLinks' style={{
            marginRight:"13px"
          }} exact to="/sign_in">Sign In</NavLink>

          <NavLink className='navLinks' exact to="/sign_up">Sign Up</NavLink>
          </div>

      }
      <CurrentDateTime />
    </nav> */}
  </main>
  )
}

export default NavBar;
