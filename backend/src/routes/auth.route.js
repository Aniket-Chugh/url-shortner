import express from "express";
const authRoute = express.Router();
import db from "../Connection/db.connection.js";
import { LoginFun, RegisterFun} from "../controller/auth.controller.js";


authRoute.get("/" , LoginFun)

authRoute.post("/" , RegisterFun)



export default authRoute;
