import { all } from "redux-saga/effects";
import authWatcher from "./authSaga";
import usersWatcher from "./userSaga";
import postWatcher from "./postsSage";
export default function* rootSaga() {
  yield all([authWatcher(), usersWatcher(), postWatcher()]);
}
