import express from "express";
import {createOrder,getMyOrders,} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Place an order
orderRouter.post("/create", authMiddleware, createOrder);

// Get the logged-in user's order history
orderRouter.get("/my-orders", authMiddleware, getMyOrders);

export default orderRouter;
