import { customColors } from "../../colors";
import { Box } from "@material-ui/core";

import styled from "styled-components";

const WrapperBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const HorizontalLine = styled(Box)`
  background: ${customColors.greyLine};
  min-width: 100%;
  min-height: 2px;
`;
const Label = styled(Box)`
  color: ${customColors.lightGrey};
  border: solid 2px ${customColors.greyLine};
  border-radius: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${customColors.white};
  width: 5ch;
  height: 5ch;
  font-size: small;
`;

const Separator = () => {
  return (
    <WrapperBox>
      <HorizontalLine />
      <Label>OR</Label>
    </WrapperBox>
  );
};

export default Separator;
