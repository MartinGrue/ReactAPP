import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/IActivity';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(undefined, error => {
  if(error.message === 'Network Error' && !error.response){
    toast.error('Connection Error');
  }

  const {status, data, config} = error.response;
  console.log(data);

  if(error.response.status == 404){
    history.push('/notfound');
  }
  if(status === 400 && config.method === 'get' && data.hasOwnProperty('id')){
    history.push('/NotFound');
  }
  if(status === 500){
    toast.error('Server error');
  }
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
  delete: (id: string) => requests.delete(`/activities/${id}`)
};
export default {
  Activities
};
