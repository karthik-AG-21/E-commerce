
import express from "express";
import { getWishlist } from "../controllers/wishlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/get", authMiddleware , getWishlist);


export default wishlistRouter;