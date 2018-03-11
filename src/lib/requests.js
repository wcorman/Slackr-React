const DOMAIN = 'localhost:3000';
const API_PREFIX = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;
const JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjA3LCJmaXJzdF9uYW1lIjoiV2VzIiwibGFzdF9uYW1lIjoiQ29ybWFuIn0._Jo9YT_lcF60yn9M6_Dn34tGWoNmXiyDEiE_GYEupgs';

// HTTP REQUESTS


const Slack = {
  all () {
    return fetch(
      `${BASE_URL}/slacks`,
      {
        headers: {
          'Authorization': JWT
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
          'Authorization': JWT
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
          'Authorization': JWT,
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  }
}

// export default Slack;
// ð This named export. Unlike the default, it allows
// to export multiple variables which must import by their
// surround by braces.
// `import { Slack, Token } from './lib/Slack'`
export { Slack };
