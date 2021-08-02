import React from "react";

import { Container, Grid, makeStyles, Typography, Box } from "@material-ui/core";

import { customColors } from "../../colors";

import CustomForm from "./Form";
import HowItWorks from "./HowItWorks";
import WhatGain from "./WhatGain";

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    // marginTop: theme.spacing(15),
    // display: "flex",
    // alignItems: "center",
    minWidth: "100vw",
    minHeight: "100vh",
    padding: 0,
    // backgroundColor: "#43A8F6",
  },
  content: {
    // ba
    backgroundColor: "#43A8F6",
    paddingTop: theme.spacing(18),
  },
  color: {
    fontWeight: "bold",
    color: customColors.white,
  },
}));

const Content = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth={false} className={classes.contentContainer}>
      <Grid className={classes.content} container>
        <Grid item md={1} />
        <Grid item xs={12} md={10}>
          <Box marginBottom={10}>
            <Box marginBottom={3}>
              <Typography className={classes.color} align={"center"} variant={"h3"}>
                Find your perfect bakers
              </Typography>
            </Box>
            <Typography className={classes.color} align={"center"} variant={"h3"}>
              in minutes ...
            </Typography>
            <Box marginTop={5}>
              <Typography className={classes.color} align={"center"} variant={"h4"}>
                Best local bakers in one place
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container>
          <Grid item md={2} xl={3} />
          <Grid item xs={12} md={8} xl={6}>
            <CustomForm />
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={1} xl={2} />

        <Grid item xs={12} md={10} xl={8}>
          <HowItWorks />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item md={1} />
        <Grid item xs={12} md={10}>
          <WhatGain />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Content;
