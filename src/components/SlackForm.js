import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 10,
    }
  }
  handleChangeHorizontal = value => {
    this.setState({
      prodValue: value,
    })
  };
  handleChangeHorizontal2 = value2 => {
    this.setState({
      unprodValue: value2,
    })
  };
  handleChangeHorizontal3 = value3 => {
    this.setState({
      sleepValue: value3,
    })
  };
  handleChangeHorizontal4 = value4 => {
    this.setState({
      happyValue: value4,
    })
  };

  render () {
    const { prodValue, unprodValue, sleepValue, happyValue } = this.state

    const fillStyle = {'backgroundColor': '#fff'}

    const horizontalLabels = {
      0: 'Low',
      50: 'Medium',
      100: 'High'
    }

    const formatPc = p => p + '%'

    return (
      <div className='slider custom-labels'>
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
          fillStyle={fillStyle}
          handleLabel={prodValue}
          onChange={this.handleChangeHorizontal}
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
          onChange={this.handleChangeHorizontal2}
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
          onChange={this.handleChangeHorizontal3}
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
          onChange={this.handleChangeHorizontal4}
        />
        </div>
      </div>
    )
  }

}

function SlackForm (props) {

  const {onSubmit = () => {}} = props

  const handleSubmit = event => {
    // event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // See key => values from formData object
    // console.log(
    //   Array.from(formData.entries())
    // )
    onSubmit({
      slacks: {
      prod_time: formData.get('prodTime'),
      unprod_time: formData.get('unprodTime'),
      sleep_time: formData.get('sleepTime'),
      happy: formData.get('happy')
      }
    }
  );
  }

  return (

    <form
      className="SlackForm"
      onSubmit={handleSubmit}
      style={{
        width: '300px'

      }}
    >

      <div style={{
        marginBottom:'10px'
      }}>
        <label htmlFor="prodTime">Productive Time</label> <br />
        <input type='number' name="prodTime" id="prodTime" />
      </div>

      <div style={{
        marginBottom:'10px'
      }}>
        <label htmlFor="unprodTime">Unproductive Time</label> <br />
        <input type='number' name="unprodTime" id="unprodTime"/>
      </div>

      <div style={{
        marginBottom:'10px'
      }}>
        <label htmlFor="sleepTime">Sleep Quality</label> <br />
        <input type='number' name="sleepTime" id="sleepTime"/>
      </div>

      <div>
        <label htmlFor="happy">Happy level</label> <br />
        <input type='number' name="happy" id="happy"/>
      </div>

      <div style={{
        marginTop: '10px'
      }}>
        <Button color="primary" type="submit">Submit</Button>{' '}
      </div>
    </form>
  )
}

// export default SlackForm;
export default HorizontalCustomLabels;
