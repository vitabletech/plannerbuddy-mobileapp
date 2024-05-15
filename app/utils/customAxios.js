import axios from 'axios';
import { Alert } from 'react-native';
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
  return new Promise((resolve, reject) => {
    if (error.response && error.response.data) {
      if (error?.response?.data?.message === 'Unauthorized!') {
        AsyncStorage.removeItem('userProfile')
          .then(() => {
            Alert.alert('Error', 'Please restart your app.');
            reject(error.response.data);
          })
          .catch((err) => {
            console.error(err);
            reject(error.response.data);
          });
      } else {
        reject(error.response.data);
      }
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
