import React from "react";
import { makeStyles, Modal, Fade, Backdrop } from "@material-ui/core";

import SubmitOffer from "../SubmitOffer";

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: "auto",
  },
}));

const SubmitOfferModal = (props) => {
  const classes = useStyles();
  const { isOpen, closeModal, job } = props;
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
        <SubmitOffer job={job} closeModal={closeModal} />
      </Fade>
    </Modal>
  );
};

export default SubmitOfferModal;
