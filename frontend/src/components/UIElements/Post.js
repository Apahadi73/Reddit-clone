import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Post.css";

const Product = ({ post }) => {
  return (
    <Card className="my-3 py-3 rounded">
      <Card.Body>
        <Link to={`/post/${post._id}`}>
          <Card.Title as="div">
            <h2>
              <strong>{post.title}</strong>
            </h2>
            <span className="post-creator"> Posted by {post.userName}</span>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div>{post.content}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
