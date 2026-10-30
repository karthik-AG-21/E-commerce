import express from "express";
import {
     blockUser, createProduct, DeleteProduct, getAllOrders,
     getAllProducts, getAllUsers, getTrashProducts, restoreTrashProducts, softDeleteProduct,
     updateOrderStatus,
     updateProduct
} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import authorizeAdmin from "../middleware/authorizeAdmin.js";


const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, authorizeAdmin ,   getAllUsers);

adminRouter.patch("/block", authMiddleware, authorizeAdmin , blockUser);

adminRouter.get("/products", authMiddleware, authorizeAdmin , getAllProducts);

adminRouter.post("/products/create", authMiddleware, authorizeAdmin , createProduct);

adminRouter.put("/products/:id", authMiddleware, authorizeAdmin , updateProduct);

adminRouter.patch("/products/:id/softDelete", authMiddleware, authorizeAdmin , softDeleteProduct);

adminRouter.get("/products/trash", authMiddleware, authorizeAdmin , getTrashProducts);

adminRouter.patch("/trash/restore/:id", authMiddleware, authorizeAdmin , restoreTrashProducts);

adminRouter.delete("/trash/permanent/:id", authMiddleware, authorizeAdmin , DeleteProduct);

adminRouter.get("/orders", authMiddleware, authorizeAdmin , getAllOrders);

adminRouter.patch("/orders/:userId/:orderId", authMiddleware, authorizeAdmin , updateOrderStatus);






export default adminRouter;