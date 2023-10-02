import express from 'express'
import {register ,login, getUser} from '../controller/userContoller.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const route = express.Router() 


route.post('/register' ,register)  
route.post('/login' ,login)
route.get('/get-user' ,verifyToken,getUser)


export {route as userRouter}