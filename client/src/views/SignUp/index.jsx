import React, { useState } from "react";

import { customColors } from "../../colors";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";

import Auth from "../../components/Auth";
import { accountTypesEnum } from "../../constants";
import CustomerSignUp from "./CustomerSignUp";
import BusinessSignUp from "./BusinessSignUp";

const useStyles = makeStyles({
  selected: {
    background: customColors.main,
  },
});

const SignUp = (props) => {
  const classes = useStyles();
  const [accountType, setAccountType] = useState(accountTypesEnum.CUSTOMER);

  return (
    <Auth {...props} title={"Create account"}>
      <Grid container justify={"space-around"}>
        <Grid item xs={12}>
          <Typography align={"center"}> I want to? </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => setAccountType(accountTypesEnum.CUSTOMER)}
            className={accountType === accountTypesEnum.CUSTOMER ? classes.selected : ""}
            variant={accountType === accountTypesEnum.CUSTOMER ? "contained" : "outlined"}
            fullWidth
            color={"primary"}
          >
            Find a Baker
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => setAccountType(accountTypesEnum.BAKER)}
            fullWidth
            variant={accountType === accountTypesEnum.BAKER ? "contained" : "outlined"}
            className={accountType === accountTypesEnum.BAKER ? classes.selected : ""}
            color={"primary"}
          >
            Become a Baker
          </Button>
        </Grid>
      </Grid>

      {accountType === accountTypesEnum.CUSTOMER ? <CustomerSignUp /> : <BusinessSignUp />}
    </Auth>
  );
};

export default SignUp;
