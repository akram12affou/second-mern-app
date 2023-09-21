import mongoose from "mongoose";
const connectDB =async () => {
     mongoose.connect(process.env.MONGO_URI).then(res => {
        console.log('mongoo conected') 
     }) 
}
export  {connectDB}