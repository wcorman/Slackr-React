import React from 'react';
import logoShadow from './logoani.svg'
import SignInPage from './SignInPage'
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class LandingPage extends React.Component {

  createNotification = (type) => {
  return () => {
    switch (type) {
      case 'info':
        NotificationManager.info('See you tomorrow!', 'Signed Out');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
    }
  };
};

  constructor (props) {
    super(props);

    this.state = {
      slacks: [],
      validationErrors: [],
      averages: {},
      inputWidth: '',
      user: {},
      notice: {}
    };
  }

  componentDidMount () {

  }

  render () {
    const Panel = Collapse.Panel;

    function callback(key) {
      console.log(key);
    }

    const inputWidth = '75%'
    return (
      <main style={{width:'100vw', height:'100vh'}} id='landingPage'>

        <NotificationContainer/>

        <div style={{width:'62vw', minWidth:'250px',}} className="centered">

          <img style={{
            zIndex: '-1',
            width: '90%',
            minWidth: '200px',
            height: 'auto',

          }} src ={logoShadow} alt="Slackr Logo"/>
        <div style={{backgroundColor:'rgba(255,255,255, 0.1)'}}>
          <Collapse style={{alignContent:'center', fontSize:'20px', marginBottom: '20px'}}  onChange={callback}>
            <Panel  style={{backgroundColor:'rgba(255,255,255, 0.1)'}} header="Sign In" key="1">
              <SignInPage props={this.props.history}/>
            </Panel>
          </Collapse>
        </div>

          <NavLink style={{color:'#15fbff', fontSize:'20px', fontWeight:'bold', fontFamily:'Roboto', backgroundColor:'rgba(70,77,97, 0.9)'}} className='' exact to="/sign_up"><i>New to Slackr? Sign up here...</i></NavLink>
      </div>
    </main>
    );
  }
}

export default LandingPage;
