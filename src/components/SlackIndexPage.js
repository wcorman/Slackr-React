import React from 'react';
import { Slack } from '../lib/requests';
import SlackNewPage from './SlackNewPage';
import Averages from './Averages';
// import { Slider, Icon } from 'antd';
import { Line } from 'rc-progress';
import { Row } from 'reactstrap';


// The React Component parent class is also available
// as a property of the React default import object.
class SlackIndexPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      slacks: [],
      loading: true,
      value: 0,
      title: 'Slackr',
    };

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
    this.onClick = this.onClick.bind(this);
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  componentDidMount () {
    Slack
      .all()
      .then(
        slacks => {
          this.setState({
            slacks: slacks,
            loading: false
          });
        }
      );
  }

  componentDidUpdate() {
    Slack
      .all()
      .then(
        slacks => {
          this.setState({
            slacks: slacks,
            loading: false
          });
        }
      );
    localStorage.setItem(
      this.state.slacks,
      JSON.stringify(this.state.slacks)
    );
  }



  onClick() {
    this.setState({
      title: 'Newapp title'
    })
  }

  updateComponent = (e) => {
    this.forceUpdate()
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

    const total = slacks.length
    const leftOvers = (total-9)

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

          <Averages greet={this.onGreet}/>

          </div>

          </main>
          <hr/>

          <h2 className='headings' style={{  color: 'white', marginTop:'15px', marginLeft:'16px'}}>Recent Entries</h2>

          <Row style={{marginLeft:'10px', marginRight:'0px'}}>
           {
             slacks.slice(0, 9).map(
               slack => (
                 <div key={slack.id}>
                   <main style={{
                     width: '85%',
                     minWidth: '310px',
                     height: '270px',
                     paddingBottom: '25px',
                     margin: '10px',
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
                    <p className='LineText'>Productive</p>
                     <Line className='Line' percent={slack.prod_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="2.8" strokeColor='palegreen'></Line>
                     <br/>
                      </div>
                      <div>
                    <p className='LineText'>Unproductive</p>
                      <Line className='Line' percent={slack.unprod_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="2.8" strokeColor='tomato'></Line>
                      <br/>
                     </div>
                    <p className='LineText'>Sleep Quality</p>
                     <Line className='Line' percent={slack.sleep_time} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="2.8" strokeColor='#15fbff'></Line>
                     <br/>
                    <p className='LineText'>Happy Level</p>
                     <Line className='Line' percent={slack.happy} trailColor='rgba(255, 255, 255, 0.1)' strokeWidth="2.8" strokeColor='#ffff66'></Line>
                   </main>

                 </div>
               )
             )
           }
           <main style={{
             width: '200px',
             minWidth: '310px',
             height: '270px',
             textAlign: 'center',
             paddingBottom: '25px',
             margin: '10px',
             border: 'solid',
             borderRadius: '10px',
             borderWidth: '2px',
             borderColor: 'grey',
             backgroundColor: 'rgba(0, 0, 0, 0.1)',
             marginBottom: '10px',
             padding: '20px',
             color: 'white'

           }}>
           <h2>And {leftOvers} more...</h2>
           <h3>Keep it up!</h3>
         </main>

           </Row>
       </main>
     )
 }
}

export default SlackIndexPage;
