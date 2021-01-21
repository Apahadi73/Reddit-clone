import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "../components/UIElements/Comment";
import CommentBox from "../components/UIElements/CommentBox";
import DislikeButton from "../components/UIShared/DislikeButton";
import LikeButton from "../components/UIShared/LikeButton";
import _ from "lodash";

export const PostDetailPage = ({ match }) => {
  const [post, setpost] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchpost = async () => {
      const { data } = await axios.get(`/api/posts/${match.params.id}`);
      setpost(data);
      setComments(data.comments);
    };
    fetchpost();
  }, [match.params.id]);
  return (
    <React.Fragment>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Card className="my-3 py-3 rounded">
        <Card.Body>
          <Card.Title as="div">
            <h1>
              <strong>{post.title}</strong>
            </h1>
            <span className="post-creator"> Posted by {post.userName}</span>
          </Card.Title>
          <Card.Text as="div">
            <p style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
              {post.content}
            </p>
            <Row className="my-3">
              <Col className="sm-6">
                <LikeButton id={match.params.id} likes={_.size(post.likes)} />
                <DislikeButton
                  id={match.params.id}
                  dislikes={_.size(post.dislikes)}
                />
                <span className="mx-2">{comments.length} Comments</span>
              </Col>
            </Row>
            <CommentBox />
          </Card.Text>

          {comments.length > 0 && (
            <div>
              {comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment.content}
                  userName={comment.userName}
                />
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
