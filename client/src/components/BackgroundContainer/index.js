import React from "react";
import { Container } from "@material-ui/core";

import styled from "styled-components";

const StyledContainer = styled(Container)`
  min-height: 100vh;
  background-color: #62c1c5;
  padding-right: 0;
  padding-left: 0;
  display: flex;
  align-items: center;
`;

const BackgroundContainer = ({ children }) => {
  return (
    <StyledContainer component="main" maxWidth={false}>
      {children}
    </StyledContainer>
  );
};

export default BackgroundContainer;
