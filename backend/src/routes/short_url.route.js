import express from "express";
const router = express.Router();
import { create_short_url } from "../controller/short_url.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";


router.post("/", authMiddleware, create_short_url);
export default router;
