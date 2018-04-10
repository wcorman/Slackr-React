import React, { Component } from 'react';
import Sliders from './Sliders';
import { Slack } from '../lib/requests';

class SlackNewPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      validationErrors: [],
      slacks: {}
    };

    this.createSlack = this.createSlack.bind(this);
  }

  createSlack (slackParams) {
    Slack
      .create(slackParams)
      .then(data => {

        if (data.errors) {
          this.setState({
            slacks: {},
            validationErrors: data
              .errors
              .filter(
                e => e.type === "ActiveRecord::RecordInvalid"
              )
          });
        } else {
          this.props.addSlack(data)
        }
      })
  }

  render () {
    return (
      <main
        className="SlackNewPage"
        style={{margin: '0 1rem',
                marginTop: '10px',
                width: '20vw'
              }}
      >
        <Sliders
          errors={this.state.validationErrors}
          onSubmit={this.createSlack}
        />
      </main>
    );
  }
}

export default SlackNewPage;
