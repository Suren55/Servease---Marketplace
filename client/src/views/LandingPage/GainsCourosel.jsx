import React, { useState } from "react";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import { Box, Grid, makeStyles, Paper, Typography, Zoom } from "@material-ui/core";
import { customColors } from "../../colors";
import face from "../../assets/images/face.jpg";

const useStyles = makeStyles((theme) => ({
  height100: { height: "100%" },
  cursor: {
    cursor: "pointer",
  },
  icon: {
    borderRadius: "100%",
    borderWidth: 5,
  },
  paper: {
    backgroundColor: customColors.grey2,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
  },
  paperHeader: {
    marginBottom: theme.spacing(4),
    backgroundColor: customColors.main,
    height: 30,
    borderTopRightRadius: theme.spacing(2),
    borderBottomLeftRadius: theme.spacing(2),
  },
  paperFooter: {
    marginTop: theme.spacing(4),
    backgroundColor: customColors.white,
    // height: 20,
    borderTopRightRadius: theme.spacing(5),
    borderTopLeftRadius: theme.spacing(5),
    borderBottomRightRadius: theme.spacing(2),
  },
  fontMainColor: {
    color: customColors.main,
  },
  iconWrapper: {
    height: "100%",
    // cursor: "pointer",
  },
}));

const gains = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  id est laborum.",
    img: face,
    fullName: "Aziz Abidi",
    customization: "Aniversity Cake",
    stars: 5,
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  id est laborum.",
    img: face,
    fullName: "Abidi Aziz",
    customization: "Cake",
    stars: 5,
  },
];
const iconStyle = {
  borderRadius: "100%",
  borderWidth: 2,
  color: customColors.main,
  borderStyle: "solid",
};

const GainsCourosel = () => {
  const classes = useStyles();
  const [activeGain, setActiveGain] = useState(0);

  const isFirst = activeGain >= gains.length - 1;
  const isEnd = activeGain < gains.length - 1;
  const handleNext = () => {
    isEnd && setActiveGain((activeGain) => activeGain + 1);
  };
  const handlePrevious = () => {
    isFirst && setActiveGain((activeGain) => activeGain - 1);
  };
  return (
    <Grid container className={classes.height100}>
      <Grid item md={2} xs={1} className={classes.height100}>
        <Box
          style={{ cursor: !isFirst ? "default" : "pointer" }}
          onClick={handlePrevious}
          className={classes.iconWrapper}
          display={"flex"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavigateBeforeIcon
            style={{ ...iconStyle, opacity: isFirst ? 1 : 0.2 }}
            fontSize={"large"}
          />
        </Box>
      </Grid>
      <Grid item md={8} xs={10}>
        <Box height={500} margin={1} style={{ position: "relative" }}>
          {gains.map((gain, i) => (
            <Zoom
              key={i}
              style={{ position: "absolute" }}
              timeout={1000}
              in={activeGain === i}
              mountOnEnter
              unmountOnExit
            >
              <Paper className={classes.paper} elevation={4}>
                <Box marginBottom={5} className={classes.paperHeader} />
                <Box padding={3}>
                  <FormatQuoteIcon className={classes.fontMainColor} fontSize={"large"} />
                  <Typography className={classes.fontMainColor} variant={"subtitle2"}>
                    {gain.text}
                  </Typography>
                </Box>
                <Box padding={3} className={classes.paperFooter} display={"flex"}>
                  <img alt={"face"} width={80} src={gain.img} style={{ borderRadius: "100%" }} />
                  <Box marginLeft={2}>
                    <Typography className={classes.fontMainColor}>{gain.fullName}</Typography>
                    <Typography className={classes.fontMainColor}>{gain.customization}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          ))}
        </Box>
      </Grid>
      <Grid item md={2} xs={1} className={classes.height100}>
        <Box
          onClick={handleNext}
          style={{ cursor: !isEnd ? "default" : "pointer" }}
          className={classes.iconWrapper}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavigateNextIcon
            fontSize={"large"}
            style={{
              ...iconStyle,
              opacity: isEnd ? 1 : 0.2,
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default GainsCourosel;
