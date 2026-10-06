import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import router from './routers/productRouter.js';
import morgan from "morgan";
import authRouter from './routers/authRouter.js';

const app = express();
app.use(express.json());

dotenv.config();

await connectDB();

app.use(morgan("dev"));
app.use("/", router);

app.use("/",authRouter);


app.get("/",(req,res)=>{
    res.send("hello world")
});




app.listen(8000, ()=>{
    console.log("server is running in http://localhost:8000");
})