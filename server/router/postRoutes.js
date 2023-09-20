import express from 'express'
import {getPosts} from '../controller/postController.js'
const route = express.Router(); 


route.post('/' ,getPosts)  


export {route as postRouter}