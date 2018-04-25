import React, {Component} from 'react';
import Slider from 'react-rangeslider'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const defaultSliderState = {
  prodValue: 50,
  unprodValue: 50,
  sleepValue: 50,
  happyValue: 50,
}

class Sliders extends Component {
  constructor(props) {
    super(props)
    this.state = defaultSliderState

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(value, name) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(e) {
    e.preventDefault();


    this.props.onSubmit({
      slacks: {
      prod_time: this.state.prodValue,
      unprod_time: this.state.unprodValue,
      sleep_time: this.state.sleepValue,
      happy: this.state.happyValue
      }
    })

    this.setState(defaultSliderState)
  }

  render() {
    const { prodValue, unprodValue, sleepValue, happyValue } = this.state
    const horizontalLabels = {
      0: 'Low',
      100: 'High'
    }

    const formatPc = p => p + '%'

    return (
      <div style={{ width: "27vw", minWidth: "240px" }} className="slider custom-labels">
        <div style={{ marginBottom: "20px" }}>
          <h2 className="headings">How was your day?</h2>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontSize: "19px", color: "tomato" }}>
            Procrastination
          </p>
          <Slider
            className="unprodSelect"
            min={0}
            max={100}
            value={unprodValue}
            labels={horizontalLabels}
            format={formatPc}
            handleLabel={unprodValue}
            onChange={value => this.handleSliderChange(value, "unprodValue")}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontSize: "19px", color: "palegreen" }}>
            Healthy Meals
          </p>
          <Slider
            className="prodSelect"
            min={0}
            max={100}
            value={prodValue}
            labels={horizontalLabels}
            format={formatPc}
            handleLabel={prodValue}
            onChange={value => this.handleSliderChange(value, "prodValue")}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontSize: "19px", color: "#15fbff" }}>
            Sleep Quality
          </p>
          <Slider
            className="sleepSelect"
            min={0}
            max={100}
            value={sleepValue}
            labels={horizontalLabels}
            format={formatPc}
            handleLabel={sleepValue}
            onChange={value => this.handleSliderChange(value, "sleepValue")}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <p style={{ fontSize: "19px", color: "#ffff66" }}>
            Mood
          </p>
          <Slider
            className="happySelect"
            min={0}
            max={100}
            value={happyValue}
            labels={horizontalLabels}
            format={formatPc}
            handleLabel={happyValue}
            onChange={value => this.handleSliderChange(value, "happyValue")}
          />
        </div>
        <MuiThemeProvider>
          <RaisedButton
            label="Submit"
            primary={true}
            style={{ width: "100px", borderRadius: "12px" }}
            color="primary"
            onClick={e => this.handleSubmit(e)}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Sliders;
