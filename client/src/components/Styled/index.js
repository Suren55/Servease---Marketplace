import { customColors } from "../../colors";

const { withStyles, TextField } = require("@material-ui/core");

export const StyledTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: customColors.main,
    },
    "& input:valid:focus + fieldset": {
      borderColor: customColors.main,
    },
    "& textarea:valid:focus + fieldset": {
      borderColor: customColors.main,
    },
  },
})(TextField);
