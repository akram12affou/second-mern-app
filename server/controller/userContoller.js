import { userModal } from "../models/userModal.js";
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from 'express-async-handler';

const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await userModal.findOne({ username });
  if (user) {
    res.status(400)
    throw Error("user already exists");
  } else {
    const newUser = await new userModal({ username, password });
    newUser.save();
    const token = await generateToken(res, newUser._id);
    res.json({token,newUser});
    res.cookie("accesToken", token, {
      httpOnly: true,
    });
    }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await userModal.findOne({ username });
  if (user) {
    if (await user.matchPassword(password)) {
      const token  = await generateToken(res, user._id);
      res.json({token,user});
      res.cookie("accesToken", token, {
        httpOnly: true,
      });
    } else { 
      res.status(403)
      throw Error("password or userame is incorrect")
    }
  } else {
    res.status(403)
    throw Error("user don't  exists");
  }
});

export { register, login };
