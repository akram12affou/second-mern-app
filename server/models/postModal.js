import mongoose from 'mongoose'
const postSchema = mongoose.Schema({  
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
    }  
})  
 
const postModal = mongoose.model('posts',postSchema)
export {postModal}