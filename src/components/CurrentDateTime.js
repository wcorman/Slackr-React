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

    return (
      <span className="CurrentDateTime" style={{fontFamily:'Patua One'}}>
        { this.state.dateTime.toLocaleDateString() }
      </span>
    )
  }
}

export default CurrentDateTime;
