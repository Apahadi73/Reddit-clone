import React from "react";
import { Alert } from "react-bootstrap";

// customized alert component
const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
