import express from "express";
import { getUserById } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();


userRouter.get("/profile", authMiddleware , getUserById);

export default userRouter;