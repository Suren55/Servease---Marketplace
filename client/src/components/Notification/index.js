import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import {
  hideNotification,
  selectIsShown,
  selectOptions,
  selectTitle,
  selectMessage,
  selectType,
} from "../../redux/reducers/notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "block",
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const mapStateToProps = (state) => ({
  shown: selectIsShown(state),
  options: selectOptions(state),
  title: selectTitle(state),
  message: selectMessage(state),
  type: selectType(state),
});
const mapDispatchToProps = {
  hideNotification,
};

const Notification = (props) => {
  const classes = useStyles();

  const { shown, hideNotification, title, message, type, options } = props;
  const { anchorOrigin, variant } = options;

  const handleClose = () => {
    hideNotification();
  };

  return (
    <Snackbar
      className={classes.root}
      open={shown}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert severity={type || "error"} variant={variant} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
