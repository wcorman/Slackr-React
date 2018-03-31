import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Slider from 'react-rangeslider'
import SlackForm from './SlackForm';
import { Row, Col } from 'reactstrap';
import prodlogo from './logosvg2.svg'

// import 'react-rangeslider/lib/index.css'

class Sliders extends Component {
  constructor (props) {

    super(props)
    this.state = {
      prodValue: 50,
      unprodValue: 50,
      sleepValue: 50,
      happyValue: 50,
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    // const {onSubmit = () => {}} = props
    this.onSubmit = props.onSubmit
  }
  handleSliderChange = (value, name) => {
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    this.onSubmit({
      slacks: {
      prod_time: this.state.prodValue,
      unprod_time: this.state.unprodValue,
      sleep_time: this.state.sleepValue,
      happy: this.state.happyValue
      }
    }
  )

    console.log(this.state)
    console.log(this.state.prodValue)
  }

  render () {
    const { prodValue, unprodValue, sleepValue, happyValue } = this.state
    console.log('prod value: ', prodValue)
    const horizontalLabels = {
      0: 'Low',
      // 50: 'Medium',
      100: 'High'
    }

    const formatPc = p => p + '%'

    return (
      <div
        style={{width:'420px'}}
        className='slider custom-labels'>
        <div style={{
          marginBottom:'40px'
        }}>
        <p>Productive Time</p>
        <Slider
          className='prodSelect'
          min={0}
          max={100}
          value={prodValue}
          labels={horizontalLabels}
          format={formatPc}
          handleLabel={prodValue}
          onChange={(value) => this.handleSliderChange(value, 'prodValue')}
        />
        </div>

        <div style={{
          marginBottom:'40px'
        }}>
        <p>Unproductive Time</p>
        <Slider
          className='unprodSelect'
          min={0}
          max={100}
          value={unprodValue}
          labels={horizontalLabels}
          format={formatPc}
          handleLabel={unprodValue}
          onChange={(value) => this.handleSliderChange(value, 'unprodValue')}
        />
        </div>
        <div style={{
          marginBottom:'40px'
        }}>
        <p>Sleep Quality</p>
        <Slider
          className='sleepSelect'
          min={0}
          max={100}
          value={sleepValue}
          labels={horizontalLabels}
          format={formatPc}
          handleLabel={sleepValue}
          onChange={(value) => this.handleSliderChange(value, 'sleepValue')}
        />
        </div>
        <div style={{
          marginBottom:'40px'
        }}>
        <p>Happy Level</p>
        <Slider
          className='happySelect'
          min={0}
          max={100}
          value={happyValue}
          labels={horizontalLabels}
          format={formatPc}
          handleLabel={happyValue}
          onChange={(value) => this.handleSliderChange(value, 'happyValue')}
        />
        </div>
        <Button style={{width:'100px', borderRadius:'12px'}} color="primary" onClick={(e) => this.handleSubmit(e)}>
          Submit
        </Button>
      </div>
    )
  }

}


export default Sliders;
