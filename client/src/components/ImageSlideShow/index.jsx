import React, { useState } from "react";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { Box, Grid, makeStyles, Zoom } from "@material-ui/core";
import { customColors } from "../../colors";

const useStyles = makeStyles((theme) => ({
  height100: { height: "100%" },

  img: {
    borderRadius: theme.spacing(1),
    boxShadow: "3px 0px 5px 0px rgba(98,193,197,1)",
  },
  iconWrapper: {
    height: "100%",
    // cursor: "pointer",
  },
}));

const iconStyle = {
  borderRadius: "100%",
  borderWidth: 2,
  color: customColors.main,
  borderStyle: "solid",
};

const ImageSlideShow = ({ images }) => {
  const classes = useStyles();
  const [activeImage, setActiveImage] = useState(0);

  const isFirst = images.length >= 0 && activeImage === 0;

  const isEnd = images.length > 1 && activeImage < images.length - 1;

  const handleNext = () => {
    isEnd && setActiveImage((activeImage) => activeImage + 1);
  };

  const handlePrevious = () => {
    !isFirst && setActiveImage((activeImage) => activeImage - 1);
  };

  return (
    <Grid container className={classes.height100}>
      <Grid item xs={1} className={classes.height100}>
        <Box
          style={{ cursor: isFirst ? "default" : "pointer" }}
          onClick={handlePrevious}
          className={classes.iconWrapper}
          display={"flex"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <NavigateBeforeIcon
            style={{ ...iconStyle, opacity: isFirst ? 0.2 : 1 }}
            fontSize={"large"}
          />
        </Box>
      </Grid>
      <Grid item xs={10} style={{ position: "relative" }}>
        {images.map((image, i) => (
          <Zoom
            key={i}
            style={{ position: "absolute" }}
            timeout={1000}
            in={activeImage === i}
            mountOnEnter
            unmountOnExit
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              height={"100%"}
            >
              <img
                className={classes.img}
                src={image}
                alt={"img"}
                // style={{ height: "13rem" }}
                width={"95%"}
                height={"100%"}
              />
            </Box>
          </Zoom>
        ))}
      </Grid>
      <Grid item xs={1} className={classes.height100}>
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

export default ImageSlideShow;
