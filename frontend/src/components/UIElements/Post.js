import React from "react";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  // extracts user info from local storage
  return (
    <Card className="my-3 py-3 rounded">
      <Card.Body>
        <Link to={`/posts/${post._id}`}>
          <Card.Title as="div">
            <h2>
              <strong>{post.title}</strong>
            </h2>
            <span className="creator"> Posted by {post.userName}</span>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <p style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
            {post.content}
          </p>
          <Row>
            <Col className="sm-6">
              <span className="mx-2">
                <i className="fas fa-thumbs-up"></i>
              </span>
              <span className="mx-2">
                <i className="fas fa-thumbs-down"></i>
              </span>
              <Link className="mx-2" to={`/posts/${post._id}`}>
                Comments
              </Link>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
