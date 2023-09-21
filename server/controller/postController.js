import { postModal } from "../models/postModal.js";
import asyncHandler from "express-async-handler";
import { userModal } from "../models/userModal.js";
const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModal.find({});
  res.json(posts);
});

const addPost = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const newPost = new postModal({ title, description });
  newPost.save();
});

const savePost = asyncHandler(async (req, res) => {
  const {userId} = req.params;
  const {id} = req.body
  const user = await userModal.findById(userId);
  const post = await postModal.findById(id);
  res.json({user , post})
  user.posts.push(post) 
  user.save()
});

export {getPosts, addPost,savePost};
