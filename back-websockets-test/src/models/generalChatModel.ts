import knex from "knex";

const pool = knex(require("../../knexfile"));

interface Message {
    message_id: number;
    message: string;
    user_id: number;
    username: string;
    color: string;
    createdAt: Date;
}

export default class GeneralChatModel {
    async getMessages() {
        const messages: Message[] = await pool('general_chat')
                                    .select('message_id', 'message', 'users.user_id', 'username', 'color', 'general_chat.created_at')
                                    .join('users', 'general_chat.user_id', '=', 'users.user_id')
                                    .orderBy('created_at', 'asc');
        return messages;
    }

    async createMessage(message: string, userId: number) {
        const [result] = await pool('general_chat').insert({ message, user_id: userId }).returning('message_id');

        const newMessage = await pool('general_chat')
            .select('message_id', 'message', 'users.user_id', 'username', 'color', 'general_chat.created_at')
            .join('users', 'general_chat.user_id', '=', 'users.user_id')
            .where('general_chat.message_id', '=', result.message_id)
            .first();
    
        return newMessage;
    }


} 