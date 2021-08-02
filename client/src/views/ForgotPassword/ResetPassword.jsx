import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress, makeStyles, Typography } from "@material-ui/core";

import Auth from "../../components/Auth";
import { StyledTextField } from "../../components/Styled";
import { isEmpty, validateEmail, validatePassword } from "../../utils/validation";
import { resetPassword, selectUsersIsLoading } from "../../redux/reducers/users";
import { customColors } from "../../colors";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  title: {
    color: customColors.black,
    marginTop: theme.spacing(-3),
    marginBottom: theme.spacing(3),
  },
  subtitle: {
    color: customColors.black,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
  },
}));

const mapStateToProps = (state) => ({
  isLoading: selectUsersIsLoading(state),
});

const mapDispatchToProps = {
  resetPassword,
};

const ResetPassword = (props) => {
  const { resetPassword, isLoading } = props;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!validateEmail(email)) {
      return setEmailError(!!validateEmail(email));
    }
    if (!!isEmpty(verificationCode)) {
      return setVerificationCodeError(isEmpty(verificationCodeError));
    }
    if (!!validatePassword(newPassword)) {
      return setNewPasswordError(validatePassword(newPassword));
    }
    resetPassword({ email, newPassword, verificationCode });
  };

  return (
    <Auth {...props} backButtonUrl={"/login"} backButtonTitle={"Login"} title={""}>
      <Typography color={"primary"} className={classes.title} align={"center"} variant="h5">
        Reset password{" "}
      </Typography>

      <Typography
        color={"primary"}
        className={classes.subtitle}
        component="h5"
        variant="body2"
        align={"center"}
      >
        Please enter your email, verification code from email and new password
      </Typography>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!emailError}
          helperText={emailError ? validateEmail(email) : ""}
          onFocus={() => setEmailError(false)}
          onBlur={() => setEmailError(validateEmail(email))}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="verificationCode"
          label="Verification code"
          name="verificationCode"
          error={!!verificationCodeError}
          helperText={verificationCodeError || ""}
          onFocus={() => setVerificationCodeError(false)}
          onBlur={() => setVerificationCodeError(isEmpty(verificationCode))}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <StyledTextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="newPassword"
          label="New password"
          name="newPassword"
          type="password"
          error={!!newPasswordError}
          helperText={newPasswordError || ""}
          onFocus={() => setNewPasswordError(false)}
          onBlur={() => setNewPasswordError(validatePassword(newPassword))}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          id={"resetPassword"}
          type="submit"
          fullWidth
          variant="contained"
          color={"inherit"}
          className={"sign-in-btn"}
        >
          {isLoading ? <CircularProgress color={"primary"} /> : "Reset password"}
        </Button>
      </form>
    </Auth>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
