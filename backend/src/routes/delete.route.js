import express from "express"
const deleteRouter = express.Router();
import { authMiddleware } from "../middleware/auth.middleware.js";
import { delete_link } from "../controller/delete.controller.js";

deleteRouter.post("/", authMiddleware, delete_link);

export default deleteRouter;
