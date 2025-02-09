import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import { routes } from "./routes/routes";
import UserModel from "./models/userModel";
import UserService from "./services/userService";
import UserController from "./controllers/userController";
import GeneralChatModel from "./models/generalChatModel";
import GeneralChatService from "./services/generalChatService";
import GeneralChatController from "./controllers/generalChatController";
import { Server } from "socket.io";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: { 
    origin: "*",
    methods: ["GET", "POST"] 
  } 
});

const userModel: UserModel = new UserModel();
const userService: UserService = new UserService(userModel);
const userController: UserController = new UserController(userService);

const generalChatModel: GeneralChatModel = new GeneralChatModel();
const generalChatService: GeneralChatService = new GeneralChatService(generalChatModel);
const generalChatController: GeneralChatController  = new GeneralChatController(generalChatService);

const corsOrigin = {
  origin: "*",
}

app.use(cors(corsOrigin));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes(userController, generalChatController));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("requestMessages", async () => {
    try {
      const messages = await generalChatModel.getMessages();
      socket.emit("messages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  });

  socket.on("sendMessage", async (message) => {
    try {
      const newMessage = await generalChatModel.createMessage(message.message, message.userId);
      io.emit("newMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

