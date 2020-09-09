import axios from 'axios';

import { getJWTToken } from './sessionManagment';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || '',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const state = { ...config };

    state.headers.Authorization = config.headers.Authorization || `Bearer ${getJWTToken()}`;

    return state;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  ({ data }) => data,
  ({ response }) => {
    if (response?.code === 403) {
      return Promise.reject(new Error('Access denied'));
    }

    if (response?.data?.code) {
      return Promise.reject(new Error(response.data.code));
    }

    return Promise.reject(error);
  },
);

export default instance;