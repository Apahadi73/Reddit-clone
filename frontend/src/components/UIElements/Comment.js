import React from "react";
import { Card } from "react-bootstrap";

function Comment({ comment, userName }) {
  return (
    <Card className="my-2">
      <Card.Body className="py-1 ">
        <p>{comment}</p>
        <p className="creator ">Posted by {userName}</p>
      </Card.Body>
    </Card>
  );
}

export default Comment;
