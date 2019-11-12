import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/IActivity';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { IProfile } from '../models/IProfile';

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Connection Error');
  }

  const { status, data, config } = error.response;
  // console.log(data);

  if (error.response.status === 404) {
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.hasOwnProperty('id')) {
    history.push('/NotFound');
  }
  if (status === 500) {
    toast.error('Server error');
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/Activities', activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  join: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unjoin: (id: string) => requests.delete(`/activities/${id}/attend`)
};

const User = {
  current: (): Promise<IUser> => requests.get('/User'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/User/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/User/register`, user)
};

const Profile = {
  get: (userName: string): Promise<IProfile> =>
    requests.get(`/Profiles/${userName}`)
};

export default {
  Activities,
  User,
  Profile
};
