import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/enums";
import GeneralChatService from "../services/generalChatService";

export default class GeneralChatController {
    generalChatService: GeneralChatService;

    constructor(generalChatService: GeneralChatService) {
        this.generalChatService = generalChatService;
    }

    getMessages = async (req: Request, res: Response) => {
        try {
            const messages = await this.generalChatService.getMessages();
            res.status(HttpStatusCode.OK).json({ messages });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }

    createMessage = async (req: Request, res: Response) => {
        try {
            const { message } = req.body;
            const userId = req.body.user.id;
            const newMessage = await this.generalChatService.createMessage(message, userId);
            res.status(HttpStatusCode.CREATED).json({ message: "Message created successfully", newMessage });
        } catch (error: any) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }
    }
}