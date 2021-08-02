import { createSelector } from "reselect";
export const CREATE_NEW_USER = "users/CREATE_NEW_USER";
export const CREATE_NEW_USER_SUCCESS = "users/CREATE_NEW_USER_SUCCESS";
export const CREATE_NEW_USER_FAILED = "users/CREATE_NEW_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST = "users/FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "users/FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "users/FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_REQUEST = "users/RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "users/RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "users/RESET_PASSWORD_FAILED";

const initialState = {
  isCreated: false,
  isLoading: false,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_USER:
      return { ...state, isLoading: true };
    case CREATE_NEW_USER_SUCCESS:
      return { ...state, isCreated: true, isLoading: false };
    case CREATE_NEW_USER_FAILED:
      return { ...state, isCreated: false, isLoading: false };
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true };
    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_FAILED:
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAILED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export const createNewUser = (payload) => ({
  type: CREATE_NEW_USER,
  payload,
});
export const createNewUserSuccess = () => ({
  type: CREATE_NEW_USER_SUCCESS,
});
export const createNewUserFailed = () => ({
  type: CREATE_NEW_USER_FAILED,
});

export const forgotPassword = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});
export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});
export const forgotPasswordFailed = () => ({
  type: FORGOT_PASSWORD_FAILED,
});

export const resetPassword = (payload) => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
});
export const resetPasswordFailed = () => ({
  type: RESET_PASSWORD_FAILED,
});

//selectors
const selectUsersState = (state) => {
  return state.users;
};

export const selectUserCreated = createSelector(selectUsersState, (userState) => {
  return userState.isCreated;
});

export const selectUsersIsLoading = createSelector(selectUsersState, (userState) => {
  return userState.isLoading;
});
