import axios, { AxiosResponse } from "axios";
import {
  IActivity,
  IActivityEnvelope,
  IUserActivity,
  PhotoUploadResult,
} from "../models/IActivity";
import { history } from "../../pages/_app";
import { toast } from "react-toastify";
import { IUser, IUserFormValues, IExternalLoginInfo } from "../models/user";
import { IProfile, IPhoto, IProfileFormValues } from "../models/IProfile";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

var apiHost = process.env.API_HOST
  ? process.env.NEXT_PUBLIC_API_HOST
  : process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = apiHost;

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Connection Error");
  }

  const { status, data, config, headers } = error.response;

  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (status === 400 && config.method === "get" && data.hasOwnProperty("id")) {
    history.push("/NotFound");
  }
  if (status === 500) {
    toast.error("Server error");
  }
  if (
    status === 401 &&
    headers["www-authenticate"] ===
      'Bearer error="invalid_token", error_description="The token is expired"'
  ) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again");
  }
  // throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: {}) => axios.get(url, params).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let data = new FormData();
    data.append("File", file);
    return axios
      .post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Activities = {
  list: (params: URLSearchParams): Promise<IActivityEnvelope> =>
    requests.get("/activities", { params: params }),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/Activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  join: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unjoin: (id: string) => requests.delete(`/activities/${id}/attend`),
};

const User = {
  current: (): Promise<IUser> => requests.get("/User"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/User/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/User/register`, user),
  update: (values: IProfileFormValues): Promise<IUser> =>
    requests.put(`/User`, values),
  loginExternal: (ExternalLoginInfo: IExternalLoginInfo): Promise<IUser> =>
    requests.post(`/User/ExternalLogin`, ExternalLoginInfo),
};

const Profile = {
  get: (userName: string): Promise<IProfile> =>
    requests.get(`/Profiles/${userName}`),
  uploadImage: (file: Blob): Promise<IPhoto> =>
    requests.postForm("/Photos", file),
  deleteImage: (id: string) => requests.delete(`/Photos/${id}`),
  setMainPhoto: (id: string) => requests.post(`/Photos/${id}/setMain`, {}),
  followUser: (userName: string) =>
    requests.post(`/Profiles/${userName}/follow`, {}),
  unfollowUser: (userName: string) =>
    requests.post(`/Profiles/${userName}/unfollow`, {}),
  getFollowersOrFollowing: (
    userName: string,
    predicate: string
  ): Promise<IProfile[]> =>
    requests.get(`/Profiles/${userName}/follow?predicate=${predicate}`),
  listActivites: (
    userName: string,
    predicate: string
  ): Promise<IUserActivity[]> =>
    requests.get(`/Profiles/${userName}/activities?predicate=${predicate}`),
  getSignature: (formdata: FormData): Promise<string> =>
    requests.post("/Photos/getSignature", formdata),
  UploadResults: (photoUploadResult: PhotoUploadResult): Promise<IPhoto> => {
    return requests.post("/Photos/postUploadResults", photoUploadResult);
  },
};
const exportobj = {
  Activities,
  User,
  Profile,
};
export default exportobj;
