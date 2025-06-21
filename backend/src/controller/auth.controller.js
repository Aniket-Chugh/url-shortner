import { registerUser } from "../dao/register_user.js";
import { loginUser } from "../dao/login_user.js";
import { cokkieOptions } from "../config/cokkie.config.js";
export const RegisterFun = async (req, res) => {
    const { username, email, password } = req.body;

    await registerUser(username, email, password, (err, token) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Registration failed",
                error: err,
            });
        }


        res.cookie("authToken", token, cokkieOptions);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    });
};



export const LoginFun = async (req, res) => {
    const { email, password } = req.body;


    await loginUser(email, password, res);

};
