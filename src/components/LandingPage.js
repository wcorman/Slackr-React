import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logosvg.svg'
import SignInPage from './SignInPage'
import { Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Collapse } from 'antd';
import 'antd/dist/antd.css';
import { Token } from '../lib/requests';


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

    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;
    const inputWidth = '75%'
    return (

        <div style={{width:'63vw'}} className="centered">
          <img style={{
            zIndex: '-1',
            // height: '100%',
            width: '90%',
            height: 'auto',
            position: 'absolute',
            top: '-265px',
            // left: '-400px',
          }} src ={logo} alt="Slackr Logo"/>
        <div style={{
          zIndex: '-1',
          width: '75%',
          height: 'auto',
          opacity: '0.8',
          fontFamily: 'Patua One',
          fontSize: '25px',
          position: 'absolute',
          top: '-30px',
          // left: '95px',
        }}>
          <Collapse  onChange={callback}>
            <Panel  header="Sign In" key="1">
              <SignInPage props={this.props.history}/>
            </Panel>
          </Collapse>
        </div>

      </div>

    );
  }
}

export default LandingPage;
