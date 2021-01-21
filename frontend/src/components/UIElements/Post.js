import React from "react";
import { Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import "./Post.css";
import LikeButton from "../UIShared/LikeButton";
import DislikeButton from "../UIShared/DislikeButton";

const Post = ({ post }) => {
  const commentsNum = _.size(post.comments);
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
              <LikeButton id={post._id} likes={_.size(post.likes)} />
              <DislikeButton id={post._id} dislikes={_.size(post.dislikes)} />
              <Link className="mx-2" to={`/posts/${post._id}`}>
                {commentsNum} Comments
              </Link>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
