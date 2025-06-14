import { find_url_from_short_url } from "../controller/short_url.controller.js";
import express from "express";
const authRegister = express.Router();

authRegister.get("/:id"  , find_url_from_short_url);

export default authRegister;
