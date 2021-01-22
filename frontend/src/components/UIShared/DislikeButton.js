import axios from "axios";
import React from "react";

function DislikeButton({ id, dislikes }) {
  // gets userinfo from the local storage
  const userInfo = localStorage.getItem("userInfo");
  const onDisliked = async () => {
    try {
      const { _id, token } = JSON.parse(userInfo);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `/api/posts/${id}/dislikes`,
        {
          user: _id,
        },
        config
      );
      console.log(data);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span className="mx-2">
      <span className="mx-1">{dislikes} </span>

      <i
        className="fas fa-thumbs-down red"
        style={{ cursor: "pointer", color: "red" }}
        onClick={onDisliked}
      ></i>
    </span>
  );
}

export default DislikeButton;
