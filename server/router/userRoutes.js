import express from 'express'
import {register ,login, updateUser} from '../controller/userContoller.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const route = express.Router() 


route.post('/register' ,register)  
route.post('/login' ,login)
route.put('/update-user' ,verifyToken,updateUser)

 
export {route as userRouter}