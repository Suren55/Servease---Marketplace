import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Button, makeStyles, CircularProgress, Box } from "@material-ui/core";
import {
  selectIsLoggedIn,
  selectIsLoading,
  loginRequest,
  checkVerificationRequest,
} from "../../redux/reducers/auth";
import { isEmpty, validateEmail } from "../../utils/validation";
import { StyledTextField } from "../../components/Styled";
import Authentication from "../../components/Auth";
import Separator from "../../components/Separator";
import LoginWith from "../../components/LoginWith";
import Spinner from "../../components/Loader";

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = {
  login: loginRequest,
  checkVerification: checkVerificationRequest,
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
}));

const Login = (props) => {
  const { isLoading, login, checkVerification } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const classes = useStyles();

  const onLogin = async (e) => {
    e.preventDefault();
    if (!!validateEmail(email)) {
      return setEmailError(!!validateEmail(email));
    }
    if (!!isEmpty(password)) {
      return setPasswordError(!!isEmpty(password));
    }

    login({ email, password });
  };

  useEffect(() => {
    checkVerification();
  }, [checkVerification]);
  //
  // if (isLoggedIn) {
  //   // open app from link
  //   // after check is logged in redirect it to requsted link
  //   const { from } = location.state || { from: { pathname: "/app" } };
  //   return <Redirect to={"/app"} />;
  // }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Authentication {...props} title={"Sign in"}>
      <form className={classes.form} noValidate onSubmit={onLogin}>
        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={emailError}
          helperText={emailError ? validateEmail(email) : ""}
          onFocus={() => setEmailError(false)}
          onBlur={() => setEmailError(!!validateEmail(email))}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={passwordError}
          helperText={passwordError ? "Password is required!" : ""}
          onFocus={() => setPasswordError(false)}
          onBlur={() => setPasswordError(!!isEmpty(password))}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          id={"sign-in"}
          type="submit"
          fullWidth
          variant="contained"
          color={"inherit"}
          className={"sign-in-btn"}
        >
          {isLoading ? <CircularProgress color={"primary"} /> : "Sign In"}
        </Button>

        <Box marginTop={-4} marginBottom={3} textAlign={"center"}>
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot password?
          </Link>
        </Box>

        <Separator />
        <LoginWith />
      </form>
      <Box marginTop={2}>
        <span>Don't have an account? </span>
        <Link to="/sign-up" className="text-decoration-none">
          Signup
        </Link>
      </Box>
    </Authentication>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
