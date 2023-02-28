import cookieParser from "cookie-parser";
import express from "express";
import authroute from "./routes/auth.js";

const PORT = 8000;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/auth',authroute);

app.listen(8000, ()=>{
    console.log(`listerning on port ${PORT}`)
})