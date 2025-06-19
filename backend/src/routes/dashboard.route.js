import express from "express"
const dashboardRouter = express.Router();
import { authMiddleware } from "../middleware/auth.middleware.js";
import { Userdashboard } from "../controller/dashboard.controller.js";


dashboardRouter.get("/", authMiddleware, Userdashboard);

export default dashboardRouter;
