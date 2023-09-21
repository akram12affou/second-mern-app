import express from 'express'
import { verifyToken } from '../middleware/authMiddleware.js';
import {getPosts,addPost} from '../controller/postController.js'
const route = express.Router(); 
  

route.get('/' ,getPosts);
route.post('/add-post' ,verifyToken,addPost);


export {route as postRouter}