import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import router from './routers/productRouter.js';
import morgan from "morgan";
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import cartRouter from './routers/cartRouter.js';

dotenv.config();

const app = express();


app.use(cors({origin:"http://localhost:5173", credentials:true}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

await connectDB();


app.use("/", router);

app.use("/",authRouter);

app.use("/", cartRouter)


app.get("/",(req,res)=>{
    res.send("hello world")
});

app.listen(8000, ()=>{
    console.log("server is running in http://localhost:8000");
})