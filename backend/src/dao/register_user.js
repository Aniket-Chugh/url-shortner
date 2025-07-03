import db from "../Connection/db.connection.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import { signToken } from "../utils/generate_nanoid.util.js";
import { io } from "../../app.js";

export const registerUser = async (username, email, password, callback) => {
    const userId = uuidv4();
    const saltRounds = 10;

    const query = "INSERT INTO users (user_id, username, email, password_hash) VALUES (?, ?, ?, ?)";

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            console.log("Error generating salt");
            return callback(err, null);
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log("Error hashing password");
                return callback(err, null);
            }

            db.query(query, [userId, username, email, hash], async (err, result) => {
                if (err) {
                    console.log("DB error while registering user:", err);
                    return callback(err, null);
                }

                const token = await signToken({ userId });


                io.emit("authUpdated")

                callback(null, token);
            });
        });
    });
};
