import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";

// component to create a new post and publish it to the database
function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isValid, setValidity] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userRegister;

  const onSubmitButtonPressed = () => {
    if (title.legnth <= 0 || title === "") {
      setErrorMessage("Title must be at least 5 charactes long");
      setValidity(false);
    } else {
      const post = {
        user: userInfo._id,
        title,
        content,
        userName: userInfo.name,
      };
      console.log(post);
    }
  };
  return (
    <Card className="bg-success">
      <Card.Body>
        <h1>Create a New Post</h1>
        <Form onSubmit={(event) => event.prevenDefaults()}>
          {!isValid && <Message variant="danger">{errorMessage}</Message>}
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <b>Title of the Post</b>
            </Form.Label>
            <Form.Control
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="email"
              placeholder="Title ..."
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>
              <b>Content</b>
            </Form.Label>
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              as="textarea"
              rows={3}
              placeholder="Type your content here ..."
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

export default CreatePost;
