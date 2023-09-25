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
route.post("/save-post/:userId", verifyToken, savePost);
route.get("/saved-posts-ids/:userId", verifyToken, getSavedPostIds);
route.get("/saved-posts/:userId", verifyToken, getSavedPost);
export { route as postRouter };
