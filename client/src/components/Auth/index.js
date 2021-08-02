import React from "react";
import { Grid, Box, makeStyles, Typography, Link as MaterialLink, Zoom, Button } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styled from "styled-components";
import { customColors } from "../../colors";
import BackgroundContainer from "../../components/BackgroundContainer";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <MaterialLink color="inherit" href="https://salji.org/">
        Servease
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const StyledGrid = styled(Grid)`
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 1);
  border-radius: 2rem;
`;
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: theme.spacing(3),
    justifyContent: "center",
  },
  title: {
    color: customColors.main,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  icon: {
    color: customColors.main,
  },
  button: {
    position: "absolute",
    left: "1.5rem",
    top: "1.5rem",
  },
}));

const Authentication = (props) => {
  const { title, children, backButtonUrl = "/", backButtonTitle = "home" } = props;
  const classes = useStyles();

  return (
    <BackgroundContainer component="main" maxWidth="xs">
      <Zoom in timeout={500}>
        <Grid container>
          <Grid item md={4} sm={3} />
          <StyledGrid item md={4} sm={6} xs={12} className={classes.paper}>
            <Button onClick={() => props.history.push(backButtonUrl)} className={classes.button}>
              <ArrowBackIosIcon className={classes.icon} />
              <small className={classes.icon}>{backButtonTitle}</small>
            </Button>
            <Typography color={"primary"} className={classes.title} component="h4" variant="h4">
              {title}
            </Typography>
            {children}
            <Box mt={8}>
              <Copyright />
            </Box>
          </StyledGrid>
        </Grid>
      </Zoom>
    </BackgroundContainer>
  );
};

export default Authentication;
