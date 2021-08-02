import React, { useState } from "react";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { customColors } from "../../colors";

import submitRequestImg from "../../assets/images/image1.png";
import receiveOffersImg from "../../assets/images/image2.png";
import finalizeImg from "../../assets/images/image2.png";
const useStyles = makeStyles((theme) => ({
  color: {
    fontWeight: "bold",
    color: customColors.white,
  },
  card: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
    minHeight: 450,
    backgroundColor: "#fff",
    transition: "all .2s ease-in-out",
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.3)",
  },
  cardSelected: {
    marginBottom: theme.spacing(5),
    padding: theme.spacing(2),
    minHeight: 450,
    backgroundColor: "#fff",
    transition: "all .2s ease-in-out",
    boxShadow: "3px 3px 6px 0px rgba(98,193,197,0.7)",
    transform: "scaleX(1.08) scaleY(1.08)",
  },
  title: {
    color: customColors.title,
  },
}));
const steps = [1, 2, 3];
const HowItWorks = () => {
  const classes = useStyles();
  const [selectedBox, setSelectedBox] = useState(1);

  const handleMouseLeave = () => setSelectedBox(0);

  return (
    <Box marginBottom={10} marginTop={10}>
      <Box marginBottom={10}>
        <Box marginBottom={3} padding={2}>
          <Typography align={"center"} variant={"h2"}>
            <strong>
              How it <span className={classes.title}>works</span>
            </strong>
          </Typography>
        </Box>
      </Box>
      <Grid container justify={"space-around"} style={{ position: "relative" }}>
        <Box
          width={"70%"}
          style={{ borderBottom: "2px dashed rgba(0,0,0,0.3)" }}
          marginTop={5}
          zIndex={0}
          position={"absolute"}
        />

        {steps.map((step, i) => (
          <Box key={i} marginBottom={10} zIndex={2}>
            <Grid item md={1}>
              <Circle selected={step === selectedBox} number={step} />
            </Grid>
          </Box>
        ))}
      </Grid>
      <Grid container justify={"space-around"}>
        <Grid item md={3} xs={10}>
          <Box
            onMouseEnter={() => setSelectedBox(1)}
            onMouseLeave={handleMouseLeave}
            className={selectedBox === 1 ? classes.cardSelected : classes.card}
          >
            <img alt="img1" src={submitRequestImg} width={"100%"} />
            <Box marginTop={5} marginBottom={2}>
              <Typography align={"center"} className={classes.title} variant={"h5"}>
                Submit a Request
              </Typography>
            </Box>
            <Typography variant={"subtitle1"} align={"center"}>
              Simply answer a few questions about your occasion and the type of cake you're looking
              for
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3} xs={10}>
          <Box
            onMouseEnter={() => setSelectedBox(2)}
            onMouseLeave={handleMouseLeave}
            className={selectedBox === 2 ? classes.cardSelected : classes.card}
          >
            <img alt="img2" src={receiveOffersImg} width={"100%"} height={200} />
            <Box marginTop={5} marginBottom={2}>
              <Typography className={classes.title} variant={"h5"} align={"center"}>
                Receive offers
              </Typography>
            </Box>
            <Typography variant={"subtitle1"} align={"center"}>
              Receive offers from local bakers interested in taking your order, compare them and
              choose the one you like most
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3} xs={10}>
          <Box
            onMouseEnter={() => setSelectedBox(3)}
            onMouseLeave={handleMouseLeave}
            className={selectedBox === 3 ? classes.cardSelected : classes.card}
          >
            <img alt="img3" src={finalizeImg} width={"100%"} />
            <Box marginTop={5} marginBottom={2}>
              <Typography align={"center"} className={classes.title} variant={"h5"}>
                Finalize and pay
              </Typography>
            </Box>
            <Typography variant={"subtitle1"} align={"center"}>
              Discus the final details with the baker, pay online and arrange pickup/delivery with
              the baker
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Circle = ({ number, selected }) => {
  return (
    <Box
      width={80}
      height={80}
      style={{
        transition: "all .2s ease-in-out",

        borderRadius: 50,
        boxShadow: selected
          ? "3px 3px 5px 0px rgba(0,0,0,0.5)"
          : "3px 3px 6px 0px rgba(98,193,197,0.7)",
        backgroundColor: selected ? "rgba(98,193,197,1)" : "#fff",
      }}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography variant={"h3"}>
        <strong style={{ color: selected ? "#fff" : "#000" }}>{number}</strong>
      </Typography>
    </Box>
  );
};
export default HowItWorks;
