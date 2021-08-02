import React, { useMemo, useState } from "react";
import { Grid, Paper, Box, Typography, makeStyles, Button } from "@material-ui/core";
import cakeSample from "../../assets/images/cakeSample.jpeg";
import cakeSample2 from "../../assets/images/cake2.jpeg";
import face from "../../assets/images/face.jpg";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { customColors } from "../../colors";
import JobDetailsModal from "./JobDetailsModal";
import AppHeader from "../../components/Header";
import SubmitOfferModal from "./SubmitOfferModal";
import Footer from "../../components/Footer";
import { selectUserInfo } from "../../redux/reducers/auth";
import { connect } from "react-redux";
import { selectPostsList, getPostsListRequest } from "../../redux/reducers/posts";
import { deliveryMethodOrder, occasionOrder } from "../../constants";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: customColors.jobTitle,
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
    opacity: 0.6,
    color: customColors.main,
  },
  delivery: {
    fontWeight: "bold",

    color: customColors.main,
  },
  budget: {
    fontWeight: "bold",
    color: customColors.main,
  },
  btn: {
    backgroundColor: "#fff !important",
    color: customColors.main,
    fontWeight: "bold",
    minWidth: 130,
    maxWidth: 140,
    height: 45,
    lineHeight: 1.2,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    // padding: 12,
    textTransform: "none",
    textAlign: "left",
  },
  favoritesBtn: {
    color: customColors.white,
    backgroundColor: customColors.main,
    textTransform: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "#fff",
  },

  select: {
    backgroundColor: customColors.white,
    color: customColors.black,
  },
  showDetails: {
    color: customColors.main,
    cursor: "pointer",
    "&:hover": {
      fontWeight: "bold",
    },
    "&:active": {
      fontWeight: "normal",
      opacity: 0.6,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  jobCard: {
    transition: "all .2s ease-in-out",
    "&:hover": {
      transition: "all .2s ease-in-out",
      boxShadow: "5px 5px 10px 0px rgba(98,193,197,0.7)",
      transform: "scaleX(1.03) scaleY(1.03)",
    },
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

const JobsList = (props) => {
  const classes = useStyles();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [submitOfferModalOpen, setSubmitOfferModalOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [detailsJob, setDetailsJob] = useState(null);
  const [sortBy, setSortBy] = useState("ASC");

  const { postsList, getPostList } = props;

  useMemo(() => {
    getPostList();
  }, [getPostList]);

  useMemo(() => {
    setJobs(postsList);
  }, [postsList]);

  const sortJobs = (sortByKey) => {
    let sortedJobs = [...jobs];
    if (sortBy === "ASC") {
      sortedJobs.sort((a, b) => a[sortByKey] - b[sortByKey]);
      setSortBy("DESC");
    }
    if (sortBy === "DESC") {
      sortedJobs.sort((a, b) => b[sortByKey] - a[sortByKey]);
      setSortBy("ASC");
    }
    setJobs(sortedJobs);
  };

  const sortByOccasion = () => {
    let sortedJobs = [...jobs];
    if (sortBy === "ASC") {
      sortedJobs.sort((a, b) => occasionOrder[a.eventType] - occasionOrder[b.eventType]);
      setSortBy("DESC");
    }
    if (sortBy === "DESC") {
      sortedJobs.sort((a, b) => occasionOrder[b.eventType] - occasionOrder[a.eventType]);
      // sortedJobs.sort((a, b) => b[sortByKey] - a[sortByKey]);
      setSortBy("ASC");
    }
    setJobs(sortedJobs);
  };

  const sortByDelivery = () => {
    let sortedJobs = [...jobs];
    if (sortBy === "ASC") {
      sortedJobs.sort(
        (a, b) => deliveryMethodOrder[a.deliveryMethod] - deliveryMethodOrder[b.deliveryMethod]
      );
      setSortBy("DESC");
    }
    if (sortBy === "DESC") {
      sortedJobs.sort(
        (a, b) => deliveryMethodOrder[b.deliveryMethod] - deliveryMethodOrder[a.deliveryMethod]
      );
      // sortedJobs.sort((a, b) => b[sortByKey] - a[sortByKey]);
      setSortBy("ASC");
    }
    setJobs(sortedJobs);
  };

  return (
    <>
      <Grid container justify={"center"} style={{ marginBottom: "3rem" }}>
        <AppHeader />
        <Grid item xs={12}>
          <Box marginTop={10} marginBottom={10}>
            <Typography variant={"h3"} align={"center"}>
              Make an <span className={classes.title}>Offer</span>
            </Typography>
          </Box>
        </Grid>

        <Grid container style={{ margin: "1rem" }}>
          <Grid md={1} />
          <Grid md={8}>
            <Button onClick={sortByOccasion} className={classes.btn} variant={"contained"}>
              By occasion
            </Button>
            <Button
              onClick={() => sortJobs("budgetMax")}
              className={classes.btn}
              variant={"contained"}
            >
              By budget
            </Button>
            <Button
              onClick={() => sortJobs("servingSizeMax")}
              className={classes.btn}
              variant={"contained"}
            >
              By size
            </Button>
            <Button onClick={sortByDelivery} className={classes.btn} variant={"contained"}>
              By Pickup or Delivery
            </Button>
          </Grid>
          <Grid md={2}>
            <Button fullWidth className={"favorites-btn"}>
              Favorites <FavoriteBorderIcon style={{ marginLeft: "0.5rem" }} fontSize={"small"} />
            </Button>
          </Grid>
        </Grid>

        <Grid md={10} xl={10}>
          <Grid container>
            {jobs.map((job) => {
              return (
                <Grid
                  item
                  md={4}
                  xl={3}
                  style={{
                    padding: "1rem",
                  }}
                >
                  <Paper className={classes.jobCard} rounded={true} elevation={5}>
                    <Box width={"100%"} padding={3} minHeight={500}>
                      <Box marginBottom={1}>
                        <Typography className={classes.title} variant={"h5"}>
                          {job.eventType}
                        </Typography>
                      </Box>
                      <Box
                        style={{ cursor: "pointer" }}
                        elevation={5}
                        onClick={() => {
                          setDetailsJob(job);
                          setDetailsModalOpen(true);
                        }}
                      >
                        <img
                          className={"MuiPaper-elevation5"}
                          src={job.sampleImages[0] || cakeSample}
                          alt={"sampleImages"}
                          width={"100%"}
                          style={{ height: "12rem" }}
                          // height={"12rem"}
                        />
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
                      </Box>
                      <Box marginTop={1}>
                        <Typography className={classes.delivery} variant={"body1"}>
                          Delivery Date: {moment(job.deliveryDate).format("DD-MM-YYYY")}
                        </Typography>
                        <Typography className={classes.budget} variant={"body1"}>
                          Est.Budget: {job.budgetMin}$ - {job.budgetMax}$
                        </Typography>
                      </Box>
                      <Box marginTop={1}>
                        <Typography
                          onClick={() => {
                            setDetailsJob(job);
                            setDetailsModalOpen(true);
                          }}
                          className={classes.showDetails}
                          variant={"subtitle1"}
                        >
                          Show details
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      onClick={() => {
                        setDetailsJob(job);
                        setSubmitOfferModalOpen(true);
                      }}
                      className={"make-offer-btn"}
                      fullWidth={true}
                      variant={"contained"}
                    >
                      Make offer
                    </Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <JobDetailsModal
          {...props}
          onBtnClick={() => {
            setDetailsModalOpen(false);
            setSubmitOfferModalOpen(true);
          }}
          isOpen={detailsModalOpen}
          closeModal={() => {
            setDetailsJob(null);
            setDetailsModalOpen(false);
          }}
          job={detailsJob}
        />
        <SubmitOfferModal
          {...props}
          job={detailsJob}
          isOpen={submitOfferModalOpen}
          closeModal={() => {
            setDetailsJob(null);
            setSubmitOfferModalOpen(false);
          }}
        />
      </Grid>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: selectUserInfo(state),
  postsList: selectPostsList(state),
});

const mapDispatchToProps = {
  getPostList: getPostsListRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(JobsList);
