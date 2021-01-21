import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../state/actions/postActions";
import Message from "../components/UIShared/Message";
import Loader from "../components/UIShared/Loader";
import { useHistory } from "react-router-dom";

// component to create a new post and publish it to the database
function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isValid, setValidity] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // creates dispatch object
  const dispatch = useDispatch();
  const history = useHistory();

  // fetches state from store
  const postCreator = useSelector((state) => state.userLogin);
  const { loading, error, success } = postCreator;

  //validates the form and calls create post action
  const onSubmitButtonPressed = () => {
    if (title.legnth <= 0 || title === "") {
      setErrorMessage("Title must be at least 5 charactes long");
      setValidity(false);
    } else {
      // gets userinfo from the local storage
      const userInfo = localStorage.getItem("userInfo");
      const { _id, name } = JSON.parse(userInfo);
      const newPost = {
        user: _id,
        title: title,
        content: content,
        userName: name,
      };
      dispatch(createPost(newPost));
      history.push("/");
      window.location.reload(false);
    }
  };
  return (
    <Card className="bg-success">
      <Card.Body>
        <h1>Create a New Post</h1>
        {!isValid && <Message variant="danger">{errorMessage}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={(event) => event.prevenDefaults()}>
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
