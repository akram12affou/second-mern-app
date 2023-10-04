import express from 'express'
import {register ,login, updateUser , deleteProfileImage} from '../controller/userContoller.js';
import { verifyToken } from '../middleware/authMiddleware.js';


const route = express.Router() 


route.post('/register' ,register)  
route.post('/login' ,login)
route.put('/update-user' ,verifyToken,updateUser)
route.put('/deleteProfileImage' ,verifyToken,deleteProfileImage)

 
export {route as userRouter}