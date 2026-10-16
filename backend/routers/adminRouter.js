import express from "express";
import { blockUser, getAllUsers } from "../controllers/adminController.js";


const adminRouter  = express.Router();

adminRouter.get("/all", getAllUsers);


adminRouter.put("/block", blockUser);



export default adminRouter;