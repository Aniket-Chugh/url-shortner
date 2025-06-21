import jwt from "jsonwebtoken"
import { nanoid } from "nanoid";
export const generateId = (id) => {
    return nanoid(id);
}


export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
}

export const verifyToken = (payload) => {
    const decoded = jwt.verify(payload, process.env.JWT_SECRET)
    return decoded.userId;

}
