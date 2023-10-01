import mongoose from 'mongoose'
const { Schema ,model} = mongoose
const postSchema = Schema({  
    postTitle: {
        type: String,
        required : true,
    },
    description: {
        type: String,
    },    
    userOwner :{
        type: mongoose.Types.ObjectId,
        required : true, 
    },
    username: {
        type: String,
        required : true, 
    }
})  
 
export const postModal = model('posts',postSchema)
