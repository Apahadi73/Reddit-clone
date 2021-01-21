import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../state/actions/postActions";
import Loader from "../UIShared/Loader";
import Message from "../UIShared/Message";

// component to create a new post and publish it to the database
function CommentBox() {
  const [comment, setComment] = useState("");
  const [isValid, setValidity] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();

  // creates dispatch object
  const dispatch = useDispatch();

  // fetches state from store
  const postCreator = useSelector((state) => state.userLogin);
  const { loading, error, success } = postCreator;
  // gets userinfo from the local storage
  const userInfo = localStorage.getItem("userInfo");
  const { _id, name } = JSON.parse(userInfo);

  //validates the form and calls create post action
  const onSubmitButtonPressed = () => {
    if (comment.legnth <= 0 || comment === "") {
      setErrorMessage("comment must be at least 5 charactes long");
      setValidity(false);
    } else {
      const newComment = {
        userName: name,
        content: comment,
        user: _id,
      };
      console.log(newComment);
      dispatch(createComment(newComment, id));
      // reload the page
      window.location.reload(false);
    }
  };
  return (
    <Card>
      <Card.Body>
        {!isValid && <Message variant="danger">{errorMessage}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={(event) => event.prevenDefaults()}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <p className="creator">
                <strong>Comment as {name}</strong>
              </p>
            </Form.Label>
            <Form.Control
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              as="textarea"
              rows={3}
              placeholder="Type your comment here ..."
            />
          </Form.Group>
          <Button variant="primary" onClick={onSubmitButtonPressed}>
            Post
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CommentBox;
