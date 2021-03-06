import express from "express";
import {
  getPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  createPostComment,
  likePost,
  dislikePost,
} from "../controllers/postController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPosts).post(authenticate, createPost);
router.route("/:id/comments").post(authenticate, createPostComment);
router.route("/:id/likes").post(authenticate, likePost);
router.route("/:id/dislikes").post(authenticate, dislikePost);
router
  .route("/:id")
  .get(getPostById)
  .delete(authenticate, deletePost)
  .put(authenticate, updatePost);

export { router as PostRoutes };
