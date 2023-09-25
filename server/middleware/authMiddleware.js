import jwt from "jsonwebtoken";
import { responce } from "../utils/errorResponceHandler.js";
import asyncHandler from "express-async-handler";
import { userModal } from "../models/userModal.js";
const verifyToken = asyncHandler(async (req,res,next) =>  {
     const token = req.headers.token
     if(!token){
          responce(res,400,'not logged in')
     }else{ 
          const isTokenCorrect = await jwt.verify(token ,process.env.JWT_SECRET);
          req.user = await userModal.findById(isTokenCorrect.id)
          if(isTokenCorrect){          
                next();
          }else{
               responce(res , 403 ,'false token')
          }
     }
      
});
export {verifyToken} 