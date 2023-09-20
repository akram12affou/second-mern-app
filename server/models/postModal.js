import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required : true,
        unique : true, 
    },
    description: {
        type: String,
        required : true,
    },
    userOwner :{
        type: mongoose.Types.ObjectId,
        required : false,
    }
})

const postModal = mongoose.model('posts',postSchema)
export {postModal}