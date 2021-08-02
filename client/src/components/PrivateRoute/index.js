import React, { useEffect, useRef } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkVerificationRequest,
  selectIsLoading,
  selectIsLoggedIn,
} from "../../redux/reducers/auth";

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = {
  checkVerification: checkVerificationRequest,
};

const PrivateRoute = ({ isLoggedIn, isLoading, checkVerification, ...rest }) => {
  const prevLocation = useRef("");
  const location = useLocation();

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      checkVerification();
    }
    prevLocation.current = location.pathname;
  }, [checkVerification, location.pathname]);

  if (isLoading) return null;
  if (isLoggedIn) {
    return <Route {...rest} />;
  }
  return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
