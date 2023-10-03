import { postModal } from "../models/postModal.js";
import asyncHandler from "express-async-handler";
import { userModal } from "../models/userModal.js";
import { responce } from "../utils/errorResponceHandler.js";

const getPosts = asyncHandler(async (req, res) => {
  const posts = await postModal.find({});
  res.json(posts);
}); 

const addPost = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new postModal({
      postTitle: title,
      description,
      userOwner: req.user,
      username: req.user.username
    }); 
    newPost.save(); 
  } catch (err) {
    responce(res, 400, err);
  }
});

const deleteSavedPost = asyncHandler(async (req, res) => {
  try { 
    const id = req.user._id
    const postId = req.params.id;
    const user = await userModal.findByIdAndUpdate(id , {
      $pull : { savedPosts :postId }
    }) 
    user.save();
  } catch (err) {  
    responce(res, 400, err);
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
   const id = req.params.id;
   deleteSavedPost(req, res)
   await postModal.findOneAndDelete({_id :id , userOwner : req.user._id})
  } catch (err) {   
    responce(res, 400, err);
  }  
}); 

const savePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await postModal.findById(postId);
    await userModal.findByIdAndUpdate(req.user.id , {
      $push : {savedPosts:post}
    });
  } catch (err) {
    responce(res, 400, err);
  } 
});

const getSavedPostIds = asyncHandler(async (req, res) => {
  try {
    const user = await userModal.findById(req.user.id);
    res.json(user.savedPosts);
  } catch (err) {
    responce(res, 400, err);
  }
});

const getSavedPost = asyncHandler(async (req, res) => {
  try {
    const user = await userModal.findById(req.user.id);
    const savedPost = await postModal.find({
      _id: { $in: user.savedPosts },
    });
    res.json(savedPost);
  } catch (err) {
    responce(res, 400, err);
  }
});

export {
  getPosts,
  addPost,
  savePost,
  getSavedPostIds,
  getSavedPost,
  deletePost,
  deleteSavedPost
};
