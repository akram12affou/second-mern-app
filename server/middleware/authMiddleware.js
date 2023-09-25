import jwt from "jsonwebtoken";
import { userModal } from "../models/userModal.js";
const verifyToken = async (req,res,next) =>  {
     const token = req.headers.token
     console.log(token)
     if(!token){ 
          res.status(403).json('not logged in')
     }else{
          const isTokenCorrect = await jwt.verify(token ,process.env.JWT_SECRET);
          req.user = await userModal.findById(isTokenCorrect.id)
          console.log(req.user)
          if(isTokenCorrect){ 
               next();
          }else{
               res.status(403).json('false token')
          }
     }
     next()
} 
export {verifyToken} 