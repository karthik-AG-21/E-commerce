

import express from "express";
import {  getProductById,  getProducts } from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getProducts)


router.get("/:id",getProductById)


export default router;


