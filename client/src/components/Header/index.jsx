import React from "react";
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";

import logo from "../../assets/images/logo3.png";

import { AccountCircle } from "@material-ui/icons";
import { logout, selectUserInfo } from "../../redux/reducers/auth";
import { connect } from "react-redux";

const mapDispatchToProps = { logout };
const mapStateToProps = (state) => ({
  userInfo: selectUserInfo(state),
});

const AppHeader = (props) => {
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
            <Typography variant={"body1"} align={"right"}>
              {accountInfo.businessName}
            </Typography>
            <IconButton onClick={handleMenu} color="inherit">
              <AccountCircle fontSize={"large"} />
            </IconButton>
          </Box>

          <Menu
            id="menu-appbar"
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
