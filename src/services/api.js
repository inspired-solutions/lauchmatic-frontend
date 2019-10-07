import axios from "axios";
// import configureStore from "../redux/store";
import authAction from "./../redux/actions/AuthActions";

const BASE_URL = "http://launchmatic-backend.inspiredsolutions.pe";

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(
  request => {
    try {
      const { token } = JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")).auth
      );
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
      // store.dispatch(authAction.logout());
      console.log("Unauthorized!");
    }

    return Promise.reject(error);
  }
);

export default api;
