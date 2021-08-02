import React from "react";
import Loader from "react-loader-spinner";
import "./spinner.css";

const Spinner = (props) => (
  <div className="spinner-wrapper">
    <div className="spinner">
      <Loader type="Circles" color="#2E4684" height={100} width={100} />
    </div>
  </div>
);

export default Spinner;
