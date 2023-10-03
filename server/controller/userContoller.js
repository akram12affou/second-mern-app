import { userModal } from "../models/userModal.js";
import { postModal } from "../models/postModal.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import { responce } from "../utils/errorResponceHandler.js";

const register = asyncHandler(async (req, res) => {
  const { username, password, image } = req.body;

  const user = await userModal.findOne({ username });
  if (user) {
    responce(res, 400, "user already exists");
  } else {
    const newUser = await new userModal({ username, password, image });
    newUser.save();
    const token = await generateToken(res, newUser._id);
    res.json({ token, user: newUser });
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await userModal.findOne({ username });
  if (user) {
    if (await user.matchPassword(password)) {
      const token = await generateToken(res, user._id);
      res.json({ token, user });
    } else {
      responce(res, 403, "password or userame is incorrect");
    }
  } else {
    responce(res, 404, "user don't  exists");
  }
}); 

const updateUser = asyncHandler(async (req, res) => {
  const { username, password, newPassword } = req.body;
  const id = req.user._id;
  const user = await userModal.findOne({ _id:id });
  console.log(await user.matchPassword(password));
  if(await user.matchPassword(password)){ 
  await postModal.updateMany({userOwner : id}, { $set: { username } });
   const user = await userModal.findOneAndUpdate({
    _id:id
  },{
    username
  },
  { new: true }
    );
   
   res.json(user);
  }else{
    responce(res, 403, "password incorrect");
  }
  

});

export { register, login, updateUser };
