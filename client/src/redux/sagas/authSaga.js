import { takeEvery, call, put } from "@redux-saga/core/effects";
import { replace } from "connected-react-router";

import {
  CHECK_VERIFICATION_REQUEST,
  checkVerificationFailed,
  checkVerificationRequest,
  checkVerificationSuccess,
  LOGIN_REQUEST,
  loginFailed,
  loginSuccess,
  LOGOUT,
  logoutFailed,
  logoutSuccess,
} from "../reducers/auth";
import { localStorageKeys } from "../../constants";

import { showErrorNotification } from "../reducers/notifications";

import { Auth } from "aws-amplify";
import api from "../../utils/api";

function* login(action) {
  try {
    const { email, password } = action.payload;
    const awsResponse = yield call([Auth, "signIn"], {
      username: email,
      password,
    });
    const { signInUserSession, username } = awsResponse;
    const { accessToken } = signInUserSession;
    localStorage.setItem(localStorageKeys.USER_COGNITO_ID, username);
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken.getJwtToken());

    yield put(loginSuccess());
    yield put(checkVerificationRequest());
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message || "Login failed" }));
    yield put(loginFailed());
  }
}

function* logout() {
  try {
    yield call([Auth, "signOut"]);
    yield put(logoutSuccess());
  } catch (e) {
    console.log(e);
    yield put(logoutFailed());
  }
}

function* checkVerification() {
  try {
    yield call([Auth, "currentAuthenticatedUser"]);
    const { data: userInfo } = yield call(api.get, "/auth/verification");
    yield put(checkVerificationSuccess({ userInfo }));
    if (userInfo.userInfo.userType === "customer") {
      yield put(replace("/app/customer"));
    } else {
      yield put(replace("/app"));
    }
  } catch (e) {
    console.log(e);
    yield put(checkVerificationFailed());
  }
}

export default function* authWatcher() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(CHECK_VERIFICATION_REQUEST, checkVerification);
}
