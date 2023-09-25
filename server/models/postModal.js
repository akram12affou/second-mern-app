import mongoose from 'mongoose'

const postSchema = mongoose.Schema({  
    title: {
        type: String,
        required : true,
    },
    description: {
        type: String,
    },
    userOwner :{
        type: mongoose.Types.ObjectId,
        required : false,
    }
})

const postModal = mongoose.model('posts',postSchema)
export {postModal}