import mongoose from "mongoose";

// schema for comment
const commentSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    content: { type: String },
    likes: { type: [mongoose.Schema.Types.ObjectId] },
    dislikes: { type: [mongoose.Schema.Types.ObjectId] },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
