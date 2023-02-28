import express from "express";
import { login, register } from "../controllers/auth.js";

const authroute = express.Router();

authroute.post('/register', register)
authroute.post('/login', login)
export default authroute;