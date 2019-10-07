import axios from "axios";
import configureStore from "../redux/store";
const { persistor, store } = configureStore();

const BASE_URL = "http://launchmatic-backend.inspiredsolutions.pe";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  request => {
    try {
      const token = store.getState().auth.token;

      if (token) {
        request.headers.Authorization = `JWT ${token}`;
      }
    } catch (error) {}
    console.log("Http request", request);
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    console.log("Http response", response);
    return response;
  },
  error => {
    console.log("Http response", error.response);
    if (error.response.status === 401) {
      console.log("Unauthorized!");
    }

    return Promise.reject(error);
  }
);

export default api;
