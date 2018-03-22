import React, { Component } from 'react';
import SlackForm from './SlackForm';
import { Slack } from '../lib/requests';

class SlackNewPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      validationErrors: []
    };

    this.createSlack = this.createSlack.bind(this);
  }

  createSlack (slackParams) {
    Slack
      .create(slackParams)
      .then(data => {

        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(
                e => e.type === "ActiveRecord::RecordInvalid"
              )
          });
        } else {
          // const id = data.id
          const { id } = data;

          // Components rendered by the <Route /> component
          // gain access to a .history than can be used to manipulate
          // history. Using allows to redirect a user to
          // a different rendering whichever component is there.
          this.props.history.push(`/slacks/${id}`);
        }
      })
  }

  render () {
    return (
      <main
        className="SlackNewPage"
        style={{margin: '0 1rem'}}
      >
        <h1>New Slack</h1>
        <SlackForm
          errors={this.state.validationErrors}
          onSubmit={this.createSlack}
        />
      </main>
    );
  }
}

export default SlackNewPage;
