import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logosvg.svg'
import homeLogo from './home.png'
import trendLogo from './trend.png'
import logoUnderline from './logo_underline.png'
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';

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
              <nav className="NavBar" style={{height:'55px'}}>

                <NavLink className='navLinks' exact to="/slacks"><img src ={homeLogo} height='37' alt="Slackr Logo"/></NavLink>
                <NavLink className='navLinks center' exact to="/trends"><img src ={trendLogo} height='39' alt="Slackr Logo"/></NavLink>

                  <a style={{marginRight:'15px'}} className='nameplace' key="1">Hello, {user.first_name}</a>
                <a style={{marginRight:'10px'}} className='navLinks' key="2" href="/" onClick={handleSignOut}><i style={{fontSize:'18px'}}>Sign Out</i></a>
              </nav>

            </div>

          ]
          ) : (

            //If no user signed in, navbar doesn't show
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
