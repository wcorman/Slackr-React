const DOMAIN = 'localhost:3000';
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
      `${BASE_URL}/slacks/`,
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
  create (params) {
    return fetch(
      `${BASE_URL}/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json());
  }
}

// export default Slack;
// ð This named export. Unlike the default, it allows
// to export multiple variables which must import by their
// surround by braces.
// `import { Slack, Token } from './lib/Slack'`
export { Slack, Token };
