import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getPosts,
  addPost,
  savePost,
  getSavedPostIds,
  getSavedPost,
  deletePost,
} from "../controller/postController.js";
const route = express.Router();
route.get("/", getPosts);
route.post("/add-post", verifyToken, addPost);
route.delete("/delete-post/:id", verifyToken, deletePost);
route.post("/save-post/:postId", verifyToken, savePost);
route.get("/saved-posts-ids", verifyToken, getSavedPostIds);
route.get("/saved-posts", verifyToken, getSavedPost);
export { route as postRouter };
