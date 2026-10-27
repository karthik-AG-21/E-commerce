import express from "express";
import { blockUser,  createProduct,  getAllOrders, 
     getAllProducts,  getAllUsers,  
     updateProduct} from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const adminRouter  = express.Router();

adminRouter.get("/users", authMiddleware ,  getAllUsers);

adminRouter.patch("/block", authMiddleware , blockUser);

adminRouter.get("/products", authMiddleware , getAllProducts);

adminRouter.post("/products/create", authMiddleware , createProduct);

adminRouter.put("/products/:id", authMiddleware , updateProduct);

adminRouter.get("/orders",authMiddleware ,  getAllOrders);



export default adminRouter;