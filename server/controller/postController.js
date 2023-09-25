import { postModal } from "../models/postModal.js";
import asyncHandler from "express-async-handler";
import { userModal } from "../models/userModal.js";
import { responce } from "../utils/errorResponceHandler.js";
const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModal.find({});
  res.json(posts);
});
const addPost = asyncHandler(async (req, res) => {
  try{ 
     const { title, description } = req.body;
     const newPost = new postModal({ postTitle:title, description, userOwner:req.user});
     newPost.save();
  }catch(err){
    responce(res,400,err)
  } 
});   
const deletePost = asyncHandler(async (req, res) => {
  try{
    const id = req.params.id;
    await postModal.findByIdAndDelete(id)
  }catch(err){
    responce(res,400,err)
  } 
});  

const savePost = asyncHandler(async (req, res) => {
  try{
  const { userId } = req.params ;
  const { id } = req.body;
  const user = await userModal.findById(userId);
  const post = await postModal.findById(id);
  user.posts.push(post); 
  user.save();
  }catch(err){
    responce(res,400,err)
  } 
}); 
const getSavedPostIds = asyncHandler(async (req, res) => {
  try{
const { userId } = req.params;
  const user = await userModal.findById(userId);
  res.json(user.posts);
  }catch(err){
    responce(res,400,err)
  }
  
});
const getSavedPost = asyncHandler(async (req, res) => {
  try{
const { userId } = req.params;
  const user = await userModal.findById(userId);
  const savedPost = await postModal.find({
    _id: { $in: user.posts },
  });  
  res.json(savedPost);
  }catch(err){
    responce(res,400,err)
  }
}); 
export { getPosts, addPost, savePost, getSavedPostIds, getSavedPost,deletePost };
