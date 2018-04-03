import React from 'react';
import { Slack } from '../lib/requests';
import { Circle } from 'rc-progress';
import { Container, Row, Col } from 'reactstrap';
// import prodIcon from './prod_icon.png'
import foodIcon from './food-icon.png'
import slackingIcon from './slacking-icon.png'
import sleepIcon from './sleep_icon.png'
import happyIcon from './happy_icon.png'


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
          this.setState({
            averages: averagesObject,
          });
        }
      );
  }

  componentDidUpdate() {
    Slack
      .averages()
      .then(
        averagesObject => {
          this.setState({
            averages: averagesObject,
          }
        );
      }
    );
  }

  render () {
    return (
      <Container>

      <Col
        md="auto"
        sm='auto'
        className="Averages"
        style={{
          margin: '0 3rem',
          marginRight: '0px',
        }}
      >
        <h1 className="headings" style={{marginBottom:'15px', marginLeft:'40px'}}>Averages</h1>
        <Row id='averages'>

          <Col
            md="auto"
            sm='auto'
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
              {Math.round((this.state.averages.unprod_time) * 100 /100)}%
            </div>
          <Circle
            md="auto"
            sm='auto'
            style={{height:'235px'}}
            percent={this.state.averages.unprod_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="tomato"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'38px', marginLeft: '50px'}} className="icons" src ={slackingIcon} height='75' alt="Slackr Logo"/>
        </Col>

          <Col
            md="auto"
            sm='auto'
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
            strokeColor="palegreen"
            trailColor='rgba(255, 255, 255, 0.3)'
          />
          <img style={{marginTop:'28px', marginLeft: '45px'}} className="icons" src ={foodIcon} height='85' alt="Slackr Logo"/>
        </Col>

          <Col
            md="auto"
            sm='auto'
            xs='auto'
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
          <img style={{marginTop:'28px', marginLeft: '45px'}} className="icons" src ={sleepIcon} height='89' alt="Slackr Logo"/>

        </Col>

          <Col
            md="auto"
            sm='auto'
            xs='12'
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
          <img style={{marginTop:'28px', marginLeft: '43px'}} className="icons" src ={happyIcon} height='80' alt="Slackr Logo"/>
        </Col>

      </Row>
    </Col>
  </Container>

    );
  }
}

export default Averages;
