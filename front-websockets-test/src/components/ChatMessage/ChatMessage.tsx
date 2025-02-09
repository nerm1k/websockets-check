import { Message } from '../../pages/ChatPage/ChatPage';
import styles from './ChatMessage.module.scss';

interface Props {
    message: Message
}

const ChatMessage = ({message}: Props) => {
    const createdAt = new Date(message.created_at);
    console.log(createdAt);
    return (
            <div className={styles.message}>
                <span className={styles.message__time}>{createdAt.getHours() + ':' + createdAt.getMinutes()}</span>
                <span className={styles.message__user} key={message.user_id} style={{color: message.color}}>{message.username}:</span>
                <span className={styles.message__text}>{message.message}</span>
            </div>
    )
}

export default ChatMessage;