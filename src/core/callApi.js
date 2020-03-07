import axios from 'axios';

export const callApi = (url, method = 'get', data) => {
  return axios[method](`http://localhost:3001/${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
