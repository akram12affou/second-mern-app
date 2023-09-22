import jwt from "jsonwebtoken";

const verifyToken = async (req,res,next) =>  {
     // const token = req.cookies
     // console.log(token)
     // if(!token){ 
     //      res.status(403).json('not logged in')
     // }else{
     //      const isTokenCorrect = await jwt.verify(token ,process.env.JWT_SECRET)
     //      if(isTokenCorrect){
     //           next();
     //      }else{
     //           res.status(403).json('false token')
     //      }
     // }
     next()
} 
// , {
//      headers: {
//        'Authorization' : `Bearer ${cookie.accestoken}` ,
//        "Content-Type":"multipart/form-data"
//      }
export {verifyToken}