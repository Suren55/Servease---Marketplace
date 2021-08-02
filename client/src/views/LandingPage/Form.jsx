import React, { useRef, useState } from "react";

import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Slider,
  withStyles,
  Button,
  CircularProgress,
  Chip,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CakeTwoToneIcon from "../../assets/images/cake.png";
import { createPostRequest, selectIsLoading } from "../../redux/reducers/posts";
import { checkVerificationRequest } from "../../redux/reducers/auth";
import { customColors } from "../../colors";
import { connect } from "react-redux";
import styled from "styled-components";
import { StyledTextField } from "../../components/Styled";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  color: {
    color: customColors.white,
  },
  headerForm: {
    alignItems: "center",
    padding: theme.spacing(2),
    backgroundColor: "#62c1c5",
    marginBottom: theme.spacing(2),
    borderRadius: 0,
  },
  paper: {
    marginBottom: theme.spacing(10),
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  checkedIcon: {
    backgroundColor: customColors.white,
  },
  root: {
    color: customColors.white,
    "&$checked": {
      color: customColors.white,
    },
  },
  checked: {},
  deliveryCheckBox: {
    color: customColors.main,
    "&$checked": {
      color: customColors.main,
    },
  },

  verticalLine: {
    width: 5,
    height: 200,
  },
  selectedFlavour: {
    color: customColors.main,
    fontWeight: "bolder",
    marginBottom: "1rem",
  },
  nonSelectedFlavour: {
    color: customColors.lightGrey,
    marginBottom: "1rem",
  },
  cursor: {
    cursor: "pointer",
  },
  sliderDescription: {
    color: customColors.lightGrey,
    marginBottom: 10,
  },
  descriptionInput: {
    width: "100%",
    minWidth: "100%",
  },
  dateInput: {
    minWidth: "100%",
  },
}));

const customizeForSelect = {
  wedding: "Wedding Party",
  birthday: "Birthday Party",
  corporate: "Corporate Event",
  family: "Family Gathering",
};
const flavour = {
  chocolate: "Chocolate",
  vanilla: "Vanilla",
  redVelvet: "Red Velvet",
  blackForest: "Black Forest",
};

const deliveryOption = {
  delivery: "Delivery",
  pickupOnly: "Pick Up",
  preferDelivery: "Delivery preferred, but can pickup",
};

const HorizontalLine = styled(Box)`
  background: ${customColors.main};
  opacity: 50%;
  min-height: 2px;
`;

