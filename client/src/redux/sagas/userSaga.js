import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import * as usersActions from "../reducers/users";
import { showErrorNotification, showSuccessNotification } from "../reducers/notifications";
import { accountTypes, apiBaseURL } from "../../constants";

import { replace } from "connected-react-router";
import { Auth } from "aws-amplify";

function* createNewUser(action) {
  try {
    const { userType, email, password } = action.payload;

    const { userSub } = yield call([Auth, "signUp"], {
      username: email,
      password: password,
    });

    const url = userType === accountTypes.customer ? "/customers" : "/businesses";
    yield call(axios.post, apiBaseURL + url, { ...action.payload, userCognitoId: userSub });

    yield put(
      showSuccessNotification({
        message: "We sent you an email. Please verify your account to be able to login",
      })
    );
    yield put(replace("/login"));
    yield put(usersActions.createNewUserSuccess());
  } catch (e) {
    console.log(e);
    console.log(e.response);
    yield put(usersActions.createNewUserFailed());
    const message =
      e.response?.data?.message || e.message || "Error while receiving your registration";
    yield put(showErrorNotification({ message }));
  }
}

function* forgotPassword(action) {
  try {
    const { email } = action.payload;

    yield call([Auth, "forgotPassword"], email);

    yield put(replace("/reset-password"));
    yield put(
      showSuccessNotification({
        message: "Email with verification code sent. Check your email inbox",
      })
    );
    yield put(usersActions.forgotPasswordSuccess());
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message }));
    yield put(usersActions.forgotPasswordFailed());
  }
}

function* resetPassword(action) {
  try {
    const { email, newPassword, verificationCode } = action.payload;

    yield call([Auth, "forgotPasswordSubmit"], email, verificationCode, newPassword);

    yield put(replace("/login"));
    yield put(usersActions.resetPasswordSuccess());
    yield put(showSuccessNotification({ message: "New password set successfully" }));
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message }));
    yield put(usersActions.resetPasswordFailed());
  }
}

export default function* usersWatcher() {
  yield takeEvery(usersActions.CREATE_NEW_USER, createNewUser);
  yield takeEvery(usersActions.FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeEvery(usersActions.RESET_PASSWORD_REQUEST, resetPassword);
}
