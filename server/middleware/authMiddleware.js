import jwt from "jsonwebtoken";

const verifyToken = async (req,res,next) =>  {
     const token = req.cookies.accesToken
     if(!token){ 
          res.status(403).json('not logged in')
     }else{
          const isTokenCorrect = await jwt.verify(token , "secret")
          if(isTokenCorrect){
               next();
          }else{
               res.status(403).json('false token')
          }
     }
}

export {verifyToken}