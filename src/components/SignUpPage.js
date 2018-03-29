import React from 'react';
import { User } from '../lib/requests';

function SignUpPage(props) {
  const { onSignUp = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    User.create({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      password: formData.get('password')
    }).then(data => {
      if (!data.error) {
        const jwt = data.jwt;
        localStorage.setItem('jwt', jwt);
        onSignUp();
        props.history.push('/');
      }
    });
  }

  return (
    <main
      className="SignInPage"
      style={{margin: '0 1rem'}}
      >
      <h2 style={{
        color:'white'
      }}>Sign Up</h2>
      <br/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <br/>
          <input name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <br/>
          <input name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br/>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br/>
          <input type="password" name="password" id="password" />
        </div>
        <br/>

        <input type="submit" value="Sign Up" />
      </form>
    </main>
  );
}

export default SignUpPage;
