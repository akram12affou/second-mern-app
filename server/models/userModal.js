import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique : true, 
    },
    password: {
        type: String,
        required : true,
    },
    posts :[{
        type: mongoose.Types.ObjectId,
        required : false,
    }]
})
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const userModal = mongoose.model('users',userSchema)
export {userModal}