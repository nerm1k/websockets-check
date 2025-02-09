import { Message } from '../../pages/ChatPage/ChatPage';
import ChatMessage from '../ChatMessage/ChatMessage';
import styles from './Chat.module.scss';

interface Props {
    messages: Message[]
}

const Chat = ({messages}: Props) => {
    return (
        <div className={styles.container}>
            {messages.map((message) => (
                <ChatMessage key={message.message_id} message={message} />
            ))}
            {/* <ChatMessage messageId={1} comment={'sadjnd gfdgfd fddf fgdgfd 222 gfd!! xdd fgdgfd'} userId={1} username={'roman'} color={'#c7c7c7'} createdAt={new Date()} /> */}
            {/* <div className={styles.message}>
                <span className={styles.message__time}>11:11</span>
                <span className={styles.message__user} style={{color: "#000"}}>rrrrr:</span>
                <span className={styles.message__text}>ghfhgfhgffgh</span>
            </div> */}
        </div>
    ) 
}

export default Chat;