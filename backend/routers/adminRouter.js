import express from "express";
import {
     blockUser, createProduct, DeleteProduct, getAllOrders,
     getAllProducts, getAllUsers, getTrashProducts, restoreTrashProducts, softDeleteProduct,
     updateOrderStatus,
     updateProduct
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, getAllUsers);

adminRouter.patch("/block", authMiddleware, blockUser);

adminRouter.get("/products", authMiddleware, getAllProducts);

adminRouter.post("/products/create", authMiddleware, createProduct);

adminRouter.put("/products/:id", authMiddleware, updateProduct);

adminRouter.patch("/products/:id/softDelete", authMiddleware, softDeleteProduct);

adminRouter.get("/products/trash", authMiddleware, getTrashProducts);

adminRouter.patch("/trash/restore/:id", authMiddleware, restoreTrashProducts);

adminRouter.delete("/trash/permanent/:id", authMiddleware, DeleteProduct);

adminRouter.get("/orders", authMiddleware, getAllOrders);

adminRouter.patch("/orders/:userId/:orderId", authMiddleware, updateOrderStatus);



export default adminRouter;