

import express from "express";
import {  getProductById,  getProducts, getProductsByCategory } from "../controllers/productsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getProducts)

router.get("/category", getProductsByCategory);

router.get("/:id",getProductById)


export default router;


