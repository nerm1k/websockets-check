import GeneralChatModel from "../models/generalChatModel";

export default class GeneralChatService {
    generalChatModel: GeneralChatModel;

    constructor(generalChatModel: GeneralChatModel) {
        this.generalChatModel = generalChatModel;
    }

    async getMessages() {
        const messages = await this.generalChatModel.getMessages();
        return messages;
    }

    async createMessage(message: string, userId: number) {
        const newMessage = await this.generalChatModel.createMessage(message, userId);
        return newMessage;
    }
}