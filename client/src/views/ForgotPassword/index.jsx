import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, CircularProgress, makeStyles, Typography } from "@material-ui/core";
import { StyledTextField } from "../../components/Styled";
import { validateEmail } from "../../utils/validation";
import Authentication from "../../components/Auth";
import { customColors } from "../../colors";
import { selectUsersIsLoading, forgotPassword } from "../../redux/reducers/users";

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
  forgotPassword,
};
const ForgotPassword = (props) => {
  const { forgotPassword, isLoading } = props;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!validateEmail(email)) {
      return setEmailError(!!validateEmail(email));
    }
    forgotPassword({ email });
  };

  return (
    <Authentication {...props} backButtonUrl={"/login"} backButtonTitle={"Login"} title={""}>
      <Typography color={"primary"} className={classes.title} align={"center"} variant="h5">
        Forgot password?
      </Typography>

      <Typography
        color={"primary"}
        className={classes.subtitle}
        component="h5"
        variant="body2"
        align={"center"}
      >
        Enter your email to get a reset link
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
          error={emailError}
          helperText={emailError ? validateEmail(email) : ""}
          onFocus={() => setEmailError(false)}
          onBlur={() => setEmailError(!!validateEmail(email))}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={"inherit"}
          className={"sign-in-btn"}
        >
          {isLoading ? <CircularProgress color={"primary"} /> : "Get the link"}
        </Button>
      </form>
    </Authentication>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
