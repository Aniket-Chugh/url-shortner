import db from "../Connection/db.connection.js";
import bcrypt, { hash } from "bcrypt"
import { signToken } from "../utils/generate_nanoid.util.js";
import { cokkieOptions } from "../config/cokkie.config.js";
import { io } from "../../app.js";

export const loginUser = (email, password, res) => {
    const query = "SELECT * FROM users where email =?;";

    db.query(query, [email], async (err, result) => {

        if (err) {
            console.log("Error found while loggin in ", err);
            return;
        } else {

            const user = result[0];
            const Hashpassword = user.password_hash;
            const now_time = new Date();
            const userId = user.user_id;

            await bcrypt.compare(password, Hashpassword, (err, matched) => {
                if (err || !matched) {
                    return res.status(401).json({ success: false, message: "Invalid credentials" });
                }

                const token = signToken({ userId })
                res.cookie("authToken", token, cokkieOptions);


                const userData = {
                    id: user.user_id,
                    username: user.username,
                    email: user.email,
                    created_at: user.created_at,
                    isverified: user.is_verified,
                    subscription: user.subscription,
                    toolUsed: user.short_url_count,
                    lastLogin: now_time,
                };



                io.emit("authUpdated", userData)
                res.json({
                    success: true,
                    message: "Login Successfull",
                    user: userData

                })
            });





        }
    })
}
