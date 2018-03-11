import React from 'react';
import { Link } from 'react-router-dom';
import { Slack } from '../lib/requests';

// The React Component parent class is also available
// as a property of the React default import object.
class SlackIndexPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      slacks: [],
      loading: true
    }

    // When using a method as a callback, we must bind
    // this to otherwise we won't have access to any properties
    // of `this` include the state, setState and the props.

    // `.bind()` is a method of functions that effectively
    // creates new function that is copy of the function
    // where `this` is bound permanently.
    this.deleteSlack = this.deleteSlack.bind(this);
    this.addSlack = this.addSlack.bind(this);
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

    // ð hack because we don't have authors
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

    if (loading) {
      return (
        <main
          className="SlackIndexPage"
          style={{margin: '0 1rem'}}
        >
          <h2>Slacks</h2>
          <h4>Loading...</h4>
        </main>
      )
    }

    return (
      <main
        className="SlackIndexPage"
        style={{margin: '0 1rem'}}
        >
          <h2>Slacks</h2>
          <ul>
            {
              slacks.map(
                slack => (
                  <li key={slack.id}>
                    <Link to={`/slacks/${slack.id}`}>
                      prod time: {slack.prod_time}
                    </Link>
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
