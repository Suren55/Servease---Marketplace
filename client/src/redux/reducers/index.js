import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import notifications from "./notifications";
import users from "./users";
import posts from "./posts";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    notifications,
    users,
    posts,
  });

export default createRootReducer;
