import React from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { customColors } from "../../colors";
import GainsCourosel from "./GainsCourosel";

const useStyles = makeStyles((theme) => ({
  color: {
    fontWeight: "bold",
    color: customColors.white,
  },
  card: {
    backgroundColor: "#fff",
    boxShadow: "0px 3px 5px 1px  rgba(98,193,197,0.5)",
  },
  title: {
    color: customColors.title,
  },
}));

const gains = [
  "You save time",
  "You stop having same conversational with multiple bakers",
  "You relax and order your dream cake at the same time",
];
const WhatGain = () => {
  const classes = useStyles();
  return (
    <Box marginBottom={10}>
      <Box marginBottom={10}>
        <Box marginBottom={3} padding={1}>
          <Typography align={"center"} variant={"h2"}>
            <strong>
              What you <span className={classes.title}>gain</span>
            </strong>
          </Typography>
        </Box>
      </Box>

      <Box marginBottom={10} className={classes.card} padding={2}>
        <Box marginBottom={3}>
          <Grid container justify={"center"}>
            <Grid item md={6}>
              {gains.map((gain, i) => (
                <Box key={i} display={"flex"} alignItems={"center"} marginBottom={5}>
                  <Circle number={i + 1} />
                  <Box
                    marginLeft={-2}
                    padding={2}
                    paddingLeft={5}
                    height={60}
                    width={"70%"}
                    style={{
                      backgroundColor: customColors.main,
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Typography align={"center"} variant={"body2"} className={classes.color}>
                      {gain}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item md={6} xs={12}>
              <GainsCourosel />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const Circle = ({ number, selected }) => {
  return (
    <Box
      width={100}
      height={100}
      style={{
        zIndex: 100,
        borderRadius: 100,
        boxShadow: "5px 0px 0px 0.5px rgba(98,193,197,1)",
        backgroundColor: "#fff",
      }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant={"h3"}>
        <strong style={{ color: customColors.title }}>{number}</strong>
      </Typography>
    </Box>
  );
};

export default WhatGain;
