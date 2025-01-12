import { Server } from "socket.io";

let io;

export default function handler(req, res) {
    if (!io) {
        io = new Server(res.socket.server, {
            path: "/api/socket.io", // Specify the path for Socket.IO
        });

        io.on("connection", (socket) => {
            console.log("New client connected:", socket.id);

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
            });
        });

        console.log("Socket.IO server initialized");
        res.socket.server.io = io;
    }

    res.end();
}
