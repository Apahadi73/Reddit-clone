import React from "react";
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
          <p>Comment as {}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
