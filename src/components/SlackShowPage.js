import React, { Component } from 'react';
// React is default import.
// Component (which must import with {}) is named import.

// To export a default, React has to `export default React`
// To export a named import, React does `export { Component }`
// where `Component` is the name of a variable inside
// the React library.

import { Slack } from '../lib/requests';

class SlackShowPage extends Component {
  constructor (props) {
    // When class based component is first initialize, the
    // `props` are passed to the constructor. When inside constructor
    // and only when inside, you should use `props` without `this.`.
    super(props);
    // When overriding the Component's constructor, we must
    // always use `super(props);` to call the constructor of
    // the Component class. This configures our component such
    // as setting the `props` on `this`.

    this.state = {
      question: {},
      loading: true
    };

    this.delete = this.delete.bind(this);
  }

  componentDidMount () {
    const questionId = this.props.match.params.id;

    Slack
      .one(questionId)
      .then(
        question => {
          this.setState({
            question: question,
            loading: false
          })
        }
      )
  }

  delete () {
    this.setState({
      question: {}
    });
  }

  deleteAnswer (answerId) {
    const {question} = this.state;
    const {answers} = question;

    this.setState({
      question: {
        ...question,
        // The order in which properties are spread or added to object
        // affect priority. Last is more important.
        answers: answers.filter(answer => answer.id !== answerId)
      }
    })
  }

  render () {
    const { question, loading } = this.state;

    if (loading) {
      return (
        <main
          className="SlackShowPage"
          style={{
            margin: '0 1rem'
          }}
        >
          <h4>Loading...</h4>
        </main>
      );
    }

    if (!question.id) {
      return (
        <main
          className="SlackShowPage"
          style={{
            margin: '0 1rem'
          }}
        >
          <h2>Slack doesn't exist!</h2>
        </main>
      )
    }
    // To pass props to React elements, set them with
    // "HTML attrbutes" inside JSX. Each attribute will
    // act as a property of the component's `props` object.

    // 1rem is == to the font-size of the root tag (<html> ...).
    return (
      <main
        className="SlackShowPage"
        style={{
          margin: '0 1rem'
        }}
        >
        </main>
      )
  }
}

export default SlackShowPage;
