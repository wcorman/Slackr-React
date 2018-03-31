import React, { Component } from 'react';

class CurrentDateTime extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  componentDidMount () {
    // Code inside this method will run once the component
    // is first visible in the DOM.
    setInterval(
      () => {
        this.setState({dateTime: new Date()})
      },
      1000
    )
  }

  render () {
    var options = { formatMatcher: 'hour' }

    return (
      <span className="CurrentDateTime">
        { this.state.dateTime.toLocaleDateString() } { this.state.dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
      </span>
    )
  }
}

export default CurrentDateTime;
