import express from "express";
const authRoute = express.Router();
import db from "../Connection/db.connection.js";
import { LoginFun, RegisterFun } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


authRoute.post("/login", LoginFun)

authRoute.post("/signup", RegisterFun)



export default authRoute;
