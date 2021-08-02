import React, { useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  makeStyles,
  Button,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { customColors } from "../../colors";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import cakeSample from "../../assets/images/cakeSample.jpeg";
import cakeSample2 from "../../assets/images/cake2.jpeg";
import face from "../../assets/images/face.jpg";
import { StyledTextField } from "../../components/Styled";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ImageSlideShow from "../../components/ImageSlideShow";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: customColors.jobTitle,
  },
  wrapper: {
    backgroundColor: customColors.white,
    boxShadow: " 0px 5px 5px 2px rgba(98,193,197,1)",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  name: {
    fontWeight: "bold",
    opacity: 0.5,
    color: customColors.black,
  },
  city: {
    opacity: 0.2,
    color: customColors.black,
  },
  description: {
    padding: theme.spacing(2),
    opacity: 0.8,
    color: customColors.main,
  },
  userDetails: {
    opacity: 0.2,
    color: customColors.black,
  },
  budget: {
    fontWeight: "bold",
    color: customColors.main,
  },
  underImage: {
    color: customColors.main,
  },
  img: {
    borderRadius: theme.spacing(1),
    boxShadow: "3px 0px 5px 0px rgba(98,193,197,1)",
  },
  offerAmountInput: {
    boxShadow: "3px 3px 5px 0px rgba(0,0,0,0.3)",
  },
  roundedBox: {
    borderRadius: theme.spacing(1),
  },
  checked: {},
  checkBox: {
    color: customColors.black,
    "&$checked": {
      color: customColors.black,
    },
  },
  showDetails: {
    color: customColors.main,
    cursor: "pointer",
  },
}));

const mockJob = {
  image: [cakeSample, cakeSample2],
  title: "Wedding cake",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  //  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, .",
  deliveryDate: "July-12-2021", //moment("LL"),
  budgetFrom: "$10",
  budgetTo: "$100",
  deliveryOption: "Puckup",
  address: "Box 777 91 Western Road Brighton East sussex, US",
  contact: "+1 855 *** ***",
  flavor: "Black Forest",
  people: "8 - 10",
  user: {
    image: face,
    fullName: "Suren Margaryan",
    city: "New York City",
  },
};

const SubmitOffer = (props) => {
  const classes = useStyles();
  const { closeModal, job } = props;
  const [checked, setChecked] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [amountOffer, setAmountOffer] = useState("");

  return (
    <Grid container justify={"center"} alignItems={"center"} style={{ height: "100%" }}>
      <Grid
        md={8}
        item
        style={{
          backgroundColor: customColors.white,
        }}
      >
        <Grid xs={12} item>
          <Box marginTop={2} justifyContent={"space-between"} display={"flex"}>
            <Button onClick={closeModal}>
              <ArrowBackIosIcon fontSize={"small"} />
            </Button>
            <Button className={classes.button}>
              <FavoriteBorderIcon style={{ color: "red" }} fontSize={"small"} />
            </Button>
          </Box>
          <Box marginBottom={2}>
            <Typography variant={"h3"} align={"center"}>
              Submit an <span className={classes.title}>Offer</span>
            </Typography>
          </Box>
        </Grid>
        <Grid style={{ margin: "auto" }} md={11} item className={classes.wrapper}>
          <Box padding={6}>
            <Grid container>
              <Grid md={5}>
                <Box>
                  <Box marginBottom={1}>
                    <Typography className={classes.title} variant={"h4"}>
                      {job.flavour}
                    </Typography>
                  </Box>
                  <Box display={"flex"} marginTop={2}>
                    <img
                      src={mockJob.user.image}
                      alt={"user_image"}
                      width={50}
                      style={{ borderRadius: 50 }}
                    />
                    <Box marginLeft={1}>
                      <Typography className={classes.name} variant={"subtitle1"}>
                        {mockJob.user.fullName}
                      </Typography>
                      <Typography className={classes.city} variant={"subtitle2"}>
                        {mockJob.user.city}
                      </Typography>
                    </Box>
                  </Box>
                  <Box marginTop={1}>
                    <Box marginTop={1} paddingRight={5}>
                      <Typography variant={"subtitle1"}>
                        <strong style={{ opacity: "50%" }}>Delivery option: </strong>
                        <span className={classes.userDetails}>{job.deliveryMethod}</span>
                      </Typography>
                      <Typography variant={"subtitle1"}>
                        <strong style={{ opacity: "50%" }}> Address: </strong>
                        <span className={classes.userDetails}>{mockJob.address}</span>
                      </Typography>
                      <Typography variant={"subtitle1"}>
                        <strong style={{ opacity: "50%" }}>Contact: </strong>{" "}
                        <span className={classes.userDetails}>{mockJob.contact}</span>
                      </Typography>
                    </Box>
                    <Box marginTop={3}>
                      <Typography className={classes.underImage} variant={"body1"}>
                        <strong>Flavor: </strong>
                        <small>{job.flavor}</small>
                      </Typography>
                      <Typography className={classes.underImage} variant={"body1"}>
                        <strong>People: </strong>
                        {job.servingSizeMin} - {job.servingSizeMax}
                      </Typography>
                      <Typography className={classes.underImage} variant={"body1"}>
                        <strong>Delivery date: </strong>
                        {moment(job.deliveryDate).format("DD-MM-YYYY")}
                      </Typography>
                    </Box>
                  </Box>
                  <Box marginTop={1}>
                    <Typography className={classes.showDetails} variant={"body1"}>
                      View order details
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={7} item>
                <Box height={"80%"} minHeight={300}>
                  <ImageSlideShow
                    images={job.sampleImages.length ? job.sampleImages : [cakeSample]}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid style={{ margin: "auto" }} md={11} xs={12}>
          <Box marginTop={5} marginBottom={5}>
            <Paper elevation={5} className={classes.roundedBox}>
              <Box padding={4}>
                <Typography variant={"subtitle1"}>
                  Estimated budget: {job.budgetFrom} - {job.budgetTo}
                </Typography>
                <hr />

                <StyledTextField
                  className={classes.offerAmountInput}
                  // margin="normal"
                  id="offerAmount"
                  label="Amount of Offer"
                  name="offerAmount"
                  value={amountOffer}
                  onChange={({ target }) => setAmountOffer(target.value)}
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid style={{ margin: "auto" }} md={11}>
          <Box marginTop={5} marginBottom={5}>
            <Paper elevation={5} className={classes.roundedBox}>
              <Box padding={4}>
                <Typography variant={"subtitle1"}>Additional details</Typography>
                <hr />
                <StyledTextField
                  className={classes.offerAmountInput}
                  multiline
                  rows={8}
                  placeholder={
                    "Introduce yourself and explain why you are a strong candidate for this job. Feel free to suggest any changes to job details or ask to schedule a video call."
                  }
                  id="additionalDetails"
                  name="offerAmount"
                  fullWidth
                  value={additionalDetails}
                  onChange={({ target }) => setAdditionalDetails(target.value)}
                  variant="outlined"
                />
                <Box marginTop={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        classes={{
                          root: classes.checkBox,
                          checked: classes.checked,
                        }}
                        checked={checked}
                        onChange={() => setChecked((checked) => !checked)}
                      />
                    }
                    label={
                      <Typography variant={"body2"}>
                        I have read all provided information and agree to deliver it by provided due
                        date
                      </Typography>
                    }
                  />
                </Box>
                <Box
                  marginBottom={1}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    className={"make-offer-modal-btn"}
                  >
                    Submit offer
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubmitOffer;
