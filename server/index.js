import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { userRouter } from "./router/userRoutes.js";
import { postRouter } from "./router/postRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
 
app.use(cors()) ;

const PORT = process.env.PORT || 8888;
connectDB();
app.use("/auth", userRouter);
app.use("/post", postRouter);
app.listen(PORT, (req, res) => {
  console.log("result");
});
app.use(notFound);
app.use(errorHandler);
