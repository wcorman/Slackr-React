import React, { Component } from 'react';
import { Slack } from '../lib/requests';
import { Circle } from 'rc-progress';
import { Container, Row, Col } from 'reactstrap';


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

  render () {
    const { slacks } = this.state;

    return (

      <main
        className="Averages"
        style={{
          margin: '0 1rem',
          width: '1200px'
        }}
      >
        <h1>Averages</h1>
        <Row style={{
          display: 'flex',
        }}
        >
          <Col style={{
            width: '400px',
            margin: '15px',
          }}
          >
            Productive: {Math.round((this.state.averages.prod_time) * 100 /100)}%
          </Col>

          <Col style={{
            width: '400px',
            margin: '15px',
          }}
          >
            Unproductive: {Math.round((this.state.averages.unprod_time) * 100 /100)}%
          </Col>

          <Col style={{
            width: '400px',
            margin: '15px',
          }}
          >
            Sleep Time: {Math.round((this.state.averages.sleep_time) * 100 /100)}%
          </Col>

          <Col style={{
            width: '400px',
            margin: '15px',
          }}
          >
            Happy Level: {Math.round((this.state.averages.happy) * 100 /100)}%
          </Col>

        </Row>


        <Row style={{
          display: 'flex',
        }}
        >
          <Col style={{
            width: '225px',
            margin: '5px',
          }}
          >
          <Circle
            percent={this.state.averages.prod_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="palegreen"
          />
        </Col>

          <Col style={{
            width: '225px',
            margin: '5px',
          }}
          >
          <Circle
            percent={this.state.averages.unprod_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="palegreen"
          />
        </Col>

          <Col style={{
            width: '225px',
            margin: '5px',
          }}
          >
          <Circle
            percent={this.state.averages.sleep_time}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="palegreen"
          />
        </Col>

          <Col style={{
            width: '225px',
            margin: '5px',
          }}
          >
          <Circle
            percent={this.state.averages.happy}
            strokeWidth="5"
            trailWidth='2'
            strokeLinecap="round"
            strokeColor="palegreen"
          />
        </Col>

      </Row>
      </main>

    );
  }
}

export default Averages;
