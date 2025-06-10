import express from "express";
const router = express.Router();
import { create_short_url } from "../controller/short_url.controller.js";


router.post("/" , create_short_url );




export default router;
