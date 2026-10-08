import express from "express";
import { createCart, getCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

 cartRouter.get("/get", authMiddleware, getCart);

 cartRouter.post("/post", authMiddleware , createCart);


export default cartRouter;