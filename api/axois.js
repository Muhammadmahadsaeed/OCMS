import axios from 'axios';

const baseURL = `http://192.168.1.78:3000`;

const service = axios.create({
  baseURL,
  headers: {Accept: 'application/json'},
});

service?.interceptors?.response.use(
  async (res) => {
    return res?.data;
  },
  async (err) => {
    return Promise.reject(err?.response?.data);
  },
);

service?.interceptors?.request.use((req) => {
  return req;
});

export default service;
