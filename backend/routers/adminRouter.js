import express from "express";
import { blockUser, getAllOrders, getAllProducts, getAllUsers } from "../controllers/adminController.js";


const adminRouter  = express.Router();

adminRouter.get("/users", getAllUsers);


adminRouter.put("/block", blockUser);

adminRouter.get("/orders", getAllOrders);

adminRouter.get("/products", getAllProducts);



export default adminRouter;