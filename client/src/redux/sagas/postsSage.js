import { takeEvery, call, put, select } from "@redux-saga/core/effects";

import {
  GET_POST_LIST_REQUEST,
  getPostsListSuccess,
  getPostsListFailed,
  CREATE_POST_REQUEST,
  createPostSuccess,
  createPostFailed,
  GET_CUSTOMER_POST_LIST_REQUEST,
  getCustomerPostsListSuccess,
} from "../reducers/posts";

import { showErrorNotification, showSuccessNotification } from "../reducers/notifications";

import api from "../../utils/api";
import { selectIsLoggedIn, selectUserInfo } from "../reducers/auth";
import { localStorageKeys } from "../../constants";

function* getPostsList(action) {
  try {
    const { data: postsList } = yield call(api.get, "/posts");
    yield put(getPostsListSuccess(postsList.content));
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message || "Get post list failed" }));
    yield put(getPostsListFailed());
  }
}

function* createPost(action) {
  try {
    const { form, onSuccess, images } = action.payload;
    const isLoggedIn = yield select(selectIsLoggedIn);
    if (isLoggedIn) {
      const { userInfo } = yield select(selectUserInfo);
      if (userInfo.userType === "customer") {
        const formData = new FormData();
        Object.keys(form).forEach((key) => {
          formData.append(key, form[key]);
        });

        images.map((img) => formData.append("image", img));

        const customerId = localStorage.getItem(localStorageKeys.USER_COGNITO_ID);
        formData.append("customerId", customerId);

        yield call(api.post, "/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        yield put(
          showSuccessNotification({
            message: "Your request is submitted. Watch for offers by bakers.",
          })
        );
        if (onSuccess && typeof onSuccess === "function") {
          onSuccess();
        }
      } else {
        yield put(
          showErrorNotification({
            message:
              "You're logged in as a business. Please create a customer account to be able to submit a request.",
          })
        );
      }
    } else {
      yield put(
        showErrorNotification({ message: "You need to sign in to be able to submit the request." })
      );
    }

    yield put(createPostSuccess());
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message || "Request submission failed." }));
    yield put(createPostFailed());
  }
}

function* getCustomerPostsList(action) {
  try {
    const userCognitoId = localStorage.getItem(localStorageKeys.USER_COGNITO_ID);
    const { data: postsList } = yield call(api.get, `/posts/customers/${userCognitoId}`);
    yield put(getCustomerPostsListSuccess(postsList));
  } catch (e) {
    console.log(e);
    yield put(showErrorNotification({ message: e.message || "Get post list failed" }));
    yield put(getPostsListFailed());
  }
}
export default function* postWatcher() {
  yield takeEvery(GET_POST_LIST_REQUEST, getPostsList);
  yield takeEvery(CREATE_POST_REQUEST, createPost);
  yield takeEvery(GET_CUSTOMER_POST_LIST_REQUEST, getCustomerPostsList);
}
