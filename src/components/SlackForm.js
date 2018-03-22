import React from 'react'
import { Slider, Icon } from 'antd';
import IconSlider from './slider'

function SlackForm (props) {
  // props.onSubmit
  const {onSubmit = () => {}} = props

  const handleSubmit = event => {
    event.preventDefault();

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
    });
  }

  return (
    <form
      className="SlackForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="prodTime">Productive Time</label> <br />
        <input name="prodTime" id="prodTime" />
      </div>

      <div>
        <label htmlFor="unprodTime">Unproductive Time</label> <br />
        <input name="unprodTime" id="unprodTime"/>
      </div>

      <div>
        <label htmlFor="sleepTime">Sleep Time</label> <br />
        <input name="sleepTime" id="sleepTime"/>
      </div>

      <div>
        <label htmlFor="happy">Happy level</label> <br />
        <input name="happy" id="happy"/>
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  )
}

export default SlackForm;
