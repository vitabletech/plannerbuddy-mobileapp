import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../constants/constants';

const customAxios = axios.create({
  baseURL: API_URL,
});

const requestHandler = async (config) => {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers['x-access-token'] = token;
  }
  return config;
};

const responseHandler = (response) => {
  return response?.data;
};
const errorHandler = (error) => {
  return new Promise((_resolve, reject) => {
    if (error.response && error.response.data) {
      reject(error.response.data);
    } else {
      reject(error);
    }
  });
};

customAxios.interceptors.request.use(
  (config) => requestHandler(config),
  (error) => errorHandler(error),
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default customAxios;
