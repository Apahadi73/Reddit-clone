import React from "react";
import { Spinner } from "react-bootstrap";

// Loading spinner
const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "3rem",
        height: "3rem",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only"> Loading ... </span>
    </Spinner>
  );
};
export default Loader;
