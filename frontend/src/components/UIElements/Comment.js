import React from "react";
import { Card } from "react-bootstrap";

function Comment({ comment, userName }) {
  return (
    <Card className="m-3">
      <Card.Body>
        <p>{comment}</p>
        <p className="creator">
          Posted by <bold>{userName}</bold>
        </p>
      </Card.Body>
    </Card>
  );
}

export default Comment;
