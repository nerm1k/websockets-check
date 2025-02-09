import { SyntheticEvent, useEffect, useState } from "react";
import Chat from "../../components/Chat/Chat";
import SendMessageButton from "../../components/SendMessageButton/SendMessageButton";
import Textarea from "../../components/Textarea/Textarea";
import styles from './ChatPage.module.scss';
import { io, Socket } from "socket.io-client";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";

export interface Message {
    message_id: number,
    message: string,
    user_id: number,
    username: string,
    color: string,
    created_at: Date
}

const ChatPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState('');
    const { isAuthenticated, authenticatedUser } = useIsAuthenticated();

    useEffect(() => {
        // async function getMessages() {
        //     try {
        //         const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`);
        //         if (response.ok) {
        //             const data = (await response.json()) as Message[];
        //             setMessages(data);
        //         } else {
        //             console.log('Error fetching messages');
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        newSocket.emit("requestMessages");

        newSocket.on("messages", (data: Message[]) => {
            setMessages(data);
        });

        newSocket.on("newMessage", (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        if (socket && message.trim() && isAuthenticated) {
          const newMessage = {
            message: message,
            userId: authenticatedUser.id,
          };
    
          socket.emit("sendMessage", newMessage);
          setMessage("");
        }
    };
    
    function handleChangeTextarea(e: SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        setMessage(target.value);
    }

    return (
        <div className={styles.container}>
            <Chat messages={messages} />
            <Textarea value={message} onChange={handleChangeTextarea} />
            <SendMessageButton onClick={handleSendMessage} />
        </div>
    )
}

export default ChatPage;