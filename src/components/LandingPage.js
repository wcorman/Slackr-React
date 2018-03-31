import React from 'react';
import ReactDOM from 'react-dom';
import logoShadow from './logosvgShadow.svg'
import logoUnderline from './logo_underline.png'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import { Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { Token } from '../lib/requests';
import { NavLink } from 'react-router-dom';


class LandingPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      slacks: [],
      validationErrors: [],
      averages: {},
      inputWidth: '',
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

        <div style={{width:'63vw', minWidth:'250px',}} className="centered">
          <img style={{
            zIndex: '-1',
            width: '90%',
            minWidth: '150px',
            height: 'auto',
          }} src ={logoShadow} alt="Slackr Logo"/>

          <Collapse style={{alignContent:'center', fontSize:'20px', marginBottom: '20px'}}  onChange={callback}>
            <Panel  header="Sign In" key="1">
              <SignInPage props={this.props.history}/>
            </Panel>
          </Collapse>
          <NavLink style={{color:'#15fbff', fontSize:'20px', fontFamily:'Roboto'}} className='' exact to="/sign_up">New to Slackr? Sign up here...</NavLink>

      </div>

    );
  }
}

export default LandingPage;
