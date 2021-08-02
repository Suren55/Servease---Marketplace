import React, { useMemo, useState } from "react";
import CustomerHeader from "./CustomerHeader";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { customColors } from "../../colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { connect } from "react-redux";
import { getCustomerPostsListRequest, selectCustomerPostsList } from "../../redux/reducers/posts";
import { selectUserInfo } from "../../redux/reducers/auth";
import CloseIcon from "@material-ui/icons/Close";

import ActivePosts from "./ActivePosts";
import Form from "../LandingPage/Form";

const Customer = ({ getCustomerPostsListRequest, userInfo, customerPostList }) => {
  const [activeTabPosts, setActiveTabPosts] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useMemo(() => {
    getCustomerPostsListRequest();
  }, [getCustomerPostsListRequest]);

  console.log(customerPostList.length);
  return (
    <>
      <CustomerHeader />
      <Container component={"main"} maxWidth={false}>
        <Grid
          container
          justify={"center"}
          alignItems={"center"}
          style={{ height: "100vh", marginTop: "10rem" }}
        >
          <Grid item md={10}>
            <Grid item md={12}>
              <Box marginBottom={5}>
                <Grid container justify={"space-between"}>
                  <Grid item md={3}>
                    <Typography variant={"h5"}>{userInfo.accountInfo.fullName}</Typography>
                  </Grid>
                  <Grid item md={3}>
                    <Box marginLeft={2} display={"flex"} justifyContent={"flex-end"}>
                      <Button
                        onClick={() => setIsModalOpen(true)}
                        style={{ textTransform: "none", color: customColors.jobTitle }}
                      >
                        <AddCircleIcon fontSize={"large"} />
                        <Typography>Post new post</Typography>
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Paper style={{ borderRadius: 10 }} elevation={2}>
              <Grid
                item
                md={12}
                style={{
                  backgroundColor: customColors.main,
                  padding: "1rem",
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              >
                <Grid container>
                  <Grid item md={1} />
                  <Grid item md={10}>
                    <Typography variant={"h5"} style={{ color: customColors.white }}>
                      My posts
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} style={{ padding: "1rem", borderBottom: "1px solid" }}>
                <Grid container>
                  <Grid item md={1} />
                  <Grid item md={2} xs={6} style={{ borderRight: "1px solid" }}>
                    <Button onClick={() => setActiveTabPosts("active")}>
                      <Typography
                        style={{
                          fontWeight: activeTabPosts === "active" ? "bold" : "",
                        }}
                      >
                        Active posts ({customerPostList.length})
                      </Typography>
                    </Button>
                  </Grid>

                  <Grid item md={2} xs={6} style={{ textAlign: "center" }}>
                    <Button onClick={() => setActiveTabPosts("recent")}>
                      <Typography
                        style={{
                          fontWeight: activeTabPosts === "recent" ? "bold" : "",
                        }}
                      >
                        Recent posts
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Box margin={10} />

              {!customerPostList.length ? (
                <Grid container>
                  <Grid item xs={1} />
                  <Grid item md={10}>
                    <Paper elevation={5}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        padding={4}
                        textAlign={"center"}
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          style={{
                            cursor: "pointer",
                            height: 200,
                            flexDirection: "column",
                            border: "4px dashed #62c1c5",
                            width: 200,
                          }}
                        >
                          <AddCircleIcon fontSize={"large"} />

                          <Typography>Post new post</Typography>
                        </Box>
                      </Box>
                    </Paper>
                    <Box margin={10} />
                  </Grid>
                </Grid>
              ) : activeTabPosts === "active" ? (
                <ActivePosts jobs={customerPostList} />
              ) : (
                <ActivePosts jobs={customerPostList} />
              )}
            </Paper>
            <Box margin={10} />
          </Grid>
        </Grid>
        <Modal
          // className={classes.modal}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalOpen}>
            <Grid
              container
              justify={"center"}
              alignItems={"center"}
              style={{ height: "100vh", overflow: "auto" }}
            >
              <Grid item md={10}>
                <Box
                  width={"100%"}
                  style={{ backgroundColor: customColors.main, textAlign: "right" }}
                >
                  <Button onClick={() => setIsModalOpen(false)}>
                    <CloseIcon fontSize={"large"} style={{ color: customColors.white }} />
                  </Button>
                </Box>

                <Form
                  onSuccess={() => {
                    setIsModalOpen(false);
                    getCustomerPostsListRequest();
                  }}
                />
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: selectUserInfo(state),
  customerPostList: selectCustomerPostsList(state),
});

const mapDispatchToProps = {
  getCustomerPostsListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
