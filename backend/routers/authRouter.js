import express from "express";
import { login, register } from "../controllers/authController.js";
import { refreshAccessToken } from "../controllers/refreshController.js";

const authRouter = express.Router();


authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/auth/refresh", refreshAccessToken);

export default authRouter