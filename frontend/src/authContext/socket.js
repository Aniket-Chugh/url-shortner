import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if (!socket && typeof window !== "undefined") {
        socket = io("http://localhost:3001", {
            withCredentials: true,
        });
    }
    return socket;
};
