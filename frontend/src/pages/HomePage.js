import axios from "axios";
import React, { useEffect, useState } from "react";

import Post from "../components/UIElements/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetches posts from the backend
    const fetchPosts = async () => {
      const { data } = await axios.get("/api/posts");
      console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <React.Fragment>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </React.Fragment>
  );
};

export default HomePage;
