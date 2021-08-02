import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  makeStyles,
  CircularProgress,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { selectUsersIsLoading, createNewUser } from "../../redux/reducers/users";
import { isEmpty, validateEmail, validatePassword } from "../../utils/validation";
import { Multiselect } from "multiselect-react-dropdown";
import { accountTypes, businessFormOptions } from "../../constants";
import { StyledTextField } from "../../components/Styled";
import { customColors } from "../../colors";
const mapStateToProps = (state) => ({
  isLoading: selectUsersIsLoading(state),
});

const mapDispatchToProps = {
  createNewUser,
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
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
  nameInput: {},
}));

const BusinessSignUp = (props) => {
  const { isLoading, createNewUser } = props;

  const [state, setState] = useState({
    email: "",
    password: "",
    businessName: "",
    selectedValue: [],
    emailError: false,
    passwordError: false,
    cognitoError: false,
    businessNameError: false,
    placeHolder: "",
    privacyChecked: false,
    privacyCheckedError: false,
    isFormValid: false,
    selectError: false,
  });

  const classes = useStyles();

  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password, businessName, selectedValue } = state;

    if (!!isEmpty(businessName)) {
      return setState({
        ...state,
        businessNameError: "Name is required",
      });
    }

    if (state.selectedValue.length < 1) {
      return setState({ ...state, selectError: "Please minimum 1 specialties" });
    }

    if (!!validateEmail(email)) {
      return setState({
        ...state,
        emailError: "Invalid email",
      });
    }

    if (!!validatePassword(password)) {
      return setState({
        ...state,
        passwordError: validatePassword(password),
      });
    }
    if (!state.privacyChecked) {
      return setState({ ...state, privacyCheckedError: "Please accept the terms." });
    }

    // AWS Cognito integration

    const userType = accountTypes.business;
    // add the user to MongoDB
    createNewUser({ email, password, businessName, specialties: selectedValue, userType });

    // show the error in the UI
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      [`${e.target.name}Error`]: false,
    });
  };
  const isValidInput = (e) => {
    let error = validateEmail(e.target.value);
    if (e.target.name === "email") {
      if (error) {
        return setState({
          ...state,
          [`${e.target.name}Error`]: error,
          isFormValid: false,
        });
      }
    }
    if (e.target.name === "password") {
      error = validatePassword(e.target.value);
      if (error) {
        return setState({
          ...state,
          [`${e.target.name}Error`]: error,
          isFormValid: false,
        });
      }
    }
    error = isEmpty(e.target.value);
    if (error) {
      return setState({
        ...state,
        [`${e.target.name}Error`]: error,
        isFormValid: false,
      });
    }

    setState({
      ...state,
      [`${e.target.name}Error`]: false,
      isFormValid: true,
    });
    return true;
  };

  const resetErrorField = (e) => setState({ ...state, [`${e.target.name}Error`]: false });

  const onSelect = (selectedList, selectedItem) => {
    if (selectedList.length === 3) {
      setState({ ...state, placeholder: "", selectedValue: selectedList, selectError: false });
    } else {
      const count = 3 - selectedList.length;
      setState({
        ...state,
        placeholder: "Choose " + count + " more",
        selectedValue: selectedList,
        selectError: false,
      });
    }
  };

  const onRemove = (selectedList, removedItem) => {
    if (selectedList.length === 0) {
      setState({
        ...state,
        placeholder: "Choose up to 3 specialties",
        selectedValue: selectedList,
        selectError: false,
      });
    } else {
      const count = 3 - selectedList.length;
      setState({
        ...state,
        placeholder: "Choose " + count + " more",
        selectedValue: selectedList,
        selectError: false,
      });
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={onSubmit}>
        <StyledTextField
          className={classes.nameInput}
          margin="normal"
          fullWidth
          id="businessName"
          label="Business Name or Your Full Name"
          name="businessName"
          error={!!state.businessNameError}
          helperText={state.businessNameError || ""}
          onFocus={resetErrorField}
          onBlur={isValidInput}
          value={state.businessName}
          onChange={onChange}
          variant="outlined"
        />

        <Multiselect
          id={"multiselect"}
          options={businessFormOptions} // Options to display in the dropdown
          selectedValues={state.selectedValue} // Preselected value to persist in dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          placeholder={state.placeholder}
          selectionLimit="3"
        />
        <Typography color={"error"}>{state.selectError}</Typography>

        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!state.emailError}
          helperText={state.emailError || ""}
          onFocus={resetErrorField}
          onBlur={isValidInput}
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
          onBlur={isValidInput}
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSignUp);
