import express from "express";
import { createCart, getCart, removeCart, updateCartQuantity } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

 cartRouter.get("/get", authMiddleware, getCart);

 cartRouter.post("/post", authMiddleware , createCart);

 cartRouter.delete("/delete/:productId",authMiddleware , removeCart);

 cartRouter.patch("/quantity/:productId", authMiddleware , updateCartQuantity);


export default cartRouter;