import express, { Request, Response } from "express";
import router from "./routes/routes";
import { createServer } from "http";
import { Server } from "socket.io"

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", router)

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("message", (data) => {
        console.log(`Message from ${socket.id}:`, data);
        io.emit("message", { sender: socket.id, text: data });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
})


server.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
})