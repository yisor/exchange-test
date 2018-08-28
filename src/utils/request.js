import axios from 'axios';

const mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6IjE4Njk4NTc1NjkyIiwidHMiOjE1MzU0MjQ1OTY0NjF9.JCTllT3P497QaoqlUQIn3r3f9OPsu-xlLmDgD7hvvcM';

// axios 配置
axios.defaults.timeout = 5000;  // 设置超时时间
axios.defaults.baseURL = 'http://192.168.1.149:6674';
axios.interceptors.request.use(
  config => {
    const token = mockToken;
    config.headers = {
      'Content-Type': 'application/json'
    };
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }
  const error = new Error(res.statusText);
  error.res = res;
  throw error;
};

const checkCode = (res) => {
  console.log('请求返回：', JSON.stringify(res));
  if (res.code !== null && res.code === '0000') { // 正常返回
    return res;
  } else {
    if (res.code !== null && (res.code === '10015' || res.code === '1004')) {
      alert('TOKEN失效');
    }
  }
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
      .then(checkCode)
      .then(data => resolve(data))
      .catch(error => reject(error.data));
  });
};
export default request;
