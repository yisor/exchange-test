import axios from 'axios';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return {
    code: response.status,
    message: response.statusText,
    data: response.statusText,
    successful: true
  };
};

const request = (url, params, method = 'get') => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'post' ? params : {},
      params: method === 'get' ? params : {}
    })
      .then(checkStatus)
      .then(data => resolve(data))
      .catch(error => reject(error.data));
  });
};
export default request;
