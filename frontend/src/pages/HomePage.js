import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../components/UIElements/Post";
import Loader from "../components/UIShared/Loader";
import Message from "../components/UIShared/Message";
import { fetchPostList } from "../state/actions/postActions";

const HomePage = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  let { loading, error, posts } = postList;
  posts = Object.values(posts);

  useEffect(() => {
    dispatch(fetchPostList());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default HomePage;
