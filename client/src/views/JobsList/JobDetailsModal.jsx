import React from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";

import { customColors } from "../../colors";

import cakeSample from "../../assets/images/cakeSample.jpeg";
import cakeSample2 from "../../assets/images/cake2.jpeg";
import face from "../../assets/images/face.jpg";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ImageSlideShow from "../../components/ImageSlideShow";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: customColors.jobTitle,
  },
  modal: {
    overflow: "auto",
  },
  wrapper: {
    backgroundColor: customColors.white,
    boxShadow: " 0px 5px 5px 2px rgba(98,193,197,1)",
    borderRadius: theme.spacing(1),
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
}));

const mockJob = {
  image: [cakeSample, cakeSample2],
  flavor: "Wedding cake",
  notes:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  deliveryDate: "July-12-2021",
  budgetFrom: "$100",
  budgetTo: "$100",
  deliveryOption: "Pickup",
  address: "Box 777 91 Western Road Brighton East sussex, US",
  contact: "+1 855 *** ***",
  people: "8 - 10",
  user: {
    image: face,
    fullName: "Suren Margaryan",
    city: "New York City",
  },
};

const JobDetailsModal = (props) => {
  const classes = useStyles();
  const { isOpen, closeModal, onBtnClick, job } = props;
  if (!job) return null;

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Grid container justify={"center"} alignItems={"center"} style={{ height: "100%" }}>
          <Grid item xs={11} md={8} xl={6} className={classes.wrapper}>
            <Box padding={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    marginTop={-3}
                    marginBottom={2}
                    justifyContent={"space-between"}
                    display={"flex"}
                  >
                    <Button onClick={closeModal}>
                      <ArrowBackIosIcon fontSize={"small"} />
                    </Button>
                    <Button onClick={closeModal}>
                      <FavoriteBorderIcon style={{ color: "red" }} fontSize={"small"} />
                    </Button>
                  </Box>
                </Grid>
                <Grid item md={4}>
                  <Box>
                    <Box marginBottom={1}>
                      <Typography className={classes.title} variant={"h4"}>
                        {job.eventType}
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
                      <Typography className={classes.description} variant={"subtitle2"}>
                        {job.notes}
                      </Typography>
                      <Box marginTop={1}>
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
                    </Box>
                    <Box marginTop={1}>
                      <Typography className={classes.budget} variant={"h5"}>
                        <strong> Est.Budget:</strong> {job.budgetMin}$ - {job.budgetMax}$
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Grid md={12} item style={{ height: "60%", minHeight: 300 }}>
                    <ImageSlideShow
                      images={job.sampleImages.length ? job.sampleImages : [cakeSample]}
                    />
                  </Grid>
                  <Grid md={12} item>
                    <Box marginTop={3} marginBottom={4}>
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
                    <Box>
                      <Button
                        onClick={onBtnClick}
                        className={"make-offer-modal-btn"}
                        fullWidth={true}
                        variant={"contained"}
                      >
                        Make offer
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default JobDetailsModal;
