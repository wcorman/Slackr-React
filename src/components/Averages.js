import React from 'react';
import { Slack } from '../lib/requests';
import { Circle } from 'rc-progress';
import { Row, Col } from 'reactstrap';
import prodIcon from './prod_icon.png'
import unprodIcon from './unprod_icon.png'
import sleepIcon from './sleep_icon.png'
import happyIcon from './happy_icon.png'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Averages extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      slacks: [],
      validationErrors: [],
      averages: {}
    };
  }

  componentDidMount () {
    this.setState(),
    Slack
      .averages()
      .then(
        averagesObject => {
          console.log(averagesObject)
          this.setState({
            averages: averagesObject,
          });
        }
      );
  }

  componentDidUpdate() {
    console.log(this.state.slacks);
    Slack
      .averages()
      .then(
        averagesObject => {
          console.log(averagesObject)
          this.setState({
            averages: averagesObject,
          }
        );
      }
    );
  }

  render () {
    return (

      <Col
        md="8"
        className="Averages"
        style={{
          margin: '0 1rem',
          marginRight: '60px',
        }}
      >
        <h1 className="headings" style={{marginBottom:'35px'}}>Averages</h1>
        <Row style={{
          display: 'flex',
        }}
        >

          <Col
            style={{
            width: '225px',
            margin: '5px',
          }}
          >
            {/* <div><p>Productive Time:</p></div> */}
            <div className='averageLabel' style={{
              height: '40px',
              width: '150px',
              marginTop: '80px',
              marginLeft: '22px',
              position: 'absolute'
            }}>
              {Math.round((this.state.averages.prod_time) * 100 /100)}%
            </div>
          <Circle
            style={{height:'235px'}}
            percent={this.state.averages.prod_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="palegreen"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'28px'}} className="icons" src ={prodIcon} height='80' alt="Slackr Logo"/>
        </Col>

          <Col
            style={{
            width: '225px',
            margin: '5px',
          }}
          >
            {/* <div><p>Unproductive Time:</p></div> */}

            <div className='averageLabel' style={{
              height: '40px',
              width: '150px',
              marginTop: '80px',
              marginLeft: '22px',
              position: 'absolute'
            }}>
             {Math.round((this.state.averages.unprod_time) * 100 /100)}%
            </div>
          <Circle
            style={{height:'235px'}}
            percent={this.state.averages.unprod_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="tomato"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'28px'}} className="icons" src ={unprodIcon} height='80' alt="Slackr Logo"/>
        </Col>

          <Col
            style={{
            width: '225px',
            margin: '5px',
          }}
          >
            {/* <div><p>Sleep Quality:</p></div> */}
            <div className='averageLabel' style={{
              height: '40px',
              width: '150px',
              marginTop: '80px',
              marginLeft: '22px',
              position: 'absolute'
            }}>
               {Math.round((this.state.averages.sleep_time) * 100 /100)}%
            </div>
          <Circle
            style={{height:'235px'}}
            percent={this.state.averages.sleep_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="#15fbff"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'28px'}} className="icons" src ={sleepIcon} height='89' alt="Slackr Logo"/>

        </Col>

          <Col
            style={{
            width: '225px',
            margin: '5px',
          }}
          >
            {/* <div><p>Happy Level:</p></div> */}
            <div className='averageLabel' style={{
              height: '40px',
              width: '150px',
              marginTop: '80px',
              marginLeft: '22px',
              position: 'absolute'
            }}>
              {Math.round((this.state.averages.happy) * 100 /100)}%
            </div>
          <Circle
            style={{height:'235px'}}
            percent={this.state.averages.happy}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="#ffff66"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'28px'}} className="icons" src ={happyIcon} height='80' alt="Slackr Logo"/>
        </Col>

      </Row>
    </Col>

    );
  }
}

export default Averages;
