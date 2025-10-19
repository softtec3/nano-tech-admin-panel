import React from "react";
import { Pulsar } from "ldrs/react";
import "ldrs/react/Pulsar.css";
import "./loadingSpninner.css";
// Default values shown

const LoadingSpinner = () => {
  return (
    <div id="loadingSpinner">
      <Pulsar size="50" speed="1.75" color="black" />
    </div>
  );
};

export default LoadingSpinner;
