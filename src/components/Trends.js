import React, { Component } from 'react';
import Slider from 'react-slick'
import { Slack } from '../lib/requests';



class Trends extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      slacks: [],
      validationErrors: [],
      trends: {}

    };
  }

  componentDidMount () {
    Slack
      .trends()
      .then(
        trendsObject => {
          console.log(trendsObject)
          this.setState({
            trends: trendsObject,
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
            {this.state.trends.prod_time}
          </main>
        );
      }
    }

    export default Trends;
