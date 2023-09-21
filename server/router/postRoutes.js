import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getPosts,
  addPost,
  savePost,
  getSavedPostIds,
  getSavedPost,
} from "../controller/postController.js";
const route = express.Router();
route.get("/", getPosts);
route.post("/add-post", verifyToken, addPost);
route.post("/save-post/:userId", verifyToken, savePost);
route.get("/saved-posts-ids/:userId", verifyToken, getSavedPostIds);
route.get("/saved-posts/:userId", verifyToken, getSavedPost);
export { route as postRouter };
