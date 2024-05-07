import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants/constants';

const customAxios = axios.create({
  baseURL: API_URL,
});

const requestHandler = async (config) => {
  const userProfileString = await AsyncStorage.getItem('userProfile');
  const userProfile = JSON.parse(userProfileString);
  const { accessToken } = userProfile;
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers['x-access-token'] = accessToken;
  }
  return config;
};

const responseHandler = (response) => {
  return response?.data;
};
const errorHandler = (error) => {
  return new Promise((_resolve, reject) => {
    console.log('error response:: ', error.response);
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
