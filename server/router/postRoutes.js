import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import {getPosts,addPost,savePost} from '../controller/postController.js'
const route = express.Router();  
  

route.get('/' ,getPosts);
route.post('/add-post' ,verifyToken,addPost);
route.post('/save-post/:userId' ,verifyToken,savePost);


export {route as postRouter}