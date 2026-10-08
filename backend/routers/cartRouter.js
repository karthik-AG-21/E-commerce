import express from "express";
import { getCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

 cartRouter.get("/cart", authMiddleware, getCart)


export default cartRouter;