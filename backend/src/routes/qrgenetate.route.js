import express from "express"
const QrRouter = express.Router();
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generateQr } from "../controller/qrgenerate.controller.js";

QrRouter.get("/", authMiddleware, generateQr);


export default QrRouter;
