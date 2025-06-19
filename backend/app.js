import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes/short_url.route.js";
import Redirectrouter from "./src/routes/redirect_url.route.js";
import authRoute from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/error_handling.js";
import { verifyToken } from "./src/utils/generate_nanoid.util.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";
import dashboardRouter from "./src/routes/dashboard.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); app.use(cookieParser());

app.get("/", (req, res) => {
    res.redirect("http://localhost:3000/");
});


app.get("/api/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

app.get("/auth/refresh", verifyToken, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});


app.use("/api/create", router);
app.use("/auth", authRoute)
app.use("/dashboard", dashboardRouter);


app.use("/", Redirectrouter);


app.use(errorHandler)

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})
