import React from 'react';

import { Link } from 'react-router-dom';
import { Slack } from '../lib/requests';
import SlackNewPage from './SlackNewPage';
import Averages from './Averages';
// import { Slider, Icon } from 'antd';
import { Line } from 'rc-progress';


// The React Component parent class is also available
// as a property of the React default import object.
class SlackIndexPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      slacks: [],
      loading: true,
      value: 0,
      title: 'App title',
    };

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
    this.onClick = this.onClick.bind(this);
    this.deleteSlack = this.deleteSlack.bind(this);
    this.addSlack = this.addSlack.bind(this);
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  componentDidMount () {
    console.log(this.props.user.id)

    Slack
      .all()
      .then(
        slacks => {
          console.log(slacks)
          this.setState({
            slacks: slacks,
            loading: false
          });
        }
      );
  }
  componentDidUpdate() {
    console.log(this.state.slacks);
    localStorage.setItem(
      this.state.slacks,
      JSON.stringify(this.state.slacks)
    );
  }

  deleteSlack (event) {
    const {currentTarget} = event
    // console.log(currentTarget.dataset.id)

    const {slacks} = this.state;
    const slackId = parseInt(currentTarget.dataset.id, 10);
    console.log(slackId)
    // To delete a slack, will have to update the state
    // to version of the state where that slack is no longer
    // present.
    this.setState({
      slacks: slacks
        .filter(slack => slack.id !== slackId)
    })
    // Everytime you want to change the state, use the this.setState()
    // method. This will notify React that it potentially needs
    // to update the DOM based on the new data in the state.

    // Modifying this.state directly will cause headaches and not
    // reflect any changes to the DOM.
    // DO NOT DO IT! ð±
  }

  addSlack (newSlack) {
    const {slacks} = this.state;

    newSlack.author = {full_name: 'Dr. Zoidberg'}
    this.setState({
      slacks: [
        newSlack,
        ...slacks
      ]
    })
  }

  onClick() {
    this.setState({
      title: 'Newapp title'
    })
  }

  render () {
    const { slacks, loading } = this.state;
    var moment = require('moment');

    if (loading) {
      return (
        <main
          className="SlackIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Slacks</h2>
          <h4>Loading Slacks...</h4>
        </main>
      )
    }

    return (
      <main id="index"
        className="SlackIndexPage"
        style={{
          width: '100vw'
        }}
        >
          <main style={{
            textAlign: "center"
          }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}>
          <SlackNewPage />
          <Averages />
          </div>
          </main>
          <hr/>

          <h2 className='headings' style={{  color: 'white', marginTop:'15px', marginLeft:'16px'}}>Recent Slacks</h2>

           {
             slacks.map(
               slack => (
                 <div key={slack.id}>
                   <main style={{
                     width: '85%',
                     paddingBottom: '25px',
                     border: 'solid',
                     borderRadius: '10px',
                     borderWidth: '2px',
                     borderColor: 'grey',
                     backgroundColor: 'rgba(0, 0, 0, 0.1)',
                     marginBottom: '10px',
                     padding: '20px',
                     color: 'white'

                   }}>
                   <div style={{
                     textAlign: 'center'
                   }}>
                   <h4 className='headings' onClick={this.onClick} >{moment(slack.created_at.slice(0,-14)).format("MMM Do, YYYY")}</h4>
                 </div>

                      <div>
                    <p className='LineText'>Productive time</p>
                     <Line className='Line' percent={slack.prod_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="1" strokeColor='palegreen'></Line>
                     <br/>
                      </div>
                      <div>
                    <p className='LineText'>Unproductive time</p>
                      <Line className='Line' percent={slack.unprod_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="1" strokeColor='tomato'></Line>
                      <br/>
                     </div>
                    <p className='LineText'>Sleep time</p>
                     <Line className='Line' percent={slack.sleep_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="1" strokeColor='#15fbff'></Line>
                     <br/>
                    <p className='LineText'>Happy Level</p>
                     <Line className='Line' percent={slack.happy} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="1" strokeColor='#ffff66'></Line>
                   </main>

                 </div>
               )
             )
           }
       </main>
     )
 }
}

export default SlackIndexPage;
