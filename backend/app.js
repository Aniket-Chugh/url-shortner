import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import router from "./src/routes/short_url.route.js";
import Redirectrouter from "./src/routes/redirect_url.route.js";
import authRoute from "./src/routes/auth.route.js";
import { errorHandler } from "./src/utils/error_handling.js";
import { verifyToken } from "./src/utils/generate_nanoid.util.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";
import dashboardRouter from "./src/routes/dashboard.route.js";
import QrRouter from "./src/routes/qrgenetate.route.js";
import deleteRouter from "./src/routes/delete.route.js";
import editRouter from "./src/routes/edit.route.js";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.redirect("http://localhost:3000/");
});

app.get("/api/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
    });


    return res.status(200).json({
        message: "logged out successfully", success: true,
    });

})

app.get("/auth/refresh", verifyToken, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});

app.use("/editlink", editRouter);
app.use("/api/create", router);
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRouter);
app.use("/generateqr", QrRouter);
app.use("/deletelink", deleteRouter);
app.use("/", Redirectrouter);
app.use(errorHandler);

server.listen(3001, () => {
    console.log("🚀 Server + Socket.IO running on http://localhost:3001");
});
