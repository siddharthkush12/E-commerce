import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth.routes.js"
import multer from "multer"

const app=express();


app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
            "Accept",
            "Origin"
        ],
        credentials:true,
    })
)

const upload=multer();
app.use(upload.none());

app.use(express.urlencoded(
    {
        extended:true,
    }
));
app.use(express.json({
    limit:"16kb",
}));
app.use(cookieParser());
app.use(express.static("public"));


app.use('/api/auth',authRouter);

export {app};
