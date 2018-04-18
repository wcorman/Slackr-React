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
      timeout: '',
      success: ''
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
    let {getslacks, loading} = this.state;

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
              success: 'nice',
              loading: false
            });
          });
        }, 150)

          console.log("User's first post");
          break;

      case false:
        let latest = getslacks[0]
        let currentTime = Moment(Date()).format()
        let timeout = Moment(latest.created_at).add(20, 'hours').format()
        let elapsed = (Date() - latest.created_at)
        let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
        console.log('Current time: ' + currentTime)
        console.log('Timeout till: ' + timeout)
        console.log('time left till next entry: ' + timeLeft + ' Hours')
        let timeLeftNum = parseFloat(parseFloat(timeLeft).toFixed(2))
        console.log(timeLeftNum)
        console.log('before:', timeLeftNum > 0)
        console.log('before:', timeLeftNum < 0)
        console.log('before:', timeLeftNum)

        if (timeLeftNum < 0.01) {
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

              setTimeout(() => {
                Slack
                .all()
                .then(slacks => {
                  console.log(slacks.length)
                  this.setState({
                    getslacks: slacks,
                    loading: false
                  });
                });
              }, 150)
              let latest = getslacks[0]
              let currentTime = Moment(Date()).format()
              let timeout = Moment(latest.created_at).add(20, 'hours').format()
              let elapsed = (Date() - latest.created_at)
              let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
              console.log('Current time: ' + currentTime)
              console.log('Timeout till: ' + timeout)
              console.log('time left till next entry: ' + timeLeft + ' Hours')
              let timeLeftNum = parseFloat(parseFloat(timeLeft).toFixed(2))
              console.log(timeLeftNum)
              console.log('before:', timeLeftNum > 0)
              console.log('before:', timeLeftNum < 0)
              console.log('before:', timeLeftNum)
              this.setState({
                timeout: '',
                success: 'nice',
              });
              console.log('SUCCESS')
        } else {
              let {getslacks, loading} = this.state;
              let latest = getslacks[0]
              let currentTime = Moment(Date()).format()
              let timeout = Moment(latest.created_at).add(20, 'hours').format()
              let elapsed = (Date() - latest.created_at)
              let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
              let timeLeftNum = parseFloat(parseFloat(timeLeft).toFixed(2))
              let timeLeftString = timeLeftNum.toString()
              console.log(timeLeftNum)
              console.log('THIS SHIT BETTER START WORKING...')
              console.log(Moment(currentTime))
              console.log(typeof timeLeftNum)
              console.log('after:', timeLeftNum > 0)
              console.log('after:', timeLeftNum < 0)
              console.log('after:', timeLeftNum)
              this.setState({
                timeout: timeLeftString,
                success: '',
              });

        }
        // switch (timeLeftNum < 19.99) {
        //   case false:
        //
        //     let {getslacks, loading} = this.state;
        //     let latest = getslacks[0]
        //     let currentTime = Moment(Date()).format()
        //     let timeout = Moment(latest.created_at).add(20, 'hours').format()
        //     let elapsed = (Date() - latest.created_at)
        //     let timeLeft = Moment(timeout).diff(currentTime, 'hours', true)
        //     let timeLeftNum = parseFloat(parseFloat(timeLeft).toFixed(2))
        //     let timeLeftString = timeLeftNum.toString()
        //     console.log(timeLeftNum)
        //     console.log('THIS SHIT BETTER START WORKING...')
        //     console.log(Moment(currentTime))
        //     console.log(typeof timeLeftNum)
        //     console.log('after:', timeLeftNum > 0)
        //     console.log('after:', timeLeftNum < 0)
        //     console.log('after:', timeLeftNum)
        //     this.setState({
        //       timeout: timeLeftString,
        //     });
        //
        //     break;
        //
        //   case true:
        //   Slack
        //     .create(slackParams)
        //     .then(data => {
        //       if (data.errors) {
        //         this.setState({
        //           getslacks: [],
        //           slacks: {},
        //           errors: [{
        //             message: 'Come back tomorrow to make another post!'
        //           }],
        //           // validationErrors: data.errors.filter(
        //           //   e => e.type === "ActiveRecord::RecordInvalid"
        //           // )
        //         });
        //       } else {
        //         this.props.addSlack(data)
        //       }
        //     });
        //     this.setState({
        //       timeout: timeLeftString,
        //     });
        //     console.log('SUCCESS')
        //     break;
        // }
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
          width: "27vw"
        }}
      >
        {this.state.timeout !== ''
          ? [
              <main>
                {Number((this.state.timeout)) > 8
                ? <div><p style={{ color: 'orange', fontSize: '15px', margin: '0px' }}> <b>One per day please!</b> </p>
                    <p style={{color:'orange', fontSize:'15px', margin:'0px'}}> <b>{this.state.timeout} hours</b> left until you can make a new entry..</p>
                    </div>
                : <p style={{ color: '#ffff66', margin: '0px' }}> <div><b>Come back soon!</b></div>
                  <b> {this.state.timeout} hours</b> left until you can make a new entry..</p>}
              </main>
            ]
          : <div></div>
        }
        {this.state.success !== ''
          ? [
              <main>
                <div><p style={{color:'palegreen', fontSize:'17px', margin:'0px'}}><b> Submitted!</b></p> <p style={{color:'palegreen', fontSize:'15px', margin:'0px'}}>Remember to be honest with yourself. Come back tomorrow to keep the ball rolling!</p></div>
              </main>
            ]
          : <div></div>
        }

        <Sliders
          errors={this.state.validationErrors}
          onSubmit={this.createSlack}
        />
      </main>
    );
  }
}

export default SlackNewPage;
