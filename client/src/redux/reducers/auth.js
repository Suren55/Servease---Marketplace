import { createSelector } from "reselect";

export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const LOGIN_FAILED = "auth/LOGIN_FAILED";
export const GET_USER_INFO_REQUEST = "auth/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "auth/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "auth/GET_USER_INFO_FAILED";
export const LOGOUT = "auth/LOGOUT";
export const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "auth/LOGOUT_FAILED";

export const CHECK_VERIFICATION_REQUEST = "auth/CHECK_VERIFICATION_REQUEST";
export const CHECK_VERIFICATION_SUCCESS = "auth/CHECK_VERIFICATION_SUCCESS";
export const CHECK_VERIFICATION_FAILED = "auth/CHECK_VERIFICATION_FAILED";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case CHECK_VERIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CHECK_VERIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userInfo: action.payload.userInfo,
      };
    case CHECK_VERIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: action.payload.userInfo,
      };
    case GET_USER_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT:
      return { ...state, isLoading: true };
    case LOGOUT_SUCCESS:
      return initialState;
    case LOGOUT_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// actions

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailed = () => ({
  type: LOGIN_FAILED,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailed = () => ({
  type: LOGOUT_FAILED,
});

export const getUserSuccess = (payload) => ({
  type: GET_USER_INFO_SUCCESS,
  payload,
});

export const checkVerificationRequest = () => ({
  type: CHECK_VERIFICATION_REQUEST,
});

export const checkVerificationSuccess = (payload) => ({
  type: CHECK_VERIFICATION_SUCCESS,
  payload,
});

export const checkVerificationFailed = () => ({
  type: CHECK_VERIFICATION_FAILED,
});

// selectors

const selectAuthState = (state) => {
  return state.auth;
};

export const selectIsLoggedIn = createSelector(selectAuthState, (state) => {
  return state.isLoggedIn;
});

export const selectIsLoading = createSelector(selectAuthState, (state) => {
  return state.isLoading;
});

export const selectUserInfo = createSelector(selectAuthState, (state) => {
  return state.userInfo;
});

export default authReducer;
