const DOMAIN = 'ec2-54-186-182-218.us-west-2.compute.amazonaws.com:3000';
const API_PREFIX = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

function getJWT () {
  return localStorage.getItem('jwt');
}

// HTTP REQUESTS

const Slack = {
  all () {
    return fetch(
      `${BASE_URL}/slacks`,
      {
        headers: {
          'Authorization': getJWT(),
        }
      }
    )
      .then(res => res.json());
  },
  averages () {
    return fetch(
      `${BASE_URL}/slacks/averages`,
      {
        headers: {
          'Authorization': getJWT(),
        }
      }
    )
      .then(res => res.json());
  },
  trends () {
    return fetch(
      `${BASE_URL}/slacks/trends`,
      {
        headers: {
          'Authorization': getJWT(),
        }
      }
    )
      .then(res => res.json());
  },
  dates () {
    return fetch(
      `${BASE_URL}/slacks/dates`,
      {
        headers: {
          'Authorization': getJWT(),
        }
      }
    )
      .then(res => res.json());
  },
  one (id) {
    return fetch(
      `${BASE_URL}/slacks/${id}`,
      {
        headers: {
          'Authorization': getJWT()
        }
      }
    )
      .then(res => res.json());
  },
  create (params) {
    return fetch(
      `${BASE_URL}/slacks`,
      {
        headers: {
          'Authorization': getJWT(),
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  }
}

const Token = {
  create(params) {
    return fetch(`${BASE_URL}/tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return { error: 'Username and Password do not match' };
      }
    });
  }
};


const User = {
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: params })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return { error: 'Could not create the user' };
      }
    });
  }
};

// export default Slack;
// ð This named export. Unlike the default, it allows
// to export multiple variables which must import by their
// surround by braces.
// `import { Slack, Token } from './lib/Slack'`
export { Slack, Token, User};
