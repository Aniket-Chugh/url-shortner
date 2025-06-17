import jwt from "jsonwebtoken"
import { cokkieOptions } from "../config/cokkie.config.js";
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import { nanoid } from "nanoid";
export const generateId = (id) => {
    return nanoid(id);
}


export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" })
}

export const verifyToken = (payload) => {
    return jwt.verify(payload, process.env.JWT_SECRET)
}
