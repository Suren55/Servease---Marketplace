import axios from "axios";

import { apiBaseURL, localStorageKeys } from "../constants";
import store from "../redux/store";
import { logout } from "../redux/reducers/auth";

const api = axios.create({
  baseURL: apiBaseURL,
});

api.interceptors.request.use(
  async (config) => {
    const cognitoUserId = localStorage.getItem(localStorageKeys.USER_COGNITO_ID);
    if (cognitoUserId) {
      config.headers["Cognito-User-Id"] = cognitoUserId;
      return config;
    }

    store.dispatch(logout());
    return Promise.reject("Missing cognito user id");
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
