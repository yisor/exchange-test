import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, params, method = 'get') {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'post' ? params : {},
      params: method === 'get' ? params : {}
    })
      .then(checkStatus)
      .then(res => res.data)
      .then(data => resolve(data))
      .catch(error => reject(error.data));
  });
}
