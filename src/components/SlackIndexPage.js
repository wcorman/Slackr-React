import React from 'react';
import ReactDOM from 'react-dom';

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
    };

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
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
      <main
        className="SlackIndexPage"
        style={{
          margin: '0 1rem',
          width: '100%'
        }}
        >
          <main style={{
            textAlign: "center"
          }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <SlackNewPage />
          <Averages />

          </div>
          </main>
          <hr/>

          <h2>Slacks</h2>

          <ul>
           {
             slacks.map(
               slack => (
                 <li key={slack.id}>
                   <main style={{
                     width: '85%',
                     paddingBottom: '25px',
                     border: 'solid',
                     borderRadius: '10px',
                     borderWidth: '2px',
                     borderColor: 'grey',
                     marginBottom: '10px',
                     padding: '20px'

                   }}>
                   <div style={{
                     display: ''
                   }}>
                   <h4>{moment(slack.created_at.slice(0,-14)).format("MMM Do, YYYY")}</h4>
                   Unproductive time
                     <Line percent={slack.unprod_time} strokeWidth="1" strokeColor='grey'></Line>
                     <br/>
                     </div>
                     Productive time
                     <Line percent={slack.prod_time} strokeWidth="1" strokeColor='purple'></Line>
                     <br/>
                     Sleep time
                     <Line percent={slack.sleep_time} strokeWidth="1" strokeColor='deepskyblue'></Line>
                     <br/>
                     Happy level
                     <Line percent={slack.happy} strokeWidth="1" strokeColor='palegreen'></Line>
                   </main>

                 </li>
               )
             )
           }
         </ul>
       </main>
     )
 }
}



export default SlackIndexPage;
