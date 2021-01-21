import axios from "axios";
import React, { useState } from "react";

function LikeButton({ id, likes }) {
  const onLiked = async () => {
    try {
      // gets userinfo from the local storage
      const userInfo = localStorage.getItem("userInfo");
      const { _id, token } = JSON.parse(userInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/posts/${id}/likes`,
        {
          user: _id,
        },
        config
      );
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span className="mx-2">
      <span className="mx-1">{likes} </span>
      <i
        className="fas fa-thumbs-up"
        style={{ cursor: "pointer", color: "blue" }}
        onClick={onLiked}
      ></i>
    </span>
  );
}

export default LikeButton;
