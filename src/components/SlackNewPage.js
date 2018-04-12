import React, { Component } from 'react';
import Sliders from './Sliders';
import { Slack } from '../lib/requests';
import Moment from 'moment';

class SlackNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: [],
      slacks: {},
      getslacks: [],
      timeout: ''
    };
    this.createSlack = this.createSlack.bind(this);
    this.getslacks = this.getslacks.bind(this);

  }

  componentDidMount() {
    this.getslacks();

    Slack
      .all()
      .then(slacks => {
        this.setState({
          getslacks: slacks,
          loading: false
        });
      });
  }

  createSlack(slackParams) {
    const {getslacks, loading} = this.state;

    switch (this.state.getslacks.length == 0) {
      case true:
      Slack
        .create(slackParams)
        .then(data => {
          if (data.errors) {
            this.setState({
              timeout: '',
              slacks: {},
              errors: [{
                message: 'Come back tomorrow to make another post!'
              }],
              // validationErrors: data.errors.filter(
              //   e => e.type === "ActiveRecord::RecordInvalid"
              // )
            });
          } else {
            this.props.addSlack(data)
          }
        });

        setTimeout(() => {
          Slack
          .all()
          .then(slacks => {
            this.setState({
              getslacks: slacks,
              loading: false
            });
          });
        }, 12)

          console.log("User's first post");
          break;
      case false:
        let latest = getslacks[0]
        let currentTime = Moment(Date()).format()
        let timeout = Moment(latest.created_at).add(20, 'hours').format()
        let elapsed = (Date() - latest.created_at)
        // console.log(latest.created_at)
        // console.log(Date().slice(4,-15))
        let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
        console.log('Current time: ' + currentTime)
        console.log('Timeout till: ' + timeout)
        console.log('time left till next entry: ' + timeLeft + ' Hours')
        console.log('Apples are $0.32 a pound.');

        switch ((Moment(currentTime).isAfter(timeout))) {
          case false:
            break;
          case true:
          Slack
            .create(slackParams)
            .then(data => {
              if (data.errors) {
                this.setState({
                  getslacks: [],
                  slacks: {},
                  errors: [{
                    message: 'Come back tomorrow to make another post!'
                  }],
                  // validationErrors: data.errors.filter(
                  //   e => e.type === "ActiveRecord::RecordInvalid"
                  // )
                });
              } else {
                this.props.addSlack(data)
              }
            });
            console.log('SUCCESS')
            break;
        }
          break;
    }


  // if (Moment(currentTime).isAfter(timeout)) {
  //   let currentTime = Moment(Date()).format()
  //   let timeout = Moment(latest.created_at).add(20, 'hours').format()
  //   let latest = getslacks[0]
  //   let elapsed = (Date() - latest.created_at)
  //   // console.log(latest.created_at)
  //   // console.log(Date().slice(4,-15))
  //   let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
  //   console.log('Current time: ' + currentTime)
  //   console.log('Timeout till: ' + timeout)
  //   console.log('time left till next entry: ' + timeLeft + ' Hours')


    // }
  }
  getslacks() {
    Slack
      .all()
      .then(slacks => {
        this.setState({
          getslacks: slacks
        });
      });
  }

  render() {

    return (
      <main
        className="SlackNewPage"
        style={{
          margin: "0 1rem",
          marginTop: "10px",
          width: "20vw"
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
