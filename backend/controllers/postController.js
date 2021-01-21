import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  // finds all the post from the db
  const posts = await Post.find({});
  res.json(posts);
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  // finds the post with the associated id
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// helper functions that checks whether the user is authorized to modify the post or not
const validateUser = (user1, user2) => {
  // returns true if both the users are same
  // console.log(`user 1 ; ${user1} user 2:${user2} `);
  // console.log(`Are they same? ${user1.toString() === user2.toString()} `);
  if (user1.toString() === user2.toString()) {
    return true;
  }
  return false;
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const { user } = req.body;
  const post = await Post.findById(req.params.id);
  const isAllowed = validateUser(user, post.user);
  if (isAllowed) {
    if (post) {
      await post.remove();
      res.json({ message: "Post removed" });
    } else {
      res.status(404);
      throw new Error("post not found");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content, user } = req.body;
  const newPost = new Post({
    user: user,
    title: title,
    content: content,
  });
  const createdPost = await newPost.save();
  res.status(201).json(createdPost);
});

// @desc    Update a product
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, content, user } = req.body;
  //only allow creator to update the post
  const post = await Post.findById(req.params.id);
  const isAllowed = validateUser(user, post.user);
  // console.log(`user 1 ; ${user} user 2:${post.user} ${isAllowed}`);
  if (isAllowed) {
    if (post) {
      post.title = title;
      post.content = content;
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

// @desc    Create new review
// @route   POST /api/posts/:id/reviews
// @access  Private
const createPostComment = asyncHandler(async (req, res) => {
  const { userName, content, user } = req.body;

  // finds the post
  const post = await Post.findById(req.params.id);

  if (post) {
    // creates comment object
    const comment = {
      userName: userName,
      content: content,
      user: user,
    };

    // pushes newly created comment on to the comments array of the associated post
    post.comments.push(comment);

    await post.save();
    res.status(201).json({ message: "Comment added" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

export {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  createPostComment,
};