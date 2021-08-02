import React from "react";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";

import logo from "../../assets/images/logo3.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { logout, selectUserInfo } from "../../redux/reducers/auth";
import { connect } from "react-redux";
import { customColors } from "../../colors";

const mapDispatchToProps = { logout };
const mapStateToProps = (state) => ({
  userInfo: selectUserInfo(state),
});

const useStyles = makeStyles((theme) => ({
  mainColor: {
    color: customColors.main,
  },
}));

const CustomerHeader = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logout, userInfo } = props;
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { accountInfo } = userInfo;
  return (
    <AppBar color={"inherit"} position={"fixed"}>
      <Grid container justify={"space-around"} alignItems={"center"}>
        <Grid item xs={12} md={3}>
          <Box display={"flex"} alignItems={"center"}>
            <img src={logo} alt="logo" />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
            <Box marginRight={2}>
              <Button style={{ textTransform: "none" }}>
                <Typography className={classes.mainColor} variant={"body1"} align={"right"}>
                  My posts
                </Typography>
              </Button>
            </Box>
            <Button style={{ textTransform: "none" }}>
              <Typography className={classes.mainColor} variant={"body1"} align={"right"}>
                Messages
              </Typography>
            </Button>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircleIcon style={{ color: customColors.lightGrey }} fontSize={"large"} />
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            style={{ top: 40 }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Typography className={classes.mainColor}>{accountInfo.fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHeader);
