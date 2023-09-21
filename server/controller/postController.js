import { postModal } from "../models/postModal.js";
import asyncHandler from 'express-async-handler';


const getPosts = asyncHandler(async (req,res) => {
    const posts = await postModal.find({})
    res.json(posts);
})

const addPost = asyncHandler(async (req,res) => {
  

    const { title , description } = req.body

    const newPost =  new postModal({title , description})
    newPost.save(); 
})

export  {
    getPosts ,addPost
}