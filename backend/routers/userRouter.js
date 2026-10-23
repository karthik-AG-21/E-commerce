import express from "express";
import { getUserById, UpdatePassword } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const userRouter = express.Router();


userRouter.get("/profile", authMiddleware , getUserById);

userRouter.put("/change-password", authMiddleware , UpdatePassword);

export default userRouter;