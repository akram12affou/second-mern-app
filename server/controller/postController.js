import { postModal } from "../models/postModal.js";
import asyncHandler from "express-async-handler";
import { userModal } from "../models/userModal.js";
const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModal.find({});
  res.json(posts);
});
const addPost = asyncHandler(async (req, res) => {
  const token = req.cookies
  res.json({
      cookie : token
     })
  // const { title, description } = req.body;
  // const newPost = new postModal({ title, description });
  // newPost.save();
});
const savePost = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { id } = req.body;
  const user = await userModal.findById(userId);
  const post = await postModal.findById(id);
  user.posts.push(post);
  user.save();
});
const getSavedPostIds = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModal.findById(userId);
  res.json(user.posts);
});
const getSavedPost = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await userModal.findById(userId);
  const savedPost = await postModal.find({
    _id: { $in: user.posts },
  });
  res.json(savedPost);
});
export { getPosts, addPost, savePost, getSavedPostIds, getSavedPost };
