import { Link } from "react-router-dom";
import styles from './OpenChatButton.module.scss';

const OpenChatButton = () => {
    return (
        <div className={styles.container}>
            <Link to='/chat'>
                <div className={styles.button}>Зайти в чат &#128077;</div>
            </Link>
        </div>
    )
}

export default OpenChatButton;