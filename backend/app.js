import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import router from './routers/productRouter.js';
import morgan from "morgan";
import helmet from "helmet"
import rateLimit from "express-rate-limit";
import authRouter from './routers/authRouter.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import cartRouter from './routers/cartRouter.js';
import wishlistRouter from './routers/wishlistRouter.js';
import orderRouter from './routers/orderRouter.js';
import adminRouter from './routers/adminRouter.js';
import userRouter from './routers/userRouter.js';


dotenv.config();

const app = express();

app.use(helmet())


// app.use(cors({ origin:[ "http://localhost:5173" , "http://172.16.1.129:5173",], credentials: true }))

app.use(cors({ origin: [ "http://localhost:5173", " https://e-commerce-tau-one-23.vercel.app/" ], credentials: true }))

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}


const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too Many request ,  Please request later."
    },
})

app.use(apiLimiter)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too Many authentication request , Please try again later"
    }
})



await connectDB();




app.use("/products", router);

app.use("/auth", authLimiter , authRouter);

app.use("/cart", cartRouter);

app.use("/wishlist", wishlistRouter);

app.use("/user", userRouter)

app.use("/orders", orderRouter);

app.use("/admin", adminRouter);




app.get("/", (req, res) => {
    res.send("hello world")
});

// app.listen(8000, "0.0.0.0",() => {
//     console.log("server is running in http://localhost:8000");
// })

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is running in http://localhost:8000");
})