const CustomSlider = withStyles({
  root: {
    marginTop: "2.5rem",
    color: customColors.main,
  },
  thumb: {
    height: 26,
    width: 26,
    backgroundColor: "#fff",
    boxShadow: "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 11px)",
    "& *": {
      background: customColors.main,
    },
  },
  track: {
    height: 20,
  },
  rail: {
    borderRadius: 50,
    height: 20,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
})(Slider);

const MAX_IMAGES = 3;
const Form = (props) => {
  const { isLoading = false, createPost, onSuccess } = props;
  const classes = useStyles();
  const [customFlavour, setCustomFlavour] = useState("");

  const [dateError, setDateError] = useState("");

  const [customizeChecked, setCustomizeChecked] = useState("");
  const [customizeCheckedError, setCustomizeCheckedError] = useState("");

  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [selectedFlavourError, setSelectedFlavourError] = useState("");

  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedDeliveryError, setSelectedDeliveryError] = useState("");

  const [peopleRangeValue, setPeopleRangeValue] = useState([2, 200]);
  const [priceRangeValue, setPriceRangeValue] = useState([10, 500]);

  const [files, setFiles] = useState([]);
  const [filesError, setFilesError] = useState("");
  const [notes, setNotes] = useState("");
  const inputFile = useRef(null);
  const dateRef = useRef(null);

  const browseFile = () => {
    setFilesError("");
    inputFile.current.click();
  };
  const handleChangeFile = (e) => {
    const filesForState = [...files];

    if (e.target.files.length > MAX_IMAGES || filesForState.length === MAX_IMAGES) {
      return setFilesError("You can upload max 3 image");
    }

    Object.keys(e.target.files).map((key) => {
      return filesForState.push(e.target.files[key]);
    });

    return setFiles(filesForState);
  };

  const handleSubmit = () => {
    resetError();
    const flavor = !!customFlavour ? customFlavour : selectedFlavour;
    if (!customizeChecked) {
      return setCustomizeCheckedError("Please select event type");
    }
    if (!flavor) {
      return setSelectedFlavourError("Please select the flavor");
    }
    if (!selectedDelivery) {
      return setSelectedDeliveryError("Please select the delivery method");
    }
    if (!dateRef.current.value) {
      return setDateError("Please select the delivery date");
    }

    const form = {
      notes,
      flavor,
      deliveryMethod: selectedDelivery,
      servingSizeMin: peopleRangeValue[0],
      servingSizeMax: peopleRangeValue[1],
      budgetMin: priceRangeValue[0],
      budgetMax: priceRangeValue[1],
      deliveryDate: dateRef.current.value,
      eventType: customizeChecked,
      createdAt: new Date(),
    };
    return createPost({ form, onSuccess: resetState, images: files });
  };
  const resetError = () => {
    setCustomizeCheckedError("");
    setSelectedFlavourError("");
    setSelectedDeliveryError("");
    setDateError("");
  };
  const resetState = () => {
    setCustomizeChecked("");
    setNotes("");
    setSelectedDelivery("");
    setSelectedFlavour("");
    setCustomFlavour("");
    setPeopleRangeValue([2, 200]);
    setPriceRangeValue([10, 500]);
    setFiles([]);
    dateRef.current.value = "";

    if (typeof onSuccess === "function") onSuccess();
  };
  return (
    <Paper className={classes.paper}>
      <input
        onChange={handleChangeFile}
        disabled={files.length >= MAX_IMAGES}
        type="file"
        multiple
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept="image/*"
      />

      <Paper className={classes.headerForm}>
        <Grid container>
          <Grid item md={3} style={{ display: "flex" }}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography className={classes.color} variant={"h5"}>
                I need a cake for:
              </Typography>
            </Box>
          </Grid>
          <Grid item md={9}>
            <Box
              justifyContent={"space-around"}
              alignItems={"center"}
              display={"flex"}
              width={"100%"}
            >
              {Object.values(customizeForSelect).map((key, i) => {
                return (
                  <FormControlLabel
                    id={i + 1000}
                    key={i}
                    control={
                      <Checkbox
                        classes={{
                          root: classes.root,
                          checked: classes.checked,
                        }}
                        checked={customizeChecked === key}
                        onChange={() => setCustomizeChecked(key)}
                      />
                    }
                    label={<span className={classes.color}>{key}</span>}
                  />
                );
              })}
            </Box>
            <Box textAlign={"end"}>
              <span style={{ color: "red" }}>{customizeCheckedError}</span>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container className={classes.gridContainer} justify={"center"}>
        <Grid item md={4}>
          <Box marginBottom={3}>
            <Typography variant={"subtitle2"} align={"center"}>
              Choose a flavor
            </Typography>
          </Box>

          {Object.values(flavour).map((flavour, i) => {
            return (
              <Box
                key={i + 300}
                onClick={() => {
                  setCustomFlavour("");
                  setSelectedFlavour(flavour);
                }}
                marginBottom={1}
                className={classes.cursor}
              >
                <Typography
                  className={
                    selectedFlavour === flavour
                      ? classes.selectedFlavour
                      : classes.nonSelectedFlavour
                  }
                  align={"center"}
                  variant={"body2"}
                >
                  {flavour}
                </Typography>
                <Grid container justify={"center"}>
                  <Grid item xs={2}>
                    <HorizontalLine />
                  </Grid>
                </Grid>
              </Box>
            );
          })}
          <Grid container justify={"center"}>
            <Grid item md={6}>
              <Paper>
                <Box marginBottom={3}>
                  <StyledTextField
                    value={customFlavour}
                    onChange={({ target }) => {
                      setSelectedFlavour("");
                      setCustomFlavour(target.value);
                    }}
                    placeholder={"Custom Flavour"}
                    type={"text"}
                    variant={"outlined"}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign={"center"}>
            <span style={{ color: "red" }}>{selectedFlavourError}</span>
          </Box>
        </Grid>

        <Grid item md={8}>
          <Grid container justify={"center"}>
            <Grid container justify={"space-around"}>
              <Grid item md={4}>
                <Typography variant={"subtitle2"}>Select Delivery Method</Typography>

                {Object.values(deliveryOption).map((key, i) => {
                  return (
                    <Box id={i} key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            classes={{
                              root: classes.deliveryCheckBox,
                              checked: classes.checked,
                            }}
                            checked={selectedDelivery === key}
                            onChange={() => setSelectedDelivery(key)}
                          />
                        }
                        label={
                          <Typography variant={"body2"} className={classes.descriptionInput}>
                            {key}
                          </Typography>
                        }
                      />
                    </Box>
                  );
                })}
                <Box>
                  <small style={{ color: "red" }}>{selectedDeliveryError}</small>
                </Box>
                <Box marginTop={2}>
                  <Typography variant={"body1"}>Date of delivery</Typography>
                </Box>

                <Paper style={{ width: "90%", marginBottom: 5 }}>
                  <input
                    min={moment().format("YYYY-MM-DD")}
                    style={{ width: "90%", height: 40 }}
                    id={"dateInput"}
                    ref={dateRef}
                    onFocus={() => {
                      setDateError("");
                      dateRef.current.type = "date";
                    }}
                    onBlur={() => {
                      setDateError("");
                      dateRef.current.type = "text";
                    }}
                    className={classes.dateInput}
                    placeholder={"Date"}
                  />
                </Paper>
                <small style={{ color: "red" }}>{dateError}</small>
              </Grid>
              <Grid item md={6}>
                <Typography variant={"subtitle2"}>For how many people?</Typography>
                <CustomSlider
                  marks={false}
                  value={peopleRangeValue}
                  onChange={(e, val) => setPeopleRangeValue(val)}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  min={2}
                  max={200}
                />
                <Typography
                  align={"center"}
                  variant={"subtitle1"}
                  className={classes.sliderDescription}
                >
                  <small>
                    People {peopleRangeValue[0]} - {peopleRangeValue[1]}
                  </small>
                </Typography>
                <Typography variant={"subtitle2"}>What is your estimated budget range?</Typography>

                <CustomSlider
                  marks={false}
                  value={priceRangeValue}
                  onChange={(e, val) => setPriceRangeValue(val)}
                  valueLabelDisplay="on"
                  aria-labelledby="range-slider"
                  min={10}
                  step={10}
                  max={500}
                />
                <Typography
                  align={"center"}
                  variant={"subtitle1"}
                  className={classes.sliderDescription}
                >
                  <small>
                    Price ${priceRangeValue[0]} - ${priceRangeValue[1]}
                  </small>
                </Typography>
              </Grid>
            </Grid>

            <Grid container justify={"space-around"}>
              <Grid item md={4}>
                <Box style={{ position: "relative" }}>
                  <Box
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 30,
                      backgroundColor: "red",
                      position: "absolute",
                      top: -10,
                      right: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                      zIndex: 100,
                      opacity: files.length === 0 ? 0 : 1,
                    }}
                  >
                    {files.length}
                  </Box>
                  <Paper
                    elevation={3}
                    onClick={browseFile}
                    className={files.length >= MAX_IMAGES ? "" : classes.cursor}
                    style={{
                      width: "90%",
                      padding: "1rem",
                      opacity: files.length >= MAX_IMAGES ? 0.3 : 1,
                    }}
                  >
                    <Box style={{ opacity: 0.3 }}>
                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <AttachFileIcon fontSize={"large"} />
                      </Box>
                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Box width={60}>
                          <Typography align={"center"} variant={"body2"}>
                            Attach a sample picture
                          </Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <img src={CakeTwoToneIcon} alt={"cake"} width={60} />
                      </Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Typography align={"center"} variant={"body2"}>
                          Max 3 images
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <small style={{ color: "red" }}>{filesError}</small>

                  {files.map((e, i) => {
                    return (
                      <Chip
                        key={i + 100}
                        id={i + 200}
                        label={e.name}
                        onDelete={() => {
                          setFiles((files) =>
                            files.filter((item, index) => {
                              return index !== i;
                            })
                          );
                        }}
                        color="primary"
                        variant="outlined"
                      />
                    );
                  })}
                </Box>
              </Grid>

              <Grid item md={6} xs={12}>
                <Paper>
                  <StyledTextField
                    id={"StyledTextField"}
                    value={notes}
                    className={classes.dateInput}
                    placeholder={"Specify what you'd like to customize in design"}
                    multiline
                    onChange={({ target }) => setNotes(target.value)}
                    rows={9}
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            </Grid>

            <Grid item md={1} />
            <Grid item md={10}>
              <Button
                style={{ borderRadius: 50, height: 50 }}
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                className={"sign-in-btn"}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? <CircularProgress color={"primary"} /> : "Get a Qoute"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapDispatchToProps = {
  createPost: createPostRequest,
  checkVerificationRequest,
};

const mapStateToProps = (state) => ({
  isLoading: selectIsLoading(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);
