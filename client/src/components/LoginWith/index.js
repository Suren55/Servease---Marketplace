import React from "react";

import { customColors } from "../../colors";
import { Button, Icon } from "@material-ui/core";

import styled from "styled-components";

const StyledIcon = styled(Icon)`
  margin-right: 2rem;
  color: ${customColors.white};
`;

const LoginWith = (props) => {
  //todo handle login with facebook and google
  return (
    <>
      <Button className={"google-btn"} fullWidth variant="contained" color={"inherit"}>
        <StyledIcon className="fab fa-google" />
        Sign in with google
      </Button>
      <Button className={"facebook-btn"} fullWidth variant="contained" color={"inherit"}>
        <StyledIcon className="fab fa-facebook-f" />
        Sign in with facebook
      </Button>
    </>
  );
};

export default LoginWith;
