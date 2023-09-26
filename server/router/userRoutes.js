import express from 'express'
import {register ,login} from '../controller/userContoller.js';
  

const route = express.Router() 


route.post('/register' ,register)  
route.post('/login' ,login)


export {route as userRouter}