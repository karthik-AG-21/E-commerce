
import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/get", authMiddleware , getWishlist);

wishlistRouter.post("/add", authMiddleware , addToWishlist)

wishlistRouter.delete("/delete/:productId" , authMiddleware, removeFromWishlist)


export default wishlistRouter;