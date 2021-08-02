import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Grid, InputBase, makeStyles, Typography } from "@material-ui/core";

import logo from "../../assets/images/logo3.png";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { logout, selectIsLoggedIn, selectUserInfo } from "../../redux/reducers/auth";
import { customColors } from "../../colors";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: customColors.white,
    boxShadow: "2px 2px 1px rgba(0,0,0,0.1)",
    "&:hover": {
      backgroundColor: customColors.greyLine,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Header = (props) => {
  const { isLoggedIn, userInfo, logOut } = props;

  const classes = useStyles();
  return (
    <AppBar id={"header"} color={"inherit"} position={"fixed"}>
      <Grid container justify={"space-around"}>
        <Grid item xs={12} md={1}>
          <img src={logo} alt="logo" />
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container justify={"flex-end"}>
            <Box className={classes.search}>
              <Box className={classes.searchIcon}>
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Browse local bakers"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            {isLoggedIn ? (
              <>
                <Box marginLeft={1} marginRight={1} display={"flex"} alignItems={"center"}>
                  <Typography>{userInfo?.accountInfo?.fullName}</Typography>
                </Box>
                <Link to={""} onClick={logOut} className="button1">
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link className="button1" to="/login">
                  Login
                </Link>
                <Link className="button1" to="/sign-up">
                  Sign Up
                </Link>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
  userInfo: selectUserInfo(state),
});

const mapDispatchToProps = {
  logOut: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
