import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { history } from "./redux/history";
import { ConnectedRouter } from "connected-react-router";

import Login from "./views/Login";
import Notification from "./components/Notification";

import store from "./redux/store";

import TermsAndConditions from "./views/TermsAndCondition";
import PrivateRoute from "./components/PrivateRoute";
import AppWrapper from "./views/AppWrapper";
import LandingPage from "./views/LandingPage";
import SignUp from "./views/SignUp";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ForgotPassword/ResetPassword";
import NotFound from "./views/NotFound";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <PrivateRoute path={"/app"} component={AppWrapper} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/terms-and-conditions" component={TermsAndConditions} />
          <Route path="/login" exact component={Login} />
          <Route path="/not-found" exact component={NotFound} />
          <Route path="/" exact component={LandingPage} />
          <Redirect to={"/not-found"} />
        </Switch>
      </ConnectedRouter>
      <Notification />
    </Provider>
  );
}

export default App;
