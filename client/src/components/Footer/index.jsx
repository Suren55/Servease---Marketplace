import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import logo from "../../assets/images/logo3.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import { customColors } from "../../colors";

const Footer = ({ number, selected }) => {
  return (
    <Container
      style={{
        minWidth: "100vw",
        backgroundColor: customColors.main,
        padding: 30,
      }}
    >
      <Box alignItems={"center"}>
        <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
          <img alt={"logo"} src={logo} />
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
          <LinkedInIcon style={{ marginRight: 5, color: "#fff" }} />
          <FacebookIcon style={{ color: "#fff" }} />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography style={{ color: "#fff" }}>contact@servease.co</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
          <Typography style={{ color: "#fff" }}>+12 345 6789</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
