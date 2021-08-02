import React from "react";

import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { customColors } from "../../colors";

import moment from "moment";
import ImageSlideShow from "../../components/ImageSlideShow";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: customColors.jobTitle,
  },
  name: {
    fontWeight: "bold",
    opacity: 0.5,
    color: customColors.black,
  },
  city: {
    opacity: 0.2,
    color: customColors.black,
  },
  description: {
    opacity: 0.6,
    color: customColors.main,
  },
  delivery: {
    fontWeight: "bold",

    color: customColors.main,
  },
  budget: {
    fontWeight: "bold",
    color: customColors.main,
  },

  showDetails: {
    color: customColors.main,
    cursor: "pointer",
    "&:hover": {
      fontWeight: "bold",
    },
    "&:active": {
      fontWeight: "normal",
      opacity: 0.6,
    },
  },
}));

const ActivePosts = ({ jobs }) => {
  const classes = useStyles();

  return jobs.map((job, i) => {
    return (
      <Grid key={i} container>
        <Grid item xs={1} />
        <Grid item md={10}>
          <Paper elevation={5}>
            <Box padding={4}>
              <Grid container>
                <Grid item md={5}>
                  <Box marginBottom={1}>
                    <Typography className={classes.title} variant={"h5"}>
                      {job.eventType}
                    </Typography>
                  </Box>
                  <Box marginTop={1}>
                    <Typography className={classes.description} variant={"subtitle2"}>
                      {job.notes}
                    </Typography>
                  </Box>
                  <Box marginTop={1}>
                    <Typography className={classes.delivery} variant={"body1"}>
                      Delivery Date:
                      {moment(job.deliveryDate).format("DD-MM-YYYY")}
                    </Typography>
                    <Typography className={classes.budget} variant={"body1"}>
                      Est.Budget: {job.budgetMin}$ -{job.budgetMax}$
                    </Typography>
                  </Box>
                  <Box marginTop={1}>
                    <Typography className={classes.showDetails} variant={"subtitle1"}>
                      Show details
                    </Typography>
                  </Box>

                  <Box width={"50%"} marginTop={1}>
                    <Button className={"view-offer-btn"}>
                      <Typography variant={"h5"}>View offer</Typography>
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <ImageSlideShow images={job.sampleImages} />
                </Grid>
              </Grid>
            </Box>
          </Paper>
          <Box marginTop={5} />
        </Grid>
      </Grid>
    );
  });
};

export default ActivePosts;
