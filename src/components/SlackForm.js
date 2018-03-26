import React from 'react'
import { Slider, Icon } from 'antd';
import { Button } from 'reactstrap';

function SlackForm (props) {

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

      <div>
        <label htmlFor="prodTime">Productive Time</label> <br />
        <input type='number' name="prodTime" id="prodTime" />
      </div>

      <div>
        <label htmlFor="unprodTime">Unproductive Time</label> <br />
        <input type='number' name="unprodTime" id="unprodTime"/>
      </div>

      <div>
        <label htmlFor="sleepTime">Sleep Time</label> <br />
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

export default SlackForm;
