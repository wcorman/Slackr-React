import React from 'react';
import Field from './Field';

function SlackDetails (props) {
  const {author = {}} = props;

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <p>By {author.full_name}</p>
      <Field name="Created At" value={props.created_at} />
      <Field name="Updated At" value={props.updated_at} />
    </div>
  );
}

export default SlackDetails;
