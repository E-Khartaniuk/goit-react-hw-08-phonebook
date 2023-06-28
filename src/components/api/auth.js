import axios from 'axios';
import { getContacts } from 'redux/store';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const dellToken = () => {
  delete instance.defaults.headers.common['Authorization'];
};

export const setToken = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const signUp = async body => {
  return await instance.post('/users/signup', body);
};

export const getProfile = async () => {
  const { data } = await instance.get('/users/current');
  console.log('getProfile', data);
  return data;
};

export const logOut = async () => {
  const { data } = await instance.post('/users/logout');

  return data;
};

export const logIn = async body => {
  const { data } = await instance.post('/users/login', body);
  if ('token' in data) setToken(data.token);
  getContacts();
  return data;
};
