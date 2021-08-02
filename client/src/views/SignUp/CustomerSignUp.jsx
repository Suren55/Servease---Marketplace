import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  makeStyles,
  CircularProgress,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { selectUsersIsLoading, createNewUser } from "../../redux/reducers/users";
import { isEmpty, validateEmail, validatePassword } from "../../utils/validation";
import { StyledTextField } from "../../components/Styled";
import { customColors } from "../../colors";
import { accountTypes } from "../../constants";

const mapStateToProps = (state) => ({
  isLoading: selectUsersIsLoading(state),
});

const mapDispatchToProps = {
  createNewUser,
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  checkedIcon: {
    backgroundColor: customColors.main,
  },
  root: {
    color: customColors.main,
    "&$checked": {
      color: customColors.main,
    },
  },
  checked: {},
}));

const CustomerSignUp = (props) => {
  const { isLoading, createNewUser } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    emailError: false,
    cognitoError: false,
    passwordError: false,
    fullNameError: false,
    privacyChecked: false,
    privacyCheckedError: "",
  });

  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, fullName } = state;
    if (!!isEmpty(fullName)) {
      return setState({
        ...state,
        fullNameError: "Your full name is required",
      });
    }
    if (!!validateEmail(email)) {
      return setState({
        ...state,
        emailError: "Invalid email",
      });
    }

    if (!!isEmpty(password)) {
      return setState({
        ...state,
        passwordError: "Password is required",
      });
    }
    if (!state.privacyChecked) {
      return setState({ ...state, privacyCheckedError: "Please accept the terms." });
    }

    const userType = accountTypes.customer;
    createNewUser({ email, password, fullName, userType });
  };

  const onChange = (e) => {
    return setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: false,
    });
  };

  const onBlur = (e) => {
    let error = validateEmail(e.target.value);

    if (e.target.name === "email") {
      if (error) {
        return setState({
          ...state,
          [`${e.target.name}Error`]: error,
        });
      }
    }

    error = validatePassword(e.target.value);
    if (e.target.name === "password") {
      if (error) {
        return setState({
          ...state,
          passwordError: error,
        });
      }
    }

    error = isEmpty(e.target.value);
    if (error) {
      return setState({
        ...state,
        [`${e.target.name}Error`]: error,
      });
    }

    setState({
      ...state,
      [`${e.target.name}Error`]: false,
    });
  };

  const resetErrorField = (e) => setState({ ...state, [`${e.target.name}Error`]: false });

  return (
    <>
      <form className={classes.form} onSubmit={onSubmit}>
        <StyledTextField
          margin="normal"
          variant="outlined"
          fullWidth
          id="fullName"
          label="Full Name"
          name="fullName"
          error={!!state.fullNameError}
          helperText={state.fullNameError || ""}
          onFocus={resetErrorField}
          onBlur={onBlur}
          value={state.fullName}
          onChange={onChange}
        />
        <StyledTextField
          margin="normal"
          variant="outlined"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!state.emailError}
          helperText={state.emailError || ""}
          onFocus={resetErrorField}
          onBlur={onBlur}
          value={state.email}
          onChange={onChange}
        />
        <StyledTextField
          margin="normal"
          variant="outlined"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          error={!!state.passwordError}
          helperText={state.passwordError || ""}
          onFocus={resetErrorField}
          onBlur={onBlur}
          value={state.password}
          onChange={onChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
              checked={state.privacyChecked}
              onChange={(event) => {
                setState({
                  ...state,
                  privacyChecked: event.target.checked,
                  privacyCheckedError: "",
                });
              }}
              name="privacyChecked"
            />
          }
          label={
            <span>
              I have read and agree to the{" "}
              <a target="_blank" href="/terms-and-conditions">
                terms
              </a>
            </span>
          }
        />
        <Typography color={"error"}>{state.privacyCheckedError}</Typography>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="inherit"
          className={"sign-in-btn"}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress color={"secondary"} /> : "Sign Up"}
        </Button>
      </form>
      <Box className="mb-5">
        <span>Already have an account? </span>
        <Link to="/login" className="text-decoration-none">
          Login
        </Link>
      </Box>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignUp);
